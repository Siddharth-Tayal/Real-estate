import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { app } from "../../../firebase";
import {
  createListingFalse,
  createListingRequest,
  createListingSuccess,
} from "../../../redux/slices/listingSlice";

export default function CreateListing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    regularPrice: 500,
    discountPrice: 0,
    bedrooms: 1,
    bathrooms: 1,
    furnished: false,
    parking: false,
    type: "rent",
    offer: false,
    userRef: `${currentUser._id}`,
  });
  const [uploadError, setUploadError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState(false);
  const uploadHandler = () => {
    setLoading(true);
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setLoading(false);
          setUploadError(null);
        })
        .catch((err) => {
          setUploadError(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
      setUploadError("Max images must be 6 and atleast 1");
    }
  };
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          reject(error);
          setLoading(false);
          setUploadError(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  const deleteImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((url, i) => i !== index),
    });
  };

  //formData changing handler
  const handleChange = (e) => {
    if (e.target.id === "sell" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    } else if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: !formData[e.target.id],
      });
    } else
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
  };
  //form data submit handler
  const submitHandler = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);
    try {
      dispatch(createListingRequest());
      const result = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await result.json();
      if (data.success === false) {
        dispatch(createListingFalse(data.message));
        setFormError(data.message);
        setFormLoading(false);
        return;
      }
      dispatch(createListingSuccess(data.listing));
      setFormLoading(false);
      setFormError(null);
      navigate("/");
    } catch (error) {
      dispatch(createListingFalse());
      setFormLoading(false);
      setFormError(error.message);
    }
  };

  return (
    <main className=" p-3 max-w-4xl mx-auto">
      <h1 className="font-semibold my-7 text-3xl text-center">
        Create Listing
      </h1>
      <form onSubmit={submitHandler} className=" flex flex-col sm:flex-row">
        <div className="flex flex-col gap-4 flex-1 p-3">
          <input
            type="text"
            id="name"
            required
            placeholder="Name"
            className=" rounded-lg focus:outline-none border p-3 "
            minLength={"3"}
            maxLength={"60"}
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            type="text"
            id="description"
            required
            placeholder="Description"
            className=" rounded-lg focus:outline-none border p-3 "
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text"
            id="address"
            required
            placeholder="Address"
            className=" rounded-lg focus:outline-none border p-3 "
            onChange={handleChange}
            value={formData.address}
          />
          <div className="flex flex-wrap gap-6">
            <div className=" flex  gap-2">
              <input
                type="checkbox"
                id="sell"
                className=" w-5"
                checked={formData.type === "sell"}
                onChange={handleChange}
              />
              <span>Sell</span>
            </div>
            <div className=" flex  gap-2">
              <input
                type="checkbox"
                id="rent"
                className=" w-5"
                checked={formData.type === "rent"}
                onChange={handleChange}
              />
              <span>Rent</span>
            </div>
            <div className=" flex  gap-2">
              <input
                type="checkbox"
                id="parking"
                className=" w-5"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking Spot</span>
            </div>
            <div className=" flex  gap-2">
              <input
                type="checkbox"
                id="furnished"
                className=" w-5"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className=" flex  gap-2">
              <input
                type="checkbox"
                id="offer"
                className=" w-5"
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min={"1"}
                max={"10"}
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <p>Bedrooms</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min={"1"}
                max={"10"}
                className=" p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <span>Bathrooms</span>
            </div>
            <div className=" flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                className=" p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.regularPrice}
              />

              <div className=" text-center  flex flex-col">
                <p>Regular Price</p>
                <span className=" text-sm">(Rs. / Month)</span>
              </div>
            </div>
            {formData.offer === true ? (
              <div className=" flex items-center gap-2">
                <input
                  type="number"
                  id="discountPrice"
                  className=" p-3 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <div className=" text-center flex flex-col">
                  <p>Disocunt Price</p>
                  <span className="text-sm">(Rs. / Month)</span>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4 flex-1 p-3">
          <p className=" font-semibold">
            Images :{" "}
            <span className=" font-normal text-gray-700 ml-2">
              The first image will be the cover (max 6)
            </span>{" "}
          </p>
          <div className="flex gap-4">
            <input
              type="file"
              name="images"
              id="images"
              accept="image/*"
              multiple
              className=" p-3 border border-gray-300 items-center rounded-lg"
              onChange={(e) => setFiles(e.target.files)}
            />
            <button
              type="button"
              onClick={uploadHandler}
              disabled={loading}
              className=" text-green-700 p-3 border border-green-700 bg-white rounded-lg hover:shadow-lg disabled:opacity-80"
            >
              {loading ? "Uploading..." : "UPLOAD"}
            </button>
          </div>
          {uploadError ? <p className="text-red-700 ">{uploadError}</p> : ""}
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className=" flex justify-between p-3 border items-center"
              >
                <img
                  src={url}
                  alt="listing image"
                  className=" w-20 h-20 object-contain rounded-lg"
                />
                <button
                  type="button"
                  className=" text-red-700 p-3 rounded-lg hover:opacity-75"
                  onClick={() => deleteImage(index)}
                >
                  DELETE
                </button>
              </div>
            ))}
          <button
            disabled={formLoading || loading}
            className=" bg-slate-700 p-3 h-auto w-auto border-slate-700 text-white rounded-lg hover:opacity-90 disabled:opacity-80"
          >
            {formLoading ? "CREATING..." : "CREATE LISTING"}
          </button>
          {formError ? <p className=" text-red-700">{formError}</p> : <></>}
        </div>
      </form>
    </main>
  );
}

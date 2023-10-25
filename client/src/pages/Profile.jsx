import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { app } from "../firebase";
import {
  deleteFail,
  deleteRequest,
  deleteSuccess,
  signOutFail,
  signOutRequest,
  singOutSuccess,
  updateFail,
  updateRequest,
  updateSuccess,
} from "../redux/slices/userSlice";
import {
  deleteListingFalse,
  deleteListingRequest,
  deleteListingSuccess,
  myListingFail,
  myListingRequest,
  myListingSuccess,
} from "../redux/slices/listingSlice";
import { deleteAccount, logOut } from "../redux/actions/actions";
const Profile = () => {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const { currentUser, loading } = useSelector((state) => state.user);
  const { currentListing } = useSelector((state) => state.listing);
  const [file, setFile] = useState(undefined);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});
  const [success, setSuccess] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [listing, setListing] = useState([]);
  const [deleteListingError, setDeleteListingError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleChanges = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  useEffect(() => {
    setListing(currentListing);
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgressPercentage(Math.round(progress));
      },
      (err) => {
        setProgressPercentage(0);
        setError(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) =>
          setFormData({ ...formData, avatar: downloadUrl })
        );
      }
    );
  };

  // firebase
  // allow read;
  // allow write : if
  // request.resource.size < 2 * 1024 * 1024 && request.resource.contentType.matches('image/.*')
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateRequest());
    try {
      const result = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await result.json();
      if (data.success === false) {
        setErrorText(data.message);
        dispatch(updateFail());
        return;
      }
      dispatch(updateSuccess(data.user));
      setSuccess(true);
      setErrorText("");
    } catch (erro) {
      console.log(erro);
      dispatch(updateFail());
      setErrorText(erro);
      setSuccess(false);
    }
  };
  const handleDeleteListing = async (id) => {
    try {
      setDeleteListingError(null);
      dispatch(deleteListingRequest());
      const res = await fetch(`/api/listing/delete/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        setDeleteListingError(data.message);
        dispatch(deleteListingFalse(data.message));
        return;
      }
      dispatch(deleteListingSuccess(data.listings));
      setListing(listing.filter((item) => item._id !== data.listings));
    } catch (error) {
      setDeleteListingError(error);
    }
  };
  return (
    <div className=" p-3 max-w-lg mx-auto">
      <h1 className=" text-3xl font-semibold text-center my-7">Profile</h1>
      <form className=" flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || (currentUser && currentUser.avatar)}
          className=" h-24 w-24 rounded-full object-cover cursor-pointer mx-auto mt-2 "
          alt="profile"
        />
        {progressPercentage > 0 ? (
          <p className=" text-green-700 text-center">
            {progressPercentage === 100
              ? "Uploaded Successfully!!! "
              : `Uploading - ${progressPercentage}% `}
          </p>
        ) : (
          <></>
        )}
        {error > 0 ? (
          <p className=" text-red-700 text-center">{error}</p>
        ) : (
          <></>
        )}
        <input
          type="text"
          placeholder="Username"
          className=" p-3 border rounded-lg"
          defaultValue={currentUser && currentUser.name}
          id="name"
          onChange={handleChanges}
        />{" "}
        <input
          type="email"
          placeholder="email"
          className=" p-3 border rounded-lg"
          defaultValue={currentUser && currentUser.email}
          id="email"
          onChange={handleChanges}
        />{" "}
        <input
          type="password"
          placeholder="password"
          className=" p-3 border rounded-lg"
          id="password"
          defaultValue={currentUser && currentUser.password}
          onChange={handleChanges}
        />
        <button
          disabled={loading}
          className=" bg-slate-700 text-white py-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading.." : "Update"}
        </button>
        {errorText && <p className=" text-red-700">{errorText}</p>}
        {success && <p className=" text-green-700">Updated Successfully</p>}
        {currentUser && currentUser.role === "admin" && (
          <Link
            to={"/create-listing"}
            className=" bg-green-700 text-center text-white py-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            Create Listing
          </Link>
        )}
        <div className=" flex justify-between">
          <span
            className=" text-red-700 cursor-pointer hover:underline"
            onClick={() => dispatch(deleteAccount(currentUser._id))}
          >
            Delete Account
          </span>
          <span
            className=" text-red-700 cursor-pointer hover:underline"
            onClick={() => dispatch(logOut())}
          >
            Sign out
          </span>
        </div>
        {currentUser && currentUser.role === "admin" && (
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex justify-center text-green-700 cursor-pointer "
          >
            {isOpen === false ? "Show Listings" : "Hide Listings"}
          </button>
        )}
        {currentListing && currentListing.length > 0 && (
          <div
            className=" flex flex-col gap-4"
            style={{ display: isOpen === false ? "none" : "block" }}
          >
            <h1 className=" font-semibold my-7 text-center text-2xl text-slate-800">
              Your Listings
            </h1>
            {currentListing.map((item) => (
              <div
                className="flex p-3 items-center w-full justify-between rounded-lg border gap-4"
                key={item._id}
              >
                <Link to={`/listing/${item._id}`}>
                  <img
                    src={item.imageUrls[0]}
                    className=" h-16 w-16 object-contain rounded-lg"
                    alt="Listing cover"
                  />
                </Link>
                <Link to={`/listing/${item._id}`}>
                  <p className=" font-semibold font-serif w-40 text-slate-700 truncate hover:underline ">
                    {item.name}
                  </p>
                </Link>
                <div className="flex flex-col items-center justify-evenly gap-2">
                  <button
                    type="button"
                    className=" text-red-700 font-semibold"
                    onClick={() => handleDeleteListing(item._id)}
                  >
                    DELETE
                  </button>
                  {deleteListingError && (
                    <p className=" text-red-700">{deleteListingError}</p>
                  )}
                  <Link
                    className=" text-green-700"
                    to={`/edit-listing/${item._id}`}
                  >
                    EDIT
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};
export default Profile;

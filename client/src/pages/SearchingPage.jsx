import React, { useEffect, useState } from "react";
import { FaUserNinja } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";
import Loader from "../components/Loader";

export default function SearchingPage() {
  const navigate = useNavigate();
  const [searchedData, setSearchedData] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "createdAt",
    order: "desc",
  });
  const handleChange = (e) => {
    if (
      e.target.id === "sell" ||
      e.target.id === "rent" ||
      e.target.id === "all"
    ) {
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
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    } else if (e.target.id === "searchTerm")
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    else if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0];
      const order = e.target.value.split("_")[1];
      setFormData({
        ...formData,
        sort: sort,
        order: order,
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParmas = new URLSearchParams(window.location.search);
    urlParmas.set("searchTerm", formData.searchTerm);
    urlParmas.set("type", formData.type);
    urlParmas.set("offer", formData.offer);
    urlParmas.set("furnished", formData.furnished);
    urlParmas.set("parking", formData.parking);
    urlParmas.set("sort", formData.sort);
    urlParmas.set("order", formData.order);
    const searchQuery = urlParmas.toString();

    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    setLoading(true);
    setError(false);
    const url = new URLSearchParams(location.search);
    const searchTerm = url.get("searchTerm");
    const offer = url.get("offer");
    const type = url.get("type");
    const sort = url.get("sort");
    const order = url.get("order");
    const parking = url.get("parking");
    const furnished = url.get("furnished");
    if (searchTerm || offer || type || sort || order || parking || furnished) {
      setFormData({
        searchTerm: searchTerm || "",
        offer: offer || false,
        type: type || "all",
        parking: parking === "true" ? true : false,
        furnished: furnished === "true" ? true : false,
        sort: sort || "createdAt",
        order: order || "desc",
      });
    }

    const fetchListing = async () => {
      try {
        const searchQuery = url.toString();
        const response = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await response.json();
        if (data.success === false) {
          setLoading(false);
          setError(true);
          return;
        }
        if (data.listing.length > 8) setShowMore(true);
        setLoading(false);
        setSearchedData(data.listing);
      } catch (err) {
        setLoading(false);
        setError(true);
      }
    };
    fetchListing();
  }, [location.search]);

  const showMoreClickHandle = async () => {
    const numberOfListings = searchedData.length;
    const startIndex = numberOfListings;
    const urlParmas = new URLSearchParams(location.search);
    urlParmas.set("startIndex", startIndex);
    const searchQuery = urlParmas.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const fetchedData = await res.json();
    if (fetchedData.success === false) {
      setError(true);
      return;
    }
    if (fetchedData.listing.length < 9) {
      setShowMore(false);
    }
    setSearchedData([...searchedData, ...fetchedData.listing]);
  };
  return (
    <div className="flex flex-col md:flex-row ">
      <div className=" p-7 border-b-2 md:border-r-2 min-w-[350px] md:min-h-screen ">
        <form className=" flex flex-col gap-8 " onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <label className=" font-semibold whitespace-nowrap">
              Search Term :
            </label>
            <input
              type="text"
              id="searchTerm"
              className=" p-3 rounded-lg border w-full"
              placeholder="Search here..."
              value={formData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <label className=" font-semibold">Type : </label>
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                name=""
                id="all"
                className=" w-5"
                onChange={handleChange}
                checked={formData.type === "all"}
              />
              <span>Rent & Sale</span>
            </div>
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                name=""
                id="rent"
                className=" w-5"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <span>Rent </span>
            </div>
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                name=""
                id="sell"
                className=" w-5"
                onChange={handleChange}
                checked={formData.type === "sell"}
              />
              <span>Sale</span>
            </div>
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                name=""
                id="offer"
                className=" w-5"
                onChange={handleChange}
                checked={formData.offer === true || formData.offer === "true"}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <label className=" font-semibold">Amenities : </label>
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                name=""
                id="parking"
                className=" w-5"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking</span>
            </div>
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                name=""
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className=" font-semibold">Sort :</label>
            <select
              id="sort_order"
              onChange={handleChange}
              defaultValue={"createdAt_desc"}
              className=" border rounded-lg p-3 bg-white"
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className=" rounded-lg bg-slate-700 text-center p-3 text-white hover:opacity-95">
            SEARCH
          </button>
        </form>
      </div>
      <div className=" p-3">
        <h1 className=" text-3xl font-semibold border-b p-3 mx-auto text-slate-700">
          Listing Results :
        </h1>
        {error && (
          <p className=" w-full p-7 font-semibold text-red-700">
            Error ocurred while filtering...
          </p>
        )}
        {loading && (
          <div className=" py-40 mx-auto w-auto">
            <Loader />
          </div>
        )}
        {!loading && !error && searchedData.length === 0 && (
          <p className=" text-slate-800 font-semibold text-center p-7">
            No listing found !!
          </p>
        )}
        <div className=" py-7 flex flex-wrap gap-6 gap-y-10 justify-evenly">
          {!loading &&
            !error &&
            searchedData.length > 0 &&
            searchedData.map((item, index) => (
              <ListingItem key={index} data={item} />
            ))}
        </div>
        {showMore && (
          <button
            onClick={showMoreClickHandle}
            className=" p-3 hover:underline text-green-700 "
          >
            Show More
          </button>
        )}
      </div>
    </div>
  );
}

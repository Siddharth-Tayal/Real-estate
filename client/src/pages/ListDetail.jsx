import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Loader from "../components/Loader";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Contact from "../components/Contact";
const ListingDetail = () => {
  const listingId = useParams().id;
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [contact, setContact] = useState(false);
  useEffect(() => {
    const fetchListing = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/listing/${listingId}`);
        const result = await response.json();
        if (result.success === false) {
          setLoading(false);
          setError(true);
          return;
        }
        setData(result.listing);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [listingId]);
  if (error) return <>Something went wrong...</>;
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="">
          <Carousel
            showArrows={true}
            swipeable={true}
            showStatus={false}
            showThumbs={false}
            infiniteLoop={true}
            transitionTime={1000}
            autoPlay={true}
            interval={3000}
          >
            {data.imageUrls.map((item) => (
              <img key={item} src={item} style={{ maxHeight: "500px" }} />
            ))}
          </Carousel>
          <div className=" flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className=" text-3xl font-semibold">{data.name}</p>
            {data.offer ? (
              <div className=" flex flex-wrap gap-6 items-center">
                <div>
                  <p className=" text-slate-800">
                    <span className=" text-black font-semibold ">
                      Regular Price :{" "}
                    </span>
                    Rs. {data.regularPrice.toLocaleString("en-US")}
                  </p>
                  <p className=" text-slate-800">
                    <span className=" text-black font-semibold ">
                      Discount Price :{" "}
                    </span>
                    Rs. {data.discountPrice.toLocaleString("en-US")}
                  </p>
                </div>
                <p className=" bg-green-700 text-white p-2 rounded-md">
                  <span className="   font-semibold ">You Save : </span>Rs.{" "}
                  {(data.regularPrice - data.discountPrice).toLocaleString(
                    "en-US"
                  )}
                </p>
              </div>
            ) : (
              <p className=" text-slate-800">
                <span className=" text-black font-semibold ">Price : </span>Rs.{" "}
                {data.regularPrice.toLocaleString("en-US")}
              </p>
            )}
            <p className=" flex items-center gap-2 text-slate-600 my-2 text-sm">
              <FaMapMarkerAlt className=" text-green-700" />
              {data.address}
            </p>
            <div className="flex items-center gap-4">
              <p className=" bg-red-900 w-full max-w-[200px] text-white text-center rounded-md p-2">
                {data.type === "rent" ? "For Rent - price / month" : "For Sale"}
              </p>
              {data.offer && (
                <p className=" bg-green-900 w-full max-w-[200px] text-white text-center rounded-md p-2">
                  Offer - Rs.{" "}
                  {(data.regularPrice - data.discountPrice).toLocaleString(
                    "en-US"
                  )}
                </p>
              )}
            </div>{" "}
            <p className=" text-slate-800">
              <span className=" text-black font-semibold ">Description : </span>
              {data.description}
            </p>
            <ul className=" flex gap-6 text-green-700 flex-wrap items-center whitespace-nowrap">
              <li className=" flex gap-2 items-center">
                <FaBed />
                {data.bedrooms > 1
                  ? `${data.bathrooms} beds`
                  : `${data.bathrooms} bed`}
              </li>
              <li className=" flex gap-2 items-center">
                <FaBath />
                {data.bathrooms > 1
                  ? `${data.bathrooms} Baths`
                  : `${data.bathrooms} Bath`}
              </li>
              <li className=" flex gap-2 items-center">
                <FaParking />
                {data.parking == true ? `Parking Spot` : "No Parking"}
              </li>
              <li className=" flex gap-2 items-center">
                <FaChair />
                {data.furnished === true ? `Furnished` : `Non Furnished`}
              </li>
            </ul>
            {currentUser && currentUser._id !== data.userRef && !contact && (
              <button
                onClick={() => setContact(true)}
                className=" p-3  bg-slate-700 text-white font-semibold rounded-lg uppercase hover:opacity-95"
              >
                Contact Landlord
              </button>
            )}
            {contact && <Contact data={data} />}
          </div>
        </div>
      )}
    </>
  );
};

export default ListingDetail;

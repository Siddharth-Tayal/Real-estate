import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { FaBath, FaBed } from "react-icons/fa";

export default function ListingItem({ data }) {
  return (
    <div className="bg-white overflow-hidden rounded-lg shadow-md hover:shadow-2xl hover:-translate-y-3 duration-300 w-full sm:w-[330px] mx-auto">
      <Link to={`/listing/${data._id}`}>
        <img
          src={
            (data.imageUrls && data.imageUrls[0]) ||
            "https://www.shutterstock.com/image-vector/illustration-simple-house-isolated-on-260nw-1937900650.jpg"
          }
          alt="Listing Cover"
          className=" h-[320px] sm:h-[220px] object-cover  w-full hover:scale-105 transition-scale duration-300"
        />
        <div className=" p-3 gap-1 flex w-full flex-col">
          <p className=" text-lg font-semibold text-slate-700 truncate">
            {data.name}
          </p>
          <p className=" flex gap-2 items-center text-md font-semibold  w-full text-slate-700 truncate">
            <MdLocationOn className=" text-green-700 h-6 w-6 " />
            <span className=" truncate">{data.address}</span>
          </p>
          <p className=" line-clamp-2 text-sm text-gray-600">
            {data.description}
          </p>
          <p className="flex gap-2 text-slate-500 mt-2 font-semibold">
            {data.offer ? (
              <span>Rs. {data.discountPrice.toLocaleString("en-US")}</span>
            ) : (
              <span>Rs. {data.regularPrice.toLocaleString("en-US")}</span>
            )}
            {data.type === "rent" ? <span> / month</span> : <span></span>}
          </p>
          <div className=" flex gap-6 items-center font-bold text-xs text-slate-700">
            <p className=" flex gap-2 items-center">
              <FaBed className="text-green-700" />{" "}
              {data.bedrooms === 1 ? (
                <span>1 bed</span>
              ) : (
                <span>{data.bedrooms} beds</span>
              )}
            </p>
            <p className="flex gap-2 items-center">
              <FaBath className="text-green-700" />{" "}
              {data.bathrooms === 1 ? (
                <span>1 bath</span>
              ) : (
                <span>{data.bathrooms} baths</span>
              )}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

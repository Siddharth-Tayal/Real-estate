import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import ListingItem from "../components/ListingItem";
import { Link } from "react-router-dom";
const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [sellListings, setSellListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const carousels = [
    {
      imageUrls:
        "https://i.pinimg.com/736x/fe/6e/3d/fe6e3de926fd14bb5b3b426d8f18a024.jpg",
      heading1: "Find your next",
      headingSpan: "perfect",
      heading2: "palce with ease.",
      text1:
        "Real Estate will help you find your home fast , easy andcomfortably.",
      text2: "Our experts support are always available",
    },
    {
      imageUrls:
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8fA%3D%3D",
      heading1: "The best way to",
      headingSpan: "find",
      heading2: "your dream house.",
      text1:
        "Real Estate will help you find your home fast , easy andcomfortably.",
      text2: "Our experts support are always available",
    },
    {
      imageUrls:
        "https://static.rdc.moveaws.com/images/hero/default/2021-11/jpg/hp-hero-desktop.jpg",
      heading1: "Your dream house is",
      headingSpan: "just",
      heading2: "a click away.",
      text1:
        "Real Estate will help you find your home fast , easy andcomfortably.",
      text2: "Our experts support are always available",
    },
  ];
  const fetchOfferListings = async () => {
    try {
      const res = await fetch("/api/listing/get?offer=true&limit=4");
      const data = await res.json();
      setOfferListings(data.listing);
      fetchRentListings();
    } catch (error) {
      console.log(error);
    }
  };
  const fetchRentListings = async () => {
    try {
      const res = await fetch("/api/listing/get?type=rent&limit=4");
      const data = await res.json();
      setRentListings(data.listing);
      fetchSellListings();
    } catch (error) {
      console.log(error);
    }
  };
  const fetchSellListings = async () => {
    try {
      const res = await fetch("/api/listing/get?type=sell&limit=4");
      const data = await res.json();
      setSellListings(data.listing);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchOfferListings();
  }, []);
  return (
    <div className="">
      {/* Heading div */}{" "}
      <Carousel
        showArrows={true}
        swipeable={true}
        showStatus={false}
        showThumbs={false}
        infiniteLoop={true}
        transitionTime={1000}
        swipeScrollTolerance={5}
        autoPlay={true}
        interval={3000}
        className=" bg-black relative"
      >
        {carousels &&
          carousels.length > 0 &&
          carousels.map((item, index) => (
            <div
              key={index}
              className=""
              style={{
                backgroundImage: `url(${item.imageUrls})`,
                backgroundSize: "cover",
                backgroundBlendMode: "multiply",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            >
              <div className="flex p-28 px-3 flex-col max-w-6xl mx-auto  gap-6 ">
                <h1 className=" text-3xl lg:text-6xl font-bold text-white">
                  {item.heading1}{" "}
                  <span className=" text-orange-500 opacity-100">
                    {item.headingSpan}{" "}
                  </span>
                  <br />
                  {item.heading2}
                </h1>
                <p className=" flex flex-col text-xs sm:text-sm text-white ">
                  <span>{item.text1}</span>
                  <span>{item.text2}</span>
                </p>
                <Link
                  to={"/search"}
                  className=" text-xs sm:text-sm text-white font-bold mx-auto max-w-fit bg-orange-500 border border-white p-3 rounded-md hover:opacity-90"
                >
                  Let's Start now...
                </Link>
              </div>
            </div>
          ))}
      </Carousel>
      {/* Carousel div */}
      {/* Fetaured div */}
      <div className="flex flex-col p-3 mx-auto max-w-6xl">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className=" my-3">
              <h2 className=" text-slate-700 font-semibold text-3xl">
                Recent Offers
              </h2>
              <Link
                className=" text-blue-700 hover:underline text-sm my-3"
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
              <div className=" flex flex-wrap gap-4 gap-y-6 my-6">
                {offerListings.map((item, index) => (
                  <ListingItem data={item} key={index} />
                ))}
              </div>
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className=" my-3">
              <h2 className=" text-slate-700 font-semibold text-3xl">
                Recent places for Rent
              </h2>
              <Link
                className=" text-blue-700 hover:underline text-sm "
                to={"/search?type=rent"}
              >
                Show more rent places
              </Link>
              <div className=" flex flex-wrap gap-4 gap-y-6 my-6">
                {rentListings.map((item, index) => (
                  <ListingItem data={item} key={index} />
                ))}
              </div>
            </div>
          </div>
        )}
        {sellListings && sellListings.length > 0 && (
          <div className="">
            <div className=" my-3">
              <h2 className=" text-slate-700 font-semibold text-3xl">
                Recent places for Sell
              </h2>
              <Link
                className=" text-blue-700 hover:underline text-sm "
                to={"/search?type=sell"}
              >
                Show more Selling places
              </Link>
              <div className=" flex flex-wrap gap-4 gap-y-6 my-6 ">
                {sellListings.map((item, index) => (
                  <ListingItem data={item} key={index} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

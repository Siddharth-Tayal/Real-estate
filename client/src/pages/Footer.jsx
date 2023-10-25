import React from "react";
import {
  AiFillGoogleCircle,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillYoutube,
  AiFillTwitterCircle,
  AiFillMail,
  AiFillPhone,
  AiFillHome,
  AiFillFacebook,
} from "react-icons/ai";
export default function Footer() {
  const svgs = [
    { url: "https:google.com", icon: <AiFillLinkedin />, color: "#0072b1" },
    { url: "https:google.com", icon: <AiFillYoutube />, color: "#CD201F" },
    { url: "https:google.com", icon: <AiFillFacebook />, color: "#3b5998" },
    {
      url: "https:google.com",
      icon: <AiFillTwitterCircle />,
      color: "#00acee",
    },
    { url: "https:google.com", icon: <AiFillInstagram />, color: "#962fbf" },
    {
      url: "https:google.com",
      icon: <AiFillGoogleCircle />,
      color: " #4285F4",
    },
  ];
  return (
    <div className=" flex flex-col flex-wrap gap-9 items-center justify-center p-3 pt-8  bg-white">
      <div className="flex items-center flex-wrap justify-center gap-3 pt-8 text-6xl">
        {svgs.map((item, index) => (
          <a
            key={index}
            href={item.url}
            style={{ color: item.color }}
            className="hover:opacity-75 transition-all duration-300"
            target="_blank"
          >
            {item.icon}
          </a>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center gap-2 text-center my-8">
        <h2 className=" text-slate-800 text-2xl font-semibold">
          We are based in{" "}
          <span className=" text-slate-500 font-semibold">
            Conaughat Palace
          </span>{" "}
          Delhi{" "}
        </h2>
        <span className=" text-slate-700 text-l font-semibold">
          We work with clients all over.Get in touch with us!
        </span>
      </div>
      <div className="flex  items-start justify-center flex-wrap gap-8">
        <div className="flex items-center justify-center gap-1 ">
          <AiFillMail className=" text-2xl font-semibold" />
          <p className=" text-orange-500">info@urbanVilla.com</p>
        </div>
        <div className="flex items-center justify-center gap-1">
          <AiFillPhone className=" text-2xl font-semibold" />
          <p className=" text-slate-800">(508)746 - 0033</p>
        </div>
        <div className="">
          <div className="flex items-center justify-center gap-1 text-center">
            <AiFillHome className=" text-2xl font-semibold" />{" "}
            <p className=" text-slate-800 "> urbanVilla Real Estate</p>{" "}
          </div>
          <p className=" text-slate-700 font-normal">
            25 Sandwich Street , Conaughat Palace , Delhi
          </p>
        </div>
      </div>
    </div>
  );
}

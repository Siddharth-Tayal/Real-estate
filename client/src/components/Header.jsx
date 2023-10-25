import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, loading } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = new URLSearchParams(window.location.search);
    url.set("searchTerm", searchTerm);
    const searchQuery = url.toString();
    navigate(`/search?${searchQuery}`);
  };
  useEffect(() => {
    const url = new URLSearchParams(window.location.search);
    const search = url.get("searchTerm");
    if (search) setSearchTerm(search);
  }, [location.search]);
  return (
    <nav className="  shadow-md bg-no-repeat bg-cover bg-center md:bg-cover bg-blend-multiply bg-white   top-0 left-0 w-screen">
      <div className=" flex justify-between items-center max-w-6xl mx-auto p-3 ">
        <Link to={"/"} className=" font-bold text-sm sm:text-xl flex flex-wrap">
          <span className=" text-slate-500">Urban</span>
          <span className=" text-slate-700">Villa</span>
        </Link>
        <form
          onSubmit={handleSubmit}
          className=" border border-blue-500 border-t-0 border-r-0  p-3  flex items-center "
        >
          <input
            type="text"
            value={searchTerm}
            placeholder="Search..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className=" bg-transparent focus:outline-none w-24 focus:w-30 sm:w-64"
          />
          <button>
            <FaSearch className=" text-slate-600 cursor-pointer" />
          </button>
        </form>
        <ul className=" flex gap-4 items-center">
          <Link
            to={"/"}
            className="hidden sm:inline text-slate-700 hover:text-orange-600 cursor-pointer"
          >
            Home
          </Link>
          <Link
            to={"/about"}
            className="hidden sm:inline  text-slate-700 hover:text-orange-600 cursor-pointer"
          >
            About
          </Link>
          {currentUser === null ? (
            <Link
              to={"/sign-in"}
              className=" text-slate-700 hover:text-orange-600 cursor-pointer"
            >
              SignIn
            </Link>
          ) : (
            <Link
              to={"/profile"}
              className=" text-slate-700 hover:text-orange-600 cursor-pointer"
            >
              <img
                className=" w-12 h-12 rounded-full flex items-center justify-center object-cover bg-black"
                src={currentUser.avatar}
                alt={"Profile"}
              />
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;

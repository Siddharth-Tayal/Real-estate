import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AuthO from "../components/AuthO";
import { signIn } from "../redux/actions/actions";
const SignIn = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(signIn(formData, error));
  };
  useEffect(() => {
    if (isAuthenticated && error === null) navigate("/");
  });
  return (
    <div className=" p-3 max-w-lg mx-auto">
      <h1 className=" text-3xl font-semibold text-center my-7">Sign In</h1>{" "}
      <form className=" flex flex-col gap-4" onSubmit={submitHandler}>
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          className=" rounded-lg focus:outline-none border p-3 "
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          required
          placeholder="Password"
          className=" rounded-lg focus:outline-none border p-3 "
          onChange={handleChange}
        />
        <button
          className=" bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80"
          disabled={loading ? true : false}
        >
          {loading ? "LOADING" : "SIGN IN"}
        </button>
        <AuthO />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Doesn't have an account?</p>
        <Link to={"/sign-up"}>
          <span className=" text-blue-700 hover:underline">Sign Up</span>
        </Link>
      </div>
      {error && (
        <p className=" text-white bg-red-600 py-2 px-4 my-2 rounded-lg">
          {error}
        </p>
      )}
    </div>
  );
};

export default SignIn;

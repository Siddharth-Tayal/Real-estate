import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const result = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await result.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className=" p-3 max-w-lg mx-auto">
      <h1 className=" text-3xl font-semibold text-center my-7">Sign Up</h1>{" "}
      <form className=" flex flex-col gap-4" onSubmit={submitHandler}>
        <input
          type="text"
          name="name"
          required
          placeholder="Username"
          className=" rounded-lg focus:outline-none border p-3 "
          onChange={handleChange}
        />
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
          {loading ? "LOADING" : "SIGN UP"}
        </button>
        <button>SIGN UP WITH GOOGLE</button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className=" text-blue-700 hover:underline">Sign In</span>
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

export default SignUp;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Contact = ({ data }) => {
  const [landlord, setLandlord] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        setError(false);
        const res = await fetch(`/api/user/${data.userRef}`);
        const result = await res.json();
        if (result.success === false) {
          setError(result.message);
          return;
        }
        setLandlord(result.rest);
      } catch (error) {
        setError(error);
      }
    };
    fetchLandlord();
  }, [data.userRef]);

  if (error) return <p className=" text-red-700 font-semibold">{error}</p>;
  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact {""}
            <span className=" font-semibold text-black"> {landlord.name} </span>
            {""} for {""}
            <span className=" font-semibold text-black">
              {data.name.toLowerCase()}
            </span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="3"
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your Message here..."
            className=" w-full border p-3 rounded-lg"
          ></textarea>
          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${data.name}&body=${message}`}
            className=" bg-slate-700 p-3 rounded-lg text-white text-center uppercase hover:opacity-95"
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
};

export default Contact;

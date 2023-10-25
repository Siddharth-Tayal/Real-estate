import React from "react";
import { FiAlertTriangle } from "react-icons/fi";
export default function NotFound() {
  return (
    <div className=" flex flex-col gap-6 py-40 justify-center items-center text-red-700">
      <FiAlertTriangle className=" text-8xl font-bold " />{" "}
      <p className=" text-3xl font-semibold"> Not Found</p>
    </div>
  );
}

import React from "react";

export default function Loader() {
  return (
    <div className="">
      <div
        data-te-loading-management-init
        data-te-parent-selector="#loading-basic-example"
        className="flex flex-col gap-3 items-center justify-center"
      >
        <div
          data-te-loading-icon-ref
          className="inline-block h-[250px] w-[250px] animate-spin rounded-full border-slate-700 border-b-[6px]  motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        ></div>
        <p className=" text-slate-700 text-xl font-semibold">Loading...</p>
      </div>
    </div>
  );
}

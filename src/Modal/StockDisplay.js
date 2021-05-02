import React from "react";

export default function StockDisplay({ prod_no }) {
  return (
    <div
      className="rounded shadow-lg bg-white w-full mx-auto max-w-md sm:max-w-xl md:max-w-2xl xl:max-w-4xl 2xl:max-w-6xl"
      onClick={(e) => {
        e.stopPropagation();
        console.log("HI");
      }}
    >
      <div className="flex w-full p-2">This is stock</div>
    </div>
  );
}

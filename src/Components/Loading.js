import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

export default function Loading({ parentClassName }) {
  return (
    <div
      className={`flex flex-row items-center justify-center ${
        parentClassName || ""
      }`}
    >
      <AiOutlineLoading className="animate-spin text-lg" />
    </div>
  );
}

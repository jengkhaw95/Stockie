import React from "react";

export default function PriceBar({ dn, srp }) {
  const progress = `${((dn / srp) * 100).toFixed(0)}%`;

  return (
    <div className="rounded-full h-2 w-1/2 md:w-5/12 bg-gray-300 relative my-14">
      <div
        className="rounded-full bg-indigo-500 h-full"
        style={{ width: progress }}
      ></div>

      <div
        className="absolute text-center rounded px-3 py-2 bg-yellow-400 text-white"
        style={{
          top: "1.2rem",
          left: progress,
          transform: `translate(-50%,0)`,
        }}
      >
        <div className="z-10 relative whitespace-nowrap text-sm">
          {`Member - RM ${dn} each`}
          <div
            className="absolute z-0 bg-yellow-400 h-3 w-3 left-1/2 -top-3"
            style={{
              transform: ` translate(-50%,0) rotate(-45deg)`,
            }}
          ></div>
        </div>
      </div>

      <div
        className="absolute text-center rounded px-3 py-2 bg-gray-400 text-white"
        style={{ bottom: "1.2rem", right: 0, transform: `translate(50%,0)` }}
      >
        <div className="z-10 relative whitespace-nowrap text-sm">
          {`Retail - RM ${srp} each`}
          <div
            className="absolute z-0 bg-gray-400 h-3 w-3 left-1/2 -bottom-3"
            style={{
              transform: ` translate(-50%,0) rotate(-45deg)`,
            }}
          ></div>
        </div>
      </div>

      {/*<div
        className={tooltipClass}
        style={{
          right: "0",
          transform: `translate(50%,0)`,
        }}
      >
        {srp}
      </div>*/}
    </div>
  );
}

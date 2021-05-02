import React, { useContext } from "react";
import { userContext } from "../Contexts/UserContext";

export default function Modal({ children }) {
  const { setShow } = useContext(userContext);
  return (
    <div
      className="fixed flex top-0 bottom-0 w-screen bg-gray-300 bg-opacity-60 close"
      onClick={(e) => {
        if (e.target.classList.contains("close")) {
          setShow(false);
        }
      }}
    >
      {children}
    </div>
  );
}

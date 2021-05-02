import React, { useContext, useEffect } from "react";
import { userContext } from "../Contexts/UserContext";

export default function ModalLayout({ children }) {
  const { setModal } = useContext(userContext);
  const closeOnESC = () => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setModal();
      }
    });
  };
  useEffect(() => {
    closeOnESC();
    return () => closeOnESC();
  }, []);
  return (
    <div className="fixed top-0 w-full lg:pl-60 h-screen flex items-center justify-center bg-gray-400 bg-opacity-60 z-20">
      {children}
    </div>
  );
}

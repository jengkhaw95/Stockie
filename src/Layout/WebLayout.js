import React, { useContext } from "react";
import ModalLayout from "../Components/ModalLayout";
import SideNav from "../Components/SideNav";
import { userContext } from "../Contexts/UserContext";

export default function WebLayout({ children }) {
  const { isVisible, content } = useContext(userContext);
  return (
    <div className="relative flex flex-row min-h-screen min-w-screen overflow-auto bg-gray-50">
      <SideNav />
      <div className="hidden lg:block w-60"></div>
      <div className="relative w-full pt-6 sm:pt-12 pb-24 lg:pb-12  mx-auto max-w-md sm:max-w-xl md:max-w-2xl xl:max-w-4xl 2xl:max-w-6xl">
        {children}
      </div>
      {isVisible ? <ModalLayout>{content}</ModalLayout> : null}
    </div>
  );
}

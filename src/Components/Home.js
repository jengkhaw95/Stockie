import React, { useContext, useState } from "react";
import { userContext } from "../Contexts/UserContext";
import Modal from "./Modal";
import ModalAdd from "./ModalAdd";
import ModalFrame from "./ModalFrame";
import Record from "./Record";
import AddRecord from "../Modals/AddRecord/";

export default function Home() {
  const { data, loading, show, handleModal } = useContext(userContext);

  return (
    <div className="relative h-screen overflow-auto">
      <div className="mx-auto max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl ">
        {loading ? (
          <h1>Loading</h1>
        ) : (
          <>
            <h1 className="text-3xl pt-9 mb-3">Welcome</h1>
            <h2 className="text-2xl mb-3">Records</h2>
            <div
              onClick={() => {
                handleModal(AddRecord);
                console.log("Modal");
              }}
            >
              C
            </div>
            <Record />
          </>
        )}
      </div>
      <div id="modal-root">
        <ModalFrame />
      </div>
      {show ? (
        <Modal>
          <ModalAdd />
        </Modal>
      ) : (
        <></>
      )}
    </div>
  );
}

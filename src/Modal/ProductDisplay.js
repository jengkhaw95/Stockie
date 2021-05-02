import React, { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineClose, AiOutlineSafety } from "react-icons/ai";
import { Link } from "react-router-dom";
import Loading from "../Components/Loading";
import ModalLayout from "../Components/ModalLayout";
import PriceBar from "../Components/PriceBar";
import { userContext } from "../Contexts/UserContext";

export default function ProductDisplay({ prod_no }) {
  const { storeProducts, setModal, stocks } = useContext(userContext);
  const [displayLoading, setDisplayLoading] = useState(true);
  const [currentProduct, setCurrentProduct] = useState({});
  const currentStock = useRef([]);
  useEffect(() => {
    setDisplayLoading(true);
    setCurrentProduct(storeProducts.filter((s) => s.product_no === prod_no)[0]);
    currentStock.current = stocks.filter((s) => s.product_no === prod_no);
    currentStock.current.length > 0 &&
      setCurrentProduct((p) => ({
        ...p,
        count: currentStock.current[0]["count"],
      }));
    setDisplayLoading(false);
  }, []);
  return (
    <div
      className="rounded shadow-lg modal-y-boundary bg-white w-full mx-auto max-w-md sm:max-w-xl md:max-w-2xl xl:max-w-4xl 2xl:max-w-6xl"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="flex items-center justify-between w-full py-4 px-6 border-b">
        <div className="truncate">{currentProduct["name"] || ""}</div>
        <button onClick={() => setModal()}>
          <AiOutlineClose />
        </button>
      </div>
      {displayLoading ? (
        <Loading parentClassName="my-12" />
      ) : (
        <div
          className="overflow-y-auto flex flex-col items-center md:grid md:grid-cols-6 md:gap-12 w-full"
          style={{ maxHeight: "70vh" }}
        >
          {/*<img loading="lazy" src={s.images[0]} alt={s.name} />
           */}
          {/*<div className="relative h-52 w-full md:col-span-2">
            <div
              className="w-full h-full bg-center bg-no-repeat bg-contain"
              style={{ backgroundImage: `url(${currentProduct.images[0]})` }}
            ></div>
          </div>*/}
          <div className="h-48 md:h-auto w-full md:col-span-3 p-6">
            <img
              className="w-1/2 mx-auto md:w-full h-auto"
              src={currentProduct["images"][0]}
              alt={currentProduct["name"]}
              loading="lazy"
            />
          </div>
          <div className=" p-6 md:col-span-3 flex flex-col items-center w-full h-full md:w-full md:justify-between">
            <div>
              {currentProduct.count && (
                <div className="my-2">
                  You currently have{" "}
                  {
                    <span className="font-semibold">
                      {currentProduct.count}
                    </span>
                  }{" "}
                  of this.
                </div>
              )}
            </div>
            {
              <PriceBar
                dn={currentProduct.dn.price}
                srp={currentProduct.srp.price}
              />
            }
            <div className="flex flex-row justify-between items-center w-full my-4 md:my-6">
              <div></div>
              <div className="flex flex-col items-center space-y-2">
                <AiOutlineSafety className="text-3xl text-gray-600" />
                <div>{`${currentProduct.srp.uv} UV`}</div>
              </div>
              <div className="w-px h-11 bg-gray-400"></div>
              <div className="flex flex-col items-center space-y-2">
                <AiOutlineSafety className="text-3xl text-gray-600" />
                <div>{`${currentProduct.srp.pv} PV`}</div>
              </div>
              <div></div>
            </div>
            <div className="flex w-full mx-0">
              <a
                target="_blank"
                href={`https://shaklee.com.my/products/${currentProduct.pcat}/${currentProduct.product_no}`}
                className="w-full text-center bg-indigo-500 px-3 py-2 text-white rounded"
              >
                Visit Website
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

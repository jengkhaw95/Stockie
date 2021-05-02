import React, { useContext, useEffect, useState } from "react";
import FavouriteButton from "../Components/FavouriteButton";
import { userContext } from "../Contexts/UserContext";
import { useSuggestionInput } from "react-hooks-web";
import {
  AiOutlineDollarCircle,
  AiOutlineSafety,
  AiOutlineTag,
} from "react-icons/ai";
import ProductDisplay from "../Modal/ProductDisplay";
import Loading from "../Components/Loading";

export default function Store() {
  const { storeProducts, setModal, favouriteProducts, loading } = useContext(
    userContext
  );

  const [contentLoading, setContentLoading] = useState(true);
  const { state: storeState, onChange: storeOnChange } = useSuggestionInput({
    suggestions: storeProducts.map((s) => ({
      ...s,
      suggestionName: s.name.toLowerCase(),
      tagString: s.tags.join(" ").toLowerCase(),
    })),
    keys: ["name", "tagString", "status"],
  });

  const [result, setResult] = useState(() => storeProducts);

  useEffect(() => {
    setResult(
      storeProducts.sort((a, b) =>
        favouriteProducts && favouriteProducts.includes(a.product_no) ? -1 : 1
      )
    );
    setContentLoading(false);
  }, []);

  useEffect(() => {
    setContentLoading(true);
    if (storeState.userInput.length > 0) {
      setResult(
        storeState.filteredSuggestions.sort((a, b) =>
          favouriteProducts && favouriteProducts.includes(a.product_no) ? -1 : 1
        )
      );
    } else {
      setResult(
        storeProducts.sort((a, b) =>
          favouriteProducts && favouriteProducts.includes(a.product_no) ? -1 : 1
        )
      );
    }
    setContentLoading(false);
  }, [storeState.userInput, loading]);

  return (
    <div>
      <div className="text-3xl my-6 text-gray-600">Store</div>
      <div className="flex flex-row justify-between items-center my-6 space-x-6">
        <div className="flex-grow">
          <input
            className="bg-gray-50 w-full border-b h-10 px-2 rounded-none"
            type="text"
            name="stock"
            autoComplete="off"
            placeholder="Search E.g. Vivix/Available/OOS..."
            value={storeState.userInput}
            onChange={storeOnChange}
          />
        </div>
      </div>

      {contentLoading || loading ? (
        <Loading parentClassName="mt-24" />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
          {result.map((s) => (
            <div
              key={s.product_no}
              className="hover:cursor-pointer relative flex flex-col rounded shadow-md bg-white text-left outline-none"
              onClick={() =>
                setModal(
                  <ProductDisplay prod_no={s.product_no}></ProductDisplay>
                )
              }
            >
              <div className="relative h-52 w-full  rounded-t">
                {/*<img loading="lazy" src={s.images[0]} alt={s.name} />
                 */}
                <div
                  className="w-full h-full bg-center bg-no-repeat bg-contain"
                  style={{ backgroundImage: `url(${s.images[0]})` }}
                ></div>
                {s.status === "oos" ? (
                  <div className="absolute top-0 flex w-full h-full items-center justify-center rounded-t bg-gray-800 bg-opacity-50 text-xl font-bold text-gray-100">
                    Out of Stock
                  </div>
                ) : null}
              </div>

              <div className="flex flex-col items-start flex-grow px-2">
                <div className="flex flex-row items-center space-x-2 py-2 w-full">
                  <div className="flex flex-row items-center justify-center text-gray-500 h-8 w-8">
                    <AiOutlineTag />
                  </div>
                  <div className="  font-light text-gray-600 truncate w-28 sm:w-52 md:w-36">
                    {s.name}
                  </div>
                </div>
                <div className="flex flex-row items-center space-x-2 py-2">
                  <div className="flex flex-row items-center justify-center text-gray-500 h-8 w-8">
                    <AiOutlineSafety />
                  </div>
                  <div className="text-gray-600 font-light truncate w-28 sm:w-52 md:w-36">
                    {`${s.dn.uv} UV | ${s.dn.pv} PV`}
                  </div>
                </div>
                <div className="flex flex-row items-center space-x-2 py-2">
                  <div className="flex flex-row items-center justify-center text-gray-500 h-8 w-8 ">
                    <AiOutlineDollarCircle />
                  </div>
                  <div className="text-gray-600 font-light truncate w-28 sm:w-52 md:w-36">{`RM ${s.dn.price.toFixed(
                    2
                  )}`}</div>
                </div>
              </div>
              <FavouriteButton
                parentClassName="absolute right-0 p-2"
                prod_no={s.product_no}
                size="20px"
                isFav={
                  favouriteProducts && favouriteProducts.includes(s.product_no)
                }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

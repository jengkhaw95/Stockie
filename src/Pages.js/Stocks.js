import React, { useContext, useEffect, useState } from "react";
import {
  AiOutlineAppstore,
  AiOutlineBars,
  AiOutlineDollar,
  AiOutlineFileUnknown,
  AiOutlineSafety,
  AiOutlineShopping,
  AiOutlineTag,
} from "react-icons/ai";
import { BiCube } from "react-icons/bi";
import FavouriteButton from "../Components/FavouriteButton";
import Loading from "../Components/Loading";
import { userContext } from "../Contexts/UserContext";
import { favSort } from "../helper/favSort";
import CreateTransaction from "../Modal/CreateTransaction";
import ProductDisplay from "../Modal/ProductDisplay";

export default function Stocks() {
  const { setModal, stocks, favouriteProducts, transactions } = useContext(
    userContext
  );

  const [view, setView] = useState(() => "GRID");
  const [contentLoading, setContentLoading] = useState(true);
  const [stockSearch, setStockSearch] = useState("");
  const [result, setResult] = useState([]);

  const stockSummary = stocks.reduce(
    (a, b) => {
      a.count += b.count;
      a.uv += b.dn.uv * b.count;
      a.pv += b.dn.pv * b.count;
      return a;
    },
    { count: 0, uv: 0, pv: 0 }
  );

  useEffect(() => {
    setContentLoading(true);
    const q = [...stocks].sort((a, b) => {
      if (
        favouriteProducts.includes(a.product_no) &&
        favouriteProducts.includes(b.product_no)
      ) {
        return 0;
      } else {
        if (favouriteProducts.includes(a.product_no)) {
          return -1;
        }
        return 1;
      }
    });
    setResult(q);
    setContentLoading(false);
  }, []);

  useEffect(() => {
    setResult(favSort(stocks, favouriteProducts));
  }, [stocks.length]);

  // To sort
  useEffect(() => {
    setContentLoading(true);
    if (stockSearch.length > 0) {
      setResult((r) =>
        favSort(
          r
            .filter(
              (s) =>
                s.name.toLowerCase().indexOf(stockSearch.toLowerCase()) > -1 ||
                s.product_no.toLowerCase().indexOf(stockSearch.toLowerCase()) >
                  -1 ||
                s.tags.join().toLowerCase().indexOf(stockSearch.toLowerCase()) >
                  -1
            )
            .sort((a, b) =>
              favouriteProducts && favouriteProducts.includes(a.product_no)
                ? -1
                : 1
            ),
          favouriteProducts
        )
      );
    } else {
      setResult(favSort(stocks, favouriteProducts));
    }
    //setResult((r) => favSort(r, favouriteProducts));
    setContentLoading(false);
  }, [view]);

  // To filter
  useEffect(() => {
    setContentLoading(true);
    if (stockSearch.length > 0) {
      setResult((r) =>
        favSort(
          r.filter(
            (s) =>
              s.name.toLowerCase().indexOf(stockSearch.toLowerCase()) > -1 ||
              s.product_no.toLowerCase().indexOf(stockSearch.toLowerCase()) >
                -1 ||
              s.tags.join().toLowerCase().indexOf(stockSearch.toLowerCase()) >
                -1 ||
              (favouriteProducts.includes(s.product_no) &&
                "favourite".indexOf(stockSearch.toLowerCase()) > -1)
          ),
          favouriteProducts
        )
      );
    } else {
      setResult(favSort(stocks, favouriteProducts));
    }
    setContentLoading(false);
  }, [stockSearch]);

  //useEffect(() => {
  //  setContentLoading(true);
  //  if (stockState.userInput.length > 0) {
  //    setResult(favSort(stockState.filteredSuggestions, favouriteProducts));
  //  } else {
  //    setResult(favSort(stocks, favouriteProducts));
  //  }
  //  setContentLoading(false);
  //}, [stockState.userInput, view, stocks]);

  const GridDisplay = ({ result }) => {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
        {result.map((s) => (
          <div
            className="relative flex flex-col rounded shadow-md bg-white text-left hover:cursor-pointer"
            onClick={() =>
              setModal(<ProductDisplay prod_no={s.product_no}></ProductDisplay>)
            }
            key={s.product_no}
          >
            <div className="relative h-52 w-full  rounded-t">
              <div
                className="w-full h-full bg-center bg-no-repeat bg-contain"
                style={{ backgroundImage: `url(${s.images[0]})` }}
              ></div>
            </div>

            <div className="flex flex-col items-start flex-grow p-2 bg-white rounded-b">
              <div className="flex flex-row items-center space-x-3 py-2 w-full">
                <AiOutlineTag className="ml-2 text-lg text-gray-600" />
                <div className="font-light text-gray-600 truncate w-28 sm:w-52 md:w-36">
                  {s.name}
                </div>
              </div>
              <div className="flex flex-row items-center space-x-3 py-2">
                <BiCube className="ml-2 text-lg text-gray-600" />
                <div className="text-gray-600 font-light truncate w-28 sm:w-52 md:w-36">{`x${s.count}`}</div>
              </div>
              <div className="flex flex-row items-center space-x-3 py-2">
                <AiOutlineDollar className="ml-2 text-lg text-gray-600" />
                <div className="text-gray-600 font-light truncate w-28 sm:w-52 md:w-36">{`RM ${
                  s.dn.price * s.count
                }`}</div>
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
    );
  };

  const ListDisplay = ({ result }) => (
    <div className="flex flex-col space-y-4 mb-6">
      {result.map((s) => (
        <div
          className="flex flex-row items-center space-x-4 rounded shadow-md bg-white overflow-x-hidden text-left hover:cursor-pointer"
          onClick={() =>
            setModal(<ProductDisplay prod_no={s.product_no}></ProductDisplay>)
          }
          key={s.product_no}
        >
          <img
            className="h-16 w-16 rounded-l p-2"
            src={s.images[0]}
            alt={s.name}
          />
          <div className="flex flex-row items-start flex-grow space-x-2 bg-white">
            <div className="flex flex-row w-2/3 sm:w-1/2 md:w-1/3 sm:pl-12 md:pl-8 items-center space-x-1 sm: py-2">
              <AiOutlineTag className="mr-2 text-lg text-gray-600" />
              <div className="  font-light text-gray-600 truncate w-28 xl:w-40 2xl:w-60">
                {s.name}
              </div>
            </div>
            <div className="flex flex-row w-1/3 sm:w-1/2 md:w-1/3 sm:pl-12 md:pl-8 items-center space-x-3 py-2">
              <BiCube className="mr-2 text-lg text-gray-600" />
              <div className="text-gray-600 font-light truncate w-8 sm:w-20 xl:w-40 2xl:w-60">{`x${s.count}`}</div>
            </div>
            <div className="hidden md:flex flex-row w-1/3 sm:pl-12 md:pl-8 items-center space-x-3 py-2">
              <AiOutlineDollar className="mr-2 text-lg text-gray-600" />
              <div className="text-gray-600 font-light truncate w-8 sm:w-20 xl:w-40 2xl:w-60">{`RM ${
                s.dn.price * s.count
              }`}</div>
            </div>
          </div>
          <FavouriteButton
            parentClassName="flex items-center justify-center p-2 pr-4"
            prod_no={s.product_no}
            size="16px"
            isFav={
              favouriteProducts && favouriteProducts.includes(s.product_no)
            }
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="h-1/2">
      <div className="text-3xl my-6 text-gray-600">Stocks</div>
      {stocks.length === 0 ? (
        <div className="flex flex-col h-full justify-center items-center my-8 ">
          <div className="text-xl font-semibold">No Stock Found</div>
          <AiOutlineFileUnknown className="text-4xl my-4" />
          <div>Refill your stock by adding records!</div>
          <button
            className="flex items-center rounded bg-green-500 text-white px-3 py-2 mt-4 shiny-button"
            onClick={() => {
              setModal(<CreateTransaction></CreateTransaction>);
            }}
          >
            <div>Add Record</div>
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row sm:justify-around rounded shadow-md bg-white p-8 space-y-6 sm:space-y-0 ">
            <div className="flex flex-row items-center w-full sm:w-1/3 space-x-4 md:space-x-6 lg:space-x-8  md:pl-4 lg:pl-6  2xl:pl-28">
              <div className="w-12 h-12 flex items-center justify-center rounded-full">
                <AiOutlineShopping size="28px" />
              </div>
              <div className="flex flex-col">
                <div className="text-sm text-gray-400 font-medium">
                  Total Stocks
                </div>
                <div className="text-xl  text-gray-600 font-semibold">
                  {stockSummary.count}
                </div>
              </div>
            </div>

            <div className="flex flex-row items-center  w-full sm:w-1/3 space-x-4 md:space-x-6 lg:space-x-8  md:pl-4 lg:pl-6  2xl:pl-28">
              <div className="w-12 h-12 flex items-center justify-center rounded-full">
                <AiOutlineSafety size="28px" />
              </div>
              <div className="flex flex-col">
                <div className="text-sm text-gray-400 font-medium">
                  Total UV
                </div>
                <div className="text-xl  text-gray-600 font-semibold">
                  {stockSummary.uv}
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center  w-full sm:w-1/3 space-x-4 md:space-x-6 lg:space-x-8  md:pl-4 lg:pl-6  2xl:pl-28">
              <div className="w-12 h-12 flex items-center justify-center rounded-full">
                <AiOutlineSafety size="28px" />
              </div>
              <div className="flex flex-col">
                <div className="text-sm text-gray-400 font-medium">
                  Total PV
                </div>
                <div className="text-xl text-gray-600 font-semibold">
                  {stockSummary.pv}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center my-6 space-x-6">
            <div className="flex-grow">
              <input
                className="bg-gray-50 w-full border-b h-10 px-2 rounded-none"
                type="text"
                name="stock"
                autoComplete="off"
                placeholder="Search E.g. Favourite/Oos/Available..."
                value={stockSearch}
                onChange={(e) => setStockSearch(e.target.value)}
              />
            </div>
            <div className="flex flex-row">
              <button
                className={`outline-none rounded-l-full text-white py-1 px-3 ${
                  view === "LIST" ? "bg-blue-400  shadow-lg" : "bg-gray-300"
                }`}
                onClick={() => {
                  setContentLoading(true);
                  setView("LIST");
                  setContentLoading(false);
                }}
              >
                <AiOutlineBars className="text-xl" />
              </button>
              <button
                className={`outline-none rounded-r-full text-white py-1 px-3 ${
                  view === "GRID" ? "bg-blue-400 shadow-lg" : "bg-gray-300"
                }`}
                onClick={() => {
                  setContentLoading(true);
                  setView("GRID");
                  setContentLoading(false);
                }}
              >
                <AiOutlineAppstore className="text-xl" />
              </button>
            </div>
          </div>
          {contentLoading ? (
            <Loading parentClassName="mt-16" />
          ) : view === "GRID" ? (
            <GridDisplay result={result} />
          ) : (
            <ListDisplay result={result} />
          )}
        </>
      )}
    </div>
  );
}

import React, { useContext, useState } from "react";
import { userContext } from "../Contexts/UserContext";

export default function Settings() {
  const { setTransactions, setStocks, setFavouriteProducts } = useContext(
    userContext
  );
  //const [themeExpanded, setThemeExpanded] = useState(false);

  //const handleChangeTheme = () => {
  //  setThemeExpanded(false);
  //};
  return (
    <div>
      <div className="text-3xl my-6 text-gray-600">Settings</div>
      <div className="my-6">
        <div className="text-2xl font-semibold text-gray-600">Reset data</div>
        <p className="my-3 ">
          Clear stored inventory data in this device. This cannot be undone.
        </p>
        <button
          className="px-3 py-2 text-white bg-indigo-500 rounded"
          onClick={() => {
            setTransactions([]);
            setStocks([]);
            setFavouriteProducts([]);
          }}
        >
          Clear Data
        </button>
      </div>

      {/*<div className="my-6">
        <div className="text-2xl font-semibold text-gray-600">
          Log stored data
        </div>
        <p className="my-3 ">Log data for testing purpose.</p>
        <div className="flex flex-wrap">
          <button
            className="px-3 py-2 text-white bg-indigo-500 rounded my-1 mr-2"
            onClick={() => {
              console.table(transactions);
            }}
          >
            Transactions
          </button>
          <button
            className="px-3 py-2 text-white bg-indigo-500 rounded my-1 mr-2"
            onClick={() => {
              console.table(storeProducts);
            }}
          >
            Store Products
          </button>
          <button
            className="px-3 py-2 text-white bg-indigo-500 rounded my-1 mr-2"
            onClick={() => {
              console.table(stocks);
            }}
          >
            Stocks
          </button>
          <button
            className="px-3 py-2 text-white bg-indigo-500 rounded my-1 mr-2"
            onClick={() => {
              console.table(favouriteProducts);
            }}
          >
            Favourite Products
          </button>
        </div>
      </div>*/}
      {/*<div className="my-6">
        <div className="text-xl font-semibold text-gray-600">Verification</div>
        <p className="my-4 text-gray-600">
          Verify your SID, so you can directly access name/sid between your
          uplines/downlines. However, this is completely optional.
        </p>
        <div className="flex flex-col  sm:flex-row my-2 sm:space-x-6">
          <div className="w-full sm:w-1/2">
            <label className="text-gray-600">SID</label>
            <input
              className="bg-white w-full border h-10 px-2 my-2"
              type="text"
              name="sid"
              autoComplete="off"
              placeholder="SID"
            />
          </div>
          <div className="w-full sm:w-1/2">
            <label className="text-gray-600">Full Name</label>
            <input
              className="bg-white w-full border h-10 px-2 my-2"
              type="text"
              name="fullname"
              autoComplete="off"
              placeholder="John Smith"
            />
          </div>
        </div>
        <button className="rounded px-4 py-1.5 bg-blue-500 text-white">
          Verify
        </button>
      </div>
      <div className="my-6">
        <div className="text-xl font-semibold mb-4 text-gray-600">Theme</div>
        <p className="my-4 text-gray-600">* TO DO *</p>
        <div className="relative flex flex-row ">
          <button
            className="flex flex-row items-center border rounded p-1.5 space-x-2 bg-white w-32"
            onClick={() => {
              setThemeExpanded((p) => !p);
            }}
          >
            <div className="h-6 w-6 bg-green-400"></div>
            <div className="flex-grow text-left">Green</div>
            <div>
              <AiOutlineDown />
            </div>
          </button>
          <button className="rounded px-4 py-1.5 bg-blue-500 text-white ml-4">
            Save
          </button>

          <div
            className={
              `absolute bordered rounded bg-white top-10 w-32 shadow ` +
              `${!themeExpanded && "hidden"}`
            }
          >
            <button
              className="flex flex-row items-center  p-1.5 space-x-2 bg-white w-full"
              onClick={() => handleChangeTheme()}
            >
              <div className="h-6 w-6 bg-green-400"></div>
              <div>Green</div>
            </button>
            <button
              className="flex flex-row items-center  p-1.5 space-x-2 bg-white w-full"
              onClick={() => handleChangeTheme()}
            >
              <div className="h-6 w-6 bg-blue-500"></div>
              <div>Blue</div>
            </button>
            <button
              className="flex flex-row items-center  p-1.5 space-x-2 bg-white w-full"
              onClick={() => handleChangeTheme()}
            >
              <div className="h-6 w-6 bg-indigo-500"></div>
              <div>Indigo</div>
            </button>
          </div>
        </div>
      </div>

      <div className="my-6">
        <div className="text-xl font-semibold my-6 text-gray-600">
          Data Management
        </div>
        <p className="my-4 text-gray-600">* TO DO *</p>
        <p className="mt-4 text-gray-600">
          * This section suppose to be user settings regarding how they want
          their data to be stored *
        </p>
        <ul className="mb-4 text-gray-600">
          <li>- Local storage </li>
          <li>- Remote storage (database) / Sign up required</li>
        </ul>
        <p className="mb-4 mt-6 ">
          Clear localStorage data, useful in development phase, will be removed
          in production.
        </p>
        <button
          className="p-2 text-white bg-indigo-500 rounded"
          onClick={() => {
            setTransactions([]);
            setStocks([]);
          }}
        >
          Clear Stored Data
        </button>
      </div>*/}
    </div>
  );
}

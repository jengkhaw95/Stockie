import React, { useContext } from "react";
import {
  AiOutlineCrown,
  AiOutlineFileUnknown,
  AiOutlineProfile,
  AiOutlineShopping,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import TransactionTable from "../Components/TransactionTable";
import { userContext } from "../Contexts/UserContext";
import CreateTransaction from "../Modal/CreateTransaction";

export default function Overview() {
  const { setModal, transactions, stocks } = useContext(userContext);

  const stockCount = stocks.reduce((a, b) => a + b.count, 0);
  return (
    <div className=" h-1/2">
      <div className="text-3xl my-6 text-gray-600">Overview</div>

      {transactions && transactions.length > 0 ? (
        <>
          <div className="flex flex-col sm:flex-row sm:justify-around rounded shadow-md bg-white p-8 space-y-6 sm:space-y-0 ">
            <div className="flex flex-row items-center w-full sm:w-1/3 space-x-4 md:space-x-6 lg:space-x-8  md:pl-4 lg:pl-6  2xl:pl-28">
              <div className="w-12 h-12 flex items-center justify-center rounded-full">
                <AiOutlineCrown size="28px" />
              </div>
              <div className="flex flex-col">
                <div className="text-sm text-gray-400 font-medium">Rank</div>
                {/*<div className="text-xl  text-gray-600 font-semibold">*/}
                <div className=" text-gray-600 font-semibold">Coming soon</div>
              </div>
            </div>
            <div className="flex flex-row items-center  w-full sm:w-1/3 space-x-4 md:space-x-6 lg:space-x-8  md:pl-4 lg:pl-6  2xl:pl-28">
              <div className="w-12 h-12 flex items-center justify-center rounded-full">
                <AiOutlineShopping size="28px" />
              </div>
              <div className="flex flex-col">
                <div className="text-sm text-gray-400 font-medium">Stocks</div>
                <div className="text-xl  text-gray-600 font-semibold">
                  {stockCount}
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center  w-full sm:w-1/3 space-x-4 md:space-x-6 lg:space-x-8  md:pl-4 lg:pl-6  2xl:pl-28">
              <div className="w-12 h-12 flex items-center justify-center rounded-full">
                <AiOutlineProfile size="28px" />
              </div>
              <div className="flex flex-col">
                <div className="text-sm text-gray-400 font-medium">
                  Transactions
                </div>
                <div className="text-xl text-gray-600 font-semibold">
                  {transactions.length}
                </div>
              </div>
            </div>
          </div>
          <div className="text-xl font-semibold my-6 text-gray-600">
            Transactions
          </div>
          <TransactionTable
            filteredTransactions={transactions
              .sort((a, b) => {
                return (
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
                );
              })
              .slice(0, 5)}
          />

          {transactions.length > 5 && (
            <Link
              to="/transactions"
              className="shadow-md rounded-b bg-white hover:cursor-pointer hover:bg-gray-100 py-4 text-center border-t"
            >
              View more
            </Link>
          )}
        </>
      ) : (
        <div className="flex flex-col h-full justify-center items-center my-8 ">
          <div className="text-xl font-semibold">No Data Found</div>
          <AiOutlineFileUnknown className="text-4xl my-4" />
          <div>Let's get started by adding your first record!</div>
          <button
            className="flex items-center rounded bg-green-500 text-white px-3 py-2 mt-4 shiny-button"
            onClick={() => {
              setModal(<CreateTransaction />);
            }}
          >
            <div>Add Record</div>
          </button>
        </div>
      )}
    </div>
  );
}

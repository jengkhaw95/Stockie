import React, { useContext, useEffect, useState } from "react";
import { AiOutlinePlus, AiOutlineFileUnknown } from "react-icons/ai";
import Loading from "../Components/Loading";
import TransactionTable from "../Components/TransactionTable";
import { userContext } from "../Contexts/UserContext";
import CreateTransaction from "../Modal/CreateTransaction";

export default function Records() {
  const { setModal, transactions } = useContext(userContext);
  const [filteredTransactions, setFilteredTransactions] = useState(() => []);
  const [isLoading, setIsLoading] = useState(true);
  const [transactionSearch, setTransactionSearch] = useState("");

  useEffect(() => {
    setIsLoading(true);
    setFilteredTransactions(transactions);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (transactionSearch.length > 0) {
      setFilteredTransactions(
        transactions.filter(
          (t) =>
            t.target.name
              .toLowerCase()
              .indexOf(transactionSearch.toLowerCase()) > -1 ||
            t.target.sid.indexOf(transactionSearch.toLowerCase()) > -1 ||
            t.type.toLowerCase().indexOf(transactionSearch.toLowerCase()) >
              -1 ||
            (t.isCompleted && transactionSearch.toLowerCase() === "complete") ||
            (!t.isCompleted &&
              transactionSearch.toLowerCase() === "incomplete") ||
            t.items
              .map((i) => i.name)
              .join()
              .toLowerCase()
              .indexOf(transactionSearch.toLowerCase()) > -1
        )
      );
    } else {
      setFilteredTransactions(transactions);
    }
    setIsLoading(false);
  }, [transactionSearch, transactions]);

  return (
    <div className="h-1/2">
      <div className="text-3xl my-6 text-gray-600">Records</div>
      {transactions && transactions.length > 0 ? (
        <>
          <div className="flex flex-row justify-between items-center my-6 space-x-6">
            <div className="flex-grow">
              <input
                className="bg-gray-50 w-full border-b h-10 px-2 rounded-none"
                type="text"
                name="transaction"
                autoComplete="off"
                placeholder="Search E.g. Complete/Incomplete..."
                onChange={(e) => setTransactionSearch(e.target.value)}
                value={transactionSearch}
              />
            </div>
            <div>
              <button
                className="flex items-center rounded bg-green-500 text-white px-3 py-2"
                onClick={() => {
                  setModal(<CreateTransaction />);
                }}
              >
                <AiOutlinePlus className="mr-1.5 text-white text-lg" />
                <div>Record</div>
              </button>
            </div>
          </div>
          {isLoading ? (
            <Loading parentClassName="mt-24" />
          ) : (
            <TransactionTable
              filteredTransactions={filteredTransactions.sort((a, b) => {
                return (
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
                );
              })}
            />
          )}
        </>
      ) : (
        <div className="flex flex-col h-full justify-center items-center my-8 ">
          <div className="text-xl font-semibold">No Record Found</div>
          <AiOutlineFileUnknown className="text-4xl my-4" />
          <div>Start adding record now!</div>
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

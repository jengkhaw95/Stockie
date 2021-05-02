import React, { useContext, useEffect, useState } from "react";
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineDollar,
  AiOutlineSafety,
} from "react-icons/ai";
import Loading from "../Components/Loading";
import { userContext } from "../Contexts/UserContext";

export default function TransactionDisplay({ transaction }) {
  const { setModal, transactions, setTransactions, stocks } = useContext(
    userContext
  );
  const [displayLoading, setDisplayLoading] = useState(true);
  const [editableTransaction] = useState(() => transaction);
  useEffect(() => {
    setDisplayLoading(false);
  }, []);
  /*
    What can user do with edit?
    -Add/remove product
    -Add/minus amount
    -Price (Member/Retail)

    Flow 1:
    1. Get the edited transaction
    2. Virtually merged with the list of transactions
    3. Iterate through list of transactions and generate the list of stocks
    4. Filter the list of stocks to check validity

    Flow 2:
    1. Get the edited transaction
    2. Compare to the un-edited transation to find out which product +/- amount
       E.g. 
        [
          {
              product_no: 'P1001',
              changes: +3
            }
          ]
    3. Check validity with current list of stocks
    4. If ok, then proceed
*/

  //const handleEditing = () => {
  //  const newTransactions = transactions.map((t) => {
  //    if (t.id === transaction.id) {
  //      return editableTransaction;
  //    }
  //    return t;
  //  });

  //  // Or
  //  // Check if new transaction is valid

  //  setTransactions((prev) =>
  //    prev.map((t) => {
  //      if (t.id === transaction.id) {
  //        return editableTransaction;
  //      }
  //      return t;
  //    })
  //  );
  //  window.location.reload();
  //};
  return (
    <div
      className="rounded shadow-lg modal-y-boundary bg-white w-full mx-auto max-w-md sm:max-w-xl md:max-w-2xl xl:max-w-4xl 2xl:max-w-6xl"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="flex items-center justify-between w-full py-4 px-6 border-b">
        <div className="truncate">Transaction Details</div>
        <button onClick={() => setModal()}>
          <AiOutlineClose />
        </button>
      </div>
      {displayLoading ? (
        <Loading parentClassName="my-32" />
      ) : (
        <div
          className="overflow-y-auto w-full p-6"
          style={{ maxHeight: "70vh" }}
        >
          {/*<div className="grid grid-cols-4 gap-4 max-h-48 overflow-y-scroll my-4">
            {editableTransaction.items.map((p) => (
              <div key={p.product_no} className="relative">
                <img src={p.images[0]} alt={p.name} loading="lazy" />
                <div className="absolute top-0 w-full h-full left-0 z-10 bg-black bg-opacity-60 flex items-center justify-center text-white text-lg">
                  x{p.count}
                </div>
              </div>
            ))}
          </div>*/}
          <div className="grid grid-cols-4 md:grid-cols-6 gap-4 max-h-48 overflow-y-scroll my-4">
            {editableTransaction.items.map((p) => (
              <div key={p.product_no} className="relative">
                <img src={p.images[0]} alt={p.name} />
                <div className="absolute flex justify-end items-end top-0 left-0 w-full h-full bg-black bg-opacity-10 ">
                  <div className="flex right-0 bottom-0 rounded-tl-lg text-xs px-2 py-1  bg-indigo-400 text-white">
                    x{p.count}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/*<label
            htmlFor="useDn"
            className="flex items-center hover:cursor-pointer"
          >
            <div>Use Member Price?</div>

            <div
              className={`ml-2 border rounded h-5 w-5 flex items-center justify-center ${
                editableTransaction.data.isDn
                  ? "bg-indigo-400 border-indigo-400"
                  : "border-gray-300"
              }`}
            >
              {editableTransaction.data.isDn && (
                <AiOutlineCheck
                  className={`text-xs text-white ${
                    !editableTransaction.data.isDn ? "hidden" : ""
                  }`}
                />
              )}
            </div>
            <input
              type="checkbox"
              id="useDn"
              className="hidden"
              defaultChecked={editableTransaction.data.isDn}
              name="use_member"
              onChange={() => {
                setIsChanged(true);
                setEditableTransaction((r) => {
                  const data = { ...r.data, isDn: !r.data.isDn };
                  return { ...r, data };
                });
              }}
            />
          </label>*/}
          <div className="flex items-center justify-around my-6">
            <div className="flex items-center">
              {editableTransaction.data.isDn ? (
                <>
                  <AiOutlineCheck className="pr-2 text-4xl text-green-500" />
                  <div>Member Price</div>
                </>
              ) : (
                <>
                  <AiOutlineClose className="pr-2 text-4xl text-red-500" />
                  <div>Retail Price</div>
                </>
              )}
            </div>
          </div>
          <div className="my-6 flex flex-row justify-between items-center">
            <div></div>
            <div
              className="flex flex-col items-center space-y-2"
              style={{ minWidth: "30%" }}
            >
              <AiOutlineSafety className="text-3xl text-gray-600" />
              <div>{`${editableTransaction.data.uv} UV`}</div>
            </div>
            <div className="w-px h-11 bg-gray-400"></div>
            <div
              className="flex flex-col items-center space-y-2"
              style={{ minWidth: "30%" }}
            >
              <AiOutlineSafety className="text-3xl text-gray-600" />
              <div>{`${editableTransaction.data.pv} PV`}</div>
            </div>
            <div className="w-px h-11 bg-gray-400"></div>
            <div
              className="flex flex-col items-center space-y-2"
              style={{ minWidth: "30%" }}
            >
              <AiOutlineDollar className="text-3xl text-gray-600" />
              <div>
                {`RM ${
                  editableTransaction.data.isDn
                    ? editableTransaction.data.dn
                    : editableTransaction.data.srp
                }`}
              </div>
            </div>
            <div></div>
          </div>
          <button
            onClick={() => setModal()}
            className="flex w-full justify-center items-center rounded bg-gray-300  px-3 py-2"
          >
            Close
          </button>
          {/*{isChanged && (
          <div className="w-full flex justify-end space-x-3">
            <button
              onClick={() => setModal()}
              className="flex items-center rounded bg-gray-300  px-3 py-2"
            >
              Cancel
            </button>

            <button
              onClick={() => handleEditing()}
              className="flex items-center rounded bg-indigo-400 text-white px-3 py-2"
            >
              Save Change
            </button>
          </div>
        )}*/}
        </div>
      )}
    </div>
  );
}

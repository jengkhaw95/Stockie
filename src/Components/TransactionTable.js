import React, { useContext } from "react";
import {
  AiOutlineBorder,
  AiOutlineCheckSquare,
  AiOutlineDollarCircle,
  AiOutlineExport,
  AiOutlineImport,
  AiOutlineInfoCircle,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { userContext } from "../Contexts/UserContext";
import capitalize from "../helper/capitalize";
import isToday from "../helper/isToday";
import TransactionDisplay from "../Modal/TransactionDisplay";

export default function TransactionTable({ filteredTransactions }) {
  const { setModal, toggleTransactionStatus } = useContext(userContext);
  return (
    <div className="table-fixed  rounded bg-white shadow-md w-full">
      <thead className="block w-full py-1 border-b">
        <tr className="flex w-full ">
          <th className="w-2/12 py-3">Type</th>
          <th className="w-7/12 py-3">Items</th>
          {/*<th className="hidden sm:table-cell w-2/12 py-3">SID</th>
          <th className="w-3/12 sm:w-2/12 py-3">Date</th>*/}
          <th className="w-3/12 py-3">Date</th>
        </tr>
      </thead>
      {!filteredTransactions.length ? (
        <div className="flex flex-col items-center py-6 space-y-3 w-full text-center">
          <AiOutlineInfoCircle className="text-3xl" />
          <div>No transactions found</div>
        </div>
      ) : (
        <tbody className="block w-full h-full overflow-x-hidden">
          {filteredTransactions.map((t) => (
            <tr
              key={t.id}
              className="flex w-full hover:cursor-pointer hover:bg-gray-100"
              onClick={() => setModal(<TransactionDisplay transaction={t} />)}
            >
              <div className="table-cell w-2/12 ">
                <div className="w-full h-full flex items-center justify-center rounded-full">
                  {
                    //t.type === "STOCK_IN" ? (
                    //  <AiOutlineShoppingCart size="20px" />
                    //) : t.type === "STOCK_OUT" ? (
                    //  <AiOutlineDollarCircle size="20px" />
                    //) :
                    t.type === "STOCK_IN" ? (
                      <AiOutlineImport size="20px" />
                    ) : (
                      <AiOutlineExport size="20px" />
                    )
                  }
                </div>
              </div>
              <div className="table-cell w-7/12 text-center py-4 px-2 sm:px-6 md:px-8 truncate">
                {/*{t.items.reduce((a, b) => a + b.count, 0)}*/}
                <div className="w-full flex items-center flex-nowrap overflow-x-hidden">
                  {t.items.slice(0, 5).map((t, i) => (
                    <div
                      className="relative h-12 w-12 rounded-full overflow-hidden shadow-sm  flex justify-center items-center"
                      style={{
                        marginLeft: `${i !== 0 ? -8 : 0}px`,
                        backgroundImage: `url("${t.images[0]}")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                      }}
                    >
                      <div className="bg-black opacity-30 absolute top-0 left-0 h-full w-full "></div>
                      <div className="text-white text-sm font-semibold z-10">
                        {t.count}
                      </div>
                      {/*<img src={t.images[0]} className=" h-12 w-12" />*/}
                    </div>
                  ))}
                  {t.items.length > 3 ? (
                    <div
                      className="relative bg-white h-12 w-12 rounded-full overflow-hidden shadow-sm  flex justify-center items-center"
                      style={{
                        marginLeft: `-8px`,
                      }}
                    >
                      <div className="bg-black opacity-40 absolute top-0 left-0 h-full w-full "></div>
                      <div className="text-white text-sm font-semibold z-10">
                        {`+${t.items.length - 3}`}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
              {/*<div className="hidden sm:table-cell w-2/12 text-center py-4 px-2">
                {"-"}
              </div>*/}
              <div className="table-cell w-3/12 text-center">
                <div className="flex items-center justify-center py-4 px-2 h-full w-full">
                  <div>
                    {isToday(new Date(t.createdAt))
                      ? new Date(t.createdAt).toLocaleTimeString("en-US")
                      : new Date(t.createdAt).toLocaleDateString("en-GB")}
                  </div>
                </div>
              </div>
              {/*<div className="w-3/12 sm:w-2/12 flex items-center justify-center">
                <button
                  data-tid={t.id}
                  className="w-full h-full outline-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleTransactionStatus(e.currentTarget.dataset.tid);
                  }}
                >
                  {t.isCompleted ? (
                    <AiOutlineCheckSquare size="20px" className="mx-auto" />
                  ) : (
                    <AiOutlineBorder size="20px" className="mx-auto" />
                  )}
                </button>
              </div>*/}
            </tr>
          ))}
        </tbody>
      )}
    </div>
  );
}

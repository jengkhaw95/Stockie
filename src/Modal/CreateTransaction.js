import React, { useContext, useEffect, useState } from "react";
import { v4 } from "uuid";
import { useSuggestionInput } from "react-hooks-web";
import { AiFillCheckCircle, AiOutlineClose } from "react-icons/ai";
import { userContext } from "../Contexts/UserContext";

const FLOW = [
  { title: "Select Type", component: (a) => <TransactionSelection {...a} /> },
  { title: "Select Products", component: (a) => <ProductSelection {...a} /> },
  { title: "Overview", component: (a) => <TransactionOverview {...a} /> },
  { title: "Complete", component: (a) => <TransactionResult {...a} /> },
];

export default function CreateTransaction() {
  const {
    stocks,
    setStocks,
    setTransactions,
    storeProducts,
    setModal,
  } = useContext(userContext);

  const [transactionType, setTransactionType] = useState({
    name: null,
    flow: null,
  });

  //const [transactionUser, setTransactionUser] = useState(() => ({
  //  name: "",
  //  sid: "",
  //}));

  const [transactionProducts, setTransactionProducts] = useState([]);

  const [transactionStatus, setTransactionStatus] = useState({
    isDn: true,
    completed: true,
  });

  useEffect(() => {
    if (!transactionType.name) {
      setTransactionProducts([]);
      //setTransactionUser({
      //  name: "",
      //  sid: "",
      //});
    }
  }, [transactionType]);
  //selection -> user detail? -> product selection -> overview -> end

  //const TransactionUser = (
  //  <div className="flex flex-col mt-6">
  //    <label className="mb-2">Name</label>
  //    <div className="w-full relative">
  //      <input
  //        onKeyPress={(e) =>
  //          (e.charCode >= 65 && e.charCode <= 90) ||
  //          (e.charCode >= 97 && e.charCode <= 122)
  //        }
  //        key="name"
  //        className="mb-4 w-full p-2 rounded border-1 bg-gray-100 h-10"
  //        name="name"
  //        type="text"
  //        autoComplete="off"
  //        onChange={(e) => {
  //          if (
  //            e.target.value.length === 0 ||
  //            /^[a-zA-Z ]+$/.test(e.target.value)
  //          ) {
  //            setTransactionUser((p) => ({ ...p, name: e.target.value }));
  //          }
  //        }}
  //        value={transactionUser.name}
  //      />
  //    </div>
  //    <label className="mb-2">SID</label>
  //    <input
  //      key="sid"
  //      className="mb-4 w-full p-2 rounded border-1 bg-gray-100 h-10"
  //      name="sid"
  //      type="number"
  //      onKeyDown={(e) => {
  //        if (e.key === "e") {
  //          e.stopPropagation();
  //          return;
  //        }
  //      }}
  //      //pattern="[0-9]"
  //      autoComplete="off"
  //      onChange={(e) => {
  //        const text = e.target.value;
  //        const restrictedChar = [".", "e", "-", "+", "*", "/"];
  //        let badInput = 0;
  //        restrictedChar.forEach((r) => {
  //          if (text.includes(r)) {
  //            badInput += 1;
  //          }
  //        });
  //        if (badInput === 0) {
  //          setTransactionUser((p) => ({ ...p, sid: text }));
  //        }
  //      }}
  //      value={transactionUser.sid}
  //    />
  //  </div>
  //);

  //const RenderTransaction = (t) => {
  //const current = TRANSACTION_TYPE.filter((f) => f.type === t.name)[0];
  //let progress = [];
  //let i = 0;
  //if (current) {
  //  for (i = 0; i < current.components.length - 1; i++) {
  //    progress.push(i <= t.flow);
  //  }
  //}
  //return <TransactionSelection />;
  //!t.name ? (
  //  <TransactionSelection />
  //) : (
  //  <div className="">
  //    <div className="flex flex-row justify-between items-center pb-3 border-b">
  //      <div className="font-semibold text-lg">{current.title}</div>
  //      <button className="text-2xl" onClick={() => setModal()}>
  //        <AiOutlineClose className="text-lg" />
  //      </button>
  //    </div>
  //    {current["components"][t.flow]}

  //    <div
  //      className={`flex flex-row items-center pt-3 ${
  //        current.components.length - 1 === t.flow
  //          ? "justify-center"
  //          : "justify-between"
  //      }`}
  //    >
  //      {current.components.length - 1 !== t.flow && (
  //        <button
  //          className="px-4 py-2 rounded bg-gray-200"
  //          onClick={() =>
  //            setTransactionType((prev) => {
  //              if (t.flow === 0) {
  //                return { ...prev, name: null };
  //              }
  //              return { ...prev, flow: prev.flow - 1 };
  //            })
  //          }
  //        >
  //          Back
  //        </button>
  //      )}
  //      {t.flow !== current.components.length - 1 && (
  //        <div className="flex flex-row space-x-2">
  //          {progress.map((p, i) => (
  //            <div
  //              key={i}
  //              className={`rounded-full h-2 w-2 ${
  //                p ? "bg-indigo-500" : "bg-gray-400"
  //              }`}
  //            ></div>
  //          ))}
  //        </div>
  //      )}
  //      {t.flow === current.components.length - 2 ? (
  //        <button
  //          className="px-4 py-2 rounded bg-indigo-500 text-white"
  //          onClick={() => {
  //            const newTransaction = {
  //              id: v4(),
  //              type: t.name,
  //              items: transactionProducts,
  //              data: {
  //                isDn: transactionStatus.isDn,
  //                ...transactionProducts.reduce(
  //                  (a, b) => ({
  //                    uv: a.uv + b["srp"]["uv"] * b.count,
  //                    pv: a.pv + b["srp"]["pv"] * b.count,
  //                    dn: a.dn + b["dn"]["price"] * b.count,
  //                    srp: a.srp + b["srp"]["price"] * b.count,
  //                  }),
  //                  { uv: 0, pv: 0, dn: 0, srp: 0 }
  //                ),
  //              },
  //              target:
  //                t.name === "STOCK_IN"
  //                  ? { name: "shaklee", sid: "-" }
  //                  : t.name === "STOCK_OUT"
  //                  ? { name: "sales", sid: "-" }
  //                  : transactionUser,
  //              isCompleted: transactionStatus.completed,
  //              createdAt: new Date(),
  //            };
  //            setTransactions((p) => {
  //              p.push(newTransaction);
  //              return p;
  //            });
  //            setStocks((s) =>
  //              transactionProducts.reduce(
  //                (
  //                  c,
  //                  { product_no, count, images, name, tags, dn, srp, pcat }
  //                ) => {
  //                  const dataToStore = {
  //                    product_no,
  //                    count,
  //                    images,
  //                    name,
  //                    tags,
  //                    dn,
  //                    srp,
  //                    pcat,
  //                  };
  //                  const matchItem = stocks.filter(
  //                    (t) => t.product_no === product_no
  //                  );
  //                  const isMatch = matchItem.length > 0;
  //                  if (isMatch) {
  //                    if (t.name === "STOCK_IN" || t.name === "TRANSFER_IN") {
  //                      return c.map((e) =>
  //                        e.product_no === product_no
  //                          ? { ...e, count: e.count + count }
  //                          : e
  //                      );
  //                    }
  //                    // This 'else' targets STOCK_OUT & TRANSFER_OUT
  //                    else {
  //                      if (matchItem[0].count - count <= 0) {
  //                        return c.filter((e) => e.product_no !== product_no);
  //                      } else {
  //                        return c.map((e) =>
  //                          e.product_no === product_no
  //                            ? { ...e, count: e.count - count }
  //                            : e
  //                        );
  //                      }
  //                    }
  //                  } else {
  //                    c.push(dataToStore);
  //                    return c;
  //                  }
  //                },
  //                s
  //              )
  //            );
  //            setTransactionType((prev) => ({
  //              ...prev,
  //              flow: prev.flow + 1,
  //            }));
  //          }}
  //        >
  //          Create
  //        </button>
  //      ) : current.components.length - 1 === t.flow ? (
  //        <button
  //          className="px-4 py-2 rounded bg-indigo-500 text-white"
  //          onClick={() => {
  //            setModal();
  //          }}
  //        >
  //          Close
  //        </button>
  //      ) : (
  //        <button
  //          className="px-4 py-2 rounded bg-indigo-500 text-white"
  //          onClick={() => {
  //            if (
  //              (current.isUserRequired &&
  //                current.components.length - 4 === t.flow &&
  //                transactionUser.name.length > 0) ||
  //              (current.components.length - 3 === t.flow &&
  //                transactionProducts.length > 0) ||
  //              current.components.length - 2 === t.flow
  //            ) {
  //              setTransactionType((prev) => ({
  //                ...prev,
  //                flow: prev.flow + 1,
  //              }));
  //            }
  //          }}
  //        >
  //          Next
  //        </button>
  //      )}
  //    </div>
  //  </div>
  //);
  //};

  const [pageIndex, setPageIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(FLOW[0]);

  const nextPage = () => {
    setPageIndex((prev) => (prev > FLOW.length - 2 ? prev : prev + 1));
  };

  const previousPage = () => {
    setPageIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  useEffect(() => {
    setCurrentPage(FLOW[pageIndex]);
  }, [pageIndex]);

  return (
    <div
      className=" rounded shadow-lg modal-y-boundary  bg-white  mb-16 w-full mx-auto max-w-md sm:max-w-xl md:max-w-2xl xl:max-w-4xl 2xl:max-w-6xl"
      onClick={() => {
        //setModal();
      }}
    >
      <div className="flex flex-row justify-between items-center py-4 px-6  border-b">
        <div className="font-semibold text-lg">{currentPage.title}</div>
        <button className="text-2xl" onClick={() => setModal()}>
          <AiOutlineClose className="text-lg" />
        </button>
      </div>
      <div className="p-6">
        {currentPage.component({
          setModal,
          nextPage,
          previousPage,
          stocks,
          setStocks,
          setTransactionType,
          transactionType,
          storeProducts,
          transactionProducts,
          setTransactionProducts,
          transactionStatus,
          setTransactionStatus,
          setTransactions,
        })}
      </div>
    </div>
  );
}

const TransactionSelection = ({ stocks, setTransactionType, nextPage }) => {
  const TRANSACTION_TYPE = [
    //{
    //  isUserRequired: true,
    //  selection: true,
    //  type: "TRANSFER_IN",
    //  components: [
    //    TransactionUser,
    //    <ProductSelection />,
    //    <TransactionOverview />,
    //    <TransactionResult />,
    //  ],
    //  title: "Transfer In",
    //  description: "Buy products from Upline (Receiving the UV/PV)",
    //},
    //{
    //  isUserRequired: true,
    //  selection: true,
    //  type: "TRANSFER_OUT",
    //  components: [
    //    TransactionUser,
    //    <ProductSelection />,
    //    <TransactionOverview />,
    //    <TransactionResult />,
    //  ],
    //  title: "Transfer Out",
    //  description: "Sell products to Downline (Transafering the UV/PV)",
    //},
    {
      isUserRequired: false,
      selection: true,
      type: "STOCK_IN",
      components: [
        //<ProductSelection />,
        //<TransactionOverview />,
        //<TransactionResult />,
      ],
      title: "Stock In",
      description: "Add products to your inventory",
    },
    {
      isUserRequired: false,
      selection: true,
      type: "STOCK_OUT",
      components: [
        //<ProductSelection />,
        //<TransactionOverview />,
        //<TransactionResult />,
      ],
      title: "Stock Out",
      description: "Remove products from your inventory",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4  md:grid-cols-2">
      {TRANSACTION_TYPE.filter((r) => r.selection).map((t, i) => {
        const outNotAvailable = stocks.length === 0;

        return (
          <button
            key={i}
            className="p-4 rounded border block h-full disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={
              outNotAvailable &&
              (t.type === "TRANSFER_OUT" || t.type === "STOCK_OUT")
            }
            data-type={t.type}
            onClick={(e) => {
              setTransactionType(e.currentTarget.dataset.type);
              nextPage();
            }}
          >
            <div className="font-semibold text-lg">{t.title}</div>
            <div className="">{t.description}</div>
          </button>
        );
      })}
    </div>
  );
};

const TransactionOverview = ({
  transactionProducts,
  nextPage,
  previousPage,
  transactionStatus,
  setTransactionStatus,
  transactionType,
  setTransactions,
  stocks,
  setStocks,
}) => {
  if (transactionProducts.length === 0) {
    previousPage();
  }

  const [stats, setStats] = useState({ dn: 0, srp: 0, uv: 0, pv: 0 });
  useEffect(() => {
    setStats(
      transactionProducts.reduce(
        (a, b) => ({
          dn: a.dn + (b.dn?.price || 0) * b.count,
          srp: a.srp + (b.srp?.price || b.dn?.price || 0) * b.count,
          uv: a.uv + (b.dn?.uv || 0) * b.count,
          pv: a.pv + (b.dn?.pv || 0) * b.count,
        }),
        { dn: 0, srp: 0, uv: 0, pv: 0 }
      )
    );
  }, [transactionStatus.isDn]);

  return (
    <div>
      <div className="grid grid-cols-4 md:grid-cols-6 gap-4 max-h-48 overflow-y-scroll my-4">
        {transactionProducts.map((p) => (
          <div key={p.product_no} className="relative">
            <img src={p.images[0]} alt={p.name} />
            <div className="absolute flex justify-end items-end top-0 left-0 w-full h-full bg-black bg-opacity-10 ">
              <div className="flex right-0 bottom-0 rounded-tl-lg text-xs px-2 py-1  bg-indigo-500 text-white">
                x{p.count}
              </div>
            </div>
          </div>
        ))}
      </div>
      <label
        htmlFor="useDn"
        className="flex flex-row items-center hover:cursor-pointer"
      >
        Use Member Price?
        {/*<div
          className={`ml-2 border rounded h-4 w-4 flex items-center justify-center ${
            transactionStatus.isDn
              ? "bg-indigo-500 border-indigo-500"
              : "border-gray-300"
          }`}
        >
          {transactionStatus.isDn && (
            <AiOutlineCheck
              className={`text-xs text-white ${
                !transactionStatus.isDn ? "hidden" : ""
              }`}
            />
          )}
        </div>*/}
        <input
          type="checkbox"
          id="useDn"
          checked={transactionStatus.isDn}
          name="use_member"
          onChange={() =>
            setTransactionStatus((p) => ({ ...p, isDn: !p.isDn }))
          }
        />
        <div
          className={`ml-2  border  rounded h-4 w-4 ${
            transactionStatus.isDn
              ? "bg-indigo-500 border-indigo-500"
              : "border-gray-300"
          }`}
        ></div>
      </label>

      {/*<label
        htmlFor="completed"
        className="flex flex-row items-center hover:cursor-pointer"
      >
        Completed?
        <div
          className={`ml-2 border rounded h-4 w-4 flex items-center justify-center ${
            transactionStatus.completed
              ? "bg-indigo-500 border-indigo-500"
              : "border-gray-300"
          }`}
        >
          {transactionStatus.completed && (
            <AiOutlineCheck
              className={`text-xs text-white ${
                !transactionStatus.completed ? "hidden" : ""
              }`}
            />
          )}
        </div>
        <input
          type="checkbox"
          id="completed"
          checked={transactionStatus.completed}
          name="completed"
          onChange={() =>
            setTransactionStatus((s) => ({ ...s, completed: !s.completed }))
          }
        />
        <div
          className={`ml-2  border  rounded h-4 w-4 ${
            transactionStatus.completed
              ? "bg-indigo-500 border-indigo-500"
              : "border-gray-300"
          }`}
        ></div>
      </label>
*/}
      <div className="my-4">
        <div className="flex flex-row justify-between items-center">
          <div className=" text-gray-500 text">UV</div>
          <div className=" text-black text-lg">{`${stats.uv} UV`}</div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className=" text-gray-500 text">PV</div>
          <div className=" text-black text-lg">{`${stats.pv} PV`}</div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className=" text-gray-500 text">
            {transactionStatus.isDn ? "Member Price" : "Retail Price"}
          </div>
          <div className="text-black text-lg">
            {`RM ${transactionStatus.isDn ? stats.dn : stats.srp}`}
          </div>
        </div>
      </div>
      <div className="w-full flex flex-row items-center pt-3 justify-between">
        <button
          className="px-4 py-2 rounded bg-gray-200"
          onClick={() => previousPage()}
        >
          Back
        </button>
        <button
          className="px-4 py-2 rounded bg-indigo-500 text-white"
          onClick={() => {
            const newTransaction = {
              id: v4(),
              type: transactionType,
              items: transactionProducts,
              data: {
                isDn: transactionStatus.isDn,
                ...transactionProducts.reduce(
                  (a, b) => ({
                    uv: a.uv + (b.srp?.uv || 0) * b.count,
                    pv: a.pv + (b.srp?.pv || 0) * b.count,
                    dn: a.dn + (b.dn?.price || 0) * b.count,
                    srp: a.srp + (b.srp?.price || 0) * b.count,
                  }),
                  { uv: 0, pv: 0, dn: 0, srp: 0 }
                ),
              },
              //target:
              //  transactionType === "STOCK_IN"
              //    ? { name: "shaklee", sid: "-" }
              //    : transactionType === "STOCK_OUT"
              //    ? { name: "sales", sid: "-" }
              //    : transactionUser,
              //isCompleted: transactionStatus.completed,
              createdAt: new Date(),
            };
            setTransactions((p) => {
              p.push(newTransaction);
              return p;
            });
            setStocks((s) =>
              transactionProducts.reduce(
                (
                  c,
                  { product_no, count, images, name, tags, dn, srp, pcat }
                ) => {
                  const dataToStore = {
                    product_no,
                    count,
                    images,
                    name,
                    tags,
                    dn,
                    srp,
                    pcat,
                  };
                  const matchItem = stocks.filter(
                    (t) => t.product_no === product_no
                  );
                  const isMatch = matchItem.length > 0;
                  if (isMatch) {
                    if (
                      transactionType === "STOCK_IN" ||
                      transactionType === "TRANSFER_IN"
                    ) {
                      return c.map((e) =>
                        e.product_no === product_no
                          ? { ...e, count: e.count + count }
                          : e
                      );
                    }
                    // This 'else' targets STOCK_OUT & TRANSFER_OUT
                    else {
                      if (matchItem[0].count - count <= 0) {
                        return c.filter((e) => e.product_no !== product_no);
                      } else {
                        return c.map((e) =>
                          e.product_no === product_no
                            ? { ...e, count: e.count - count }
                            : e
                        );
                      }
                    }
                  } else {
                    c.push(dataToStore);
                    return c;
                  }
                },
                s
              )
            );
            nextPage();
          }}
        >
          Create
        </button>
      </div>
    </div>
  );
};

const TransactionResult = ({ setModal }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full my-6">
        <div className="text-3xl">Successful!</div>
        <AiFillCheckCircle className="text-5xl text-green-400 my-6" />
        <div>{`Transaction has been added!`}</div>
      </div>
      <div className="w-full flex flex-row items-center pt-3 justify-center">
        <button
          className="px-4 py-2 rounded bg-gray-200"
          onClick={() => setModal()}
        >
          Close
        </button>
      </div>
    </>
  );
};

const ProductSelection = ({
  nextPage,
  previousPage,
  transactionType,
  stocks,
  storeProducts,
  transactionProducts,
  setTransactionProducts,
}) => {
  const listToFilter =
    transactionType === "STOCK_IN" || transactionType === "TRANSFER_IN"
      ? storeProducts
      : stocks;

  const addProductsToTransaction = (p) => {
    const { product_no } = p;
    const target = transactionProducts.filter(
      (q) => q.product_no === product_no
    )[0];
    if (
      target &&
      target.count ===
        stocks.filter((r) => r.product_no === product_no)[0]?.["count"]
    ) {
      return;
    } else {
      setTransactionProducts((prev) => {
        if (prev.filter((t) => t.product_no === product_no).length > 0) {
          return transactionProducts.map((t) =>
            t.product_no === product_no ? { ...t, count: t.count + 1 } : t
          );
        }
        return [...prev, { ...p, count: 1 }];
      });
    }
  };

  const {
    state: filterState,
    onChange: filterOnChange,
    onKeyDown: filterOnKeyDown,
  } = useSuggestionInput(
    {
      suggestions: listToFilter.map((s) => ({
        ...s,
        suggestionName: s.name,
        suggestionTag: s.tags.join("").toLowerCase(),
      })),
      keys: ["suggestionName", "suggestionTag"],
    },
    addProductsToTransaction
  );

  const [tempHide, setTempHide] = useState(false);
  useEffect(() => {
    setTempHide(false);
  }, [filterState.userInput]);
  return (
    <div>
      <div className="relative flex flex-col ">
        <label className="my-2">Select Products</label>
        <input
          className="mb-4 w-full p-2 rounded border-1 bg-gray-100 h-10"
          type="text"
          placeholder="E.g. Vivix/Omega/promotion "
          value={filterState.userInput}
          onChange={(e) => {
            filterOnChange(e);
          }}
          onKeyDown={(e) => {
            e.stopPropagation();
            filterOnKeyDown(e);
            if (e.key === "Enter") {
              setTempHide(true);
            }
          }}
        />

        {!tempHide &&
          filterState.showSuggestions &&
          filterState.userInput.length > 0 && (
            <div className="absolute top-20 shadow border rounded w-full bg-white z-10 max-h-80 overflow-y-scroll">
              {filterState.filteredSuggestions.slice(0, 8).map((f, i) => (
                <button
                  className={`block w-full p-2 overflow-hidden ${
                    filterState.activeSuggestion === i ? "bg-gray-100" : ""
                  }`}
                  key={i}
                  data-index={i}
                  onClick={(e) => {
                    addProductsToTransaction(
                      filterState.filteredSuggestions[
                        e.currentTarget.dataset.index
                      ]
                    );
                    setTempHide(true);
                  }}
                >
                  <div className="flex flex-row justify-between items-center">
                    <div className="w-16 rounded-full">
                      <img src={f.images[0]} alt={f.name} />
                    </div>
                    <div className="flex-grow">{f.name}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
      </div>
      {transactionProducts.length > 0 && (
        <div className="flex flex-col space-y-3 my-4 max-h-72 overflow-y-scroll">
          {transactionProducts.map((p) => (
            <div
              key={p.product_no}
              className="flex flex-row justify-between items-center"
            >
              <div className="flex items-center">
                <div className="w-12">
                  <img src={p.images[0]} alt={p.name} />
                </div>
                <div className="pl-2">{p.name}</div>
              </div>
              <div className="flex flex-row items-center">
                <button
                  className="rounded bg-indigo-500 text-white w-6 h-6"
                  data-pid={p.product_no}
                  onClick={(e) => {
                    e.stopPropagation();
                    setTransactionProducts((r) =>
                      r
                        .map((q) =>
                          q.product_no === e.target.dataset.pid
                            ? q.count !== 1
                              ? { ...q, count: q.count - 1 }
                              : null
                            : q
                        )
                        .filter((r) => r)
                    );
                  }}
                >
                  -
                </button>
                <div className="w-10 text-center">{p.count}</div>
                <button
                  className="rounded bg-indigo-500 text-white w-6 h-6"
                  data-pid={p.product_no}
                  onClick={(e) => {
                    e.stopPropagation();
                    setTransactionProducts((r) =>
                      r.map((q) => {
                        if (q.product_no === e.target.dataset.pid) {
                          if (
                            // Outgoing Product
                            (transactionType === "TRANSFER_OUT" ||
                              transactionType === "STOCK_OUT") &&
                            q.count ===
                              stocks.filter(
                                (s) => s.product_no === q.product_no
                              )[0]["count"]
                          ) {
                            return q;
                          }
                          return { ...q, count: q.count + 1 };
                        }
                        return q;
                      })
                    );
                  }}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="w-full flex flex-row items-center pt-3 justify-between">
        <button
          className="px-4 py-2 rounded bg-gray-200"
          onClick={() => previousPage()}
        >
          Back
        </button>
        <button
          disabled={transactionProducts.length < 1}
          className="px-4 py-2 rounded bg-indigo-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => {
            if (transactionProducts.length < 1) {
              alert("Please select at least 1 product!");
              return;
            }
            nextPage();
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

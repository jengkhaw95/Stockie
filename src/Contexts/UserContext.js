import React, { useEffect, useState } from "react";
import useModal from "../Hooks/useModal";
import useStorage from "../Hooks/useStorage";

export const userContext = React.createContext();

export default function UserContext({ children }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useStorage("data");
  const [user, setUser] = useStorage("user");
  const [search, setSearch] = useState("");
  /*
  -record[]

   */
  const [storeProducts, setStoreProducts] = useStorage("products", []);
  const [favouriteProducts, setFavouriteProducts] = useStorage(
    "favourites",
    []
  );
  const [transactions, setTransactions] = useStorage("transactions", []);
  const [stocks, setStocks] = useStorage("stocks", []);

  const [isVisible, setModal, content] = useModal();

  const checkProduct = async () => {
    let pd = await fetch("https://jengk-api.vercel.app/api/shaklee/products")
      .then((r) => r.json())
      .then((d) => d);
    if (Date.now() - pd.lastValidation > 60 * 1000 * 60 * 2) {
      //2 hours
      const ck = await fetch("https://jengk-api.vercel.app/api/shaklee")
        .then((r) => r.json())
        .then((d) => d);
      if (ck.ok) {
        pd = await fetch("https://jengk-api.vercel.app/api/shaklee/products")
          .then((r) => r.json())
          .then((d) => d);
      }
    }
    setStoreProducts(pd.data);
    setData((prev) => ({ ...prev, lastUpdate: pd.lastValidation }));
    setLoading(false);
  };

  const fetchProduct = async () => {
    await fetch("https://shaklee-api.herokuapp.com/products/all")
      .then((r) => r.json())
      .then((d) => {
        if (d.ok) {
          setStoreProducts(d.data);
          setData((prev) => ({ ...prev, lastUpdate: d.lastUpdate }));
        }
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };

  const toggleTransactionStatus = (tid) => {
    setTransactions(
      transactions.map((q) => {
        if (q.id === tid) {
          return { ...q, isCompleted: !q.isCompleted };
        }
        return q;
      })
    );
  };

  const toggleFavourite = (pid) => {
    setFavouriteProducts((f) => {
      if (f.includes(pid)) {
        return f.filter((g) => g !== pid);
      }
      return [...f, pid];
    });
  };

  useEffect(() => {
    const d = new Date();
    checkProduct();
    //if (
    //  !storeProducts.data ||
    //  d.toDateString() !== new Date(data.lastUpdate).toDateString()
    //) {
    //  fetchProduct();
    //} else {
    //  setLoading(false);
    //}
  }, []);

  return (
    <userContext.Provider
      value={{
        data,
        setData,
        loading,
        user,
        setUser,
        search,
        setSearch,
        isVisible,
        setModal,
        content,
        storeProducts,
        setStoreProducts,
        favouriteProducts,
        setFavouriteProducts,
        toggleFavourite,
        transactions,
        setTransactions,
        toggleTransactionStatus,
        stocks,
        setStocks,
      }}
    >
      {children}
    </userContext.Provider>
  );
}

import React, { useContext } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { userContext } from "../Contexts/UserContext";

export default function FavouriteButton({
  parentClassName,
  prod_no,
  size,
  isFav,
}) {
  const { toggleFavourite } = useContext(userContext);
  const handleFavourite = (e) => {
    const prodno = e.currentTarget.dataset.prodno;
    //e.target.dataset.prodno ||
    //e.target.parentNode.dataset.prodno ||
    //e.target.parentNode.parentNode.dataset.prodno;
    //e.stopPropagation();
    //console.log(e.currentTarget.dataset.prodno);
    //setFavouriteProducts((f) => {
    //  if (f.includes(prodno)) {
    //    return f.filter((g) => g !== prodno);
    //  }
    //  f.push(prodno);
    //  return f;

    //let d = f.data || [];
    //if (d.includes(prodno)) {
    //  return { data: d.filter((n) => n !== prodno) };
    //} else {
    //  d.push(prodno);
    //  return { data: d };
    //}
    //});
  };
  return (
    <div
      className={`flex hover:cursor-pointer ${parentClassName || ""}`}
      data-prodno={prod_no}
      onClick={(e) => {
        e.stopPropagation();
        toggleFavourite(e.currentTarget.dataset.prodno);
      }}
    >
      {isFav ? (
        <AiFillStar size={size} className="text-yellow-300" />
      ) : (
        <AiOutlineStar size={size} className="text-yellow-300" />
      )}
    </div>
  );
}

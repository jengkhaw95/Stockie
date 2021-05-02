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

import React, { useState } from "react";
import clsx from "clsx";
import TotalSearch from "./totalSearch";
import IsRemote from "./isRemote";
import CategorySearch from "./categorySearch";
import { searchCategoryList } from "@/data/categoryList";

const Search = ({ searchList, setSearchList }) => {
  const [isExpend, setIsExpend] = useState(true);
  const [totalValue, setTotalValue] = useState({
    skill: "",
    location: "",
    isRemote: false,
    experience: "",
    keyword: "",
  });

  const onchange = (type, value) =>
    setTotalValue({ ...totalValue, [type]: value });

  const deleteItem = (order) => {
    let real =
      searchList && searchList.filter((item, index) => index !== order);
    setSearchList(order === undefined ? [] : real);
  };

  return (
    <div className="p-2 pb-20">
      <TotalSearch
        searchList={searchList}
        deleteItem={(index) => deleteItem(index)}
      />

      <div className="my-4 flex justify-center">
        {isExpend ? (
          <svg
            viewBox="64 64 896 896"
            focusable="false"
            data-icon="fullscreen-exit"
            width="1.5em"
            height="1.5em"
            fill="currentColor"
            aria-hidden="true"
            className="cursor-pointer"
            onClick={() => setIsExpend(!isExpend)}
          >
            <path d="M391 240.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L200 146.3a8.03 8.03 0 00-11.3 0l-42.4 42.3a8.03 8.03 0 000 11.3L280 333.6l-43.9 43.9a8.01 8.01 0 004.7 13.6L401 410c5.1.6 9.5-3.7 8.9-8.9L391 240.9zm10.1 373.2L240.8 633c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L146.3 824a8.03 8.03 0 000 11.3l42.4 42.3c3.1 3.1 8.2 3.1 11.3 0L333.7 744l43.7 43.7A8.01 8.01 0 00391 783l18.9-160.1c.6-5.1-3.7-9.4-8.8-8.8zm221.8-204.2L783.2 391c6.6-.8 9.4-8.9 4.7-13.6L744 333.6 877.7 200c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.3a8.03 8.03 0 00-11.3 0L690.3 279.9l-43.7-43.7a8.01 8.01 0 00-13.6 4.7L614.1 401c-.6 5.2 3.7 9.5 8.8 8.9zM744 690.4l43.9-43.9a8.01 8.01 0 00-4.7-13.6L623 614c-5.1-.6-9.5 3.7-8.9 8.9L633 783.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L824 877.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L744 690.4z"></path>
          </svg>
        ) : (
          <svg
            viewBox="64 64 896 896"
            focusable="false"
            data-icon="fullscreen"
            width="1.5em"
            height="1.5em"
            fill="currentColor"
            aria-hidden="true"
            className="cursor-pointer"
            onClick={() => setIsExpend(!isExpend)}
          >
            <path d="M290 236.4l43.9-43.9a8.01 8.01 0 00-4.7-13.6L169 160c-5.1-.6-9.5 3.7-8.9 8.9L179 329.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L370 423.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L290 236.4zm352.7 187.3c3.1 3.1 8.2 3.1 11.3 0l133.7-133.6 43.7 43.7a8.01 8.01 0 0013.6-4.7L863.9 169c.6-5.1-3.7-9.5-8.9-8.9L694.8 179c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L600.3 370a8.03 8.03 0 000 11.3l42.4 42.4zM845 694.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L654 600.3a8.03 8.03 0 00-11.3 0l-42.4 42.3a8.03 8.03 0 000 11.3L734 787.6l-43.9 43.9a8.01 8.01 0 004.7 13.6L855 864c5.1.6 9.5-3.7 8.9-8.9L845 694.9zm-463.7-94.6a8.03 8.03 0 00-11.3 0L236.3 733.9l-43.7-43.7a8.01 8.01 0 00-13.6 4.7L160.1 855c-.6 5.1 3.7 9.5 8.9 8.9L329.2 845c6.6-.8 9.4-8.9 4.7-13.6L290 787.6 423.7 654c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.4z"></path>
          </svg>
        )}
      </div>

      <div
        className={clsx(
          isExpend
            ? "mx-auto flex max-w-[968px] items-center justify-between"
            : "invisible mx-auto flex max-w-[968px] items-center justify-between",
        )}
      >
        {searchCategoryList.map((item, index) => (
          <div
            key={index}
            className={clsx("px-4", item.type === "check" ? "inline" : "w-1/5")}
          >
            {item.type === "check" ? (
              <IsRemote
                item={item}
                onchange={(type, value) => onchange(type, value)}
                totalValue={totalValue}
              />
            ) : (
              <CategorySearch
                item={item}
                onchange={(type, value) => onchange(type, value)}
                totalValue={totalValue}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;

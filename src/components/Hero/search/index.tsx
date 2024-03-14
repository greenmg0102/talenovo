import React, { useState } from "react";
import clsx from "clsx";
import TotalSearch from "./totalSearch";
import { Select } from 'antd';

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

  const onchange = (type: any, value: any) =>
    setTotalValue({ ...totalValue, [type]: value });

  const deleteItem = (order: any) => {
    let real =
      searchList && searchList.filter((item: any, index: any) => index !== order);
    setSearchList(order === undefined ? [] : real);
  };

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return (
    <div className="p-2 pb-20">
      <div
        className={clsx(
          isExpend
            ? "mx-auto max-w-[968px]"
            : "invisible mx-auto max-w-[968px]",
        )}
      >
        <TotalSearch
          searchList={searchList}
          deleteItem={(index: any) => deleteItem(index)}
        />
        <p className="text-gray-300"> Search by skill and industry, location, and etc ...</p>

        {/* <div className="flex justify-around">

          <Select
            showSearch
            placeholder="Select a Industry"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={[
              {
                value: 'IT',
                label: 'IT',
              },
              {
                value: 'Medical',
                label: 'Medical',
              },
              {
                value: 'Real estate',
                label: 'Real estate',
              },
            ]}
          />

          <Select
            showSearch
            placeholder="Select a skill"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={[
              {
                value: 'React',
                label: 'Jack',
              },
              {
                value: 'lucy',
                label: 'Lucy',
              },
              {
                value: 'tom',
                label: 'Tom',
              },
            ]}
          />
          <Select
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={[
              {
                value: 'jack',
                label: 'Jack',
              },
              {
                value: 'lucy',
                label: 'Lucy',
              },
              {
                value: 'tom',
                label: 'Tom',
              },
            ]}
          />
          <Select
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={[
              {
                value: 'jack',
                label: 'Jack',
              },
              {
                value: 'lucy',
                label: 'Lucy',
              },
              {
                value: 'tom',
                label: 'Tom',
              },
            ]}
          />
        </div> */}

      </div>
      <div
        className={clsx(
          isExpend
            ? "mx-auto flex max-w-[968px] items-center justify-between"
            : "invisible mx-auto flex max-w-[968px] items-center justify-between",
        )}
      >
        {/* {searchCategoryList.map((item, index) => (
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
        ))} */}
      </div>
    </div>
  );
};

export default Search;

import React, { useState } from 'react';

const ToggleSort = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="flex flex-col sm:flex-row mb-px bg-white px-4 py-4 sm:py-4 gap-y-2 items-center justify-between rounded-t-lg">
      <label htmlFor="toggleSort" className="flex items-center cursor-pointer order-last sm:order-first">
        <div className="relative">
          <input
            type="checkbox"
            id="toggleSort"
            className="sr-only"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <div className="block flex justify-between bg-emerald-700 w-80 sm:w-64 h-7 rounded-md ring ring-emerald-700">
            <span className="flex-1 flex items-center justify-center">Relevant</span>
            <span className="flex-1 flex items-center justify-center">New</span>
          </div>
          <div
            className={`dot absolute left-0 top-0 w-1/2 h-7 bg-emerald-500 rounded-md transition ${
              isChecked ? 'translate-x-full opacity-100' : 'opacity-30'
            }`}
          />
        </div>
      </label>
      <span className="font-semibold">
        985 jobs added in the past 24 hours
      </span>
      <div className="flex h-9 w-80">
        <input
          type="email"
          placeholder="jobalert@example.com"
          className="px-3 w-full rounded-l-md border-gray-300 focus:ring-0"
        />
        <button className="px-6 rounded-r-md border-emerald-700 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 focus:bg-emerald-700 text-white">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default ToggleSort;

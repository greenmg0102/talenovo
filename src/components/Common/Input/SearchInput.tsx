import React, { useState, useRef, useEffect, useCallback } from 'react';
import _ from 'lodash';
import clsx from 'clsx'

const SearchInput = ({ value, title, warningText, warn, type, onchange, list, formatList, pushList, isTtitle }: any) => {

  const inputRef: any = useRef(null);

  const [isLoading, setIsLoading] = useState(false)

  const handleRefChange = useCallback(() => {
    if (inputRef.current && inputRef.current.value === '') {
      onchange(type, "");
      formatList([]);
      setIsLoading(false);
    }
  }, [onchange, formatList, type]);

  useEffect(() => {
    const handleRefChangeCopy = handleRefChange; // Copy the function to a variable
    const inputRefCurrent = inputRef.current; // Copy the ref value to a variable
    inputRefCurrent.addEventListener('input', handleRefChangeCopy);
    return () => {
      inputRefCurrent.removeEventListener('input', handleRefChangeCopy); // Use the variable in the cleanup function
    };
  }, [handleRefChange]);

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      inputRef.current.value = event.target.value;
      onchange(type, "");
      pushList(type, event.target.value)
      formatList([])
      setIsLoading(false)

    }
    // Add your logic for specific key presses here
  };

  const selsctValue = (selectingValue: any) => {
    inputRef.current.value = selectingValue;
    onchange(type, "");
    pushList(type, selectingValue)
    formatList([])
    setIsLoading(false)
  }

  const delayedOnchange = _.debounce((value: any) => {
    setIsLoading(true)
    onchange(type, value);
  }, 1000);

  const handleInputChange = () => {
    delayedOnchange(inputRef.current.value);
  };

  return (
    <div>
      {
        isTtitle === undefined ?
          <p className='mb-2 font-semibold text-[14px]'>{title}</p>
          :
          null
      }

      <div
        className={
          clsx(
            'flex justify-between items-center transition-all rounded-[6px] px-2 border py-1',
            warn[type].length === 0 ? "border-gray-200" : "border-red-500 bg-red-100"
          )
        }
      >
        <input
          ref={inputRef}
          className='w-full bg-transparent focus:outline-none pr-2 text-gray-800'
          onChange={handleInputChange}
          onKeyDown={(e: any) => handleKeyDown(e)}
        />
        {isLoading ?
          <svg viewBox="0 0 1024 1024" focusable="false" data-icon="loading" width="1em" height="1em" fill="currentColor" aria-hidden="true" className='animate-spin'><path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path></svg>
          : null
        }

      </div>
      <div className='relative z-[999]'>
        <div className={clsx(list.length > 0 ? 'absolute bottom-0 transform translate-y-full w-full left-[0px] bg-gray-100 border border-gray-500 rounded-[4px]' : '')}>
          {list.length > 0 ?
            list.map((item: any, index: any) =>
              <p
                key={index}
                className='pb-1 p-1 text-[12px] border border-dashed border-t-0 border-l-0 border-r-0 cursor-pointer rounded-[4px] hover:bg-gray-200 transition-all'
                onClick={() => selsctValue(item['value'])}
              >
                {item[type]}
              </p>
            )
            :
            null
          }
        </div>
      </div>

      <p className={clsx('h-[16px] pt-[4px]', warn[type].length === 0 ? "visible" : 'text-red-500 text-[12px]')}>{warn[type]}</p>
    </div>
  );
};

export default SearchInput;

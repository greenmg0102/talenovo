import React, { useState, useRef, useEffect, useCallback } from 'react';
import _ from 'lodash';
import clsx from 'clsx'

const TagInput = ({ value, title, warningText, warn, type, onchange, list, formatList, pushList }: any) => {

  const inputRef: any = useRef(null);

  const [isLoading, setIsLoading] = useState(false)

  const handleRefChange = useCallback(() => {
    if (inputRef.current && inputRef.current.value === '') {
      onchange(type, "");
      formatList();
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
      pushList(type, [...value[type], event.target.value])
      inputRef.current.value = "";
      onchange(type, "");
      formatList()
      setIsLoading(false)
    }
    // Add your logic for specific key presses here
  };

  const selsctValue = (selectingValue: any) => {
    pushList(type, [...value[type], selectingValue])
    inputRef.current.value = "";
    onchange(type, "");
    formatList()
    setIsLoading(false)
  }

  const delayedOnchange = _.debounce((value: any) => {
    setIsLoading(true)
    onchange(type, value);
  }, 1000);

  const deleteItem = (index: any) => {
    pushList(type, [...value[type].filter((item: any, order: any) => order !== index)])
  }

  const handleInputChange = () => {
    delayedOnchange(inputRef.current.value);
  };

  return (
    <div>
      <p className='mb-2 font-semibold text-[14px]'>{title}</p>
      <div
        className={
          clsx(
            'flex justify-between items-center transition-all rounded-[6px] px-2 border py-1',
            warn[type].length === 0 ? "border-gray-200" : "border-red-500 bg-red-100"
          )
        }
      >
        <div className='w-full flex justify-start items-center'>
          {value[type].map((item: any, index: any) =>
            <div key={index} className='flex justify-start items-center mr-2 border border-dashed rounded-[4px] py-[1px] px-[6px] border'>
              <p className='mr-1 mb-0 text-[14px]'>{item}</p>
              <svg fillRule="evenodd" viewBox="64 64 896 896" focusable="false" data-icon="close-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" onClick={() => deleteItem(index)}><path d="M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm0 76c-205.4 0-372 166.6-372 372s166.6 372 372 372 372-166.6 372-372-166.6-372-372-372zm128.01 198.83c.03 0 .05.01.09.06l45.02 45.01a.2.2 0 01.05.09.12.12 0 010 .07c0 .02-.01.04-.05.08L557.25 512l127.87 127.86a.27.27 0 01.05.06v.02a.12.12 0 010 .07c0 .03-.01.05-.05.09l-45.02 45.02a.2.2 0 01-.09.05.12.12 0 01-.07 0c-.02 0-.04-.01-.08-.05L512 557.25 384.14 685.12c-.04.04-.06.05-.08.05a.12.12 0 01-.07 0c-.03 0-.05-.01-.09-.05l-45.02-45.02a.2.2 0 01-.05-.09.12.12 0 010-.07c0-.02.01-.04.06-.08L466.75 512 338.88 384.14a.27.27 0 01-.05-.06l-.01-.02a.12.12 0 010-.07c0-.03.01-.05.05-.09l45.02-45.02a.2.2 0 01.09-.05.12.12 0 01.07 0c.02 0 .04.01.08.06L512 466.75l127.86-127.86c.04-.05.06-.06.08-.06a.12.12 0 01.07 0z"></path></svg>
            </div>
          )}
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

        {warn[type].length === 0 ? null : <svg viewBox="64 64 896 896" focusable="false" data-icon="info-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" className='text-red-500'><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path></svg>}
      </div>
      <div className='relative z-[9999]'>
        <div className={clsx(list.length > 0 ? 'absolute bottom-0 transform translate-y-full w-full left-[0px] bg-gray-100 border border-gray-500 rounded-[4px]' : '')}>
          {list.length > 0 ?
            list.map((item: any, index: any) =>
              <p
                key={index}
                className='pb-1 p-4 text-[14px] border border-dashed border-t-0 border-l-0 border-r-0 cursor-pointer rounded-[4px] hover:bg-gray-200 transition-all'
                onClick={() => selsctValue(item.tag)}
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
    </div >
  );
};

export default TagInput;

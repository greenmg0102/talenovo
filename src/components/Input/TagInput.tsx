'use client'
import { useState } from 'react'
import clsx from 'clsx'

const TagInput = ({ value, title, warningText, warn, type, onchange }: any) => {

  const [currentValue, setCurrentValue] = useState("")

  const handleKeyDown = (event: any) => {

    if (event.key === 'Enter') {
      // Perform your logic here when the Enter key is pressed
      console.log('Enter key pressed');
      onchange(type, [...value[type], currentValue])
      setCurrentValue("")
    }
  };

  return (
    <div>
      <p className='mb-2'>{title}</p>
      <div
        className={
          clsx(
            'flex justify-between items-center transition-all rounded-[6px] px-2 border py-1',
            warn[type].length === 0 ? "border-gray-200" : "border-red-500 bg-red-100"
          )
        }
      >
        <div className='flex justify-start items-center flex-wrap'>
          {value[type].map((item: any, index: any) =>
            <div key={index} className='flex justify-start items-center mr-2 border border-dashed rounded-[4px] py-[1px] px-[6px]'>
              <p className='mr-1'>{item}</p>
              <svg fill-rule="evenodd" viewBox="64 64 896 896" focusable="false" data-icon="close-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm0 76c-205.4 0-372 166.6-372 372s166.6 372 372 372 372-166.6 372-372-166.6-372-372-372zm128.01 198.83c.03 0 .05.01.09.06l45.02 45.01a.2.2 0 01.05.09.12.12 0 010 .07c0 .02-.01.04-.05.08L557.25 512l127.87 127.86a.27.27 0 01.05.06v.02a.12.12 0 010 .07c0 .03-.01.05-.05.09l-45.02 45.02a.2.2 0 01-.09.05.12.12 0 01-.07 0c-.02 0-.04-.01-.08-.05L512 557.25 384.14 685.12c-.04.04-.06.05-.08.05a.12.12 0 01-.07 0c-.03 0-.05-.01-.09-.05l-45.02-45.02a.2.2 0 01-.05-.09.12.12 0 010-.07c0-.02.01-.04.06-.08L466.75 512 338.88 384.14a.27.27 0 01-.05-.06l-.01-.02a.12.12 0 010-.07c0-.03.01-.05.05-.09l45.02-45.02a.2.2 0 01.09-.05.12.12 0 01.07 0c.02 0 .04.01.08.06L512 466.75l127.86-127.86c.04-.05.06-.06.08-.06a.12.12 0 01.07 0z"></path></svg>
            </div>
          )}
          <input
            value={currentValue}
            className='w-[100px] bg-transparent focus:outline-none pr-2 text-gray-800'
            onChange={(e: any) => setCurrentValue(e.target.value)}
            onKeyDown={(event) => handleKeyDown(event)}
          />
        </div>

        {warn[type].length === 0 ? null : <svg viewBox="64 64 896 896" focusable="false" data-icon="info-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" className='text-red-500'><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path></svg>}
      </div>
      {warn[type].length === 0 ? null : <p className='text-red-500'>{warningText}</p>}
    </div >
  );
};

export default TagInput;

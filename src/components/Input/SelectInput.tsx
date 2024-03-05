import clsx from 'clsx'

const SelectInput = ({ value, title, warningText, warn, type, list, onchange }: any) => {

  return (
    <div>
      <p className='mb-2'>{title}</p>
      <div
        className={
          clsx(
            'relative flex justify-between items-center transition-all rounded-[0px] px-2 border py-1',
            warn[type].length === 0 ? "border-gray-200" : "border-red-500 bg-red-100"
          )
        }
      >
        <select
          value={value[type]}
          className='w-full bg-transparent focus:outline-none text-gray-800'
          onChange={(e: any) => onchange(type, e.target.value)}
        >
          <option value="" disabled>Choose a {title}</option>
          {list.map((item: any, index: any) =>
            <option key={index} value={item._id}>{item.title}</option>
          )}
        </select>
        {warn[type].length === 0 ? null : <svg viewBox="64 64 896 896" focusable="false" data-icon="info-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" className='text-red-500'><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path></svg>}
      </div>
      {warn[type].length === 0 ? null : <p className='text-red-500'>{warningText}</p>}
    </div >
  );
};

export default SelectInput;

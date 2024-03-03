
import clsx from 'clsx'

const NextPrevious = ({ category, setCategory }: any) => {

  return (
    <div className="flex justify-between items-center mt-6 pt-6 border border-dashed border-t-[1px] border-l-0 border-r-0 border-b-0">

      <button
        type="button"
        className={clsx(category === 0 ? 'invisible' : "btn btn-warning flex items-center bg-blue-500 rounded-[6px] text-gray-100 py-[4px] px-[18px] transition-all hover:shadow-lg")}
        onClick={() => setCategory(category - 1)}
      >
        <svg viewBox="0 0 1024 1024" focusable="false" data-icon="swap-left" width="1em" height="1em" fill="currentColor" aria-hidden="true" className="mr-1"><path d="M872 572H266.8l144.3-183c4.1-5.2.4-13-6.3-13H340c-9.8 0-19.1 4.5-25.1 12.2l-164 208c-16.5 21-1.6 51.8 25.1 51.8h696c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path></svg>
        Previous
      </button>

      <button
        type="button"
        className={clsx(category === 3 ? 'invisible' : "btn btn-warning flex items-center bg-red-500 rounded-[6px] text-gray-100 py-[4px] px-[18px] transition-all hover:shadow-lg")}
        onClick={() => setCategory(category + 1)}
      >
        Next
        <svg viewBox="0 0 1024 1024" focusable="false" data-icon="swap-right" width="1em" height="1em" fill="currentColor" aria-hidden="true" className="ml-1"><path d="M873.1 596.2l-164-208A32 32 0 00684 376h-64.8c-6.7 0-10.4 7.7-6.3 13l144.3 183H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h695.9c26.8 0 41.7-30.8 25.2-51.8z"></path></svg>
      </button>
    </div>
  );
};

export default NextPrevious;

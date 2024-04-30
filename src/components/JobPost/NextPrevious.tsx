
import clsx from 'clsx'

const NextPrevious = ({ category, setCategory, loading }: any) => {

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
        className={clsx(
          "transition-all",
          "btn btn-warning flex items-center rounded-[6px] py-[4px] px-[18px] hover:shadow-lg",
          loading ? "border border-red-500 bg-gray-100 text-red-500" : "bg-red-500 text-gray-100"
        )}
        onClick={() => setCategory(category + 1)}
      >
        {loading ?
          <svg viewBox="0 0 1024 1024" focusable="false" data-icon="loading" width="1em" height="1em" fill="currentColor" aria-hidden="true" className='animate-spin mr-1'><path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path></svg>
          :
          null
        }
        {category === 2 ? "Submit" : "Next"}

        <svg viewBox="0 0 1024 1024" focusable="false" data-icon="swap-right" width="1em" height="1em" fill="currentColor" aria-hidden="true" className="ml-1"><path d="M873.1 596.2l-164-208A32 32 0 00684 376h-64.8c-6.7 0-10.4 7.7-6.3 13l144.3 183H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h695.9c26.8 0 41.7-30.8 25.2-51.8z"></path></svg>
      </button>
    </div>
  );
};

export default NextPrevious;

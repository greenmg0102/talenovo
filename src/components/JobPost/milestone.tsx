import { JobPostingMileston } from '@/data/jobPost'
import clsx from 'clsx'

const Milestone = ({ category }: any) => {


  return (
    <div className="flex justify-between items-center">
      {JobPostingMileston.map((item: any, index: any) =>
        <div
          key={index}
          className='w-[31%]'
        >
          <div className=''>
            <div className={clsx("w-full h-[4px] rounded-[1px] transition-all", category >= index ? "bg-green-500" : "bg-gray-200")} />
            <p className={clsx("transition-all flex items-center mt-2", category >= index ? "text-green-500" : "text-gray-300")}> <svg viewBox="64 64 896 896" focusable="false" data-icon="check-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" className='mr-2'><path d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>{item.title}</p>
          </div>
            <p>{item.content}</p>

        </div>
      )}
    </div>
  );
};

export default Milestone;

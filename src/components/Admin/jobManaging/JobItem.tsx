import clsx from 'clsx'


const JobItem = ({ item, order, changeStatus }: { item: any, order: any, changeStatus: any }) => {

  return (
    <div className="flex justify-between border border-white hover:border-dashed hover:border-gray-200 p-1 my-2">


      <p className="w-[40px]">
        {order + 1}
      </p>
      <div className="w-[calc(100%-40px)] flex justify-between items-center">
        <p className='w-[15%] text-center'>{item.companyName}</p>
        <p className='w-[25%] text-center'>{item.jobTitle}</p>
        <p className='w-[10%] text-center'>{item && item.tag[0]}</p>
        <div className='w-[20%] flex justify-center items-center'>
          {item.location}
          <div className={clsx(item.isRmote ? "bg-green-500 w-[5px] h-[5px] rounded-full ml-1" : "bg-red-500 w-[5px] h-[5px] rounded-full ml-1")} />
        </div>
        <p className='w-[5%] text-center'>{item.minimumPay}$</p>
        <p className='w-[5%] text-center'>{item.maximumPay}$</p>
        <p className='w-[12%] text-center text-[12px]'>2023-03-08</p>
        <div className='w-[13%] flex justify-around text-[12px]'>
          <div
            className="border border-green-500 text-green-500 rounded-[4px] px-1 py-1 cursor-pointer"
            onClick={() => changeStatus(item, 2)}
          >
            Confirm
          </div>
          <div
            className="border border-red-500 text-red-500 rounded-[4px] px-1 py-1 cursor-pointer"
            onClick={() => changeStatus(item, 3)}
          >
            Reject
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobItem;



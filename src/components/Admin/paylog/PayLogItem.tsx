
const PayLogItem = ({
  item
}: {
  item: any
}) => {
  return (
    <div className="flex justify-between border border-white hover:border-dashed hover:border-gray-200 p-1 my-2">
      <p className="w-[40px]">
        {item.No}
      </p>
      <div className="w-[calc(100%-40px)] flex justify-between items-center">
        <p className='w-[15%]'>{item.Name}</p>
        <p className='w-[25%]'>{item.Mail}</p>
        <p className='w-[15%]'>{item.billedData}</p>
        <p className='w-[10%]'>{item.period}</p>
        <p className='w-[10%]'>{item.amount} (us $)</p>
        <p className='w-[15%]'>{item.expire}</p>
        <p className='w-[10%] border border-dashed hover:border-green-800 rounded-[4px] text-center cursor-pointer'>Action</p>
      </div>
    </div>
  );
};

export default PayLogItem;



import clsx from 'clsx'

const OtherJobItem = ({
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
        <p className='w-[10%]'>{item.stack}</p>
        <div className='w-[10%] flex justify-start items-center'>
          {item.type}
          <div className={clsx(item.isRemote? "bg-green-500 w-[5px] h-[5px] rounded-full ml-1": "bg-red-500 w-[5px] h-[5px] rounded-full ml-1")} />
        </div>
        <p className='w-[15%]'>{item.level} (us $)</p>
        <p className='w-[15%]'>{item.position}</p>
        <p className='w-[15%]'>{item.postDate}</p>
      </div>
    </div>
  );
};

export default OtherJobItem;



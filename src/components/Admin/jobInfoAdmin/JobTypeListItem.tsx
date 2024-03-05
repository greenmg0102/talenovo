const JobTypeListItem = ({ index, item }: any) => {

  return (
    <div className="w-full mb-2 flex justify-between p-1 border border-white hover:border-dashed hover:border-gray-200 transition-all">
      <p className="w-[40px]">
        {index + 1}
      </p>
      <div className="w-[calc(100%-40px)] flex justify-between items-center">
        <p className=''>{item.type}</p>
        <p className=''>Action</p>
      </div>
    </div>
  );
};

export default JobTypeListItem;



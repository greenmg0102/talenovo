
const ProductionList = ({
}: {
  }) => {
  return (
    <div className='w-full h-[400px] border rounded-[4px] p-1 mb-4'>
      <p className='text-center mb-2'>Product List</p>
      <div className="flex justify-between bg-gray-200 p-1 rounded-[2px]">
        <p className="w-[40px]">
          No
        </p>
        <div className="w-[calc(100%-40px)] flex justify-between items-center">
          <p className=''>Title</p>
          <p className=''>Price</p>
          <p className=''>Amount</p>
          <p className=''>Other Info</p>
          <p className=''>Action</p>
        </div>
      </div>
    </div>
  );
};

export default ProductionList;



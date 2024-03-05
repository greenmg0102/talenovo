import PayLogItem from '@/components/Admin/paylog/PayLogItem'
import { TempoaryPaylogData } from '@/components/Admin/categoryData'

const ProductionList = ({ index, item }: any) => {
  return (
    <div className="w-full mb-2 flex justify-between p-1">
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

export default ProductionList;



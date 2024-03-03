import PayLogItem from '@/components/Admin/paylog/PayLogItem'
import { TempoaryPaylogData } from '@/components/Admin/categoryData'

const PayLog = ({
}: {
  }) => {
  return (
    <div>
      <div className="flex justify-between bg-gray-200 p-1 rounded-[2px]">
        <p className="w-[40px]">
          No
        </p>
        <div className="w-[calc(100%-40px)] flex justify-between items-center">
          <p className='w-[15%]'>Full Name</p>
          <p className='w-[25%]'>Contact Information</p>
          <p className='w-[15%]'>Billed Date</p>
          <p className='w-[10%]'>Amount</p>
          <p className='w-[10%]'>Period</p>
          <p className='w-[15%]'>Expired Date</p>
          <p className='w-[10%]'>Action</p>
        </div>
      </div>
      {TempoaryPaylogData.map((item: any, index: any) =>
        <PayLogItem
          key={index}
          item={item}
        />
      )}
    </div>
  );
};

export default PayLog;



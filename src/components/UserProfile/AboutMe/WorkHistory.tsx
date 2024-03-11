import { useState } from 'react';
import AddSomeButton from '@/components/Common/Button/AddSomeButton'
import WokhistoryModal from '@/components/UserProfile/AboutMe/WokhistoryModal'

const WorkHistory = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const add = () => {
    setIsModalVisible(!isModalVisible)
  }

  return (
    <div className="mb-2 pb-4 border border-t-0 border-l-0 border-r-0 border-dashed border-gray-300">
      <div className='flex justify-between items-center'>
        <p className="text-[24px] text-blue-500">WorkHistory</p>
        <AddSomeButton text={" work history"} add={add} />
      </div>
      <div className='mt-4 w-full h-[100px] bg-gray-300 rounded-[4px]'></div>
      <div className='mt-4 w-full h-[100px] bg-gray-300 rounded-[4px]'></div>
      <WokhistoryModal
        isModalVisible={isModalVisible}
        setIsModalVisible={(bool: any) => setIsModalVisible(bool)}
      />
    </div>
  );
};

export default WorkHistory;

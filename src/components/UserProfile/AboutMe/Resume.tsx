import { useState } from 'react';
import AddSomeButton from '@/components/Common/Button/AddSomeButton'
import ResumeModal from '@/components/UserProfile/AboutMe/ResumeModal'

const Resume = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const add = () => {
    setIsModalVisible(!isModalVisible)
  }

  return (
    <div className="mb-2 pb-4 border border-t-0 border-l-0 border-r-0 border-dashed border-gray-300">
      <div className='flex justify-between items-center'>
        <p className="text-[24px] text-blue-500">Resume & CV & Attachments</p>
        <AddSomeButton text={" attachments"} add={add} />
      </div>
      <div className='flex justify-start items-start'>
        <div className='mt-4 mr-4 w-[100px] h-[100px] bg-gray-300 rounded-[4px]'></div>
        <div className='mt-4 mr-4 w-[100px] h-[100px] bg-gray-300 rounded-[4px]'></div>
      </div>
      <ResumeModal
        isModalVisible={isModalVisible}
        setIsModalVisible={(bool: any) => setIsModalVisible(bool)}
      />
    </div>
  );
};

export default Resume;

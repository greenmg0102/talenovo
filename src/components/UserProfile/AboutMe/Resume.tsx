import AddSomeButton from '@/components/Button/AddSomeButton'

const Resume = () => {
  return (
    <div className="pb-4">
      <div className='flex justify-between items-center'>
        <p className="text-[24px] text-blue-500">Resume & CV & Attachments</p>
        <AddSomeButton text={" attachments"} />
      </div>
      <div className='mt-4 w-[100px] h-[100px] bg-gray-300 rounded-[4px]'></div>
    </div>
  );
};

export default Resume;

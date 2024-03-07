import EditButton from '@/components/Button/EditButton'


const UserInitialInfo = () => {
  return (
    <div className="relative">
      <EditButton />
      <p className='text-center py-6 text-[32px]'>User Initial Information</p>

      <div className='flex justify-between items-center py-8 border border-dashed border-r-0 border-l-0'>
        <div className='w-1/3'>
          <p className='text-center'>Phone Number</p>
          <p className='text-center text-blue-500'>+1 999 999 9999</p>
        </div>
         <div className='w-1/3'>
          <p className='text-center'>Lives in</p>
          <p className='text-center text-blue-500'>Florida, United Stated</p>
        </div>
         <div className='w-1/3'>
          <p className='text-center'>Gender</p>
          <p className='text-center text-blue-500'>Male</p>
        </div>
      </div>

      <div className='flex justify-between items-center pt-8'>
         <div className='w-1/3'>
          <p className='text-center'>Job applied</p>
          <p className='text-center text-[32px] text-blue-500'>39</p>
        </div>
         <div className='w-1/3'>
          <p className='text-center'>JOb saved</p>
          <p className='text-center text-[32px] text-blue-500'>12</p>
        </div>
         <div className='w-1/3'>
          <p className='text-center'>Profile views</p>
          <p className='text-center text-[32px] text-blue-500'>23</p>
        </div>
      </div>
    </div>
  );
};

export default UserInitialInfo;

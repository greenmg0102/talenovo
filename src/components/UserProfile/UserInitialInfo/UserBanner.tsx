import EditButton from '@/components/Button/EditButton'

const UserBanner = () => {
  return (
    <div className="relative p-2 px-4">
      <EditButton />
      <div className="flex justify-center py-4">
        <div className="w-[100px] h-[100px] rounded-full border-gray-200 border-[3px] flex justify-center items-center">
          avatar
        </div>
      </div>
      <p className="text-center mb-6">Galen Bowles</p>
      <p className="text-[12px]">Mail address</p>
      <p className="mb-6">greenmeansg0102@outlook.com</p>
      <p className="text-[12px]">Profile link</p>
      <p className="mb-6">https://www.linkedin.com/in/galen-bowles-21bbb47a/</p>
      <p className="text-[12px]">Profile Level</p>
      <p className="">Premium</p>
    </div>
  );
};

export default UserBanner;

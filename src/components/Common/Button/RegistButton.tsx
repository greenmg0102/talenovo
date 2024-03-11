
const RegistButton = ({ title, regist }: any) => {

  return (
    <div
      className='py-1 px-2 border rounded-[4px] bg-blue-500 hover:bg-blue-700 transition-all text-gray-100 cursor-pointer'
      onClick={regist}
    >
      {title}
    </div >
  );
};

export default RegistButton;

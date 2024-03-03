import Image from 'next/image';

const UserAdminItem = ({
  item,
  order
}: {
  item: any,
  order: any
}) => {
  return (
    <div className="flex justify-between border border-white hover:border-dashed hover:border-gray-200 p-1 my-2">
      <p className="w-[20px] text-[14px]">
        {order + 1}
      </p>
      <div className="w-[calc(100%-40px)] flex justify-between items-center">
        <div className='w-[20%] flex jsutify-start items-center text-[14px]'>
          {item.imageUrl &&
            <Image
              src={item.imageUrl}
              alt="Avatar"
              width={30}
              height={30}
              className='rounded-full mr-1'
            />
          }
          {item.name}
        </div>
        <div className='w-[30%]'>
          {
            item.emailList &&
            item.emailList.map((each: any) =>
              <p key={each.id} className='text-[14px]'>{each.emailAddress}</p>
            )
          }
        </div>

        <div className='w-[20%]'>
          {
            item.phoneNumbers &&
            item.phoneNumbers.map((each: any) =>
              <p key={each.id} className='text-[14px]'>{each.phoneNumber}</p>
            )
          }
        </div>
        <p className='w-[5%] text-[14px]'>{item.role ? "" : "user"}</p>
        <p className='w-[15%]  text-[14px]'>
          {
           new Date(item.lastSignInAt).toLocaleDateString('en-GB') 
          }
        </p>
        <p className='w-[10%] border border-dashed hover:border-green-800 rounded-[4px] text-center cursor-pointer'>Action</p>
      </div>
    </div>
  );
};

export default UserAdminItem;



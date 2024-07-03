'use client'

import { useState, useEffect } from 'react';
import UserAdminItem from '@/components/Admin/userAdmin/UserAdminItem'


const UserAdmin = () => {

  const [userList, setUserList] = useState([])

  useEffect(() => {

    async function fetchData() {
      try {
        const res:any = await fetch(`http://localhost:3000/api/admin/user-admin`);
        const data:any = await res.json();

        if (data.users && Array.isArray(data.users)) {
          let result = data.users.map((item: any) => ({
            id: item.id,
            name: item.firstName + item.lastName,
            imageUrl: item.imageUrl,
            emailList: item.emailAddresses,
            phoneNumbers: item.phoneNumbers,
            lastSignInAt: item.lastSignInAt
          }));

          setUserList(result);

        } else {
          console.error('Received data is not an array:', data);
        }
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-between bg-gray-200 p-1 rounded-[2px]">
        <p className="w-[20px]">
          No
        </p>
        <div className="w-[calc(100%-40px)] flex justify-between items-center">
          <p className='w-[20%]'>Full Name</p>
          <p className='w-[30%]'>Contact Information</p>
          <p className='w-[20%]'>Phone Number</p>
          <p className='w-[5%]'>Role</p>
          <p className='w-[15%]'>Last Joined</p>
          <p className='w-[10%]'>Action</p>
        </div>
      </div>

      {userList.map((item: any, index: any) =>
        <UserAdminItem
          key={index}
          order={index}
          item={item}
        />
      )}
    </div>
  );
};

export default UserAdmin;



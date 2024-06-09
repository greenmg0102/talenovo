'use client'

import { useState, useEffect } from 'react';
import RoleAdminItem from '@/components/Admin/userAdmin/RoleAdminItem'
import SearchInput from '@/components/Common/Input/SearchInput'
import RegistButton from '@/components/Common/Button/RegistButton'
import { userSearch, adminSearch, addAdmin } from '@/store/action/admin/role'

const RoleAdmin = () => {

  const [userList, setUserList] = useState([])
  const [value, setValue] = useState({ firstName: "" })
  const [warn, setWarn] = useState({ firstName: "" })
  const [matchedUsers, setMatchedUsers] = useState([])
  const [searchHint, setSearchHint] = useState({
    firstName: ""
  })

  const updateList = (order: any, updateValue: any) => {
    let real:any = []
    if (updateValue === null) real = userList.filter((item: any, index: any) => index !== order)
    else {
      userList.forEach((item: any, index: any) => {
        if (index === order) real.push({ ...item, newAdmin: updateValue })
        else real.push(item)
      })
    }
    setUserList(real)
  }

  useEffect(() => {
    async function locationFetchData(hint: any) {
      const data = { userHint: hint }
      let reslutJobLocation = await userSearch(data)
      setMatchedUsers(reslutJobLocation.users)
    }
    if (searchHint.firstName !== "") {
      locationFetchData(searchHint.firstName)
    }
  }, [searchHint])

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await adminSearch();
        let result = res.map((item: any) => ({
          id: item.id,
          name: item.newAdmin
        }));
        setUserList(result);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  const addAdminRegist = async () => {
    if (value.firstName !== "") {
      let res = await addAdmin({ newAdmin: value.firstName })
      let result = res.map((item: any) => ({
        id: item.id,
        name: item.newAdmin
      }));
      setUserList(result);
    }
  }

  return (
    <div>
      <div className='flex justify-start items-end mb-4'>
        <SearchInput
          value={value}
          type={'firstName'}
          warn={warn}
          title={"Admin *"}
          list={matchedUsers}
          formatList={() => setMatchedUsers([])}
          pushList={(type: any, eachvalue: any) => setValue({ ...value, [type]: eachvalue })}
          onchange={(type: any, eachvalue: any) => setSearchHint({ ...searchHint, [type]: eachvalue })}
        />

        <RegistButton
          title={"Regist as Admin"}
          regist={addAdminRegist}
        />
      </div>

      <div className="flex justify-between bg-gray-200 p-1 rounded-[2px]">
        <p className="w-[20px]">
          No
        </p>
        <div className="w-[calc(100%-40px)] flex justify-between items-center">
          <p className='w-[20%]'>Name</p>
          <p className='w-[10%]'>Action</p>
        </div>
      </div>

      {userList.map((item: any, index: any) =>
        <RoleAdminItem
          key={index}
          order={index}
          item={item}
          setTyepList={(order: any, updateValue: any) => updateList(order, updateValue)}
        />
      )}
    </div>
  );
};

export default RoleAdmin;



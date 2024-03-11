'use client'
import { useState, useEffect } from 'react';
import TestInput from '@/components/Common/Input/TextInput'
import RegistButton from '@/components/Common/Button/RegistButton'
import { jobTypeGet, jobTypePost } from '@/store/action/admin/jobInfo/jobType'
import JobTypeListItem from '@/components/Admin/jobInfoAdmin/JobTypeListItem'

const JobTypeList = () => {

  const [value, setValue] = useState({ type: "" })
  const [warn, setWarn] = useState({ type: "" })

  const [tyepList, setTyepList] = useState([])

  useEffect(() => {
    async function fetchData() {
      let result = await jobTypeGet()
      setTyepList(result)
    }
    fetchData()
  }, [])

  const regist = async () => {
    if (value.type.length === 0) {
      console.log("regist error");
    } else {
      let result = await jobTypePost(value)
      setTyepList(result)
      setValue({ ...value, type: "" })
    }
  }

  const updateList = (order: any, updateValue: any) => {
    let real = []
    if (updateValue === null) real = tyepList.filter((item: any, index: any) => index !== order)
    else {
      tyepList.forEach((item: any, index: any) => {
        if (index === order) real.push({ ...item, type: updateValue })
        else real.push(item)
      })
    }
    setTyepList(real)
  }

  return (
    <div className='w-1/2 h-[400px] border rounded-[4px] p-1 mb-4'>
      <p className='text-center mb-2'>Job Type</p>
      <div className="flex justify-between items-end mb-2">
        <TestInput
          value={value}
          type={'type'}
          warn={warn}
          title={"Job Type *"}
          warningText={"The name field is required."}
          onchange={(type: any, eachvalue: any) => setValue({ ...value, [type]: eachvalue })}
        />
        <div className='ml-2'>
          <RegistButton
            title={"Regist"}
            regist={regist}
          />
        </div>
      </div>
      <div className="flex justify-between bg-gray-200 p-1 rounded-[2px]">
        <p className="w-[40px]">
          No
        </p>
        <div className="w-[calc(100%-40px)] flex justify-between items-center">
          <p className=''>Type</p>
          <p className=''>Action</p>
        </div>
      </div>
      {tyepList.map((item: any, index: any) =>
        <JobTypeListItem
          key={index}
          index={index}
          item={item}
          setTyepList={(order: any, updateValue: any) => updateList(order, updateValue)}
        />
      )}
    </div>
  );
};

export default JobTypeList;



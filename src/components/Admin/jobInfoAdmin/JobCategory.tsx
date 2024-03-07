
'use client'
import { useState, useEffect } from 'react';
import TestInput from '@/components/Input/TextInput'
import RegistButton from '@/components/Button/RegistButton'
import { jobCategoryGet, jobCategoryPost } from '@/store/action/admin/jobInfo/jobCategory'
import JobCategoryItem from '@/components/Admin/jobInfoAdmin/JobCategoryItem'

const JobCategoryList = () => {

  const [value, setValue] = useState({ category: "" })
  const [warn, setWarn] = useState({ category: "" })

  const [categoryList, setCategoryList] = useState([])

  useEffect(() => {
    async function fetchData() {
      let result = await jobCategoryGet()
      setCategoryList(result)
    }
    fetchData()
  }, [])

  const regist = async () => {
    if (value.category.length === 0) {
      console.log("regist error");
    } else {
      let result = await jobCategoryPost(value)
      setCategoryList(result)
      setValue({ ...value, category: "" })
    }
  }

  return (
    <div className='w-1/2 h-[400px] border rounded-[4px] p-1 mb-4'>
      <p className='text-center mb-2'>Job Category</p>
      <div className="flex justify-between items-end mb-2">
        <TestInput
          value={value}
          type={'category'}
          warn={warn}
          title={"Job category *"}
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
          <p className=''>Category</p>
          <p className=''>Action</p>
        </div>
      </div>
      {categoryList.map((item: any, index: any) =>
        <JobCategoryItem
          key={index}
          index={index}
          item={item}
        />
      )}
    </div>
  );
};

export default JobCategoryList;



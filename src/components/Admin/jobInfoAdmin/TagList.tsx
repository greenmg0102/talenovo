'use client'
import { useState, useEffect } from 'react';
import TestInput from '@/components/Input/TextInput'
import RegistButton from '@/components/Button/RegistButton'
import { jobTagGet, jobTagPost } from '@/store/action/admin/jobInfo/jobTag'
import TagItem from '@/components/Admin/jobInfoAdmin/TagItem'

const TagList = () => {

  const [value, setValue] = useState({ tag: "" })
  const [warn, setWarn] = useState({ tag: "" })

  const [tagList, setTagList] = useState([])

  useEffect(() => {
    async function fetchData() {
      let result = await jobTagGet()
      setTagList(result)
    }
    fetchData()
  }, [])

  const regist = async () => {
    if (value.tag.length === 0) {
      console.log("regist error");
    } else {
      let result = await jobTagPost(value)
      setTagList(result)
      setValue({ ...value, tag: "" })
    }
  }

  return (
    <div className='w-1/2 h-[400px] border rounded-[4px] p-1 mb-4'>
      <p className='text-center mb-2'>Job tag</p>
      <div className="flex justify-between items-end mb-2">
        <TestInput
          value={value}
          type={'tag'}
          warn={warn}
          title={"Tag *"}
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
          <p className=''>Tag</p>
          <p className=''>Action</p>
        </div>
      </div>
      {tagList.map((item: any, index: any) =>
        <TagItem
          key={index}
          index={index}
          item={item}
        />
      )}
    </div>
  );
};

export default TagList;



'use client'
import { useState } from "react";
import { jobTypeDelete, jobTypePut } from '@/store/action/admin/jobInfo/jobType'

const JobTypeListItem = ({ index, item, setTyepList }: any) => {

  const [value, setValue] = useState("")
  const [active, setActive] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  const changeItem = () => {
    setActive(!active)
    setValue(item.type)
  }

  const deleteItem = async (id: any) => {
    setActive(!active)
    let result = await jobTypeDelete({ id: id })
    if (result.result) {
      setTyepList(index, null)
    } else {
      setIsVisible(false)
    }
  }

  const saveItem = async (id: any) => {
    setActive(!active)
    let result = await jobTypePut({ id: id, type: value })
    if (result.result) {
      setTyepList(index, value)
    } else {
      setIsVisible(false)
    }
  }

  if (!isVisible) {
    return null; // Return null when isVisible is false
  }

  return (
    <div className="w-full mb-2 flex justify-between items-center p-1 border border-white hover:border-dashed hover:border-gray-200 transition-all">
      <p className="w-[40px]">
        {index + 1}
      </p>
      <div className="w-[calc(100%-40px)] flex justify-between items-center">
        {active ?
          <input type='text' value={value} onChange={(e: any) => setValue(e.target.value)} className="border border-gray-300" />
          :
          <p className=''>{item.type}</p>
        }

        {active ?
          <div className="flex justify-start items-center">
            <div
              className="text-[14px] border border-red-500 text-red-500 rounded-[4px] px-3 py-1 mr-1"
              onClick={() => deleteItem(item._id)}
            >
              Delete
            </div>
            <div
              className="text-[14px] border border-blue-500 text-blue-500 rounded-[4px] px-3 py-1"
              onClick={() => saveItem(item._id)}
            >
              Save
            </div>
          </div>
          :
          <div
            className="text-[14px] border border-green-500 text-green-500 rounded-[4px] px-3 py-1"
            onClick={() => changeItem()}
          >
            Change
          </div>
        }
      </div>
    </div>
  )
};

export default JobTypeListItem;
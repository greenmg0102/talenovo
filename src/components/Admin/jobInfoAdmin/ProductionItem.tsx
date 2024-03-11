'use client'
import { useState } from "react";
// import { jobTypeDelete, jobTypePut } from '@/store/action/admin/jobInfo/jobType'


const ProductionList = ({ index, item }: any) => {

  const [active, setActive] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  const changeItem = () => {
    setActive(!active)
  }

  const deleteItem = async (id: any) => {
    // setActive(!active)
    // let result = await jobTypeDelete({ id: id })
    // if (result.result) {
    //   setTyepList(index, null)
    // } else {
    //   setIsVisible(false)
    // }
  }

  return (
    <div className="w-full mb-2 flex justify-between p-1 border border-white hover:border-dashed hover:border-gray-200 transition-all">
      <p className="w-[40px]">
        {index + 1}
      </p>
      <div className="w-[calc(100%-40px)] flex justify-between items-center">
        <p className='w-[30%]'>{item.title}</p>
        <p className='w-[100px]'>{item.price}</p>
        <p className='w-[100px]'>{item.amount}</p>
        <p className='w-full'></p>
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
            // onClick={() => saveItem(item._id)}
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
  );
};

export default ProductionList;



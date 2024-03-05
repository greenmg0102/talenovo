'use client'
import { useState, useEffect } from 'react';
import TestInput from '@/components/Input/TextInput'
import RegistButton from '@/components/Button/RegistButton'
import { jobProductionGet, jobProductionPost } from '@/store/action/admin/jobInfo/jobProduction'
import ProductionItem from '@/components/Admin/jobInfoAdmin/ProductionItem'

const ProductionList = () => {

  const [value, setValue] = useState({ title: "", price: "", amount: "" })
  const [warn, setWarn] = useState({ title: "", price: "", amount: "" })

  const [productionList, setProductionList] = useState([])

  useEffect(() => {
    async function fetchData() {
      let result = await jobProductionGet()
      setProductionList(result)
    }
    fetchData()
  }, [])

  const regist = async () => {
    if (value.title.length === 0 && value.price.length === 0 && value.amount.length === 0) {
      console.log("regist error");
    } else {
      let result = await jobProductionPost(value)
      setProductionList(result)
      setValue({ ...value, title: "", price: "", amount: "" })
    }
  }

  return (
    <div className='w-full h-[400px] border rounded-[4px] p-1 mb-4'>
      <p className='text-center mb-2'>Product List</p>

      <div className="flex justify-between items-end mb-2">
        <TestInput
          value={value}
          type={'title'}
          warn={warn}
          title={"Productoin Title *"}
          warningText={"The name field is required."}
          onchange={(type: any, eachvalue: any) => setValue({ ...value, [type]: eachvalue })}
        />
        <TestInput
          value={value}
          type={'price'}
          warn={warn}
          title={"Productoin Price *"}
          warningText={"The name field is required."}
          onchange={(type: any, eachvalue: any) => setValue({ ...value, [type]: eachvalue })}
        />
        <TestInput
          value={value}
          type={'amount'}
          warn={warn}
          title={"Productoin Amount *"}
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
          <p className=''>Title</p>
          <p className=''>Price</p>
          <p className=''>Amount</p>
          <p className=''>Other Info</p>
          <p className=''>Action</p>
        </div>
      </div>

      {productionList.map((item: any, index: any) =>
        <ProductionItem
          key={index}
          index={index}
          item={item}
        />
      )}
    </div>
  );
};

export default ProductionList;



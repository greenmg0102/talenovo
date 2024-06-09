'use client'
import { useState, useEffect } from 'react';
import TestInput from '@/components/Common/Input/TextInput'
import RegistButton from '@/components/Common/Button/RegistButton'
import { currencyTypeGet, currencyTypePost } from '@/store/action/admin/jobInfo/currencyType'
import CurrencyTypeItem from '@/components/Admin/jobInfoAdmin/CurrencyTypeItem'

const CurrencyType = () => {

  const [value, setValue] = useState({ currencyType: "" })
  const [warn, setWarn] = useState({ currencyType: "" })

  const [currencyTypeList, setCurrencyTypeList] = useState([])

  useEffect(() => {
    async function fetchData() {
      let result = await currencyTypeGet()
      setCurrencyTypeList(result)
    }
    fetchData()
  }, [])

  const regist = async () => {
    if (value.currencyType.length === 0) {
      console.log("regist error");
    } else {
      let result = await currencyTypePost(value)
      setCurrencyTypeList(result)
      setValue({ ...value, currencyType: "" })
    }
  }

  const updateList = (order: any, updateValue: any) => {
    let real:any = []
    if (updateValue === null) real = currencyTypeList.filter((item: any, index: any) => index !== order)
    else {
      currencyTypeList.forEach((item: any, index: any) => {
        if (index === order) real.push({ ...item, currencyType: updateValue })
        else real.push(item)
      })
    }
    setCurrencyTypeList(real)
  }

  return (
    <div className='w-1/2 h-[400px] border rounded-[4px] p-1 mb-4'>
      <p className='text-center mb-2'>Payment Period</p>
      <div className="flex justify-between items-end mb-2">
        <TestInput
          value={value}
          type={'currencyType'}
          warn={warn}
          title={"Pay period *"}
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
          <p className=''>Period</p>
          <p className=''>Action</p>
        </div>
      </div>
      {currencyTypeList.map((item: any, index: any) =>
        <CurrencyTypeItem
          key={index}
          index={index}
          item={item}
          setTyepList={(order: any, updateValue: any) => updateList(order, updateValue)}
        />
      )}
    </div>
  );
};

export default CurrencyType;



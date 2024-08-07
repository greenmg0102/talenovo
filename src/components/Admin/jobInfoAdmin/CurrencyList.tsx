'use client'
import { useState, useEffect } from 'react';
import TestInput from '@/components/Common/Input/TextInput'
import RegistButton from '@/components/Common/Button/RegistButton'
import { currencyGet, currencyPost } from '@/store/action/admin/jobInfo/currency'
import CurrencyListItem from '@/components/Admin/jobInfoAdmin/CurrencyListItem'

const CurrencyList = () => {

  const [value, setValue] = useState({ currency: "" })
  const [warn, setWarn] = useState({ currency: "" })

  const [currencyList, SetcurrencyList] = useState([])

  useEffect(() => {
    async function fetchData() {
      let result = await currencyGet()
      SetcurrencyList(result)
    }
    fetchData()
  }, [])

  const regist = async () => {
    if (value.currency.length === 0) {
      console.log("regist error");
    } else {
      let result = await currencyPost(value)
      SetcurrencyList(result)
      setValue({ ...value, currency: "" })
    }
  }

  const updateList = (order: any, updateValue: any) => {
    let real:any = []
    if (updateValue === null) real = currencyList.filter((item: any, index: any) => index !== order)
    else {
      currencyList.forEach((item: any, index: any) => {
        if (index === order) real.push({ ...item, currency: updateValue })
        else real.push(item)
      })
    }
    SetcurrencyList(real)
  }

  return (
    <div className='w-1/2 h-[400px] border rounded-[4px] p-1 mb-4'>
      <p className='text-center mb-2'>Currency</p>
      <div className="flex justify-between items-end mb-2">
        <TestInput
          value={value}
          type={'currency'}
          warn={warn}
          title={"Currency Type *"}
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
          <p className=''>Currency</p>
          <p className=''>Action</p>
        </div>
      </div>
      {currencyList.map((item: any, index: any) =>
        <CurrencyListItem
          key={index}
          index={index}
          item={item}
          setTyepList={(order: any, updateValue: any) => updateList(order, updateValue)}
        />
      )}
    </div>
  );
};

export default CurrencyList;



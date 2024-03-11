'use client'
import { useState, useEffect } from 'react';
import TestInput from '@/components/Common/Input/TextInput'
import RegistButton from '@/components/Common/Button/RegistButton'
import { jobLocationGet, jobLocationPost } from '@/store/action/admin/jobInfo/jobLocation'
import LocationListItem from '@/components/Admin/jobInfoAdmin/LocationListItem'

const LocationList = () => {

  const [value, setValue] = useState({ location: "" })
  const [warn, setWarn] = useState({ location: "" })

  const [locationList, setLocationList] = useState([])

  useEffect(() => {
    async function fetchData() {
      let result = await jobLocationGet()
      setLocationList(result)
    }
    fetchData()
  }, [])

  const updateList = (order: any, updateValue: any) => {
    let real = []
    if (updateValue === null) real = locationList.filter((item: any, index: any) => index !== order)
    else {
      locationList.forEach((item: any, index: any) => {
        if (index === order) real.push({ ...item, location: updateValue })
        else real.push(item)
      })
    }
    setLocationList(real)
  }

  const regist = async () => {
    if (value.location.length === 0) {
      console.log("regist error");
    } else {
      let result = await jobLocationPost(value)
      setLocationList(result)
      setValue({ ...value, location: "" })
    }
  }
  return (
    <div className='w-1/2 h-[400px] border rounded-[4px] p-1 mb-4'>
      <p className='text-center mb-2'>Location</p>
      <div className="flex justify-between items-end mb-2">
        <TestInput
          value={value}
          type={'location'}
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
          <p className=''>Location</p>
          <p className=''>Action</p>
        </div>
      </div>
      {locationList.map((item: any, index: any) =>
        <LocationListItem
          key={index}
          index={index}
          item={item}
          setTyepList={(order: any, updateValue: any) => updateList(order, updateValue)}
        />
      )}
    </div>
  );
};

export default LocationList;



import { EditOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { Button, Input, Space } from 'antd';
const { Search } = Input;

const AddJobTitle = () => {

  const [value, setValue] = useState("")
  const [realIndustry, setRealIndustry] = useState([])

  const save = () => {
    if (value !== "") {
      console.log("value", value);

      let real = realIndustry
      real.push(value)
      setRealIndustry(real)
      setValue("")
    }
  }

  return (
    <div className="">
      <div className='flex justify-start items-center pb-4'>
        <EditOutlined className='text-gray-500' />
        <p className='text-[14px] text-gray-600 flex justify-start items-center pl-2'>
          Job Title
        </p>
      </div>
      <div className='flex justify-between items-center px-24'>
        <Space.Compact style={{ width: '100%' }}>
          <Input
            placeholder="Please insert the job title which you wanna search"
            value={value}
            onChange={(e: any) => setValue(e.target.value)}
          />
          <Button type="primary" onClick={save}>Submit</Button>
        </Space.Compact>
      </div>

      <div className='flex justify-start items-center flex-wrap mt-4'>
        {realIndustry.map((item: any, index: any) =>
          <p key={index} className='mr-2 mb-1 px-2 border border-gray-300 rounded-[4px] text-gray-500 text-[13px]'>{item}</p>
        )}
      </div>
    </div>
  );
};

export default AddJobTitle;

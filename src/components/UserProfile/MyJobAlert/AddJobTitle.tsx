import { EditOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { Button, Input, Space } from 'antd';
const { Search } = Input;

const AddJobTitle = ({ titleList, setTitleList }: any) => {

  const [value, setValue] = useState("")

  const save = () => {
    if (value !== "") {
      let real = titleList
      real.push(value)
      setTitleList(real)
      setValue("")
    }
  }

  return (
    <div className="">
      <div className='flex justify-start items-center pb-4 px-4 sm:px-16'>
        <EditOutlined className='text-gray-500' />
        <p className='text-[16px] text-gray-600 flex justify-start items-center pl-2'>
          Job Title
        </p>
      </div>
      <div className='flex justify-between items-center px-4 sm:px-16'>
        <Space.Compact style={{ width: '100%' }}>
          <Input
            placeholder="Please insert the job titles which you want to get email alert for."
            value={value}
            onChange={(e: any) => setValue(e.target.value)}
          />
          <Button type="primary" onClick={save}>Add</Button>
        </Space.Compact>
      </div>

      <div className='flex justify-start items-center flex-wrap mt-4'>
        {titleList.map((item: any, index: any) =>
          <p key={index} className='mr-2 mb-1 px-2 border border-gray-300 rounded-[4px] text-gray-500 text-[13px]'>{item}</p>
        )}
      </div>
    </div>
  );
};

export default AddJobTitle;

import { useState } from 'react';
import { FieldStringOutlined } from '@ant-design/icons';
import { Select, Button } from 'antd';
import { Alert } from 'antd';
import type { SelectProps } from 'antd';

const AddIndustry = ({ industryList, setBuffer, buffer }: any) => {


  const [realIndustry, setRealIndustry] = useState([])
  const [validation, setValidaion] = useState(false)

  const handleChange = (value: string[]) => {
    if (value.length > 5) {
      setValidaion(true)
    } else {
      setValidaion(false)
      setBuffer(value)
    }
  };

  const save = () => {
    setRealIndustry(buffer)
    setBuffer([])
  }

  return (
    <div className="">
      <div className='flex justify-start items-center pb-4 px-4 sm:px-16'>
        <FieldStringOutlined className='text-gray-500' />
        <p className='text-[16px] text-gray-600 flex justify-start items-center pl-2'>
          Add Industry
        </p>
      </div>
      <div className='flex justify-between items-start px-4 sm:px-16'>
        <Select
          value={buffer}
          mode="multiple"
          allowClear
          style={{ width: '100%' }}
          placeholder="Please select the industry"
          defaultValue={[]}
          onChange={handleChange}
          options={industryList}
        />
        <Button onClick={save} className='ml-2'>Save</Button>
      </div>

      <div className='mt-2 px-4 sm:px-16'>
        {validation ? <Alert message="You can select up to 5" type="error" /> : null}
      </div>

      <div className='flex justify-start items-center flex-wrap mt-4'>
        {realIndustry.map((item: any, index: any) =>
          <p key={index} className='mr-2 mb-1 px-2 border border-gray-300 rounded-[4px] text-gray-500 text-[13px]'>{item}</p>
        )}
      </div>

    </div>
  );
};

export default AddIndustry;

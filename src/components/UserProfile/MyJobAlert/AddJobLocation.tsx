import { useState } from 'react';
import { GlobalOutlined } from '@ant-design/icons';
import SearchInput from '@/components/Common/Input/SearchInput'
import { Radio } from 'antd';
import { jobLocationPut } from "@/store/action/user/jobInfo/jobLocation"
import type { RadioChangeEvent } from 'antd';

const AddJobLocation = ({ setJobLocation, jobLocation }: any) => {

  const [searchHint, setSearchHint] = useState({
    location: "",
  })
  const [isEditable, setIsEditable] = useState(true)

  const bufferupdateLocation = () => {
    setJobLocation()
    setIsEditable(!isEditable)
  }

  const onChange = (e: RadioChangeEvent) => {
    setJobLocation(e.target.value);
  };

  return (
    <div className='w-full mb-4 md:mb-0 md:w-1/2'>
      <div className='flex justify-center items-center pb-4 px-4 sm:px-16'>
        <GlobalOutlined className='text-gray-500 font-semibold' />
        <p className='text-[16px] text-gray-600 pl-2 font-semibold'>
          Job Location
        </p>
      </div>
      <div className="flex justify-center items-center flex-wrap px-4 sm:px-16">
        <p className='text-center text-blue-500 flex justify-center items-center mb-2'>
          {jobLocation}
          {isEditable ?
            <svg className='ml-2' onClick={() => setIsEditable(!isEditable)} viewBox="64 64 896 896" focusable="false" data-icon="edit" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path></svg>
            :
            <svg className='ml-2' onClick={bufferupdateLocation} viewBox="64 64 896 896" focusable="false" data-icon="issues-close" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M464 688a48 48 0 1096 0 48 48 0 10-96 0zm72-112c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48zm400-188h-59.3c-2.6 0-5 1.2-6.5 3.3L763.7 538.1l-49.9-68.8a7.92 7.92 0 00-6.5-3.3H648c-6.5 0-10.3 7.4-6.5 12.7l109.2 150.7a16.1 16.1 0 0026 0l165.8-228.7c3.8-5.3 0-12.7-6.5-12.7zm-44 306h-64.2c-5.5 0-10.6 2.9-13.6 7.5a352.2 352.2 0 01-49.8 62.2A355.92 355.92 0 01651.1 840a355 355 0 01-138.7 27.9c-48.1 0-94.8-9.4-138.7-27.9a355.92 355.92 0 01-113.3-76.3A353.06 353.06 0 01184 650.5c-18.6-43.8-28-90.5-28-138.5s9.4-94.7 28-138.5c17.9-42.4 43.6-80.5 76.4-113.2 32.8-32.7 70.9-58.4 113.3-76.3a355 355 0 01138.7-27.9c48.1 0 94.8 9.4 138.7 27.9 42.4 17.9 80.5 43.6 113.3 76.3 19 19 35.6 39.8 49.8 62.2 2.9 4.7 8.1 7.5 13.6 7.5H892c6 0 9.8-6.3 7.2-11.6C828.8 178.5 684.7 82 517.7 80 278.9 77.2 80.5 272.5 80 511.2 79.5 750.1 273.3 944 512.4 944c169.2 0 315.6-97 386.7-238.4A8 8 0 00892 694z"></path></svg>
          }
        </p>

        {!isEditable &&

          <SearchInput
            value={{
              location: jobLocation
            }}
            type={'location'}
            warn={{ location: "" }}
            title={"Location *"}
            isTtitle={true}
            list={jobLocation}
            formatList={() => setJobLocation([])}
            pushList={(type: any, eachvalue: any) => setJobLocation(eachvalue)}
            onchange={(type: any, eachvalue: any) => setSearchHint({ ...searchHint, [type]: eachvalue })}
          />
        }
      </div>
    </div>
  );
};

export default AddJobLocation;

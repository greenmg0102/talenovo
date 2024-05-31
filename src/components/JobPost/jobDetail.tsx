import { useState, useEffect } from 'react'
import TestInput from '@/components/Common/Input/TextInput'
import SelectInput from '@/components/Common/Input/SelectInput'
import SearchInput from '@/components/Common/Input/SearchInput'
import TagInput from '@/components/Common/Input/TagInput'

import { jobTypeGet } from "@/store/action/admin/jobInfo/jobType"
import { jobCategoryGet } from "@/store/action/admin/jobInfo/jobCategory"
import { jobLocationPut } from "@/store/action/user/jobInfo/jobLocation"
import { jobTagPut } from "@/store/action/user/jobInfo/jobTag"
import { currencyGet } from "@/store/action/admin/jobInfo/currency"
import { currencyTypeGet } from "@/store/action/admin/jobInfo/currencyType"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import clsx from 'clsx'

const JobDetail = ({ value, warn, setValue, params, setParams }: any) => {

  const [jobType, setJobType] = useState([])
  const [jobCategory, setJobCategory] = useState([])
  const [searchHint, setSearchHint] = useState({
    location: "",
    tag: ""
  })

  const [jobLocation, setJobLocation] = useState([])
  const [jobTag, setJobTag] = useState([])
  const [jobCurrency, setJobCurrency] = useState([])
  const [jobCurrencyType, setJobCurrencyType] = useState([])

  useEffect(() => {

    async function tagFetchData(hint: any) {
      const data = { tagHint: hint }
      let reslutJobTag = await jobTagPut(data)
      setJobTag(reslutJobTag)
    }

    async function locationFetchData(hint: any) {
      const data = { locationHint: hint }
      let reslutJobLocation = await jobLocationPut(data)
      setJobLocation(reslutJobLocation)
    }

    if (searchHint.location !== "") locationFetchData(searchHint.location)
    if (searchHint.tag !== "") tagFetchData(searchHint.tag)

  }, [searchHint])

  useEffect(() => {

    async function fetchData() {

      let reslutJobType = await jobTypeGet()
      let reslutJobCategory = await jobCategoryGet()
      let reslutCurrency = await currencyGet()
      let reslutCurrencyType = await currencyTypeGet()

      setJobType(reslutJobType)
      setJobCategory(reslutJobCategory)
      setJobCurrency(reslutCurrency)
      setJobCurrencyType(reslutCurrencyType)

    }
    fetchData()
  }, [])

  return (
    <div>
      <div className="flex justify-between items-start flex-wrap">
        <p className="w-full mb-4">Add Job Details</p>
        <div className='mb-6 w-[100%]'>
          <TestInput
            textType={'text'}
            value={value}
            type={'title'}
            warn={warn}
            title={"Job Title *"}
            warningText={"The name field is required."}
            onchange={(type: any, eachvalue: any) => setValue({ ...value, [type]: eachvalue })}
          />
        </div>
        <div className='mb-6 w-[48%]'>
          <SelectInput
            warn={warn}
            value={value}
            type={'type'}
            title={"Job Types"}
            list={jobType}
            onchange={(type: any, eachvalue: any) => setValue({ ...value, [type]: eachvalue })}
          />
        </div>
        <div className='mb-6 w-[48%]'>
          <SelectInput
            value={value}
            type={'category'}
            warn={warn}
            title={"Category"}
            list={jobCategory}
            onchange={(type: any, eachvalue: any) => setValue({ ...value, [type]: eachvalue })}
          />
        </div>

        <div className='mb-6 w-full'>
          <SearchInput
            value={value}
            type={'location'}
            warn={warn}
            title={"Location *"}
            list={jobLocation}
            formatList={() => setJobLocation([])}
            pushList={(type: any, eachvalue: any) => setValue({ ...value, [type]: eachvalue })}
            onchange={(type: any, eachvalue: any) => setSearchHint({ ...searchHint, [type]: eachvalue })}
          />
          <p className='flex justify-start items-center text-[12px] mt-1'>
            <input
              checked={value.isRmote}
              type="checkbox"
              className='mr-1'
              onChange={(e: any) => setValue({ ...value, isRmote: e.target.checked })}
            />
            This job is remote
          </p>
        </div>
        <div className='mb-6 w-[100%]'>
          <TagInput
            value={value}
            type={'tag'}
            warn={warn}
            title={"Skill"}
            list={jobTag}
            formatList={() => setJobTag([])}
            pushList={(type: any, eachvalue: any) => setValue({ ...value, [type]: eachvalue })}
            onchange={(type: any, eachvalue: any) => setSearchHint({ ...searchHint, [type]: eachvalue })}
          />
        </div>
        <div className='mb-4 w-[100%]'>
          <p className='mb-2 font-semibold text-[14px]'>Description *</p>
          <ReactQuill
            theme="snow"
            value={params.description}
            defaultValue={params.description}
            onChange={(content, delta, source, editor) => {
              params.description = content;
              params.descriptionText = editor.getText();
              setParams({
                ...params,
              });
            }}
            style={{ minHeight: '200px' }}
          />
          <p className={clsx('h-[16px]', warn.descriptionText.length === 0 ? "invisible" : 'text-red-500 text-[12px]')}>{warn.descriptionText}</p>

          <p className='text-right text-gray-500 text-[12px]'>
            {params.descriptionText === undefined ? 0 : params.descriptionText.length}
            (200 ~ 5000)
          </p>
        </div>

        <div className='mb-12 w-[22%]'>
          <TestInput
            textType={'number'}
            value={value}
            type={'minimumPay'}
            warn={warn}
            title={"Minimum pay"}
            onchange={(type: any, eachvalue: any) => setValue({ ...value, [type]: eachvalue })}
          />
        </div>
        <div className='mb-12 w-[22%]'>
          <TestInput
            textType={'number'}
            value={value}
            type={'maximumPay'}
            warn={warn}
            title={"Maximum pay"}
            onchange={(type: any, eachvalue: any) => setValue({ ...value, [type]: eachvalue })}
          />
        </div>
        <div className='mb-12 w-[22%]'>
          <SelectInput
            value={value}
            type={'currency'}
            warn={warn}
            title={"Currency"}
            list={jobCurrency}
            onchange={(type: any, eachvalue: any) => setValue({ ...value, [type]: eachvalue })}
          />
        </div>
        <div className='mb-12 w-[22%]'>
          <SelectInput
            value={value}
            type={'currencyType'}
            warn={warn}
            title={"Pay Period"}
            list={jobCurrencyType}
            onchange={(type: any, eachvalue: any) => setValue({ ...value, [type]: eachvalue })}
          />
        </div>

        <div className='mb-6 w-full'>
          <TestInput
            textType={'text'}
            value={value}
            type={'applyUrl'}
            warn={warn}
            title={"Job Apply Url *"}
            warningText={"The job apply url field is required."}
            onchange={(type: any, eachvalue: any) => setValue({ ...value, [type]: eachvalue })}
          />
        </div>
        {/* 
        <p className="w-full mb-4 pt-8 border border-dashed border-t-[1px] border-l-0 border-r-0 border-b-0">How to apply</p>

        <div className='mb-0 w-[100%]'>
          <SelectInput
            value={value}
            type={'applyBy'}
            warn={warn}
            title={"Apply By"}
            list={[
              { _id: '0', title: 'Link' },
              { _id: '1', title: 'Email' },
              { _id: '2', title: 'Weekly' },
              { _id: '3', title: 'Directly Submitting Resume' }
            ]}
            onchange={(type: any, eachvalue: any) => setValue({ ...value, [type]: eachvalue })}
          />
        </div> */}

      </div>
    </div>
  );
};

export default JobDetail;

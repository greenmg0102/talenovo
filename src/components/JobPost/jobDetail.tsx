import { useState, useEffect } from 'react'
import TestInput from '@/components/Input/TextInput'
import SelectInput from '@/components/Input/SelectInput'
import SearchInput from '@/components/Input/SearchInput'
import TagInput from '@/components/Input/TagInput'

import { jobTypeGet } from "@/store/action/admin/jobInfo/jobType"
import { jobCategoryGet } from "@/store/action/admin/jobInfo/jobCategory"
import { jobLocationGet } from "@/store/action/admin/jobInfo/jobLocation"
import { jobTagGet } from "@/store/action/admin/jobInfo/jobTag"
import { currencyGet } from "@/store/action/admin/jobInfo/currency"
import { currencyTypeGet } from "@/store/action/admin/jobInfo/currencyType"

const JobDetail = ({ value, warn, setValue }: any) => {

  const [jobType, setJobType] = useState([])
  const [jobCategory, setJobCategory] = useState([])
  const [jobLocation, setJobLocation] = useState([])
  const [jobTag, setJobTag] = useState([])
  const [jobCurrency, setJobCurrency] = useState([])
  const [jobCurrencyType, setJobCurrencyType] = useState([])

  useEffect(() => {

    async function fetchData() {
      let reslutJobType = await jobTypeGet()
      let reslutJobCategory = await jobCategoryGet()
      let reslutJobLocation = await jobLocationGet()
      let reslutJobTag = await jobTagGet()
      let reslutCurrency = await currencyGet()
      let reslutCurrencyType = await currencyTypeGet()

      setJobType(reslutJobType)
      setJobCategory(reslutJobCategory)
      setJobLocation(reslutJobLocation)
      setJobTag(reslutJobTag)
      setJobCurrency(reslutCurrency)
      setJobCurrencyType(reslutCurrencyType)

    }
    fetchData()

  }, [])

  return (
    <div>
      <div className="flex justify-between items-start flex-wrap">
        <p className="w-full mb-4">General Information</p>
        <div className='mb-6 w-[48%]'>
          <TestInput
            value={value}
            type={'jobTitle'}
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
          <SearchInput
            value={value}
            type={'location'}
            warn={warn}
            title={"Location *"}
            onchange={(type: any, eachvalue: any) => setValue({ ...value, [type]: eachvalue })}
          />
          <p>This job is remote</p>
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
        <div className='mb-6 w-[100%]'>
          <TagInput
            value={value}
            type={'tag'}
            warn={warn}
            title={"Tag"}
            onchange={(type: any, eachvalue: any) => setValue({ ...value, [type]: eachvalue })}
          />
        </div>
        <div className='mb-12 w-[100%]'>
          <TestInput
            value={value}
            type={'description'}
            warn={warn}
            title={"Description *"}
            onchange={(type: any, eachvalue: any) => setValue({ ...value, [type]: eachvalue })}
          />
        </div>

        <p className="w-full mb-4 pt-8 border border-dashed border-t-[1px] border-l-0 border-r-0 border-b-0">Compensation</p>

        <div className='mb-12 w-[22%]'>
          <TestInput
            value={value}
            type={'minimumPay'}
            warn={warn}
            title={"Minimum pay"}
            onchange={(type: any, eachvalue: any) => setValue({ ...value, [type]: eachvalue })}
          />
        </div>
        <div className='mb-12 w-[22%]'>
          <TestInput
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
        </div>

      </div>
    </div>
  );
};

export default JobDetail;

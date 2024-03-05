import TestInput from '@/components/Input/TextInput'
import SelectInput from '@/components/Input/SelectInput'
import SearchInput from '@/components/Input/SearchInput'
import TagInput from '@/components/Input/TagInput'

const JobDetail = ({ value, warn, setValue }: any) => {

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
            type={'jobType'}
            title={"Job Types"}
            list={[
              { _id: '0', title: 'Full-Time' },
              { _id: '1', title: 'Part-Time' },
              { _id: '2', title: 'Contract' },
              { _id: '3', title: 'Internship' }
            ]}
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
            type={'jobCategory'}
            warn={warn}
            title={"Category"}
            list={[
              { _id: '0', title: 'Software Development' },
              { _id: '1', title: 'Quality Assurance(QA)' },
              { _id: '2', title: 'Data Science' },
              { _id: '3', title: 'Product Manager' },
              { _id: '4', title: 'Marketing & Sales' },
              { _id: '5', title: 'Network Administration' },
              { _id: '6', title: 'other' },
            ]}
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
            type={'payCurrency'}
            warn={warn}
            title={"Currency"}
            list={[
              { _id: '0', title: 'USD' },
              { _id: '1', title: 'EUR' },
            ]}
            onchange={(type: any, eachvalue: any) => setValue({ ...value, [type]: eachvalue })}
          />
        </div>
        <div className='mb-12 w-[22%]'>
          <SelectInput
            value={value}
            type={'payType'}
            warn={warn}
            title={"Pay Period"}
            list={[
              { _id: '0', title: 'Annually' },
              { _id: '1', title: 'Monthly' },
              { _id: '2', title: 'Weekly' },
              { _id: '3', title: 'Hourly' }
            ]}
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

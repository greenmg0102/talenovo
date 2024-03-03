import TestInput from '@/components/Input/TextInput'

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
            onchange={(type: any, value: any) => setValue({ ...value, [type]: value })}
          />
        </div>
        <div className='mb-6 w-[48%]'>
          <TestInput
            value={value}
            type={'jobType'}
            warn={warn}
            title={"Job Types"}
            onchange={(type: any, value: any) => setValue({ ...value, [type]: value })}
          />
        </div>
        <div className='mb-6 w-[48%]'>
          <TestInput
            value={value}
            type={'location'}
            warn={warn}
            title={"Location *"}
            onchange={(type: any, value: any) => setValue({ ...value, [type]: value })}
          />
          <p>This job is remote</p>
        </div>

        <div className='mb-6 w-[48%]'>
          <TestInput
            value={value}
            type={'jobCategory'}
            warn={warn}
            title={"Category"}
            onchange={(type: any, value: any) => setValue({ ...value, [type]: value })}
          />
        </div>
        <div className='mb-6 w-[100%]'>
          <TestInput
            value={value}
            type={'tag'}
            warn={warn}
            title={"Tag"}
            onchange={(type: any, value: any) => setValue({ ...value, [type]: value })}
          />
        </div>
        <div className='mb-12 w-[100%]'>
          <TestInput
            value={value}
            type={'description'}
            warn={warn}
            title={"Description *"}
            onchange={(type: any, value: any) => setValue({ ...value, [type]: value })}
          />
        </div>


        <p className="w-full mb-4 pt-8 border border-dashed border-t-[1px] border-l-0 border-r-0 border-b-0">Compensation</p>

        <div className='mb-12 w-[22%]'>
          <TestInput
            value={value}
            type={'minimumPay'}
            warn={warn}
            title={"Minimum pay"}
            onchange={(type: any, value: any) => setValue({ ...value, [type]: value })}
          />
        </div>
        <div className='mb-12 w-[22%]'>
          <TestInput
            value={value}
            type={'maximumPay'}
            warn={warn}
            title={"Maximum pay"}
            onchange={(type: any, value: any) => setValue({ ...value, [type]: value })}
          />
        </div>
        <div className='mb-12 w-[22%]'>
          <TestInput
            value={value}
            type={'payCurrency'}
            warn={warn}
            title={"Currency"}
            onchange={(type: any, value: any) => setValue({ ...value, [type]: value })}
          />
        </div>
        <div className='mb-12 w-[22%]'>
          <TestInput
            value={value}
            type={'payType'}
            warn={warn}
            title={"Pay Period"}
            onchange={(type: any, value: any) => setValue({ ...value, [type]: value })}
          />
        </div>

        <p className="w-full mb-4 pt-8 border border-dashed border-t-[1px] border-l-0 border-r-0 border-b-0">How to apply</p>

        <div className='mb-0 w-[100%]'>
          <TestInput
            value={value}
            type={'applyBy'}
            warn={warn}
            title={"Apply By"}
            onchange={(type: any, value: any) => setValue({ ...value, [type]: value })}
          />
        </div>

      </div>
    </div>
  );
};

export default JobDetail;

import TestInput from '@/components/Input/TextInput'

const CompoanyInfo = ({ value, warn, setValue }: any) => {

  return (
    <div>
      <p className="mb-4">Company Details</p>
      <div className="flex justify-between items-start flex-wrap">
        <div className="w-[48%] h-[200px] border rounded-[4px]">

        </div>
        <div className="w-[48%]">
          <div className="h-[200px]">
            <div className='mb-6'>
              <TestInput
                value={value}
                type={'companyName'}
                warn={warn}
                title={"Company Name *"}
                warningText={"The name field is required."}
                onchange={(type: any, eachvalue: any) => setValue({ ...value, [type]: eachvalue })}
              />
            </div>
            <p></p>
            <div className=''>
              <TestInput
                value={value}
                type={'companyLink'}
                warn={warn}
                title={"Company Link"}
                warningText={"The link field is required."}
                onchange={(type: any, eachvalue: any) => setValue({ ...value, [type]: eachvalue })}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CompoanyInfo;

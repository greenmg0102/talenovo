'use client'

import { useState, useRef, useEffect } from 'react';
import TestInput from '@/components/Common/Input/TextInput'
import clsx from 'clsx'

const CompoanyInfo = ({ value, warn, setValue, setWarn }: any) => {

  const inputRef = useRef<HTMLInputElement>(null)
  const [selectedImage, setSelectedImage] = useState<any>(null);

  useEffect(() => {

    if (value.companyLogo.length !== 100) {
      setSelectedImage(value.companyLogo)
    }

  }, [value])

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB

    if (file.size > maxSizeInBytes) {
      setWarn({ ...warn, companyLogo: "Image size exceeds the limit" })
      return;
    }

    const reader = new FileReader();
    reader.onload = function () {
      setSelectedImage(reader.result)
      setValue({ ...value, companyLogo: reader.result })
      setWarn({ ...warn, companyLogo: "" })
    };

    reader.readAsDataURL(file);
  };

  const handleClickImage = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }

  return (
    <div>
      <p className="mb-4">Company Details</p>
      <div className="flex justify-between items-start flex-wrap">
        <div className="w-[250px] h-[200px]">
          <div className="w-[250px] h-[200px] border rounded-[12px] overflow-hidden flex justify-center items-center border border-gray-200">

            <input ref={inputRef} type="file" name="myImage" accept="image/*" className='hidden' onChange={handleImageChange} />
            {selectedImage ?
              <div className='w-[250px] h-[200px] bg-cover bg-center' style={{ backgroundImage: `url(${selectedImage})` }} onClick={handleClickImage}>
              </div>

              :
              <div>
                <button onClick={handleClickImage}>
                  <svg viewBox="64 64 896 896" focusable="false" data-icon="border-outer" width="4em" height="4em" fill="#4B5563" aria-hidden="true"><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656zM484 366h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zM302 548h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm364 0h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-182 0h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm0 182h56c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8z"></path></svg>
                </button>

              </div>
            }
          </div>
          <p className={clsx('h-[16px]', warn.companyLogo.length === 0 ? "invisible" : 'text-red-500 text-[12px]')}>{warn.logo}</p>
        </div>
        <div className="w-[calc(100%-250px)] pl-4">
          <div className="h-[200px]">
            <div className='mb-6'>
              <TestInput
                textType={'text'}
                value={value}
                type={'companyName'}
                warn={warn}
                title={"Company Name *"}
                warningText={"The link field is required."}
                onchange={(type: any, eachvalue: any) => setValue({ ...value, [type]: eachvalue })}
              />
            </div>
            <p></p>
            <div className=''>
              <TestInput
                textType={'text'}
                value={value}
                type={'companyLinkedinUrl'}
                warn={warn}
                title={"Company Website"}
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

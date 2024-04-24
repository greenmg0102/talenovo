'use client'

import { useState, useRef, useEffect } from 'react';
import TestInput from '@/components/Common/Input/TextInput'

const CompoanyInfo = ({ value, warn, setValue }: any) => {

  const inputRef = useRef<HTMLInputElement>(null)
  const [selectedImage, setSelectedImage] = useState<any>(null);

  useEffect(() => {

    if (value.logo.length !== 100) {
      setSelectedImage(value.logo)
    }

  }, [value])

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB

    if (file.size > maxSizeInBytes) {
      console.log("Image size exceeds the limit");
      return;
    }

    const reader = new FileReader();
    reader.onload = function () {
      setSelectedImage(reader.result)
      setValue({ ...value, logo: reader.result })
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
        <div className="w-[250px] h-[200px] border rounded-[12px] overflow-hidden flex justify-center items-center border border-red-400">

          <input ref={inputRef} type="file" name="myImage" accept="image/*" className='hidden' onChange={handleImageChange} />
          {selectedImage ?
            <div className='w-[250px] h-[200px] bg-cover bg-center' style={{ backgroundImage: `url(${selectedImage})` }} onClick={handleClickImage}>
            </div>
            :
            <div>
              <button onClick={handleClickImage}>File</button>
            </div>
          }
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
                warningText={"The name field is required."}
                onchange={(type: any, eachvalue: any) => setValue({ ...value, [type]: eachvalue })}
              />
            </div>
            <p></p>
            <div className=''>
              <TestInput
                textType={'text'}
                value={value}
                type={'companyLink'}
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

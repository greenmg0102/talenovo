import { useState, useEffect } from "react";
import { jobProductionGet } from "@/store/action/admin/jobInfo/jobProduction"
import PaymentItem from '@/components/JobPost/paymentItem'
import { Divider } from 'antd'
import { useUser } from "@clerk/nextjs";

const Final = ({ value, warn, setValue }: any) => {

  const { user } = useUser();

  return (
    <div>
      <p className="mb-4">Please review your job post</p>
      <p className="text-[14px] text-gray-600 mb-4 mt-2">
        All jobs post will be reviewed prior to publishing, once payment have been process, an email will be sent once job listing is activated.
      </p>

      <div className="mt-4">
        <div className='w-full'>
          <div className="flex justify-between items-start flex-wrap">
            <div className="w-full mb-2 lg:mb-0 px-4">
              <div className="border border-gray-200 rounded-[8px] shadow-2xl p-4">
                <p className="text-center text-[24px] font-bold pb-12">{value.title}</p>
                <p className="mr-2 mb-1 flex text-[18px] rounded-[4px]">{value.companyName}</p>
                <div className="flex justify-start items-center flex-wrap mb-4">
                  {value.location !== "" ? <p className="mr-2 mb-1 text-[12px] px-2 bg-green-200 rounded-[4px] text-green-900">{value.location}</p> : null}
                  {value.tertiaryDescription !== "" ? <p className="mr-2 mb-1 text-[12px] px-2 bg-blue-200 rounded-[4px] text-blue-900">{value.tertiaryDescription}</p> : null}
                </div>
                <p className="pb-4">Skill</p>
                <div className="flex justify-start flex-wrap items-center pb-4">
                  {value.tag.map((item: any, index: any) =>
                    <p key={index} className="mr-2 mb-1 text-[12px] font-bold !text-gray-900 border border-dashed border-gray-300 px-2">{item}</p>
                  )}
                </div>
                <Divider className='my-4' />
                <div className="flex justify-between items-center pb-4">
                  <p className="font-semibold text-[14px]">Job Description</p>
                </div>
                {value.descriptionText.split(".").map((item: any, index: any) =>
                  <p key={index} className="text-gray-500 pt-2 text-[12px]">{item}.</p>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Final;

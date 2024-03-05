'use client'
import { useState } from "react";

import NextPrevious from '@/components/JobPost/NextPrevious'
import Milestone from '@/components/JobPost/milestone'
import CompoanyInfo from "@/components/JobPost/compoanyInfo";
import JobDetail from "@/components/JobPost/jobDetail";
import Payment from "@/components/JobPost/payment";

import { companyDatilPost, jobDatilPost } from "@/store/action/admin/jobPost"
import { JobPostingMileston } from '@/data/jobPost'

const JobPostMain = () => {

  const [category, setCategory] = useState(0)
  const [loading, setLoading] = useState(false)

  const [value, setValue] = useState({
    companyName: "",
    companyLink: "",
    jobTitle: "",
    jobType: undefined,
    jobCategory: undefined,
    location: undefined,
    tag: [],
    description: undefined,
    minimumPay: undefined,
    maximumPay: undefined,
    payCurrency: undefined,
    payType: undefined,
    applyBy: undefined,
    contactInfo: undefined,
    premiumType: undefined
  })

  const [warn, setWarn] = useState({
    companyName: "",
    companyLink: "",
    jobTitle: "",
    jobType: "",
    jobCategory: "",
    location: "",
    tag: [],
    description: "",
    minimumPay: "",
    maximumPay: "",
    payCurrency: "",
    payType: "",
    applyBy: "",
    contactInfo: "",
    premiumType: ""
  })

  const list = {
    0: <CompoanyInfo
      warn={warn}
      value={value}
      setValue={(eachValue: any) => setValue(eachValue)} />,

    1: <JobDetail
      warn={warn}
      value={value}
      setValue={(eachValue: any) => setValue(eachValue)} />,

    2: <Payment
      warn={warn}
      value={value}
      setValue={(eachValue: any) => setValue(eachValue)} />
  }

  const saveValue = async (Nextcategory: number) => {

    setCategory(Nextcategory)
    let companyDetailInfo: any = {}
    companyDetailInfo = { ...value }
    let result = {}

    if (category === 0) {
      if (value.companyName.length > 0 && value.companyLink.length > 0) result = await companyDatilPost(companyDetailInfo)
    } else if (category === 1) {
      if (
        value.jobTitle.length > 0 && value.jobType !== undefined &&
        value.jobCategory !== undefined && value.location !== undefined &&
        value.tag.length > 0 && value.description !== undefined &&
        value.minimumPay !== undefined && value.maximumPay !== undefined &&
        value.payCurrency !== undefined && value.payType !== undefined &&
        value.applyBy !== undefined
      ) {
        result = await jobDatilPost(companyDetailInfo)
      }
    }

    setValue({ ...value, ...result })

  }


  return (
    <div className="max-w-2xl mx-auto">

      <Milestone
        category={category}
      />

      <div className="bg-gray-50 shadow-2xl rounded-[4px] p-4 mt-12">

        <div className="py-4">
          {list[category]}
        </div>

        <NextPrevious
          category={category}
          JobPostingMileston={JobPostingMileston}
          setCategory={(previous: any) => saveValue(previous)}
        />

      </div >
    </div >
  );
};

export default JobPostMain;

'use client'
import { useState } from "react";

import NextPrevious from '@/components/JobPost/NextPrevious'
import Milestone from '@/components/JobPost/milestone'
import CompoanyInfo from "@/components/JobPost/compoanyInfo";
import JobDetail from "@/components/JobPost/jobDetail";
import Payment from "@/components/JobPost/payment";

import { companyDatilPost } from "@/store/action/admin/jobPost"

const JobPostMain = () => {

  const [category, setCategory] = useState(0)
  const [loading, setLoading] = useState(false)

  const [value, setValue] = useState({
    companyName: "",
    companyLink: "",
    jobTitle: "",
    jobType: "",
    jobCategory: "",
    location: "",
    tag: [],
    description: "",
    minimumPay: undefined,
    maximumPay: undefined,
    payCurrency: "",
    payType: "",
    applyBy: "",
    contactInfo: "",
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

    let companyName = value.companyName
    let companyLink = value.companyLink

    if (companyName.length > 0 && companyLink.length > 0) {

      let companyDetailInfo: any = {}
      companyDetailInfo.companyName = value.companyName
      companyDetailInfo.companyLink = value.companyLink

      let result = await companyDatilPost(companyDetailInfo)


      // setCategory(category)

    }
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
          setCategory={(previous: any) => saveValue(previous)}
        />

      </div >
    </div >
  );
};

export default JobPostMain;

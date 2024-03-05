'use client'
import { useState, useEffect } from "react";
import NextPrevious from '@/components/JobPost/NextPrevious'
import Milestone from '@/components/JobPost/milestone'
import CompoanyInfo from "@/components/JobPost/compoanyInfo";
import JobDetail from "@/components/JobPost/jobDetail";
import Payment from "@/components/JobPost/payment";
import { companyDatilPost, jobDatilPost, jobPostStatus } from "@/store/action/admin/jobPost"
import { JobPostingMileston } from '@/data/jobPost'

const JobPostMain = () => {

  const [category, setCategory] = useState(0)
  const [loading, setLoading] = useState(false)

  const [value, setValue] = useState({
    companyName: "",
    companyLink: "",
    jobTitle: "",
    type: undefined,
    category: undefined,
    location: undefined,
    tag: [],
    description: undefined,
    minimumPay: undefined,
    maximumPay: undefined,
    currency: undefined,
    currencyType: undefined,
    applyBy: undefined,
    contactInfo: undefined,
    premiumType: undefined
  })

  const [warn, setWarn] = useState({
    companyName: "",
    companyLink: "",
    jobTitle: "",
    type: "",
    category: "",
    location: "",
    tag: [],
    description: "",
    minimumPay: "",
    maximumPay: "",
    currency: "",
    currencyType: "",
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

  useEffect(() => {

    async function fetchData() {
      let result = await jobPostStatus()
      setValue({ ...value, ...result })
    }
    fetchData()
  }, [])

  const saveValue = async (Nextcategory: number) => {

    let companyDetailInfo: any = {}
    companyDetailInfo = { ...value }
    let result = {}

    if (category === 0) {

      if (value.companyName.length > 0 && value.companyLink.length > 0) {
        setLoading(true)
        result = await companyDatilPost(companyDetailInfo)
        setValue({ ...value, ...result })
        setLoading(false)
        setCategory(Nextcategory)
      } else {
        console.log('validation error in step 1!');
      }
    } else if (category === 1 && Nextcategory === 0) {

      setCategory(Nextcategory)

    } else if (category === 1 && Nextcategory === 2) {

      if (
        value.jobTitle.length > 0 && value.type !== undefined &&
        value.category !== undefined && value.location !== undefined &&
        // value.tag.length > 0 && 
        value.description !== undefined &&
        value.minimumPay !== undefined && value.maximumPay !== undefined &&
        value.currency !== undefined && value.currencyType !== undefined
        // value.applyBy !== undefined
      ) {
        setLoading(true)
        result = await jobDatilPost(companyDetailInfo)
        setValue({ ...value, ...result })
        setLoading(false)
        setCategory(Nextcategory)
      } else {
        console.log('validation error in step 2!');
      }
    } else if (category === 2) {
      setCategory(Nextcategory)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Milestone
        category={category}
      />
      <div className="bg-gray-50 shadow-2xl rounded-[4px] p-4 mt-12">
        <div className="py-4"> {list[category]} </div>

        <NextPrevious
          category={category}
          loading={loading}
          JobPostingMileston={JobPostingMileston}
          setCategory={(previous: any) => saveValue(previous)}
        />
      </div >
    </div >
  );
};

export default JobPostMain;

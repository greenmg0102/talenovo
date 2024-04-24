'use client'
import { useState, useEffect } from "react";
import NextPrevious from '@/components/JobPost/NextPrevious'
import Milestone from '@/components/JobPost/milestone'
import CompoanyInfo from "@/components/JobPost/compoanyInfo";
import JobDetail from "@/components/JobPost/jobDetail";
import Payment from "@/components/JobPost/payment";
import { companyDatilPost, jobDatilPost, jobPostStatus } from "@/store/action/user/jobPost"
import { JobPostingMileston } from '@/data/jobPost'

const JobPostMain = () => {

  const [category, setCategory] = useState(0)
  const [loading, setLoading] = useState(false)

  const [value, setValue] = useState({
    logo: "",
    companyName: "",
    companyLink: "",
    jobTitle: "",
    type: undefined,
    category: undefined,
    location: undefined,
    isRmote: false,
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

  const [params, setParams] = useState<any>(JSON.parse(JSON.stringify({
    id: null,
    title: '',
    description: '',
    descriptionText: '',
    assignee: '',
    path: '',
    tag: '',
    priority: 'low',
  })));

  const list = {
    0: <CompoanyInfo
      warn={warn}
      value={value}
      setValue={(eachValue: any) => setValue(eachValue)} />,

    1: <JobDetail
      warn={warn}
      value={value}
      params={params}
      setParams={(totla: any) => setParams(totla)}
      setValue={(eachValue: any) => setValue(eachValue)} />,

    2: <Payment
      warn={warn}
      value={value}
      setValue={(eachValue: any) => setValue(eachValue)} />
  }

  useEffect(() => {

    async function fetchData() {
      let result = await jobPostStatus()
      setValue(prevValue => ({ ...prevValue, ...result }));
    }
    fetchData()

  }, [setValue])

  const saveValue = async (Nextcategory: number) => {

    let companyDetailInfo: any = {}
    companyDetailInfo = { ...value }
    let result = {}

    if (category === 0) {

      if
        (
        value.logo.length > 0 &&
        value.companyName.length > 0 &&
        value.companyLink.length > 0
      ) {
        setLoading(true)

        result = await companyDatilPost(companyDetailInfo)

        setValue({ ...value, ...result })
        setLoading(false)
        setCategory(Nextcategory)
      } else {
      }
    } else if (category === 1 && Nextcategory === 0) {

      setCategory(Nextcategory)

    } else if (category === 1 && Nextcategory === 2) {

      let real: any = value
      real.description = params.description
      real.descriptionText = params.descriptionText


      if (
        real.jobTitle.length > 0 && real.type !== undefined &&
        real.category !== undefined && real.location !== undefined &&
        real.tag.length > 0 &&
        real.description !== undefined &&
        real.minimumPay !== undefined && real.maximumPay !== undefined &&
        real.description !== "" && real.descriptionText !== "" &&
        real.currency !== undefined && real.currencyType !== undefined
        // value.applyBy !== undefined
      ) {
        setLoading(true)
        result = await jobDatilPost(companyDetailInfo)
        setValue({ ...value, ...result })
        setLoading(false)
        setCategory(Nextcategory)
      } else {
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

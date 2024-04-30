'use client'
import { useState, useEffect } from "react";
import NextPrevious from '@/components/JobPost/NextPrevious'
import Milestone from '@/components/JobPost/milestone'
import CompoanyInfo from "@/components/JobPost/compoanyInfo";
import JobDetail from "@/components/JobPost/jobDetail";
import Final from "@/components/JobPost/Final";
import { useRouter } from 'next/navigation';
import { companyDatilPost, jobDatilPost, jobPostStatus, changejobPostStatus } from "@/store/action/user/jobPost"
import { JobPostingMileston } from '@/data/jobPost'

const JobPostMain = () => {

  const router = useRouter();

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
    premiumType: undefined,
    jobApplyLink: "",

    platform: "talenovo",
    subType: "paid",
    postStatus: 0
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
    premiumType: "",
    jobApplyLink: ""
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

  console.log('value', value);

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

    2: <Final
      warn={warn}
      value={value}
      setValue={(eachValue: any) => setValue(eachValue)} />
  }

  useEffect(() => {

    async function fetchData() {
      let result = await jobPostStatus()

      console.log("result", result);

      if (result !== null) {
        setParams({ ...params, description: result.description, descriptionText: result.descriptionText })
        setValue(prevValue => ({ ...prevValue, ...result }));
      }

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
        real.jobTitle.length > 50 && real.type !== undefined &&
        real.jobApplyLink.length > 50 &&
        real.category !== undefined && real.location !== undefined &&
        real.tag.length > 0 &&
        real.description !== undefined &&
        real.minimumPay !== undefined && real.maximumPay !== undefined &&
        real.description !== "" && real.descriptionText !== "" &&
        real.descriptionText.length > 250 &&
        real.currency !== undefined && real.currencyType !== undefined
        // value.applyBy !== undefined
      ) {
        setLoading(true)
        result = await jobDatilPost(real)
        setValue({ ...value, ...result })
        setLoading(false)
        setCategory(Nextcategory)
      } else {

      }
    } else if (category === 2) {

      let data = {
        ...value,
        postStatus: 1
      }
      let result = await changejobPostStatus(data)
      console.log("result", result);
      if (result.isOkay) {
        router.push('/user-profile');
      }
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
      </div>
    </div >
  );
};

export default JobPostMain;

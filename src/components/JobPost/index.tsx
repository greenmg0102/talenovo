'use client'
import { useState, useEffect } from "react";
import NextPrevious from '@/components/JobPost/NextPrevious'
import Milestone from '@/components/JobPost/milestone'
import CompoanyInfo from "@/components/JobPost/compoanyInfo";
import JobDetail from "@/components/JobPost/jobDetail";
import Final from "@/components/JobPost/Final";
import PaymentComponent from "@/components/JobPost/PaymentComponent";
import { useRouter } from 'next/navigation';
import { userPremiumStatus } from '@/store/action/user/userProfile/userInfo'
import { companyDatilPost, jobDatilPost, jobPostStatus, changejobPostStatus } from "@/store/action/user/jobPost"
import { JobPostingMileston } from '@/data/jobPost'

const JobPostMain = () => {

  const router = useRouter();

  const [category, setCategory] = useState(0)
  const [loading, setLoading] = useState(false)

  const [value, setValue] = useState({
    companyLogo: "",
    companyName: "",
    companyLinkedinUrl: "",
    title: "",
    type: undefined,
    category: undefined,
    location: undefined,
    isRmote: false,
    tag: [],
    description: undefined,
    descriptionText: undefined,
    minimumPay: undefined,
    maximumPay: undefined,
    currency: undefined,
    currencyType: undefined,
    applyBy: undefined,
    contactInfo: undefined,
    premiumType: undefined,
    applyUrl: "",

    platform: "talenovo",
    subType: "paid",
    postStatus: 0
  })

  const [warn, setWarn] = useState({
    companyLogo: "",
    companyName: "",
    companyLinkedinUrl: "",
    title: "",
    type: "",
    category: "",
    location: "",
    tag: "",
    description: "",
    descriptionText: "",
    minimumPay: "",
    maximumPay: "",
    currency: "",
    currencyType: "",
    applyBy: "",
    contactInfo: "",
    premiumType: "",
    applyUrl: ""
  })

  const [userStatus, setUserStatus] = useState(false)

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

  useEffect(() => {

    async function fetchData() {
      let result = await userPremiumStatus()
      if (result !== null) setUserStatus(result.status === 'active')
    }
    fetchData()

  });

  const list = {
    0: <CompoanyInfo
      warn={warn}
      value={value}
      setValue={(eachValue: any) => setValue(eachValue)}
      setWarn={(eachValue: any) => setWarn(eachValue)} />,

    1: <JobDetail
      warn={warn}
      value={value}
      params={params}
      setParams={(totla: any) => setParams(totla)}
      setValue={(eachValue: any) => setValue(eachValue)} />,

    2: <Final
      warn={warn}
      value={value}
      setValue={(eachValue: any) => setValue(eachValue)} />,

    3: <PaymentComponent
      warn={warn}
      value={value}
      setValue={(eachValue: any) => setValue(eachValue)} />
  }

  useEffect(() => {

    async function fetchData() {

      let result = await jobPostStatus()

      console.log("jobPostStatus", result);

      if (Object.keys(result).length !== 0) {
        setParams({ ...params, description: result.description, descriptionText: result.descriptionText })
        setValue(prevValue => ({ ...prevValue, ...result }));
      }

    }
    fetchData()

  }, [setValue])

  const saveValue = async (Nextcategory: number) => {

    let companyDetailInfo: any = {}
    companyDetailInfo = { ...value }

    if (category === 0) {

      setLoading(true)

      let companyInfoResult = await companyDatilPost(companyDetailInfo)

      if (companyInfoResult.isOkay) {
        setValue({ ...value, ...companyInfoResult.result })
        setCategory(Nextcategory)
        setWarn({
          companyLogo: "",
          companyName: "",
          companyLinkedinUrl: "",
          title: "",
          type: "",
          category: "",
          location: "",
          tag: "",
          description: "",
          descriptionText: "",
          minimumPay: "",
          maximumPay: "",
          currency: "",
          currencyType: "",
          applyBy: "",
          contactInfo: "",
          premiumType: "",
          applyUrl: ""
        })
      } else {

        let real: any = {}

        Object.keys(warn).forEach((key: any) => {
          if (key in companyInfoResult.errorMessage) real[key] = companyInfoResult.errorMessage[key]
          else real[key] = ""
        });

        setWarn({ ...real })
      }

      setLoading(false)

    } else if (category === 1 && Nextcategory === 0) {

      setCategory(Nextcategory)

    } else if (category === 1 && Nextcategory === 2) {

      let real: any = value
      real.description = params.description
      real.descriptionText = params.descriptionText

      // if (
      //   real.title.length > 50 && real.type !== undefined &&
      //   real.applyUrl.length > 50 &&
      //   real.category !== undefined && real.location !== undefined &&
      //   real.tag.length > 0 &&
      //   real.description !== undefined &&
      //   real.minimumPay !== undefined && real.maximumPay !== undefined &&
      //   real.description !== "" && real.descriptionText !== "" &&
      //   real.descriptionText.length > 250 &&
      //   real.currency !== undefined && real.currencyType !== undefined
      //   // value.applyBy !== undefined
      // ) {

      setLoading(true)

      let companyDetailResult = await jobDatilPost(real)

      if (companyDetailResult.isOkay) {
        setValue({ ...value, ...companyDetailResult.result })
        setCategory(Nextcategory)
        setWarn({
          companyLogo: "",
          companyName: "",
          companyLinkedinUrl: "",
          title: "",
          type: "",
          category: "",
          location: "",
          tag: "",
          description: "",
          descriptionText: "",
          minimumPay: "",
          maximumPay: "",
          currency: "",
          currencyType: "",
          applyBy: "",
          contactInfo: "",
          premiumType: "",
          applyUrl: ""
        })
      } else {

        let real: any = {}

        Object.keys(warn).forEach((key: any) => {
          if (key in companyDetailResult.errorMessage) real[key] = companyDetailResult.errorMessage[key]
          else real[key] = ""
        });

        setWarn({ ...real })
      }

      setLoading(false)

    } else if (category === 2) {

      if (userStatus) {
        let data = {
          ...value,
          postStatus: 1
        }
        let result = await changejobPostStatus(data)
        if (result.isOkay) {
          router.push('/user-profile');
        }
      } else {
        setCategory(Nextcategory)
      }
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Milestone
        category={category}
        userStatus={userStatus}
      />

      <div className="bg-gray-50 shadow-2xl rounded-[4px] p-4 mt-12">
        <div className="py-4"> {list[category]} </div>

        <NextPrevious
          loading={loading}
          category={category}
          userStatus={userStatus}
          JobPostingMileston={JobPostingMileston}
          setCategory={(previous: any) => saveValue(previous)}
        />
      </div>
    </div >
  );
};

export default JobPostMain;

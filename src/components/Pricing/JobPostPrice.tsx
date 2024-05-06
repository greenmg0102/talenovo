"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import clsx from 'clsx'
import SectionTitle from "../Common/SectionTitle";
import OfferList from "./OfferList";
import JobPostPricingBox from "./JobPostPricingBox";
import Features from '@/components/Features'

const JobPostPrice = ({ isSectionTitle }: any) => {

  const jobPostPlan = {
    "Job Post monthly": process.env.NEXT_PUBLIC_JOB_POST_ONE_MONTH,
    "Job Post 3 monthly": process.env.NEXT_PUBLIC_JOB_POST_THREE_MONTH
  }

  const [isMonthly, setIsMonthly] = useState(true);

  const { user } = useUser();
  const [userData, setUserData] = useState<any>({});

  const email = user?.primaryEmailAddress?.emailAddress;
  const clerkId = user?.id;

  const handleSubscription = async (plan: any) => {

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stripe/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        clerkId,
        priceId: jobPostPlan[plan.packageName],
        packageName: plan.packageName,
        redirectLink: "http://localhost:3000/job-post"
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the response body as JSON
      })
      .then(data => {
        // Handle the response data
        //redirect to checkout page
        window.location.href = data.url;
      })
      .catch(error => {
        // Handle errors
        console.error('There was a problem with the fetch operation:', error);
      });
  }

  return (
    <section id="pricing" className="relative z-10 pb-16 md:pb-20 lg:pb-28 px-auto">
      {/* {
          userData?.subscriptionId && isSectionTitle === false &&
          <div className="">
            <div className="flex flex-col justify-center items-center bg-green-400">
              <h1>Activate: {userData?.planName}</h1>
              <p>Subscription Id: {userData?.subscriptionId}</p>
              <p>Subscription status: {userData?.status}</p>
            </div>
            <div className="flex justify-center mt-4 items-center space-x-4">
              <button
                onClick={handleCancel}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full " >
                cancel
              </button>
              <button
                onClick={handleResume}
                className="bg-green-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full">
                resume
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full">
                delete
              </button>
            </div>
          </div>
        } */}

      {/* <div className="flex justify-center flex-col items-center mb-24 shadow-2xl border border-gray-300 border-t-[5px] rounded-[12px] w-full max-w-[650px] p-4 mx-auto">
          <p className="text-center text-gray-900 font-bold text-[16px] md:text-[24px]">Simple & Affordable Membership Priciing</p>
          <p className="text-center text-gray-900 font-bold text-[16px] md:text-[24px] mb-8">Unlock Your Career Potential</p>
          <div className="flex justify-start items-start w-full max-w-[650px] mb-2">
            <span className="mr-3 mt-2 flex h-[18px] w-full max-w-[18px] items-center justify-center rounded-full bg-primary bg-opacity-10 text-primary">
              <svg width="8" height="6" viewBox="0 0 8 6" className="fill-current">
                <path d="M2.90567 6.00024C2.68031 6.00024 2.48715 5.92812 2.294 5.74764L0.169254 3.43784C-0.0560926 3.18523 -0.0560926 2.78827 0.169254 2.53566C0.39461 2.28298 0.74873 2.28298 0.974086 2.53566L2.90567 4.66497L7.02642 0.189715C7.25175 -0.062913 7.60585 -0.062913 7.83118 0.189715C8.0566 0.442354 8.0566 0.839355 7.83118 1.09198L3.54957 5.78375C3.32415 5.92812 3.09882 6.00024 2.90567 6.00024Z" />
              </svg>
            </span>
            <p className="w-[calc(100%-1em)] text-[12px] md:text-[16px] font-medium text-gray-500 ml-2">
              <span className="font-bold text-[13px] md:text-[17px]">Advanced AI-powered search engine</span>: Streamline your job search with intelligent technology that brings you the best-matched jobs, saving you time and effort.
            </p>
          </div>
          <div className="flex justify-start items-start w-full max-w-[650px] mb-2">
            <span className="mr-3 mt-2 flex h-[18px] w-full max-w-[18px] items-center justify-center rounded-full bg-primary bg-opacity-10 text-primary">
              <svg width="8" height="6" viewBox="0 0 8 6" className="fill-current">
                <path d="M2.90567 6.00024C2.68031 6.00024 2.48715 5.92812 2.294 5.74764L0.169254 3.43784C-0.0560926 3.18523 -0.0560926 2.78827 0.169254 2.53566C0.39461 2.28298 0.74873 2.28298 0.974086 2.53566L2.90567 4.66497L7.02642 0.189715C7.25175 -0.062913 7.60585 -0.062913 7.83118 0.189715C8.0566 0.442354 8.0566 0.839355 7.83118 1.09198L3.54957 5.78375C3.32415 5.92812 3.09882 6.00024 2.90567 6.00024Z" />
              </svg>
            </span>
            <p className="w-[calc(100%-1em)] text-[12px] md:text-[16px] font-medium text-gray-500 ml-2">
              <span className="font-bold text-[13px] md:text-[17px]">Real-time job postings</span>: Stay updated with the latest job opportunities as they arise.
            </p>
          </div>
          <div className="flex justify-start items-start w-full max-w-[650px] mb-2">
            <span className="mr-3 mt-2 flex h-[18px] w-full max-w-[18px] items-center justify-center rounded-full bg-primary bg-opacity-10 text-primary">
              <svg width="8" height="6" viewBox="0 0 8 6" className="fill-current">
                <path d="M2.90567 6.00024C2.68031 6.00024 2.48715 5.92812 2.294 5.74764L0.169254 3.43784C-0.0560926 3.18523 -0.0560926 2.78827 0.169254 2.53566C0.39461 2.28298 0.74873 2.28298 0.974086 2.53566L2.90567 4.66497L7.02642 0.189715C7.25175 -0.062913 7.60585 -0.062913 7.83118 0.189715C8.0566 0.442354 8.0566 0.839355 7.83118 1.09198L3.54957 5.78375C3.32415 5.92812 3.09882 6.00024 2.90567 6.00024Z" />
              </svg>
            </span>
            <p className="w-[calc(100%-1em)] text-[12px] md:text-[16px] font-medium text-gray-500 ml-2">
              <span className="font-bold text-[13px] md:text-[17px]">Personalized alerts</span>: Receive tailored notifications based on your preferences and criteria.
            </p>
          </div>
          <div className="flex justify-start items-start w-full max-w-[650px] mb-2">
            <span className="mr-3 mt-2 flex h-[18px] w-full max-w-[18px] items-center justify-center rounded-full bg-primary bg-opacity-10 text-primary">
              <svg width="8" height="6" viewBox="0 0 8 6" className="fill-current">
                <path d="M2.90567 6.00024C2.68031 6.00024 2.48715 5.92812 2.294 5.74764L0.169254 3.43784C-0.0560926 3.18523 -0.0560926 2.78827 0.169254 2.53566C0.39461 2.28298 0.74873 2.28298 0.974086 2.53566L2.90567 4.66497L7.02642 0.189715C7.25175 -0.062913 7.60585 -0.062913 7.83118 0.189715C8.0566 0.442354 8.0566 0.839355 7.83118 1.09198L3.54957 5.78375C3.32415 5.92812 3.09882 6.00024 2.90567 6.00024Z" />
              </svg>
            </span>
            <p className="w-[calc(100%-1em)] text-[12px] md:text-[16px] font-medium text-gray-500 ml-2">
              <span className="font-bold text-[13px] md:text-[17px]">Exclusive benefits</span>: Gain access to immediate X job updates, proactive alerts, and a sophisticated search tool designed to elevate your job search experience.
            </p>
          </div>
        </div> */}

      {/* <div className="w-full">
          <div className="mb-8 flex justify-center md:mb-12 lg:mb-16">
            <span
              onClick={() => setIsMonthly(true)}
              className={`${isMonthly
                ? "pointer-events-none text-primary"
                : "text-dark dark:text-white"
                } mr-4 cursor-pointer text-base font-semibold`}
            >
              Monthly
            </span>
            <div
              onClick={() => setIsMonthly(!isMonthly)}
              className="flex cursor-pointer items-center"
            >
              <div className="relative">
                <div className="h-5 w-14 rounded-full bg-[#1D2144] shadow-inner"></div>
                <div
                  className={`${"" : "translate-x-full"
                    } shadow-switch-1 absolute left-0 top-[-4px] flex h-7 w-7 items-center justify-center rounded-full bg-primary transition`}
                >
                  <span className="active h-4 w-4 rounded-full bg-white"></span>
                </div>
              </div>
            </div>
            <span
              onClick={() => setIsMonthly(false)}
              className={`${isMonthly
                ? "text-dark dark:text-white"
                : "pointer-events-none text-primary"
                } ml-4 cursor-pointer text-base font-semibold`}
            >
              Yearly
            </span>
          </div>
        </div> */}

      <div className="container flex justify-around items-start">
        <JobPostPricingBox
          packageName="Job Post monthly"
          price={"100"}
          duration={"mo"}
          priceId={process.env.NEXT_PUBLIC_ONE_MONTH}
          subtitle="1 day trial – Cancel anytime"
          isSectionTitle={isSectionTitle}
          handleSubscription={(total: any) => handleSubscription(total)}
        >
          <OfferList text="All UI Components" status="active" />
          <OfferList text="Use with Unlimited Projects" status="active" />
          <OfferList text="Commercial Use" status="active" />
          <OfferList text="Lifetime Access" status="active" />
          <OfferList text="Free Lifetime Updates" status="active" />
        </JobPostPricingBox>

        <JobPostPricingBox
          packageName="Job Post 3 monthly"
          price={"275"}
          duration={"mo"}
          priceId={process.env.NEXT_PUBLIC_SIX_MONTH}
          subtitle="Billed 60 dollars at once"
          isSectionTitle={isSectionTitle}
          handleSubscription={(total: any) => handleSubscription(total)}
        >
          <OfferList text="All UI Components" status="active" />
          <OfferList text="Use with Unlimited Projects" status="active" />
          <OfferList text="Commercial Use" status="active" />
          <OfferList text="Lifetime Access" status="active" />
          <OfferList text="Free Lifetime Updates" status="active" />
        </JobPostPricingBox>

        {/* <OfferList text="All UI Components" status="active" />
            <OfferList text="Use with Unlimited Projects" status="active" />
            <OfferList text="Commercial Use" status="active" />
            <OfferList text="Lifetime Access" status="active" />
            <OfferList text="Free Lifetime Updates" status="active" /> */}
      </div>

      {/* <div className={clsx(isSectionTitle ? "hidden" : "absolute bottom-0 left-0 z-[-1]")}>
        <svg
          width="239"
          height="601"
          viewBox="0 0 239 601"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            opacity="0.3"
            x="-184.451"
            y="600.973"
            width="196"
            height="541.607"
            rx="2"
            transform="rotate(-128.7 -184.451 600.973)"
            fill="url(#paint0_linear_93:235)"
          />
          <rect
            opacity="0.3"
            x="-188.201"
            y="385.272"
            width="59.7544"
            height="541.607"
            rx="2"
            transform="rotate(-128.7 -188.201 385.272)"
            fill="url(#paint1_linear_93:235)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_93:235"
              x1="-90.1184"
              y1="420.414"
              x2="-90.1184"
              y2="1131.65"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_93:235"
              x1="-159.441"
              y1="204.714"
              x2="-159.441"
              y2="915.952"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div> */}
    </section >
  );
};

export default JobPostPrice;

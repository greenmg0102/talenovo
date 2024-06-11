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
        redirectLink: "http://https://talenovo.com/job-post"
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
          <OfferList text="Featured Placement" status="active" />
          <OfferList text="Job Post match with targeted audience" status="active" />
          <OfferList text="Niche Expertise" status="active" />
          <OfferList text="Top Tier Exposure" status="active" />
          <OfferList text="Brand Exposure" status="active" />
          <OfferList text="Quality Candidates" status="active" />
          
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
          <OfferList text="Featured Placement" status="active" />
          <OfferList text="Job Post match with targeted audience" status="active" />
          <OfferList text="Niche Expertise" status="active" />
          <OfferList text="Top Tier Exposure" status="active" />
          <OfferList text="Brand Exposure" status="active" />
          <OfferList text="Quality Candidates" status="active" />

        </JobPostPricingBox>

      </div>

    </section >
  );
};

export default JobPostPrice;

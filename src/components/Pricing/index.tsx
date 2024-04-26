"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import clsx from 'clsx'
import SectionTitle from "../Common/SectionTitle";
import OfferList from "./OfferList";
import PricingBox from "./PricingBox";
import Features from '@/components/Features'


const Pricing = ({ isSectionTitle }: any) => {
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
        priceId: plan.priceId,
        packageName: plan.packageName,
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
      <Features />
      {/* dark:bg-bg-color-dark bg-gray-light  */}
      <div className='pt-12'>
        <div
          className={`w-full mx-auto text-center mt-[60px]`}
          style={{ maxWidth: "570px", marginBottom: "30px" }}
        >

          <h2 className="mb-2 text-3xl font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px] text-center">
            Pricing
          </h2>
          <h4 className="mb-2 text-lg !leading-tight text-black dark:text-white sm:text-xl md:text-[20px] text-center px-2 text-gray-500">
            Subscribe to membership and unlock all jobs
          </h4>
        </div>

        <div className="container grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          <PricingBox
            packageName="Monthly"
            price={"13"}
            duration={"mo"}
            priceId={process.env.NEXT_PUBLIC_ONE_MONTH}
            subtitle="1 day trial – Cancel anytime"
            isSectionTitle={isSectionTitle}
            handleSubscription={(total: any) => handleSubscription(total)}
          />

          <PricingBox
            packageName="6 Months"
            price={"10"}
            duration={"mo"}
            priceId={process.env.NEXT_PUBLIC_SIX_MONTH}
            subtitle="Billed 60 dollars at once"
            isSectionTitle={isSectionTitle}
            handleSubscription={(total: any) => handleSubscription(total)}
          />

          <PricingBox
            packageName="12 Months"
            price={"8"}
            duration={"mo"}
            priceId={process.env.NEXT_PUBLIC_ONE_YEAR}
            subtitle="Billed 96 dollars at once"
            isSectionTitle={isSectionTitle}
            handleSubscription={(total: any) => handleSubscription(total)}
          >
            {/* <OfferList text="All UI Components" status="active" />
            <OfferList text="Use with Unlimited Projects" status="active" />
            <OfferList text="Commercial Use" status="active" />
            <OfferList text="Lifetime Access" status="active" />
            <OfferList text="Free Lifetime Updates" status="active" /> */}
          </PricingBox>
        </div>
      </div>

    </section>
  );
};

export default Pricing;

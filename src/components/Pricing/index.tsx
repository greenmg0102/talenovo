"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { message } from 'antd';
import { useRouter } from 'next/navigation';
import clsx from 'clsx'
import SectionTitle from "../Common/SectionTitle";
import OfferList from "./OfferList";
import PricingBox from "./PricingBox";
import Features from '@/components/Features'

const Pricing = ({ isSectionTitle }: any) => {

  const router = useRouter();

  const [messageApi, contextHolder] = message.useMessage();

  const [isMonthly, setIsMonthly] = useState(true);

  const { user } = useUser();
  const [userData, setUserData] = useState<any>({});

  const [email, setEmail] = useState("");
  const [clerkId, setClerkId] = useState("");

  useEffect(() => {
    if (user) {
      setEmail(user.primaryEmailAddress?.emailAddress || "");
      setClerkId(user.id || "");
    }
  }, [user]);

  const handleSubscription = async (plan: any) => {

    if (user) {
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
    } else {
      router.push('https://accounts.talenovo.com/sign-in#/?redirect_url=https%3A%2F%2Ftalenovo.com%2Fpremium');
    }

  }

  return (
    <section id="pricing" className="relative z-10 pb-16 md:pb-20 lg:pb-28 px-auto">
      {contextHolder}
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
            Subscribe to premium and unlock all jobs
          </h4>
        </div>

        <div className="container grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          <PricingBox
            packageName="Monthly"
            price={"13"}
            duration={"mo"}
            priceId={process.env.NEXT_PUBLIC_ONE_MONTH}
            isSectionTitle={isSectionTitle}
            handleSubscription={(total: any) => handleSubscription(total)}
          >
            <OfferList text={<p className="m-0 text-base font-medium text-body-color">Immediate access to <span className="text-red-500 font-bold">50,000+</span> job</p>} status="active" />
            <OfferList text={<p className="m-0 text-base font-medium text-body-color">Real-time job postings</p>} status="active" />
            <OfferList text={<p className="m-0 text-base font-medium text-body-color">Personalized alerts</p>} status="active" />
            <OfferList text={<p className="m-0 text-base font-medium text-body-color"><span className="text-red-500 font-bold"> Coming soon:</span>AI Resume Feedback & Job Matching</p>} status="active" />
          </PricingBox>

          <PricingBox
            packageName="3 Months"
            price={"10"}
            duration={"mo"}
            priceId={process.env.NEXT_PUBLIC_SIX_MONTH}
            isSectionTitle={isSectionTitle}
            handleSubscription={(total: any) => handleSubscription(total)}
          >
            <OfferList text={<p className="m-0 text-base font-medium text-body-color"><span className="text-red-500 font-bold"> 25% discount</span> <span className="italic">$30 billed at once</span></p>} status="active" />
            <OfferList text={<p className="m-0 text-base font-medium text-body-color">Immediate access to <span className="text-red-500 font-bold">50,000+</span> job</p>} status="active" />
            <OfferList text={<p className="m-0 text-base font-medium text-body-color">Real-time job postings</p>} status="active" />
            <OfferList text={<p className="m-0 text-base font-medium text-body-color">Personalized alerts</p>} status="active" />
            <OfferList text={<p className="m-0 text-base font-medium text-body-color"><span className="text-red-500 font-bold"> Coming soon:</span>AI Resume Feedback & Job Matching</p>} status="active" />
          </PricingBox>

          <PricingBox
            packageName="6 Months"
            price={"8"}
            duration={"mo"}
            priceId={process.env.NEXT_PUBLIC_ONE_YEAR}
            isSectionTitle={isSectionTitle}
            handleSubscription={(total: any) => handleSubscription(total)}
          >
            <OfferList text={<p className="m-0 text-base font-medium text-body-color"><span className="text-red-500 font-bold">30% discount</span> <span className="italic">$48 billed at once</span></p>} status="active" />
            <OfferList text={<p className="m-0 text-base font-medium text-body-color">Immediate access to <span className="text-red-500 font-bold">50,000+</span> job</p>} status="active" />
            <OfferList text={<p className="m-0 text-base font-medium text-body-color">Real-time job postings</p>} status="active" />
            <OfferList text={<p className="m-0 text-base font-medium text-body-color">Personalized alerts</p>} status="active" />
            <OfferList text={<p className="m-0 text-base font-medium text-body-color"><span className="text-red-500 font-bold"> Coming soon:</span>AI Resume Feedback & Job Matching</p>} status="active" />
          </PricingBox>
        </div>
      </div>

    </section>
  );
};

export default Pricing;

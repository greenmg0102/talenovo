"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import SectionTitle from "../Common/SectionTitle";
import OfferList from "./OfferList";
import PricingBox from "./PricingBox";

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
        console.log(data);
        //redirect to checkout page
        window.location.href = data.url;
      })
      .catch(error => {
        // Handle errors
        console.error('There was a problem with the fetch operation:', error);
      });
  }

  const handleCancel = async () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stripe/cancel-subscription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers if needed
      },
      body: JSON.stringify({
        subscriptionId: userData.subscriptionId,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the response body as JSON
      })
      .then(data => {
        window.alert(data.message);
      })
      .catch(error => {
        // Handle errors
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  const handleResume = async () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stripe/re-active-subscription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers if needed
      },
      body: JSON.stringify({
        subscriptionId: userData.subscriptionId,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the response body as JSON
      })
      .then(data => {
        window.alert(data.message);
      })
      .catch(error => {
        // Handle errors
        console.error('There was a problem with the fetch operation:', error);
      });

  };

  const handleDelete = async () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stripe/delete-subscription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers if needed
      },
      body: JSON.stringify({
        subscriptionId: userData.subscriptionId,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the response body as JSON
      })
      .then(data => {
        window.alert(data.message);
      })
      .catch(error => {
        // Handle errors
        console.error('There was a problem with the fetch operation:', error);
      });
  };



  return (
    <section id="pricing" className="relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        <section id="price"></section>

        {
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
        }

        {isSectionTitle === true ?
          <SectionTitle
            title="Simple and Affordable Pricing"
            paragraph="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
            center
            width="665px"
          />
          :
          null
        }


        <div className="w-full">
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
                  className={`${isMonthly ? "" : "translate-x-full"
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
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          <PricingBox
            packageName="Basic Plan"
            price={isMonthly ? "10" : "80"}
            duration={isMonthly ? "mo" : "yr"}
            priceId={isMonthly ? process.env.NEXT_PUBLIC_BASIC_MO : process.env.NEXT_PUBLIC_BASIC_YEAR}
            subtitle="Lorem ipsum dolor sit amet adiscing elit Mauris egestas enim."
            isSectionTitle={isSectionTitle}
            handleSubscription={(total: any) => handleSubscription(total)}
          >
            <OfferList text="All UI Components" status="active" />
            <OfferList text="Use with Unlimited Projects" status="active" />
            <OfferList text="Commercial Use" status="inactive" />
            <OfferList text="Lifetime Access" status="inactive" />
            <OfferList text="Free Lifetime Updates" status="inactive" />
          </PricingBox>

          {/* name:'Basic Plan',
          priceId: process.env.NEXT_PUBLIC_BASIC,
          price:"20$ Monthly" */}

          <PricingBox
            packageName="Pro Plan"
            price={isMonthly ? "15" : "120"}
            duration={isMonthly ? "mo" : "yr"}
            priceId={isMonthly ? process.env.NEXT_PUBLIC_PRO_MO : process.env.NEXT_PUBLIC_PRO_YEAR}
            subtitle="Lorem ipsum dolor sit amet adiscing elit Mauris egestas enim."
            isSectionTitle={isSectionTitle}
            handleSubscription={(total: any) => handleSubscription(total)}
          >
            <OfferList text="All UI Components" status="active" />
            <OfferList text="Use with Unlimited Projects" status="active" />
            <OfferList text="Commercial Use" status="active" />
            <OfferList text="Lifetime Access" status="inactive" />
            <OfferList text="Free Lifetime Updates" status="inactive" />
          </PricingBox>

          <PricingBox
            packageName="Premium Plan"
            price={isMonthly ? "20" : "180"}
            duration={isMonthly ? "mo" : "yr"}
            priceId={isMonthly ? process.env.NEXT_PUBLIC_PREMIUM_MO : process.env.NEXT_PUBLIC_PREMIUM_YEAR}
            subtitle="Lorem ipsum dolor sit amet adiscing elit Mauris egestas enim."
            isSectionTitle={isSectionTitle}
            handleSubscription={(total: any) => handleSubscription(total)}
          >
            <OfferList text="All UI Components" status="active" />
            <OfferList text="Use with Unlimited Projects" status="active" />
            <OfferList text="Commercial Use" status="active" />
            <OfferList text="Lifetime Access" status="active" />
            <OfferList text="Free Lifetime Updates" status="active" />
          </PricingBox>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 z-[-1]">
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
      </div>
    </section>
  );
};

export default Pricing;

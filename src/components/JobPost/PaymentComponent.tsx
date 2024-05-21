import { useState, useEffect } from "react";
import { jobProductionGet } from "@/store/action/admin/jobInfo/jobProduction"
import PaymentItem from '@/components/JobPost/paymentItem'
import { useUser } from "@clerk/nextjs";

const PaymentComponent = ({ value, warn, setValue }: any) => {

  const jobPostPlan = {
    "Job Post monthly": process.env.NEXT_PUBLIC_JOB_POST_ONE_MONTH,
    "Job Post 3 monthly": process.env.NEXT_PUBLIC_JOB_POST_THREE_MONTH
  }

  const { user } = useUser();

  const [productionList] = useState([
    {
      title: "Job Post monthly", price: "100", amount: "Job Post monthly"
    },
    {
      title: "Job Post 3 monthly", price: "275", amount: "Job Post 3 monthly"
    },
  ])

  const email = user?.primaryEmailAddress?.emailAddress;
  const clerkId = user?.id;

  // useEffect(() => {

  //   async function fetchData() {
  //     let result = await jobProductionGet()
  //     setProductionList(result)
  //   }
  //   fetchData()
  // }, [])

  const handleSubscription = async (plan: any) => {

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stripe/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        clerkId,
        priceId: jobPostPlan[plan.priceId],
        packageName: plan.packageName
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
    <div>
      <p className="mb-4">Select Job Posting Plan</p>
      <p className="text-[14px] text-gray-400 mb-4 mt-2">All jobs post will be reviewed prior to publishing, once payment have been process, an email will be sent once job listing is activated.</p>
      {productionList.map((item: any, index: any) =>
        <PaymentItem
          key={index}
          item={item}
          handleSubscription={(total: any) => handleSubscription(total)}
        />
      )}
    </div>
  );
};

export default PaymentComponent;

import React from "react";
import KadoaJobItem from '@/components/Hero/job/KadoaJobItem'
import Link from "next/link";
import '@/styles/landing.css'
import LinkedinJobItem from '@/components/Hero/job/LinkedinJobItem'
import PaidJobPostItem from '@/components/Hero/job/PaidJobPostItem'
import GoogleJobItem from '@/components/Hero/job/googleJobItem'

import clsx from 'clsx'

const JobCard = ({ item, clerkId, hiddenBookMark, setIsDetail }: any) => {

  return (
    <div
      className={
        clsx(
          "border border-gray-300 bg-white rounded-md px-2 mb-2 cursor-pointer transition-all hover:shadow-lg hover:border-blue-500",
          item.__position > 17 ? "blur_background rounded-md" : ""
        )
      }
    >
      {item.platform === "apify" && item.subType === "linkedin" ?
        <LinkedinJobItem
          item={item}
          clerkId={clerkId}
          hiddenBookMark={hiddenBookMark}
          setIsDetail={(data: any) => setIsDetail(data)}
        /> : null
      }
      {item.platform === "apify" && item.subType === "google" ?
        <GoogleJobItem
          item={item}
          clerkId={clerkId}
          hiddenBookMark={hiddenBookMark}
          setIsDetail={(data: any) => setIsDetail(data)}
        /> : null
      }
      {item.platform === "kadoa" && item.subType === "portalprocomservices" ?
        <KadoaJobItem
          item={item}
          clerkId={clerkId}
          hiddenBookMark={hiddenBookMark}
          setIsDetail={(data: any) => setIsDetail(data)}
        /> : null
      }
      {item.platform === "talenovo" && item.subType === "paid" ?
        <PaidJobPostItem
          item={item}
          clerkId={clerkId}
          hiddenBookMark={hiddenBookMark}
          setIsDetail={(data: any) => setIsDetail(data)}
        /> : null
      }

      <div className={clsx(item.__position > 17 ? "transbox rounded-md" : "hidden")}>
        <p className="text-blue-500 font-bold">
          <Link
            href="/premium"
            className=""
          >
            <span className="underline mr-2">
              Subscribe
            </span>
          </Link>
          to membership and unlock all jobs.
        </p>
      </div>
    </div>
  );
};

export default JobCard;

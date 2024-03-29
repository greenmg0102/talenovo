import React from "react";
import KadoaJobItem from '@/components/Hero/job/KadoaJobItem'
import LinkedinJobItem from '@/components/Hero/job/LinkedinJobItem'

const JobCard = ({ item, setIsDetail }: any) => {
  return (
    <div className="border border-gray-300  bg-white rounded-md px-2 mb-2 cursor-pointer transition-all hover:shadow-lg hover:border-blue-500">
      {item.platform === "apify" && item.subType === "linkedin" ?
        <LinkedinJobItem
          item={item}
          setIsDetail={(data: any) => setIsDetail(data)}
        /> : null
      }
      {item.platform === "kadoa" && item.subType === "portalprocomservices" ?
        <KadoaJobItem
          item={item}
          setIsDetail={(data: any) => setIsDetail(data)}
        /> : null
      }
    </div>
  );
};

export default JobCard;

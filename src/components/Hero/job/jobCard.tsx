import React from "react";
import KadoaJobItem from '@/components/Hero/job/KadoaJobItem'
import LinkedinJobItem from '@/components/Hero/job/LinkedinJobItem'

const JobCard = ({ item }: any) => {
  return (
    <div className="border border-gray-300 bg-gray-50 rounded-md px-2 mb-2 cursor-pointer transition-all hover:shadow-lg hover:border-blue-500">
      {item.platform === "apify" && item.subType === "linkedin" ?
        <LinkedinJobItem item={item} /> : null
      }
      {item.platform === "kadoa" && item.subType === "portalprocomservices" ?
        <KadoaJobItem item={item} /> : null
      }
    </div>
  );
};

export default JobCard;

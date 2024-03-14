import React from "react";
import KadoaJobItem from '@/components/Hero/job/KadoaJobItem'
import LinkedinJobItem from '@/components/Hero/job/LinkedinJobItem'

const JobCard = ({ item }: any) => {
  return (
    <div className="border border-dashed border-gray-200 rounded-[8px] rounded-tl-none rounded-tr-none mb-2 transition-all hover:shadow-lg">
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

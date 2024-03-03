"use client"
import { useState } from "react";
import Category from "@/components/Admin/category/Category";
import OurJobPostAdmin from "@/components/Admin/OurJobPostAdmin";
import OtherJobPostAdmin from "@/components/Admin/OtherJobPostAdmin";
import Paylog from "@/components/Admin/Paylog";
import UserAdmin from "@/components/Admin/UserAdmin";
// import BusinessAnalyze from "@/components/Admin/BusinessAnalyze";
import categoryData from '@/components/Admin/categoryData'

import Breadcrumb from "@/components/Common/Breadcrumb";

// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Admin Page | Fir mangers",
//   description: "This is Admin Page for Talenovo",
//   // other metadata
// };

const Admin = () => {

  const [categoryIndex, setCategoryIndex] = useState(0)

  const categoryObject = {
    0: <UserAdmin />,
    1: <OurJobPostAdmin />,
    2: <OtherJobPostAdmin />,
    3: <Paylog />,
    // 4: <BusinessAnalyze />
  }

  return (
    <>
      <Breadcrumb
        pageName="Admin Panel"
        description="Mange your project and lead them to success."
      />

      <section className="pb-[120px] pt-[12px]">
        <div className="container">

          <div className="flex justify-between items-start flex-wrap">
            <div className="w-full md:w-1/5">
              <Category
                list={categoryData}
                activeCategory={categoryIndex}
                setCategoryIndex={(id: number) => setCategoryIndex(id)}
              />
            </div>
            <div className="w-full md:w-4/5 pl-2">
              {categoryObject[categoryIndex]}
            </div>
          </div>

          <div className="-mx-4 flex flex-wrap" data-wow-delay=".15s">
            <div className="w-full px-4">

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Admin;

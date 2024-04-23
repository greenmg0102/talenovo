import Breadcrumb from "@/components/Common/Breadcrumb";
import Pricing from '@/components/Pricing'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Price Page | We support your career with AI",
  description: "This is Price Page for Talenovo",
  // other metadata
};

const PricePage = () => {
  return (
    <>
      <section className="pb-[60px] pt-12 sm:pt-20 md:pt-40">
        <div className="flex justify-center items-start flex-wrap">
          <Pricing isSectionTitle={false} />
        </div>
      </section>
    </>
  );
};

export default PricePage;

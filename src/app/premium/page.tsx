import Breadcrumb from "@/components/Common/Breadcrumb";
import Pricing from '@/components/Pricing'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Talenovo Premium Features | Streamline your job search with intelligent technology that brings you the best-matched jobs, saving you time and effort",
  description: "This is Talenovo Premium Features",
  // other metadata
};

const PricePage = () => {
  return (
    <>
      <section className="pb-[60px] pt-12">
        <div className="flex justify-center items-start flex-wrap">
          <Pricing isSectionTitle={false} />
        </div>
      </section>
    </>
  );
};

export default PricePage;

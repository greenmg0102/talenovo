import Breadcrumb from "@/components/Common/Breadcrumb";
import Pricing from '@/components/Pricing'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Price Page | Free Next.js Template for Startup and SaaS",
  description: "This is Price Page for Startup Nextjs Template",
  // other metadata
};

const PricePage = () => {
  return (
    <>
      {/* <Breadcrumb
        pageName="Price Page"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
      /> */}
      <section className="pb-[60px] pt-12 sm:pt-20 md:pt-40">
        <div className="flex justify-center items-start flex-wrap">
          <Pricing isSectionTitle={false} />
        </div>
      </section>
    </>
  );
};

export default PricePage;

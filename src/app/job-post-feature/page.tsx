import JobPostMain from "@/components/JobPost";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import Testimonials from '@/components/Testimonials'
import JobPostPrice from '@/components/Pricing/JobPostPrice'
import JobPostFeature from '@/components/Features/JobPostFeature'

export const metadata: Metadata = {
  title: "Job Post | Hire technique",
  description: "Post yoFind the people and talent you need to help your business thrive. Reach over 30000+ view pers month",
  // other metadata
};

const JobPostNewFeature = () => {
  return (
    <>
      <section className="pb-[120px] pt-[48px]">
        <div className="container">
          <JobPostFeature />
          <section id="price"></section>

          <div className='pt-12'>
            <div
              className={`w-full mx-auto text-center mt-[60px]`}
              style={{ maxWidth: "570px", marginBottom: "30px" }}
            >

              <h2 className="mb-2 text-3xl font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px] text-center">
                Pricing
              </h2>
              <h4 className="mb-2 text-lg !leading-tight text-black dark:text-white sm:text-xl md:text-[20px] text-center px-2 text-gray-500">
                Subscribe to membership and unlock all jobs
              </h4>
            </div>
            <JobPostPrice isSectionTitle={true} />
          </div>
        </div>
      </section>
    </>
  );
};

export default JobPostNewFeature;

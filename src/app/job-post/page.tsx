import JobPostMain from "@/components/JobPost";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Job Post | Hire technique",
  description: "Post yoFind the people and talent you need to help your business thrive. Reach over 30000+ view pers month",
  // other metadata
};

const JobPost = () => {
  return (
    <>
      {/* <Breadcrumb
        pageName="Job Post"
        description="Post yoFind the people and talent you need to help your business thrive. Reach over 30000+ view pers month."
      /> */}

      <section className="pb-[120px] pt-[48px]">
        <div className="container">
          <JobPostMain />
        </div>
      </section>
    </>
  );
};

export default JobPost;

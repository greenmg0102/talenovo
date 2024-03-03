
import JobPostMain from "@/components/JobPost";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Job Post | Hire technique",
  description: "Post your company job and connect with the suitable team or acency",
  // other metadata
};

const JobPost = () => {

  return (
    <>
      <Breadcrumb
        pageName="Job Post"
        description="Post your company job and connect with the suitable team or acency."
      />

      <section className="pb-[120px] pt-[12px]">
        <div className="container">
          <JobPostMain />
        </div>
      </section>
    </>
  );
};

export default JobPost;

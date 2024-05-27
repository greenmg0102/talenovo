import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import { jobPostFeaturesData } from "./featuresData";

const JobPostFeature = () => {

  return (
    <>
      <section id="features" className=" py-8 pb-2 md:py-12 md:pb-2 lg:py-20 lg:pb-2">
        <div className="container">

          <h2 className="mb-2 text-3xl font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px] text-center">
            A simplified hiring experience
          </h2>
          <h4 className="mb-2 text-lg !leading-tight text-black dark:text-white sm:text-xl md:text-[20px] text-center px-2 sm:px-24 md:px-40 text-gray-500">
            Start attracting qualified candidates today
          </h4>

          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3 pt-12">
            
            {jobPostFeaturesData.map((feature: any) => (
              <SingleFeature key={feature.id} feature={feature} />
            ))}

          </div>
        </div>
      </section>
    </>
  );
};

export default JobPostFeature;

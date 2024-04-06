import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";

const Features = () => {
  return (
    <>
      <section id="features" className="dark:bg-bg-color-dark bg-gray-light  py-8 md:py-12 lg:py-20">
        <div className="container">

          <h2 className="mb-2 text-3xl font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px] text-center">
            Talenovo Premium Features
          </h2>
          <h4 className="mb-2 text-lg !leading-tight text-black dark:text-white sm:text-xl md:text-[20px] text-center px-2 sm:px-24 md:px-40 text-gray-500">
            Unlock your Career Potential: Navigate your next opportunity with ease with Talenovo's exclusive membership
          </h4>

          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3 pt-12">
            {featuresData.map((feature) => (
              <SingleFeature key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;

import Breadcrumb from "@/components/Common/Breadcrumb";
import UserBannerMain from '@/components/UserProfile/UserBannerMain';
import UserInfoMain from '@/components/UserProfile/UserInfoMain';

import { Metadata } from "next";
+9
export const metadata: Metadata = {
  title: "User Profile Page | User Profile Page",
  description: "This is User Profile Page  Page for the user",
  // other metadata
};

const UserProfile = () => {
  return (
    <>
      <Breadcrumb
        pageName="User Profile"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
      />
      <section className="pb-[120px] pt-[30px]">
        <div className="container flex justify-between items-start flex-wrap">
          <div className="w-full lg:w-[35%] pr-0 lg:pr-4">
            <div className="border border-gray-200 rounded-[16px] p-4 shadow-2xl">
              <UserBannerMain />
            </div>
          </div>
          <div className="w-full lg:w-[65%] border border-gray-200 rounded-[16px] p-4 shadow-2xl">
            <UserInfoMain />
          </div>
        </div>
      </section>
    </>
  );
};

export default UserProfile;

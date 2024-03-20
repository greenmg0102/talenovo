import Breadcrumb from "@/components/Common/Breadcrumb";
import UserInitialInfo from "@/components/UserProfile/UserInitialInfo";
import UserDashboard from "@/components/UserProfile/UserDashboard";

import { Metadata } from "next";

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
        <div className="container">
          <UserInitialInfo />
          <UserDashboard />
        </div>
      </section>
    </>
  );
};

export default UserProfile;

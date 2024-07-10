import MyProfilePage from '@/components/myJob/MyProfile';

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Profile Page | User Profile Page",
  description: "This is User Profile Page  Page for the user",
  // other metadata
};

const MyProfile = () => {
  return (
    <MyProfilePage />
  );
};

export default MyProfile;

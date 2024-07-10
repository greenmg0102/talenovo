import MyJobAlertPage from '@/components/myJob/MyJobAlert';

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Profile Page | User Profile Page",
  description: "This is User Profile Page  Page for the user",
  // other metadata
};

const MyJobAlert = () => {
  return (
    <MyJobAlertPage />
  );
};

export default MyJobAlert;

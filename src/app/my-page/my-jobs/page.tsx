import MyJobsPage from '@/components/myJob/MyJobs';

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Profile Page | User Profile Page",
  description: "This is User Profile Page  Page for the user",
  // other metadata
};

const MyJobs = () => {
  return (
    <MyJobsPage />
  );
};

export default MyJobs;

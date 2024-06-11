import ToalMyJobPage from '@/components/UserProfile/ToalMyJobPage';

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Profile Page | User Profile Page",
  description: "This is User Profile Page  Page for the user",
  // other metadata
};

const UserProfile = () => {
  return (
    <ToalMyJobPage />
  );
};

export default UserProfile;

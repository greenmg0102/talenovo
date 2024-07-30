import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Page | Streamline your job search with intelligent technology that brings you the best-matched jobs, saving you time and effort",
  description: "This is Contact Page for Talenovo",
  // other metadata
};

const ContactPage = () => {
  return (
    <Contact />
  );
};

export default ContactPage;

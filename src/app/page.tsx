import Document, { Html, Head, Main, NextScript } from 'next/document';
import { Metadata } from "next";
import Landing from '@/components/Landing'

export const metadata: Metadata = {
  title: "Talenovo | Connecting Talent to Opportunity",
  description: "Streamline your job search with intelligent technology that brings you the best-matched jobs, saving you time and effort",
  // other metadata
};

export default function Home() {

  return (
    <Landing />
  );
}

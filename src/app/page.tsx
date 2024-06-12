import Document, { Html, Head, Main, NextScript } from 'next/document';
import { Metadata } from "next";
import Landing from '@/components/Landing'

export const metadata: Metadata = {
  title: "Talenovo | Connecting Talent to Opportunity",
  description: "We support your career with AI",
  // other metadata
};

export default function Home() {

  return (
    <Landing />
  );
}

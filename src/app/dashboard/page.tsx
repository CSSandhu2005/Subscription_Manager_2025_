"use client";

import { HeroHeader } from "@/components/header";
import HeroSection from "@/components/hero-section";
import { useUser } from "@clerk/nextjs";

export default function DashboardPage() {
  const { user } = useUser();
  return (
    <>
    <HeroHeader/>
      <div className="p-20 ml-20">
        <h1>Hi, There WelCome To Subscrtiption Manager CLPBL...</h1>
        <h1>{user?.firstName} Thank You For Logging In.</h1>
        <h2>The DashBoard Is In DevelopMent Mode.</h2>
      </div>
    </>
  );
}

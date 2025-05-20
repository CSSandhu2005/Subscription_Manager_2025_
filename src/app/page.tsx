import { HeroHeader } from "@/components/header";
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-8";
import FAQsTwo from "@/components/faqs-2";
import FooterSection from "@/components/footer";
import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const authData= await auth() ; 

  if (authData.userId) {
    redirect("/dashboard") ; 
  }
  return (
    <>
      <ClerkProvider>
        <HeroHeader />
        <HeroSection />
        <FeaturesSection />
        <FAQsTwo />
        <FooterSection />
      </ClerkProvider>
    </>
  );
}

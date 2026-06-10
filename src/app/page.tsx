"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/organisms/Navbar";
import { Hero } from "@/components/organisms/Hero";
import { About } from "@/components/organisms/About";
import { Stats } from "@/components/organisms/Stats";
import { Differentiators } from "@/components/organisms/Differentiators";
import { Testimonials } from "@/components/organisms/Testimonials";
import { Pricing } from "@/components/organisms/Pricing";
import { CtaSection } from "@/components/organisms/CtaSection";
import { Faq } from "@/components/organisms/Faq";
import { Footer } from "@/components/organisms/Footer";

export default function MarketingPage() {
  const { initializing, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!initializing && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, initializing, router]);

  if (initializing || isAuthenticated) {
    return null;
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Stats />
        <Differentiators />
        <Testimonials />
        <Pricing />
        <CtaSection />
        <Faq />
      </main>
      <Footer />
    </>
  );
}

/**
 * Landing page — public-facing marketing page with hero, social proof, features,
 * how-it-works, pricing, testimonials, CTA, and footer.
 */
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { SocialProof } from "@/components/landing/SocialProof";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Pricing } from "@/components/landing/Pricing";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <SocialProof />
        <div id="features"><Features /></div>
        <div id="how-it-works"><HowItWorks /></div>
        <div id="pricing"><Pricing /></div>
        <div id="testimonials"><Testimonials /></div>
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

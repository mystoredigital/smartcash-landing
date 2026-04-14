import { Header } from '@/components/sections/Header';
import { Hero } from '@/components/sections/Hero';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Features } from '@/components/sections/Features';
import { Benefits } from '@/components/sections/Benefits';
import { Pricing } from '@/components/sections/Pricing';
import { FAQ } from '@/components/sections/FAQ';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';

import { ScrollIndicator } from '@/components/ui/ScrollIndicator';
import { FloatingParticles } from '@/components/ui/FloatingParticles';

export default function Home() {
  return (
    <main className="min-h-screen bg-dark-950 custom-scrollbar relative">
      {/* Premium UI Components */}
      <ScrollIndicator />
      <FloatingParticles count={15} />

      {/* Header with navigation */}
      <Header />

      {/* Hero section */}
      <Hero />

      {/* How it works */}
      <HowItWorks />

      {/* Features */}
      <Features />

      {/* Benefits */}
      <Benefits />

      {/* Pricing */}
      <Pricing />

      {/* FAQ */}
      <FAQ />

      {/* Contact form */}
      <Contact />

      {/* Footer */}
      <Footer />
    </main>
  );
}

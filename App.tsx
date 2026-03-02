
import React, { useState } from 'react';
import { BackgroundGlows } from './src/components/BackgroundGlows';
import { Header } from './src/components/Header';
import { Hero } from './src/components/Hero';
import { BentoGrid } from './src/components/BentoGrid';
import { StrategySection } from './src/components/StrategySection';
import { CalendarSection } from './src/components/CalendarSection';
import { Footer } from './src/components/Footer';
import { MobileStickyCTA } from './src/components/MobileStickyCTA';

/** Smooth-scroll helper – scrolls to #strategy-session */
const scrollToCalendar = (e?: React.MouseEvent) => {
  e?.preventDefault();
  const target = document.getElementById('strategy-session');
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen selection:bg-[#1E90FF] selection:text-white">
      <BackgroundGlows />

      <Header
        scrollToCalendar={scrollToCalendar}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <main>
        <Hero scrollToCalendar={scrollToCalendar} />
        <BentoGrid />
        <StrategySection scrollToCalendar={scrollToCalendar} />
        <CalendarSection />
      </main>

      <Footer />

      {/* Mobile Sticky CTA – tel: link */}
      <MobileStickyCTA />
    </div>
  );
}

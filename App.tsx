
import React, { useState } from 'react';
import { BackgroundGlows } from './src/components/BackgroundGlows';
import { Header } from './src/components/Header';
import { Hero } from './src/components/Hero';
import { BentoGrid } from './src/components/BentoGrid';
import { StrategySection } from './src/components/StrategySection';
import { Footer } from './src/components/Footer';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [buildStatus, setBuildStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleBuildAsset = async () => {
    if (buildStatus !== 'idle') return;
    setBuildStatus('loading');

    try {
      // Handshake with Hybrid Bridge
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'Entry Offer Handshake',
          contact: { email: 'entry_offer@mocion.core' },
          qualification: {
            status: 'Deployment Request',
            timestamp: new Date().toISOString(),
            session_id: crypto.randomUUID()
          }
        })
      });

      if (response.ok) {
        setBuildStatus('success');
      } else {
        console.error('Handshake Failed');
        setBuildStatus('idle'); // Reset on failure
      }
    } catch (e) {
      console.error('Connection Error', e);
      setBuildStatus('idle');
    }

    setTimeout(() => setBuildStatus('idle'), 3000);
  };

  return (
    <div className="min-h-screen selection:bg-[#1E90FF] selection:text-white">
      <BackgroundGlows />

      <Header
        buildStatus={buildStatus}
        handleBuildAsset={handleBuildAsset}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <main>
        <Hero buildStatus={buildStatus} handleBuildAsset={handleBuildAsset} />
        <BentoGrid />
        <StrategySection buildStatus={buildStatus} handleBuildAsset={handleBuildAsset} />
      </main>

      <Footer />
    </div>
  );
}

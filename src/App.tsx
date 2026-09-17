import React, { useState, useEffect } from 'react';
import { Page } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { StickyCallBanner } from './components/StickyCallBanner';
import { QuoteModal } from './components/QuoteModal';
import { HomePage } from './pages/HomePage';
import { WaterLeakPage } from './pages/WaterLeakPage';
import { GasLeakPage } from './pages/GasLeakPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { DisclaimerPage } from './pages/DisclaimerPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteServiceType, setQuoteServiceType] = useState<'water' | 'gas' | 'both' | 'inspection'>('water');

  // Handle URL hash changes if present
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '') as Page;
      if (['home', 'water-leak', 'gas-leak', 'about', 'contact', 'privacy', 'disclaimer'].includes(hash)) {
        setCurrentPage(hash);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Synchronize concise, high-ranking document titles (under 60 characters)
  useEffect(() => {
    const titles: Record<Page, string> = {
      'home': 'Leak Detection Pro | North Mountain Village, Phoenix AZ',
      'water-leak': 'Water Leak Detection | North Mountain Village, Phoenix',
      'gas-leak': 'Gas Leak Detection | North Mountain Village, Phoenix',
      'about': 'About Us | Leak Detection Pro Phoenix AZ',
      'contact': 'Contact Us | Leak Detection Pro Phoenix AZ',
      'privacy': 'Privacy Policy | Leak Detection Pro',
      'disclaimer': 'Legal Disclaimers | Leak Detection Pro'
    };
    document.title = titles[currentPage] || titles.home;
  }, [currentPage]);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQuote = (service: 'water' | 'gas' = 'water') => {
    setQuoteServiceType(service);
    setIsQuoteModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      {/* Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenQuote={() => handleOpenQuote('water')}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage onNavigate={handleNavigate} onOpenQuote={handleOpenQuote} />
        )}
        {currentPage === 'water-leak' && (
          <WaterLeakPage onNavigate={handleNavigate} onOpenQuote={handleOpenQuote} />
        )}
        {currentPage === 'gas-leak' && (
          <GasLeakPage onNavigate={handleNavigate} onOpenQuote={handleOpenQuote} />
        )}
        {currentPage === 'about' && (
          <AboutPage onNavigate={handleNavigate} onOpenQuote={() => handleOpenQuote('water')} />
        )}
        {currentPage === 'contact' && (
          <ContactPage onNavigate={handleNavigate} onOpenQuote={() => handleOpenQuote('water')} />
        )}
        {currentPage === 'privacy' && (
          <PrivacyPolicyPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'disclaimer' && (
          <DisclaimerPage onNavigate={handleNavigate} onOpenQuote={() => handleOpenQuote('water')} />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Mobile Sticky Quick Call & Dispatch Banner */}
      <StickyCallBanner onOpenQuote={() => handleOpenQuote('water')} />

      {/* Global Interactive Quote / Dispatch Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        serviceType={quoteServiceType}
      />
    </div>
  );
}

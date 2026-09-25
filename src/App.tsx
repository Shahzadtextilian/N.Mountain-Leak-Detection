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

  const getPathForPage = (page: Page): string => {
    return page === 'home' ? '/' : `/${page}`;
  };

  const getPageFromLocation = (): Page => {
    const pathname = window.location.pathname.replace(/^\/+|\/+$/g, '');
    const validPages: Page[] = ['home', 'water-leak', 'gas-leak', 'about', 'contact', 'privacy', 'disclaimer'];
    
    if (validPages.includes(pathname as Page)) {
      return pathname as Page;
    }

    // Support legacy incoming hash links and normalize them
    const hash = window.location.hash.replace(/^#+/, '');
    if (validPages.includes(hash as Page)) {
      return hash as Page;
    }

    return 'home';
  };

  // Handle URL changes cleanly via HTML5 History without hash-based redirect loops
  useEffect(() => {
    const handleLocationChange = () => {
      const page = getPageFromLocation();
      setCurrentPage(page);

      // If user landed via legacy hash link (e.g. /#water-leak), normalize URL cleanly without reload
      if (window.location.hash) {
        const cleanPath = getPathForPage(page);
        window.history.replaceState(null, '', cleanPath);
      }
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Synchronize concise, high-ranking document titles & meta descriptions as per Google Guidelines
  useEffect(() => {
    const origin = typeof window !== 'undefined' && window.location.origin && !window.location.origin.includes('localhost') && !window.location.origin.includes('run.app')
      ? window.location.origin
      : 'https://northmountainleakdetection.vercel.app';

    const seoData: Record<Page, { title: string; description: string; canonical: string }> = {
      'home': {
        title: 'Leak Detection Pro | North Mountain Village, Phoenix AZ',
        description: '24/7 water and gas leak detection in North Mountain Village, Phoenix AZ (85029, 85022, 85023, 85053). Certified slab leak & line specialists. Call (602) 836-3562.',
        canonical: `${origin}/`
      },
      'water-leak': {
        title: 'Water Leak Detection | North Mountain Village, Phoenix',
        description: 'Emergency slab leak detection & acoustic water pipe locating in North Mountain Village Phoenix AZ. Non-invasive diagnostics. Call (602) 836-3562 for 24/7 service.',
        canonical: `${origin}/water-leak`
      },
      'gas-leak': {
        title: 'Gas Leak Detection | North Mountain Village, Phoenix',
        description: '24/7 emergency natural gas leak detection & pipe pressure testing in North Mountain Village Phoenix. Fast response & safety shutoff. Call (602) 836-3562.',
        canonical: `${origin}/gas-leak`
      },
      'about': {
        title: 'About Us | Leak Detection Pro Phoenix AZ',
        description: 'Learn about Leak Detection Pro in North Mountain Village, Phoenix AZ. Connecting property owners with licensed leak detection specialists. Call (602) 836-3562.',
        canonical: `${origin}/about`
      },
      'contact': {
        title: 'Contact Us | Leak Detection Pro Phoenix AZ',
        description: 'Contact Leak Detection Pro at 2810 W Sahuaro Dr, Phoenix AZ 85029. 24/7 dispatch across North Mountain Village zip codes 85029, 85022, 85023. Call (602) 836-3562.',
        canonical: `${origin}/contact`
      },
      'privacy': {
        title: 'Privacy Policy | Leak Detection Pro',
        description: 'Review the privacy policy for Leak Detection Pro. Learn how we handle consumer inquiries, contact details, and quote requests in Phoenix, AZ.',
        canonical: `${origin}/privacy`
      },
      'disclaimer': {
        title: 'Legal Disclaimers | Leak Detection Pro',
        description: 'Important legal disclaimers, licensing disclosures, and terms for Leak Detection Pro contractor referral services in Phoenix and Maricopa County.',
        canonical: `${origin}/disclaimer`
      }
    };

    const currentSeo = seoData[currentPage] || seoData.home;
    document.title = currentSeo.title;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', currentSeo.description);
    }

    // Update OpenGraph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', currentSeo.title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', currentSeo.description);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', currentSeo.canonical);

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', currentSeo.canonical);
    }
  }, [currentPage]);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    const newPath = getPathForPage(page);
    if (window.location.pathname !== newPath) {
      window.history.pushState(null, '', newPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQuote = (service: 'water' | 'gas' = 'water') => {
    setQuoteServiceType(service);
    setIsQuoteModalOpen(true);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden flex flex-col bg-slate-50 font-sans text-slate-900">
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

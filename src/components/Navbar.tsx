import React, { useState } from 'react';
import { Phone, ShieldAlert, Droplets, Flame, Menu, X, MapPin, Clock, Info } from 'lucide-react';
import { Page } from '../types';
import { BUSINESS_INFO } from '../data/content';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onOpenQuote: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onOpenQuote }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (page: Page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Top Banner: Local Address & Emergency Hotline */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 min-w-0">
            <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
            <span className="text-slate-300 truncate text-xs">
              <span className="hidden sm:inline">Serving North Mountain Village &amp; North Phoenix (Zips: 85029, 85022, 85023, 85053) &bull; </span>
              <span>2810 W Sahuaro Dr</span>
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-xs font-medium shrink-0 ml-auto">
            <div className="hidden md:flex items-center gap-1 text-emerald-400">
              <Clock className="w-3 h-3" />
              <span>24/7 Emergency Dispatch</span>
            </div>
            <a
              href={BUSINESS_INFO.telLink}
              className="text-white hover:text-emerald-300 font-bold flex items-center gap-1.5 transition-colors whitespace-nowrap"
              title="Call 24/7 Emergency Dispatch Hotline"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span className="tracking-tight">{BUSINESS_INFO.phoneFormatted}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[72px] lg:min-h-[76px] py-2 gap-2 lg:gap-4">
          {/* Brand Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2.5 sm:gap-3 text-left group focus:outline-none shrink-0"
            id="brand-logo-btn"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform shrink-0">
              <Droplets className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl xl:text-2xl font-extrabold tracking-tight text-slate-900 whitespace-nowrap">
                  Leak Detection <span className="text-blue-600">Pro</span>
                </span>
                <span className="bg-blue-50/80 text-blue-700 text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full border border-blue-200/80 whitespace-nowrap hidden md:inline-flex">
                  North Mountain Village, AZ
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden 2xl:block whitespace-nowrap mt-0.5">
                Phoenix Water &amp; Gas Leak Detection &amp; Repair
              </p>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 shrink">
            <button
              onClick={() => handleNav('home')}
              className={`px-2 xl:px-3 py-2 rounded-lg text-xs xl:text-sm font-medium transition-colors whitespace-nowrap ${
                currentPage === 'home'
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
              }`}
              id="nav-link-home"
            >
              Home
            </button>

            <button
              onClick={() => handleNav('water-leak')}
              className={`px-2 xl:px-3 py-2 rounded-lg text-xs xl:text-sm font-medium flex items-center gap-1 xl:gap-1.5 transition-colors whitespace-nowrap ${
                currentPage === 'water-leak'
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
              }`}
              id="nav-link-water"
            >
              <Droplets className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-blue-500 shrink-0" />
              <span>Water Leak<span className="hidden xl:inline"> Detection</span></span>
            </button>

            <button
              onClick={() => handleNav('gas-leak')}
              className={`px-2 xl:px-3 py-2 rounded-lg text-xs xl:text-sm font-medium flex items-center gap-1 xl:gap-1.5 transition-colors whitespace-nowrap ${
                currentPage === 'gas-leak'
                  ? 'bg-amber-50 text-amber-800 font-semibold'
                  : 'text-slate-700 hover:text-amber-700 hover:bg-slate-50'
              }`}
              id="nav-link-gas"
            >
              <Flame className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-amber-500 shrink-0" />
              <span>Gas Leak<span className="hidden xl:inline"> Detection</span></span>
            </button>

            <button
              onClick={() => handleNav('about')}
              className={`px-2 xl:px-3 py-2 rounded-lg text-xs xl:text-sm font-medium transition-colors whitespace-nowrap ${
                currentPage === 'about'
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
              }`}
              id="nav-link-about"
            >
              About Us
            </button>

            <button
              onClick={() => handleNav('contact')}
              className={`px-2 xl:px-3 py-2 rounded-lg text-xs xl:text-sm font-medium transition-colors whitespace-nowrap ${
                currentPage === 'contact'
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
              }`}
              id="nav-link-contact"
            >
              Contact Us
            </button>
          </nav>

          {/* Desktop Right Phone CTA */}
          <div className="hidden sm:flex items-center gap-2 xl:gap-3 shrink-0">
            <a
              href={BUSINESS_INFO.telLink}
              className="flex items-center gap-2 xl:gap-2.5 bg-red-600 hover:bg-red-700 text-white px-3 xl:px-3.5 py-1.5 xl:py-2 rounded-xl font-bold shadow-md shadow-red-600/20 transition-all hover:scale-102 active:scale-98 shrink-0 whitespace-nowrap"
              id="header-call-btn"
            >
              <div className="w-7 h-7 xl:w-8 xl:h-8 rounded-full bg-white/20 flex items-center justify-center animate-pulse shrink-0">
                <Phone className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-white" />
              </div>
              <div className="text-left leading-tight">
                <div className="text-[9px] xl:text-[10px] uppercase tracking-wider font-semibold text-red-100">
                  24/7 Emergency Line
                </div>
                <div className="text-sm xl:text-base tracking-tight font-extrabold text-white">
                  {BUSINESS_INFO.phoneFormatted}
                </div>
              </div>
            </a>

            <button
              onClick={onOpenQuote}
              className="hidden 2xl:inline-flex px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-sm font-semibold transition-colors border border-slate-300 shrink-0 whitespace-nowrap"
              id="header-quote-btn"
            >
              Get Dispatch Quote
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={BUSINESS_INFO.telLink}
              className="sm:hidden p-2.5 bg-red-600 text-white rounded-xl flex items-center justify-center shadow-xs"
              aria-label="Call Emergency Hotline"
              id="mobile-quick-call"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 border border-slate-200 focus:outline-none"
              aria-label="Toggle navigation menu"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2">
          <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-xs text-blue-900 mb-3">
            <p className="font-semibold text-blue-950">North Mountain Village Lead Matching Service</p>
            <p className="text-blue-800 mt-0.5">
              2810 W Sahuaro Dr, Phoenix, AZ (Serving 85029, 85022, 85023, 85053) • Free dispatch estimate
            </p>
          </div>

          <button
            onClick={() => handleNav('home')}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium ${
              currentPage === 'home' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-800'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNav('water-leak')}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 ${
              currentPage === 'water-leak' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-800'
            }`}
          >
            <Droplets className="w-4 h-4 text-blue-500" />
            Water Leak Detection
          </button>
          <button
            onClick={() => handleNav('gas-leak')}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 ${
              currentPage === 'gas-leak' ? 'bg-amber-50 text-amber-800 font-semibold' : 'text-slate-800'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-500" />
            Gas Leak Detection
          </button>
          <button
            onClick={() => handleNav('about')}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium ${
              currentPage === 'about' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-800'
            }`}
          >
            About Us
          </button>
          <button
            onClick={() => handleNav('contact')}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium ${
              currentPage === 'contact' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-800'
            }`}
          >
            Contact Us
          </button>
          <button
            onClick={() => handleNav('privacy')}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium ${
              currentPage === 'privacy' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-600'
            }`}
          >
            Privacy Policy
          </button>
          <button
            onClick={() => handleNav('disclaimer')}
            className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 ${
              currentPage === 'disclaimer' ? 'bg-amber-50 text-amber-800 font-semibold' : 'text-amber-700'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            Lead Generation Disclaimer
          </button>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <a
              href={BUSINESS_INFO.telLink}
              className="w-full flex items-center justify-center gap-2 bg-red-600 text-white font-bold py-3 rounded-xl shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span>Call Emergency Line: {BUSINESS_INFO.phoneFormatted}</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full py-2.5 bg-blue-50 border border-blue-200 text-blue-700 font-semibold rounded-xl text-sm"
            >
              Request Contractor Quote Online
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

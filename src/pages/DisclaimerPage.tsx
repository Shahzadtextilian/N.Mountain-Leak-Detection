import React from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, Phone, MapPin, ArrowRight } from 'lucide-react';
import { Page } from '../types';
import { BUSINESS_INFO, LEGAL_DISCLAIMER } from '../data/content';

interface DisclaimerPageProps {
  onNavigate: (page: Page) => void;
  onOpenQuote: () => void;
}

export const DisclaimerPage: React.FC<DisclaimerPageProps> = ({ onNavigate, onOpenQuote }) => {
  return (
    <div className="space-y-12 pb-16">
      {/* Header */}
      <section className="bg-slate-900 text-white py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-4">
            <button onClick={() => onNavigate('home')} className="hover:underline">
              Home
            </button>
            <span>/</span>
            <span className="text-white font-medium">Legal Disclaimers</span>
          </div>

          <span className="bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/30">
            Consumer Legal Disclosure
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-3">
            Lead Generation & Service Provider Disclaimer
          </h1>
          <p className="text-sm text-slate-300 mt-2">
            Important Information Regarding Our Referral Model & Independent Contractor Network
          </p>
        </div>
      </section>

      {/* Main Disclaimer Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8 text-sm text-slate-700 leading-relaxed">
          {/* Highlight Callout */}
          <div className="bg-amber-50 border-2 border-amber-400/80 rounded-xl p-5 text-amber-950 flex items-start gap-4">
            <ShieldAlert className="w-8 h-8 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h2 className="text-base font-bold text-amber-900">
                Summary of Business Operations:
              </h2>
              <p className="text-xs sm:text-sm leading-relaxed">
                <strong>Leak Detection Pro is NOT a plumbing or leak detection contractor.</strong> We do NOT provide direct contracting, physical plumbing services, leak repair, or field labor. We operate solely as an advertising, referral, and lead generation intermediary connecting consumers with independent third-party licensed contractors in North Mountain Village, Phoenix, AZ.
              </p>
            </div>
          </div>

          {/* Section 1: Lead Referral Service Nature */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              1. Referral &amp; Lead Generation Services
            </h3>
            <p>
              The purpose of Leak Detection Pro (accessible via our website and telephone hotline {BUSINESS_INFO.phoneFormatted}) is to assist property owners in North Mountain Village and North Phoenix (serving zip codes 85029, 85022, 85023, and 85053) by connecting them with independent, third-party contractors who perform water leak detection, slab leak testing, gas leak locating, and pipe repairs. When you request service, you are requesting a referral to an independent contractor.
            </p>
          </div>

          {/* Section 2: Independent Contractor Relationship */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              2. Independent Contractor Relationship
            </h3>
            <p>
              All service providers in our referral network are independent business entities and are not employees, partners, agents, or joint venturers of Leak Detection Pro. We do not supervise, direct, or control the manner, means, or details of the work performed by matched contractors.
            </p>
          </div>

          {/* Section 3: Licensing & Verification */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              3. Verification of Licenses &amp; Insurance
            </h3>
            <p>
              While we require all partner contractors to represent that they hold active Arizona Registrar of Contractors (ROC) credentials and commercial general liability insurance, property owners are strongly encouraged to independently verify licensing, bonding, insurance coverage, and warranty terms directly with the contractor before authorizing any work or issuing payments.
            </p>
          </div>

          {/* Section 4: Limitation of Liability */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              4. Limitation of Liability &amp; No Warranty
            </h3>
            <p>
              Leak Detection Pro makes no representations, warranties, or guarantees regarding the quotes, quality of workmanship, safety, timeliness, pricing, or results of any services provided by matched contractors. In no event shall Leak Detection Pro, its affiliates, officers, or representatives be liable for any direct, indirect, incidental, consequential, or punitive damages arising from contracts, negotiations, property damage, or disputes between you and any third-party service provider.
            </p>
          </div>

          {/* Section 5: Emergency Protocols */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-xs text-red-950 space-y-1">
            <h4 className="font-bold text-red-900 text-sm flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              5. Life-Safety &amp; Gas Emergency Protocols
            </h4>
            <p className="leading-relaxed">
              If you detect strong sulfur / rotten egg odor, hear high-pressure hissing from gas lines, or suspect a life-threatening natural gas leak, you must <strong>immediately evacuate the premises</strong> and contact your local utility provider (Southwest Gas at 1-877-860-6020 or call 911). Do not use this website or delay evacuation to submit an online form during an active life-safety emergency.
            </p>
          </div>

          {/* Business Sign-off */}
          <div className="pt-6 border-t border-slate-200 text-xs text-slate-500 space-y-1">
            <p><strong>Entity:</strong> Leak Detection Pro (Lead Generation &amp; Referral Network)</p>
            <p><strong>Physical Address:</strong> {BUSINESS_INFO.fullAddress}</p>
            <p><strong>Dispatch Hotline:</strong> {BUSINESS_INFO.phoneFormatted}</p>
            <p><strong>Service Location:</strong> North Mountain Village, Phoenix, Maricopa County, Arizona</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={() => onNavigate('home')}
              className="px-5 py-3 bg-slate-900 text-white font-bold rounded-xl text-xs hover:bg-slate-800 transition-colors"
            >
              &larr; Return to Home Page
            </button>
            <a
              href={BUSINESS_INFO.telLink}
              className="px-5 py-3 bg-red-600 text-white font-bold rounded-xl text-xs hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call Dispatch Desk: {BUSINESS_INFO.phoneFormatted}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

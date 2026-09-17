import React from 'react';
import { ShieldCheck, Lock, Eye, FileText, Phone, MapPin } from 'lucide-react';
import { Page } from '../types';
import { BUSINESS_INFO } from '../data/content';

interface PrivacyPolicyPageProps {
  onNavigate: (page: Page) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigate }) => {
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
            <span className="text-white font-medium">Privacy Policy</span>
          </div>

          <span className="bg-blue-600/20 text-blue-300 text-xs font-bold px-3 py-1 rounded-full border border-blue-500/30">
            Consumer Privacy Notice &amp; Referral Intermediary Disclosure
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-3">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-300 mt-2">
            Last Updated: September 2026 &bull; Leak Detection Pro &bull; {BUSINESS_INFO.fullAddress}
          </p>
        </div>
      </section>

      {/* Main Legal Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8 text-sm text-slate-700 leading-relaxed">
          {/* Section 1: Introduction */}
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">1. Introduction &amp; Overview</h2>
            <p>
              This Privacy Policy describes how <strong>Leak Detection Pro</strong> ("we", "us", or "our"), located at <strong>{BUSINESS_INFO.fullAddress}</strong>, collects, uses, processes, and shares personal information when you visit our website, call our telephone number (<strong>{BUSINESS_INFO.phoneFormatted}</strong>), or submit an online inquiry for water and gas leak detection contractor referral services in North Mountain Village, Phoenix, Arizona.
            </p>
          </div>

          {/* Section 2: Lead Generation Role */}
          <div className="bg-amber-50/80 border border-amber-300 p-4 rounded-xl text-xs text-amber-950">
            <h3 className="font-bold text-sm text-amber-900 mb-1">
              2. Explicit Lead Generation &amp; Referral Disclosure
            </h3>
            <p className="leading-relaxed">
              Leak Detection Pro operates as a marketing and lead generation intermediary. When you submit your name, telephone number, address, zip code, or leak details on our website or over the phone, you expressly authorize us to transmit this information to independent third-party licensed plumbing and leak detection contractors in Maricopa County and the Greater Phoenix area to evaluate, quote, and fulfill your service inquiry.
            </p>
          </div>

          {/* Section 3: Information Collected */}
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">3. Information We Collect</h2>
            <p className="mb-3">We collect information directly from you when you interact with our platform:</p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-600">
              <li><strong>Contact Identifiers:</strong> Name, phone number, email address, physical address, and zip code.</li>
              <li><strong>Service Requests:</strong> The nature of the leak (water, gas, slab leak, inspection), urgency level, and submitted notes.</li>
              <li><strong>Technical Data:</strong> IP address, device browser type, referring URL, and session analytics collected via standard web server logs to improve local SEO and site responsiveness.</li>
            </ul>
          </div>

          {/* Section 4: How We Use Information */}
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">4. How We Use Your Information</h2>
            <p className="mb-2">We utilize your personal information strictly for the following purposes:</p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-600">
              <li>To match and dispatch independent licensed contractors capable of servicing your North Mountain Village property.</li>
              <li>To facilitate immediate telephone calls or SMS confirmations regarding your diagnostic request.</li>
              <li>To monitor quality of service, contractor responsiveness, and user satisfaction.</li>
              <li>To comply with applicable Arizona State and federal legal, consumer protection, and regulatory requirements.</li>
            </ul>
          </div>

          {/* Section 5: Telephone & SMS Communications Consent */}
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">5. Telephone &amp; SMS Communication Consent</h2>
            <p>
              By providing your telephone number on this website or calling <strong>{BUSINESS_INFO.phoneFormatted}</strong>, you grant express consent to receive telephone calls, automated dispatch notifications, and SMS/text messages from Leak Detection Pro and our matched independent plumbing partners regarding your service inquiry, even if your phone number is registered on any state or federal Do-Not-Call registry. Consent is not a condition of purchase; message and data rates may apply.
            </p>
          </div>

          {/* Section 6: Consumer Rights */}
          <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl space-y-2">
            <h2 className="text-base font-bold text-slate-900">6. Consumer Rights &amp; Privacy Requests</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              We respect your right to control your personal information:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
              <li><strong>Right to Know:</strong> You may request the categories and specific pieces of personal data collected about you.</li>
              <li><strong>Right to Delete:</strong> You may request the deletion of your personal information collected by us, subject to statutory exceptions.</li>
              <li><strong>Right to Opt-Out:</strong> You may opt out of future notifications or lead dispatch communications at any time.</li>
              <li><strong>Non-Discrimination:</strong> We will not discriminate against any user for exercising their privacy rights.</li>
            </ul>
            <p className="text-xs text-slate-600 pt-2">
              To exercise these rights, please contact our compliance desk at <strong>{BUSINESS_INFO.phoneFormatted}</strong> or via mail at <strong>{BUSINESS_INFO.fullAddress}</strong>.
            </p>
          </div>

          {/* Section 7: Contact Us */}
          <div className="pt-4 border-t border-slate-200 text-xs text-slate-500 space-y-1">
            <p><strong>Privacy Office:</strong> Leak Detection Pro</p>
            <p><strong>Address:</strong> {BUSINESS_INFO.fullAddress}</p>
            <p><strong>Phone:</strong> {BUSINESS_INFO.phoneFormatted}</p>
            <p><strong>Service Area:</strong> North Mountain Village &amp; North Phoenix (Serving Zip Codes: 85029, 85022, 85023, 85053), Maricopa County, Arizona</p>
          </div>
        </div>
      </section>
    </div>
  );
};

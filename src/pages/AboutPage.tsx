import React from 'react';
import {
  ShieldCheck,
  Building,
  MapPin,
  Phone,
  Droplets,
  Flame,
  CheckCircle2,
  Users,
  Award,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { Page } from '../types';
import { BUSINESS_INFO, CITY_HEIGHTS_AREAS } from '../data/content';
import { APP_IMAGES } from '../data/images';

interface AboutPageProps {
  onNavigate: (page: Page) => void;
  onOpenQuote: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenQuote }) => {
  return (
    <div className="space-y-16 pb-16">
      {/* Header */}
      <section className="bg-slate-900 text-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-4">
            <button onClick={() => onNavigate('home')} className="hover:underline">
              Home
            </button>
            <span>/</span>
            <span className="text-white font-medium">About Us</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="bg-blue-600/20 text-blue-300 text-xs font-bold px-3 py-1 rounded-full border border-blue-500/30">
                North Mountain Village, Phoenix • Established Referral Network
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                Connecting North Mountain Village with Trusted Leak Detection Specialists
              </h1>
              <p className="text-base text-slate-300 leading-relaxed">
                Based at <strong>{BUSINESS_INFO.fullAddress}</strong>, Leak Detection Pro was created to solve a pressing neighborhood problem: getting prompt, non-destructive water and gas leak diagnostics when you need it most.
              </p>
              <div className="flex items-center gap-4 text-xs text-slate-300 pt-2">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>ROC Licensed Independent Contractors</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Non-Invasive Acoustic &amp; Thermal Tools</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
                <img
                  src={APP_IMAGES.plumberInspection}
                  alt="Verified plumbing specialist inspecting residential water system in North Mountain Village"
                  className="w-full h-64 sm:h-72 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                  <div className="text-white">
                    <div className="text-xs font-bold">Local Verified Plumbing Contractors</div>
                    <div className="text-[11px] text-slate-300">Ready for non-invasive water &amp; gas leak dispatch</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transparent Business Model & Mandatory Consumer Disclosure */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-50/95 border-2 border-amber-300 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-amber-200/70 text-amber-800 shrink-0 mt-0.5">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div className="space-y-3">
              <h2 className="text-lg sm:text-xl font-bold text-amber-950">
                Mandatory Consumer Disclosure &amp; Lead Generation Disclaimer
              </h2>
              <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                <strong>Leak Detection Pro is a referral advertising and lead generation service, NOT a licensed plumbing or leak detection contractor.</strong> We connect homeowners and business clients with independent, licensed, and insured plumbing and leak detection specialists operating in North Mountain Village, Phoenix, and Maricopa County. All diagnostic evaluations, inspections, repairs, warranties, and pricing are handled directly and independently by the third-party contractor assigned to your request. We do not provide physical labor or direct contracting services.
              </p>
              <div className="p-3 bg-amber-100/90 rounded-xl border border-amber-300/80 text-xs font-semibold text-amber-950">
                <strong>Referral Notice:</strong> We connect North Mountain Village and Phoenix residents with independent ROC-licensed contractors. We are not direct service providers.
              </div>
              <div className="pt-1">
                <button
                  onClick={() => onNavigate('disclaimer')}
                  className="text-xs font-semibold text-amber-900 hover:text-amber-700 underline underline-offset-4"
                >
                  Read our full Referral Network Terms &amp; Contractor Match Disclosure &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Our Network */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Why North Mountain Village Property Owners Trust Our Referral Network
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Instead of calling ten different plumbing companies only to be put on voicemail, our network provides single-call dispatch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Rigorous Contractor Vetting</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We exclusively route customer inquiries to independent contractors with active Arizona Registrar of Contractors (ROC) plumbing credentials, verified commercial general liability insurance, and documented non-invasive detection equipment.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">North Mountain Village Focus</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Positioned on W Sahuaro Dr near Peoria Ave, we understand the specific plumbing architecture of North Mountain Village and Phoenix — from desert slab foundations with caliche soil movement to gas risers that require seasoned diagnostic expertise.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">24/7 Rapid Emergency Match</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Water damage and gas hazards happen at night and on weekends. Our automated routing system and live phone team operate 24 hours a day, 365 days a year to ensure minimal response delay.
            </p>
          </div>
        </div>
      </section>

      {/* Business Details Summary */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                Official Business Information
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Leak Detection Pro
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Dedicated lead referral service for residential, commercial, and property management accounts across North Mountain Village and Greater Phoenix.
              </p>

              <div className="space-y-2 text-xs text-slate-300 pt-2">
                <div className="flex items-center gap-2">
                  <strong className="text-white w-28">Address:</strong>
                  <span>{BUSINESS_INFO.fullAddress}</span>
                </div>
                <div className="flex items-center gap-2">
                  <strong className="text-white w-28">Neighborhood:</strong>
                  <span>North Mountain Village, Phoenix (Zip: 85029)</span>
                </div>
                <div className="flex items-center gap-2">
                  <strong className="text-white w-28">Phone Line:</strong>
                  <a href={BUSINESS_INFO.telLink} className="text-blue-400 font-bold hover:underline">
                    {BUSINESS_INFO.phoneFormatted}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <strong className="text-white w-28">Operation:</strong>
                  <span>24 Hours / 7 Days Network Dispatch</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-4 text-center">
              <div className="text-xs text-slate-400 uppercase font-semibold">
                Ready to find your leak?
              </div>
              <div className="text-lg font-bold text-white">
                Speak with a Local Dispatch Coordinator
              </div>
              <a
                href={BUSINESS_INFO.telLink}
                className="block w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-sm shadow-md"
              >
                Call {BUSINESS_INFO.phoneFormatted}
              </a>
              <button
                onClick={onOpenQuote}
                className="block w-full py-3 bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold rounded-xl text-xs"
              >
                Request Online Quote
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

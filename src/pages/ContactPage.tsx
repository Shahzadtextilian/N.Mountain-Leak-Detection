import React from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  ShieldAlert,
  Send,
  Navigation,
  Compass,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { Page } from '../types';
import { BUSINESS_INFO, CITY_HEIGHTS_AREAS } from '../data/content';
import { LeadCaptureForm } from '../components/LeadCaptureForm';
import { APP_IMAGES } from '../data/images';

interface ContactPageProps {
  onNavigate: (page: Page) => void;
  onOpenQuote: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate, onOpenQuote }) => {
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
            <span className="text-white font-medium">Contact Us</span>
          </div>

          <div className="max-w-3xl space-y-3">
            <span className="bg-blue-600/20 text-blue-300 text-xs font-bold px-3 py-1 rounded-full border border-blue-500/30">
              North Mountain Village, Phoenix AZ
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Contact Leak Detection Pro
            </h1>
            <p className="text-base text-slate-300 leading-relaxed">
              Have an urgent water or gas leak? Located on W Sahuaro Dr in North Mountain Village, our contractor referral network connects you immediately with certified technicians.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Contact Info & Local Map */}
          <div className="lg:col-span-6 space-y-8">
            {/* Info Cards */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Business &amp; Referral Desk Details
              </h2>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-1">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">Physical Address:</h3>
                    <p className="text-sm text-slate-700 font-semibold">{BUSINESS_INFO.fullAddress}</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Located in North Mountain Village, Phoenix, AZ 85029 (near I-17 &amp; Peoria Ave)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-1">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">24/7 Telephone Hotline:</h3>
                    <a
                      href={BUSINESS_INFO.telLink}
                      className="text-lg font-extrabold text-blue-600 hover:text-blue-700 block"
                    >
                      {BUSINESS_INFO.phoneFormatted}
                    </a>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Toll-free emergency dispatch line for water &amp; gas leaks
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-1">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">Hours of Dispatch:</h3>
                    <p className="text-sm text-slate-700 font-medium">Open 24 Hours / 7 Days a Week</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Round-the-clock weekend, holiday, and overnight contractor routing
                    </p>
                  </div>
                </div>
              </div>

              {/* Professional Dispatch & Inspection Photo Card */}
              <div className="rounded-xl overflow-hidden border border-slate-200 shadow-xs bg-slate-50">
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={APP_IMAGES.plumberInspection}
                    alt="Licensed plumbing technician on site for leak inspection in North Mountain Village"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-2 left-2 bg-slate-900/85 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>ROC Licensed Specialists</span>
                  </span>
                </div>
                <div className="p-4 text-xs text-slate-600 space-y-1">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    Fast Local Diagnostic Dispatch
                  </div>
                  <p className="leading-relaxed">
                    Our North Mountain Village coordination desk routes incoming calls directly to certified local leak locators equipped with acoustic microphones, thermal FLIR cameras, and combustible gas sensors.
                  </p>
                </div>
              </div>
            </div>

            {/* Local Map & Directions Card */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-base text-white">
                  <Navigation className="w-5 h-5 text-blue-400" />
                  <span>North Mountain Village Navigation</span>
                </div>
                <span className="text-[11px] bg-blue-900/60 text-blue-300 px-2.5 py-1 rounded-md border border-blue-700">
                  Zip 85029
                </span>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs space-y-3">
                <p className="text-slate-300 leading-relaxed">
                  Our network dispatch coordination center is based at <strong>{BUSINESS_INFO.fullAddress}</strong>, strategically positioned near the Interstate 17 Black Canyon corridor and Peoria Ave. This central position enables partner plumbing contractors to reach North Mountain Village, Metrocenter, Sunnyslope, Deer Valley, and Greater Phoenix within minutes.
                </p>
                <div className="pt-2 border-t border-slate-800 grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                  <div>• Peoria Ave (2 mins)</div>
                  <div>• I-17 Black Canyon Fwy (3 mins)</div>
                  <div>• Metrocenter Hub (4 mins)</div>
                  <div>• Cactus Rd / Dunlap Ave (5 mins)</div>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=2810+W+Sahuaro+Dr,+Phoenix,+AZ+85029"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700 transition-colors"
              >
                <Compass className="w-4 h-4" />
                <span>Open {BUSINESS_INFO.address} in Google Maps</span>
              </a>
            </div>
          </div>

          {/* Right: Lead Capture / Request Form */}
          <div className="lg:col-span-6">
            <LeadCaptureForm initialService="water" />
          </div>
        </div>
      </section>
    </div>
  );
};

import React, { useState } from 'react';
import {
  Flame,
  Phone,
  AlertOctagon,
  CheckCircle2,
  ShieldAlert,
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  HelpCircle,
  ChevronDown,
  Volume2,
  Wind
} from 'lucide-react';
import { Page } from '../types';
import { BUSINESS_INFO } from '../data/content';
import { LeadCaptureForm } from '../components/LeadCaptureForm';
import { APP_IMAGES } from '../data/images';

interface GasLeakPageProps {
  onNavigate: (page: Page) => void;
  onOpenQuote: (service?: 'water' | 'gas') => void;
}

export const GasLeakPage: React.FC<GasLeakPageProps> = ({ onNavigate, onOpenQuote }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const gasFaqs = [
    {
      q: 'What should I do right now if I smell a strong gas odor in my house?',
      a: `1) Do not turn light switches on or off, and do not use landline phones or lighters inside. 2) Evacuate all people and pets immediately. 3) Leave exterior doors open behind you if possible. 4) Call Southwest Gas from outside at 1-877-860-6020 or dial 911. 5) Call our network at ${BUSINESS_INFO.phoneFormatted} to arrange an emergency licensed gas repair specialist once the immediate hazard is stabilized.`
    },
    {
      q: 'Southwest Gas shut off my gas meter and locked it with a red tag. How do I get it restored?',
      a: 'When Southwest Gas identifies a leak, they shut off the main meter and place a red safety tag. By Arizona law, the gas line must be inspected, pressure tested with a certified gauge, and repaired by a licensed plumbing/gas contractor. The city or Southwest Gas requires an air pressure test clearance before they will unlock the meter.'
    },
    {
      q: 'What causes gas line leaks in older North Mountain Village properties?',
      a: 'Many homes in North Mountain Village and Phoenix feature black iron pipe with threaded joints that deteriorate over decades from soil expansion, high desert temperatures, and shifting foundation caliche, causing dried joint dope and microscopic leaks at pipe elbows.'
    },
    {
      q: 'How do technicians locate invisible gas leaks?',
      a: 'Technicians use calibrated combustible gas sniffers capable of detecting methane and propane in single parts-per-million (PPM), combined with ultrasonic acoustic detectors, non-corrosive bubbling solutions, and digital manometer pressure decay tests.'
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Gas Danger Notice Top Bar */}
      <div className="bg-red-700 text-white px-4 py-2.5 text-xs font-semibold text-center flex items-center justify-center gap-2">
        <AlertOctagon className="w-4 h-4 shrink-0 animate-bounce" />
        <span>
          Emergency Safety Notice: If you smell strong gas odor right now, evacuate immediately and call 911 or Southwest Gas at 1-877-860-6020!
        </span>
      </div>

      {/* Hero Header */}
      <section className="bg-gradient-to-br from-amber-950 via-slate-900 to-amber-900 text-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 text-xs text-amber-200 mb-4">
            <button onClick={() => onNavigate('home')} className="hover:underline">
              Home
            </button>
            <span>/</span>
            <span className="text-white font-medium">Services</span>
            <span>/</span>
            <span className="text-amber-300 font-semibold">Gas Leak Detection</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-800/60 border border-amber-600/60 text-xs text-amber-200">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>North Mountain Village Gas Safety &amp; Contractor Referral</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Emergency <span className="text-amber-400">Gas Leak Detection</span> &amp; Line Safety in North Mountain Village, Phoenix, AZ
              </h1>

              <p className="text-base text-slate-200 max-w-2xl leading-relaxed">
                Connect 24/7 with pre-screened, ROC-licensed gas line plumbing specialists in North Mountain Village, Phoenix (85029). Fast electronic sniffing, pressure drop testing, and red-tag meter clearance repairs.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={BUSINESS_INFO.telLink}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3.5 rounded-xl text-sm flex items-center gap-2 shadow-lg"
                  id="gas-call-top"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Emergency Gas Dispatch: {BUSINESS_INFO.phoneFormatted}</span>
                </a>

                <button
                  onClick={() => onOpenQuote('gas')}
                  className="bg-amber-800/80 hover:bg-amber-700 text-white font-semibold px-5 py-3.5 rounded-xl text-sm border border-amber-600"
                >
                  Request Dispatch Quote
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 bg-slate-800/80 border border-slate-700 rounded-2xl p-5 text-xs space-y-3 overflow-hidden">
              <div className="relative rounded-xl overflow-hidden mb-3 border border-slate-700">
                <img
                  src={APP_IMAGES.gasLeakTesting}
                  alt="Electronic combustible gas detector sniffer inspecting gas line valve"
                  className="w-full h-40 object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-2 left-2 bg-slate-900/90 text-amber-300 text-[10px] font-semibold px-2 py-0.5 rounded">
                  Digital Combustible Gas Sniffing
                </span>
              </div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Gas Diagnostic Standards</span>
              </div>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Combustible electronic vapor sniffers</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Digital manometer pressure decay testing</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Southwest Gas red tag lock removal support</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Residential &amp; commercial meter certifications</span>
                </li>
              </ul>
              <div className="pt-2 border-t border-slate-700 text-[11px] text-slate-400">
                Local Base: {BUSINESS_INFO.fullAddress}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Step Emergency Safety Action Protocol */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-6 sm:p-8">
          <div className="max-w-3xl mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-red-700 flex items-center gap-1.5">
              <AlertOctagon className="w-4 h-4" /> Immediate Life-Safety Protocol
            </span>
            <h2 className="text-2xl font-extrabold text-red-950 mt-1">
              What to Do If You Suspect a Gas Leak
            </h2>
            <p className="text-xs sm:text-sm text-red-800 mt-1">
              Natural gas is extremely flammable. Follow these 5 critical rules immediately:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div className="bg-white p-4 rounded-xl border border-red-200">
              <div className="w-7 h-7 rounded-full bg-red-100 text-red-700 font-bold text-xs flex items-center justify-center mb-2">
                01
              </div>
              <h4 className="font-bold text-xs text-slate-900 mb-1">Evacuate Immediate Area</h4>
              <p className="text-[11px] text-slate-600">Get every person and pet out of the structure immediately.</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-red-200">
              <div className="w-7 h-7 rounded-full bg-red-100 text-red-700 font-bold text-xs flex items-center justify-center mb-2">
                02
              </div>
              <h4 className="font-bold text-xs text-slate-900 mb-1">No Light Switches</h4>
              <p className="text-[11px] text-slate-600">Do NOT touch light switches, appliances, or garage door openers.</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-red-200">
              <div className="w-7 h-7 rounded-full bg-red-100 text-red-700 font-bold text-xs flex items-center justify-center mb-2">
                03
              </div>
              <h4 className="font-bold text-xs text-slate-900 mb-1">No Phones Indoors</h4>
              <p className="text-[11px] text-slate-600">Cell phones can create static sparks. Only use phones outdoors.</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-red-200">
              <div className="w-7 h-7 rounded-full bg-red-100 text-red-700 font-bold text-xs flex items-center justify-center mb-2">
                04
              </div>
              <h4 className="font-bold text-xs text-slate-900 mb-1">Call Southwest Gas / 911</h4>
              <p className="text-[11px] text-slate-600">Dial 1-877-860-6020 or 911 from a safe distance outside.</p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-red-200">
              <div className="w-7 h-7 rounded-full bg-red-100 text-red-700 font-bold text-xs flex items-center justify-center mb-2">
                05
              </div>
              <h4 className="font-bold text-xs text-slate-900 mb-1">Dispatch Repair</h4>
              <p className="text-[11px] text-slate-600">Call {BUSINESS_INFO.phoneFormatted} for licensed contractor repair &amp; certification.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Gas Systems Covered */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-12">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">
                Complete Gas Line Detection &amp; Inspection Capabilities
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Gas line systems require licensed technical precision. The independent contractors in our North Mountain Village &amp; Phoenix network are ROC certified to test and locate leaks across natural gas and propane infrastructure.
              </p>

              {/* Equipment Photo Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                  <img
                    src={APP_IMAGES.gasLeakTesting}
                    alt="Electronic gas sniffer detecting valve leak"
                    className="w-full h-36 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="p-3">
                    <div className="font-bold text-xs text-slate-900">Combustible Gas Sniffer Wand</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Detects PPM natural gas and propane levels</div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                  <img
                    src={APP_IMAGES.plumberInspection}
                    alt="Certified plumber inspecting gas line manifold"
                    className="w-full h-36 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="p-3">
                    <div className="font-bold text-xs text-slate-900">Licensed Gas Contractor Testing</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Complete Southwest Gas clearance documentation</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold mb-3">
                    <Wind className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900 mb-1">Appliance Flex Connections</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Water heaters, dryers, cooking stoves, wall furnaces, and outdoor grills. Testing flexible corrugated connectors and shutoff valves for micro-leaks.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold mb-3">
                    <Activity className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900 mb-1">Whole-House Pressure Decay</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Pumping static air pressure into the line to watch gauge drop. Validates complete system airtightness prior to gas restoration.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold mb-3">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900 mb-1">Underground Yard Supply Lines</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Locating poly or iron gas lines buried under patios, driveways, or fire pits with specialized combustible gas soil probes.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold mb-3">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900 mb-1">Southwest Gas Lock &amp; Tag Clearances</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Conducting required municipal pressure test documentation so Southwest Gas will safely unlock the gas meter and restore service.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQs */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">
                Gas Leak Detection Frequently Asked Questions
              </h3>
              <div className="space-y-3">
                {gasFaqs.map((item, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full text-left px-5 py-4 flex items-center justify-between font-bold text-sm text-slate-900 hover:bg-slate-50"
                    >
                      <span>{item.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {openFaq === idx && (
                      <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-600 bg-slate-50/50 border-t border-slate-100 leading-relaxed">
                        {item.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-28 space-y-6">
              <LeadCaptureForm initialService="gas" compact />

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-xs text-amber-950 space-y-3">
                <div className="flex items-center gap-2 font-bold text-sm text-amber-950">
                  <Phone className="w-4 h-4 text-amber-700" />
                  <span>Urgent Gas Dispatch Line</span>
                </div>
                <p className="text-amber-900 leading-relaxed">
                  Call our 24/7 North Mountain Village hotline. A coordinator will dispatch an on-call licensed gas specialist to your property right away.
                </p>
                <a
                  href={BUSINESS_INFO.telLink}
                  className="block w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-center rounded-xl shadow-xs"
                >
                  Call {BUSINESS_INFO.phoneFormatted}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

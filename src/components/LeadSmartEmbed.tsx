import React, { useEffect, useState } from 'react';
import { ShieldCheck, CheckCircle2, Phone, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';

interface LeadSmartEmbedProps {
  category?: string;
  zipCode?: string;
  className?: string;
}

export const LeadSmartEmbed: React.FC<LeadSmartEmbedProps> = ({
  category = '75',
  zipCode = '85029',
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState<'embed' | 'form'>('embed');
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Initialize LeadSmart jQuery widget if script has loaded
  useEffect(() => {
    try {
      if (typeof (window as any).PolyaresInit === 'function') {
        (window as any).PolyaresInit();
      } else if (typeof (window as any).PolyaresRequestQuotesBox === 'function') {
        (window as any).PolyaresRequestQuotesBox();
      }
    } catch (e) {
      console.warn('LeadSmart init:', e);
    }
  }, []);

  const leadsmartUrl = `https://leads.leadsmartinc.com/?api_key=eb7353a561f876a7c03543787a0cd05ac8a926d3&funnel=4&category=${category}&buttons=btn-success&affiliate_source=shakjgys1&zip_code=${zipCode}`;

  return (
    <div className={`bg-white rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden ${className}`}>
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-5 text-white">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Instant Leak Detection Matching
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Live Dispatch
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Connected to pre-screened, licensed Phoenix contractors
              </p>
            </div>
          </div>
          <a
            href={BUSINESS_INFO.telLink}
            className="shrink-0 hidden md:flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-2 px-3.5 rounded-lg transition-colors shadow-sm"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{BUSINESS_INFO.phoneFormatted}</span>
          </a>
        </div>
      </div>

      {/* Trust Badges Bar */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex items-center justify-around text-xs text-slate-600 font-medium flex-wrap gap-2">
        <span className="inline-flex items-center gap-1">
          <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
          ROC Licensed &amp; Insured
        </span>
        <span className="inline-flex items-center gap-1">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          No Obligation Estimates
        </span>
        <span className="inline-flex items-center gap-1">
          <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
          North Mountain Village &amp; 85029 Dispatch
        </span>
      </div>

      {/* Live LeadSmart Embedded Funnel */}
      <div className="p-3 sm:p-4 bg-slate-100/50">
        <div className="relative min-h-[480px] w-full rounded-xl overflow-hidden bg-white shadow-inner border border-slate-200">
          {!iframeLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10 p-6 text-center">
              <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"></div>
              <p className="text-sm font-semibold text-slate-700">Connecting to North Mountain Village dispatch network...</p>
              <p className="text-xs text-slate-500 mt-1">Direct LeadSmart contractor matching</p>
            </div>
          )}
          <iframe
            src={leadsmartUrl}
            title="LeadSmart Leak Detection Contractor Quote Form"
            className="w-full h-[540px] border-0"
            onLoad={() => setIframeLoaded(true)}
            allow="geolocation"
          />
        </div>

        {/* Alternative Widget Hooks for LeadSmart Script Plugins */}
        <div className="po-request-quotes-box hidden" data-category={category} data-buttons="btn-success" data-width="100%"></div>
      </div>

      {/* Footer Safe Notice */}
      <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500">
        🔒 Encrypted 256-Bit SSL Transfer. By submitting, you request quotes from verified independent local leak detection specialists.
      </div>
    </div>
  );
};

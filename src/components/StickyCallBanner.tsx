import React from 'react';
import { Phone, FileText } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';

interface StickyCallBannerProps {
  onOpenQuote: () => void;
}

export const StickyCallBanner: React.FC<StickyCallBannerProps> = ({ onOpenQuote }) => {
  return (
    <aside aria-label="Emergency call and quote actions" className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-t border-slate-700/80 p-2.5 sm:hidden shadow-2xl">
      <div className="flex items-center gap-2">
        {/* Direct Emergency Call Button */}
        <a
          href={BUSINESS_INFO.telLink}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-3 rounded-xl flex items-center justify-center gap-2 text-sm shadow-md active:scale-95 transition-transform"
          id="sticky-mobile-call-btn"
        >
          <div className="w-5 h-5 rounded-full bg-white/25 flex items-center justify-center animate-pulse">
            <Phone className="w-3.5 h-3.5" />
          </div>
          <span className="truncate">Call: {BUSINESS_INFO.phoneFormatted}</span>
        </a>

        {/* Request Quote Button */}
        <button
          onClick={onOpenQuote}
          className="flex-none bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-3.5 rounded-xl flex items-center justify-center gap-1.5 text-xs shadow-md active:scale-95 transition-transform"
          id="sticky-mobile-quote-btn"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Get Quote</span>
        </button>
      </div>
    </aside>
  );
};

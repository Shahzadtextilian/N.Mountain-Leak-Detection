import React, { useState } from 'react';
import { X, Sparkles, Clock } from 'lucide-react';
import { LeadCaptureForm } from './LeadCaptureForm';
import { LeadSmartEmbed } from './LeadSmartEmbed';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceType?: 'water' | 'gas' | 'both' | 'inspection';
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, serviceType = 'water' }) => {
  const [activeTab, setActiveTab] = useState<'leadsmart' | 'quick'>('leadsmart');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl my-6">
        <button
          onClick={onClose}
          className="absolute -top-3 -right-2 sm:-right-3 z-20 w-9 h-9 bg-white text-slate-700 hover:text-slate-950 rounded-full flex items-center justify-center shadow-lg border border-slate-200 transition-transform active:scale-95"
          aria-label="Close form"
          id="close-modal-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Switch Tabs */}
        <div className="flex rounded-t-2xl bg-slate-800 p-1.5 gap-1.5 border-b border-slate-700">
          <button
            type="button"
            onClick={() => setActiveTab('leadsmart')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'leadsmart'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span>Direct Contractor Matching (LeadSmart)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('quick')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'quick'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            <Clock className="w-4 h-4 text-amber-300" />
            <span>Fast Emergency Callback</span>
          </button>
        </div>

        {activeTab === 'leadsmart' ? (
          <LeadSmartEmbed category="75" zipCode="85029" className="rounded-t-none border-t-0" />
        ) : (
          <div className="bg-white rounded-b-2xl overflow-hidden">
            <LeadCaptureForm initialService={serviceType} onSuccess={() => {}} />
          </div>
        )}
      </div>
    </div>
  );
};


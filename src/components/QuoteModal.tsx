import React from 'react';
import { X } from 'lucide-react';
import { LeadSmartEmbed } from './LeadSmartEmbed';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceType?: 'water' | 'gas' | 'both' | 'inspection';
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, serviceType = 'water' }) => {
  if (!isOpen) return null;

  const category = serviceType === 'gas' ? '75' : '1';

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

        <LeadSmartEmbed category={category} zipCode="85029" />
      </div>
    </div>
  );
};


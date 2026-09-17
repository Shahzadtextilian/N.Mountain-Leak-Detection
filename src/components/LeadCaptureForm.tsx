import React, { useState } from 'react';
import { Phone, CheckCircle2, ShieldAlert, ShieldCheck, Clock, AlertTriangle, Droplets, Flame, Search, ChevronRight, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';
import { LeadSmartEmbed } from './LeadSmartEmbed';

interface LeadCaptureFormProps {
  initialService?: 'water' | 'gas' | 'both' | 'inspection';
  compact?: boolean;
  onSuccess?: () => void;
}

export const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({
  initialService = 'water',
  compact = false,
  onSuccess
}) => {
  const [formMode, setFormMode] = useState<'quick' | 'leadsmart'>('quick');
  const [serviceType, setServiceType] = useState<'water' | 'gas' | 'both' | 'inspection'>(initialService);
  const [urgency, setUrgency] = useState<'emergency' | 'today' | 'quote_only'>('emergency');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [zip, setZip] = useState('85029');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [consentGiven, setConsentGiven] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<{ id: string; time: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const ticketId = 'LDP-' + Math.floor(100000 + Math.random() * 900000);
      const submission = {
        id: ticketId,
        name,
        phone,
        zip,
        address,
        serviceType,
        urgency,
        notes,
        createdAt: new Date().toISOString()
      };

      try {
        const stored = JSON.parse(localStorage.getItem('ldp_leads') || '[]');
        stored.unshift(submission);
        localStorage.setItem('ldp_leads', JSON.stringify(stored));
      } catch (err) {
        console.error('Storage error', err);
      }

      setIsSubmitting(false);
      setSubmittedTicket({
        id: ticketId,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });

      if (onSuccess) {
        onSuccess();
      }
    }, 600);
  };

  if (submittedTicket) {
    return (
      <div className="bg-white rounded-2xl border-2 border-emerald-500/60 p-6 sm:p-8 text-center shadow-lg" id="lead-success-card">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 animate-bounce">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <span className="inline-block bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200 mb-2">
          Dispatch Ticket: {submittedTicket.id}
        </span>
        <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">
          Service Request Dispatched
        </h3>
        <p className="text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
          Thank you, <strong>{name}</strong>. Your request for <span className="capitalize font-semibold">{serviceType} Leak Detection</span> in North Mountain Village (Zip: {zip}) has been received and scheduled for immediate dispatch.
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 text-left text-xs space-y-2">
          <div className="flex justify-between text-slate-600">
            <span>Expected Callback / ETA:</span>
            <strong className="text-slate-900 font-semibold">{urgency === 'emergency' ? '15 - 30 minutes' : 'Within 1 - 2 hours'}</strong>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Service Center:</span>
            <span className="text-slate-900 font-medium">Leak Detection Pro (2810 W Sahuaro Dr, Phoenix)</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Direct Hotline:</span>
            <strong className="text-blue-700 font-bold">{BUSINESS_INFO.phoneFormatted}</strong>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={BUSINESS_INFO.telLink}
            className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all"
            id="success-call-btn"
          >
            <Phone className="w-4 h-4" />
            <span>Call Now to Expedite: {BUSINESS_INFO.phoneFormatted}</span>
          </a>
          <button
            onClick={() => {
              setSubmittedTicket(null);
              setName('');
              setPhone('');
              setNotes('');
            }}
            className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition-colors"
          >
            Submit Another Request
          </button>
        </div>

        <p className="text-[11px] text-slate-400 mt-5 leading-tight">
          Leak Detection Pro connects you with verified local leak detection specialists in North Mountain Village, Phoenix.
        </p>
      </div>
    );
  }

  if (formMode === 'leadsmart') {
    return (
      <div className="space-y-2">
        <div className="flex bg-slate-100 p-1 rounded-xl gap-1 border border-slate-200">
          <button
            type="button"
            onClick={() => setFormMode('quick')}
            className="flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            Fast Phone Callback
          </button>
          <button
            type="button"
            onClick={() => setFormMode('leadsmart')}
            className="flex-1 py-1.5 px-3 rounded-lg text-xs font-bold bg-white text-blue-700 shadow-xs border border-slate-200 flex items-center justify-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            LeadSmart Match (Live)
          </button>
        </div>
        <LeadSmartEmbed category={serviceType === 'gas' ? '75' : '1'} zipCode={zip || '85029'} />
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden ${
        compact ? 'p-5 sm:p-6' : 'p-6 sm:p-8'
      }`}
      id="lead-capture-form"
    >
      <div className="mb-4">
        {/* Toggle Mode Switcher */}
        <div className="flex bg-slate-100 p-1 rounded-xl gap-1 mb-4 border border-slate-200/80">
          <button
            type="button"
            onClick={() => setFormMode('quick')}
            className="flex-1 py-1.5 px-2.5 rounded-lg text-xs font-bold bg-white text-blue-700 shadow-xs border border-slate-200 flex items-center justify-center gap-1"
          >
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            Fast Local Callback
          </button>
          <button
            type="button"
            onClick={() => setFormMode('leadsmart')}
            className="flex-1 py-1.5 px-2.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors flex items-center justify-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            LeadSmart Match
          </button>
        </div>

        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> Fast Local Match
          </span>
          <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
            Serving Zips: 85029, 85022, 85023, 85053
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Request Immediate Leak Detection Match
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Connect with pre-screened, licensed Phoenix leak specialists. Zero obligation quote.
        </p>
      </div>

      {/* Service Type Selection */}
      <div className="mb-4">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          1. Select Leak Type
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setServiceType('water')}
            className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-semibold transition-all text-left ${
              serviceType === 'water'
                ? 'border-blue-600 bg-blue-50 text-blue-900 ring-2 ring-blue-500/20 shadow-xs'
                : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/50'
            }`}
          >
            <Droplets className={`w-4 h-4 shrink-0 ${serviceType === 'water' ? 'text-blue-600' : 'text-slate-400'}`} />
            <div>
              <div>Water Leak</div>
              <div className="text-[10px] text-slate-500 font-normal">Slab, walls, yard, pipes</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setServiceType('gas')}
            className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-semibold transition-all text-left ${
              serviceType === 'gas'
                ? 'border-amber-600 bg-amber-50 text-amber-900 ring-2 ring-amber-500/20 shadow-xs'
                : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/50'
            }`}
          >
            <Flame className={`w-4 h-4 shrink-0 ${serviceType === 'gas' ? 'text-amber-600' : 'text-slate-400'}`} />
            <div>
              <div>Gas Leak</div>
              <div className="text-[10px] text-slate-500 font-normal">Natural gas, odor, shutoff</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setServiceType('both')}
            className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all text-left ${
              serviceType === 'both'
                ? 'border-blue-600 bg-blue-50 text-blue-900 ring-2 ring-blue-500/20 shadow-xs'
                : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/50'
            }`}
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <div>Both Water & Gas</div>
          </button>

          <button
            type="button"
            onClick={() => setServiceType('inspection')}
            className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all text-left ${
              serviceType === 'inspection'
                ? 'border-blue-600 bg-blue-50 text-blue-900 ring-2 ring-blue-500/20 shadow-xs'
                : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/50'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-slate-400" />
            <div>Pre-Purchase / Audit</div>
          </button>
        </div>
      </div>

      {/* Urgency */}
      <div className="mb-4">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          2. Urgency Level
        </label>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setUrgency('emergency')}
            className={`p-2.5 rounded-xl border text-center transition-all ${
              urgency === 'emergency'
                ? 'border-red-600 bg-red-50 text-red-900 font-bold ring-2 ring-red-500/20'
                : 'border-slate-200 text-slate-600 text-xs hover:border-slate-300'
            }`}
          >
            <span className="block text-xs font-bold text-red-600">🚨 24/7 Emergency</span>
            <span className="text-[10px] text-slate-500">Immediate dispatch</span>
          </button>

          <button
            type="button"
            onClick={() => setUrgency('today')}
            className={`p-2.5 rounded-xl border text-center transition-all ${
              urgency === 'today'
                ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold ring-2 ring-blue-500/20'
                : 'border-slate-200 text-slate-600 text-xs hover:border-slate-300'
            }`}
          >
            <span className="block text-xs font-bold text-slate-900">Today</span>
            <span className="text-[10px] text-slate-500">Within a few hours</span>
          </button>

          <button
            type="button"
            onClick={() => setUrgency('quote_only')}
            className={`p-2.5 rounded-xl border text-center transition-all ${
              urgency === 'quote_only'
                ? 'border-slate-600 bg-slate-100 text-slate-900 font-bold ring-2 ring-slate-400/20'
                : 'border-slate-200 text-slate-600 text-xs hover:border-slate-300'
            }`}
          >
            <span className="block text-xs font-bold text-slate-900">Estimate Only</span>
            <span className="text-[10px] text-slate-500">Flexible schedule</span>
          </button>
        </div>
      </div>

      {/* Contact Inputs */}
      <div className="space-y-3 mb-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="lead-name">
              Your Full Name *
            </label>
            <input
              id="lead-name"
              type="text"
              required
              placeholder="e.g. Maria Gonzalez"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="lead-phone">
              Phone Number (For Immediate Dispatch) *
            </label>
            <input
              id="lead-phone"
              type="tel"
              required
              placeholder="(602) 555-0192"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="lead-address">
              Street / Cross Streets (North Mountain Village Area)
            </label>
            <input
              id="lead-address"
              type="text"
              placeholder="e.g. W Sahuaro Dr / N 28th Ave"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="lead-zip">
              ZIP Code *
            </label>
            <input
              id="lead-zip"
              type="text"
              required
              maxLength={5}
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex items-center gap-1 mt-1.5 flex-wrap">
              <span className="text-[10px] text-slate-400">Serving:</span>
              {['85029', '85022', '85023', '85053'].map((z) => (
                <button
                  key={z}
                  type="button"
                  onClick={() => setZip(z)}
                  className={`text-[10px] px-1.5 py-0.5 rounded font-mono transition-colors ${
                    zip === z
                      ? 'bg-blue-600 text-white font-bold'
                      : 'bg-slate-200/70 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  {z}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="lead-notes">
            Describe the Issue (Optional)
          </label>
          <input
            id="lead-notes"
            type="text"
            placeholder="e.g. Hot floor tile in hallway, high water meter reading, sulfur odor near furnace..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Privacy Guarantee */}
      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-4 justify-center">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        <span>Your information is protected and used solely to fulfill your service request.</span>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white py-3.5 px-6 rounded-xl font-bold text-sm shadow-md shadow-blue-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
        id="submit-lead-btn"
      >
        {isSubmitting ? (
          <span>Matching Local Specialist...</span>
        ) : (
          <>
            <span>Dispatch / Request Contractor Quote</span>
            <ChevronRight className="w-4 h-4" />
          </>
        )}
      </button>

      {/* Hotline alternative */}
      <div className="mt-4 pt-3 border-t border-slate-200 text-center">
        <span className="text-xs text-slate-500">Need immediate help right now?</span>{' '}
        <a href={BUSINESS_INFO.telLink} className="text-xs font-bold text-red-600 hover:text-red-700 underline">
          Call {BUSINESS_INFO.phoneFormatted} (24/7 Dispatch)
        </a>
      </div>
    </form>
  );
};

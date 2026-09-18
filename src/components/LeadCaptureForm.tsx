import React from 'react';
import { LeadSmartEmbed } from './LeadSmartEmbed';

interface LeadCaptureFormProps {
  initialService?: 'water' | 'gas' | 'both' | 'inspection';
  compact?: boolean;
  onSuccess?: () => void;
}

export const LeadCaptureForm: React.FC<LeadCaptureFormProps> = ({
  initialService = 'water',
  compact = false
}) => {
  const category = initialService === 'gas' ? '75' : '1';

  return (
    <div className="w-full" id="lead-capture-form">
      <LeadSmartEmbed category={category} zipCode="85029" />
    </div>
  );
};

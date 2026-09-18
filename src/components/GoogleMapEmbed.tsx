import React from 'react';

interface GoogleMapEmbedProps {
  className?: string;
  height?: string;
}

export const GoogleMapEmbed: React.FC<GoogleMapEmbedProps> = ({
  className = '',
  height = 'h-72 sm:h-80 md:h-96'
}) => {
  return (
    <div className={`w-full overflow-hidden rounded-2xl border border-slate-200 shadow-sm bg-slate-100 ${className}`}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2168.259567648723!2d-112.12345262655033!3d33.58456514228422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872b6c15368c8683%3A0xa42a4714d96a5298!2s2810%20W%20Sahuaro%20Dr%2C%20Phoenix%2C%20AZ%2085029%2C%20USA!5e1!3m2!1sen!2sua!4v1789740799282!5m2!1sen!2sua"
        className={`w-full ${height} border-0 block`}
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        title="Leak Detection Pro - 2810 W Sahuaro Dr, Phoenix, AZ 85029 Location Map"
      />
    </div>
  );
};

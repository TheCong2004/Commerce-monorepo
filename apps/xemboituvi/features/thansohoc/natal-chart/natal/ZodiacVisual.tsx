// components/natal/ZodiacVisual.tsx
import React from 'react';

export default function ZodiacVisual() {
  return (
    <div className="flex w-full h-[300px] lg:h-full lg:w-[40%] relative items-center justify-center overflow-hidden z-20 order-first lg:order-none">
      {/* Background Blur */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
         <div className="w-[50vw] h-[50vw] rounded-full blur-[80px] bg-indigo-600/20 animate-pulse"></div>
      </div>

      {/* Main Wheel Container */}
      <div className="relative z-10 w-[90%] max-w-[500px] aspect-square flex items-center justify-center p-6">
        {/* Rings Animation */}
        <div className="absolute inset-0 border border-indigo-500/20 rounded-full animate-[spin_60s_linear_infinite]"></div>
        <div className="absolute inset-[8%] border border-purple-500/20 rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>

        {/* Center Image */}
        <div className="relative w-[85%] h-[85%] animate-[spin_120s_linear_infinite]">
          <img 
            src="https://res.cloudinary.com/dzkcqktcl/image/upload/v1766568414/hand_bg_dm80wt.png" 
            alt="Mystic Zodiac Wheel"
            className="w-full h-full object-contain drop-shadow-[0_0_50px_rgba(99,102,241,0.3)]"
          />
        </div>
        
        {/* Center Dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 bg-white rounded-full shadow-[0_0_20px_#fff] z-30"></div>
      </div>
    </div>
  );
}
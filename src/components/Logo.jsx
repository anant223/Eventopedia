import React, { useEffect, useRef } from 'react'





const Logo = () => {
  return (
    <div className="w-24 sm:w-32">
      <svg
        viewBox="0 0 300 120"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        <title>Grupio</title>
        <desc>Grupio logo with G icon mark and wordmark</desc>

        <defs>
          <mask id="gmask">
            <rect width="120" height="120" fill="white" />
            <circle cx="52" cy="58" r="23" fill="black" />
            <rect x="52" y="47" width="40" height="18" fill="black" />
          </mask>
        </defs>

        {/* G mark */}
        <circle cx="52" cy="58" r="36" fill="#2d3142" mask="url(#gmask)" />
        <rect x="74" y="44" width="18" height="28" fill="#f0ede6" />
        <rect x="52" y="47" width="26" height="18" rx="3" fill="#2d3142" />

        <text
          x="102"
          y="80"
          fontFamily="'Plus Jakarta Sans', sans-serif"
          fontSize="62"
          fontWeight="500"
          fill="#2d3142"
          letterSpacing="-0.5"
        >
          Grupio
        </text>

        <circle cx="268" cy="63" r="5" fill="#D85A30" />
        <circle cx="222" cy="63" r="5" fill="#D85A30" />
      </svg>
    </div>
  );
};

export default Logo



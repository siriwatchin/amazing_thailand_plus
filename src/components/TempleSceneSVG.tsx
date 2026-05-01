export default function TempleSceneSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 480"
      preserveAspectRatio="xMidYMax meet"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute bottom-0 w-full pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* Far mountains — distant, faded warm brown */}
      <path
        d="M0 480 L0 260 L80 200 L160 240 L240 170 L320 210 L420 140 L520 190 L600 130 L700 180 L800 120 L880 165 L960 110 L1040 155 L1140 90 L1220 140 L1320 100 L1440 160 L1440 480 Z"
        fill="#5C3820"
        opacity="0.18"
      />
      {/* Mid forest hills — warm sienna */}
      <path
        d="M0 480 L0 320 L100 280 L200 310 L300 250 L380 290 L460 220 L560 270 L660 200 L760 255 L860 185 L960 240 L1060 200 L1160 260 L1260 210 L1360 255 L1440 230 L1440 480 Z"
        fill="#3D1C08"
        opacity="0.28"
      />
      {/* Temple / pagoda silhouette — dark warm brown, like ink on parchment */}
      <g fill="#2A1408" opacity="0.75">
        {/* Main central spire */}
        <polygon points="700,100 712,240 688,240" />
        <rect x="685" y="240" width="30" height="8" rx="1" />
        <polygon points="700,140 720,260 680,260" />
        <rect x="678" y="260" width="44" height="10" rx="1" />
        <polygon points="700,180 730,290 670,290" />
        <rect x="668" y="290" width="64" height="12" rx="2" />
        <polygon points="700,220 748,330 652,330" />
        <rect x="650" y="330" width="100" height="14" rx="2" />
        <rect x="665" y="344" width="70" height="50" rx="2" />
        <rect x="680" y="360" width="40" height="34" rx="1" />

        {/* Left smaller spire */}
        <polygon points="580,170 588,280 572,280" />
        <rect x="570" y="280" width="20" height="6" rx="1" />
        <polygon points="580,200 595,300 565,300" />
        <rect x="563" y="300" width="34" height="8" rx="1" />
        <polygon points="580,240 602,330 558,330" />
        <rect x="556" y="330" width="48" height="10" rx="1" />
        <rect x="560" y="340" width="40" height="54" rx="2" />

        {/* Right smaller spire */}
        <polygon points="820,170 828,280 812,280" />
        <rect x="810" y="280" width="20" height="6" rx="1" />
        <polygon points="820,200 835,300 805,300" />
        <rect x="803" y="300" width="34" height="8" rx="1" />
        <polygon points="820,240 842,330 798,330" />
        <rect x="796" y="330" width="48" height="10" rx="1" />
        <rect x="800" y="340" width="40" height="54" rx="2" />

        {/* Far left mini spire */}
        <polygon points="440,220 446,310 434,310" />
        <rect x="432" y="310" width="16" height="5" rx="1" />
        <polygon points="440,250 452,330 428,330" />
        <rect x="426" y="330" width="28" height="8" rx="1" />
        <rect x="428" y="338" width="24" height="56" rx="2" />

        {/* Far right mini spire */}
        <polygon points="960,220 966,310 954,310" />
        <rect x="952" y="310" width="16" height="5" rx="1" />
        <polygon points="960,250 972,330 948,330" />
        <rect x="946" y="330" width="28" height="8" rx="1" />
        <rect x="948" y="338" width="24" height="56" rx="2" />
      </g>

      {/* Tree line — warm dark brown ink silhouette */}
      <path
        d="M0 480 L0 380 C60 360 90 350 120 365 C150 352 170 344 200 358 C230 344 260 338 290 352 C320 340 350 348 380 355 C410 342 440 350 470 362 C500 350 530 345 560 358 C590 348 620 355 650 366 C680 355 710 360 740 368 C770 358 800 350 830 362 C860 352 890 358 920 366 C950 355 980 360 1010 370 C1040 360 1070 354 1100 364 C1130 355 1160 360 1190 368 C1220 358 1250 365 1280 372 C1310 362 1350 368 1380 375 L1440 370 L1440 480 Z"
        fill="#2A1408"
        opacity="0.55"
      />

      {/* Ground — dissolves into page bg */}
      <rect x="0" y="440" width="1440" height="40" fill="#F5EDD6" opacity="0.8" />
    </svg>
  );
}

import React from 'react';

// Ikon garis (stroke-based) senada satu sama lain — dipakai di seluruh
// halaman GIIAS supaya terasa lebih premium & konsisten dibanding emoji
// (yang render-nya beda-beda tiap OS/browser dan terkesan kurang "keren"
// sesuai masukan Pak Gunawan).
type IconProps = { size?: number; color?: string };

const base = (size = 24, color = 'currentColor') => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: color,
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
});

export function ShieldIcon({ size, color }: IconProps) {
  return (
    <svg {...base(size, color)}>
      <path d="M12 3 19 6.2V11c0 5-3.2 8.7-7 9.9-3.8-1.2-7-4.9-7-9.9V6.2Z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function SunIcon({ size, color }: IconProps) {
  return (
    <svg {...base(size, color)}>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2.4M12 19v2.4M4.4 4.4l1.7 1.7M17.9 17.9l1.7 1.7M2.5 12h2.4M19 12h2.4M4.4 19.6l1.7-1.7M17.9 6.1l1.7-1.7" />
    </svg>
  );
}

export function PanoramicIcon({ size, color }: IconProps) {
  return (
    <svg {...base(size, color)}>
      <rect x="3" y="4.5" width="18" height="15" rx="2" />
      <path d="M3 10.5h18M8.5 4.5v15" />
    </svg>
  );
}

export function StoneChipIcon({ size, color }: IconProps) {
  return (
    <svg {...base(size, color)}>
      <path d="M4.5 15 8 8.2l6-2 5.5 4-2 6.8-9 2Z" />
    </svg>
  );
}

export function SparkleIcon({ size, color }: IconProps) {
  return (
    <svg {...base(size, color)}>
      <path d="M12 2.5 13.6 9.4 20.5 11 13.6 12.6 12 19.5 10.4 12.6 3.5 11 10.4 9.4Z" />
    </svg>
  );
}

export function RefreshIcon({ size, color }: IconProps) {
  return (
    <svg {...base(size, color)}>
      <path d="M4 12a8 8 0 0 1 14.5-4.6M20 12a8 8 0 0 1-14.5 4.6" />
      <path d="M18.5 3v4.5H14M5.5 21v-4.5H10" />
    </svg>
  );
}

export function PaintDropIcon({ size, color }: IconProps) {
  return (
    <svg {...base(size, color)}>
      <path d="M12 3c-3.5 4-6 7.6-6 10.8a6 6 0 0 0 12 0C18 10.6 15.5 7 12 3Z" />
    </svg>
  );
}

export function WrenchIcon({ size, color }: IconProps) {
  return (
    <svg {...base(size, color)}>
      <path d="M14.5 6.5a3.6 3.6 0 0 0-4.8 4.8L4 17l3 3 5.7-5.7a3.6 3.6 0 0 0 4.8-4.8l-2.6 2.6-2.2-2.2Z" />
    </svg>
  );
}

export function SprayIcon({ size, color }: IconProps) {
  return (
    <svg {...base(size, color)}>
      <rect x="8" y="9" width="7" height="12" rx="1.2" />
      <path d="M10 9V6a1.5 1.5 0 0 1 3 0v3M4 8.5l1.8 1.5M4 12.5h2M4 16.5l1.8-1.5" />
    </svg>
  );
}

export function HouseIcon({ size, color }: IconProps) {
  return (
    <svg {...base(size, color)}>
      <path d="M4 11 12 4l8 7" />
      <path d="M6 10v10h12V10" />
      <path d="M10 20v-5h4v5" />
    </svg>
  );
}

export function CheckCircleIcon({ size, color }: IconProps) {
  return (
    <svg {...base(size, color)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.3 10.8 15 16 9.5" />
    </svg>
  );
}

export function XCircleIcon({ size, color }: IconProps) {
  return (
    <svg {...base(size, color)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 9l6 6M15 9l-6 6" />
    </svg>
  );
}

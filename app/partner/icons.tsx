import React from 'react';

// Salinan persis dari app/giias/icons.tsx — ikon garis (stroke-based)
// generik, tidak ada unsur GIIAS sama sekali, jadi aman dipakai ulang
// apa adanya di sini.
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

export function SunIcon({ size, color }: IconProps) {
  return (
    <svg {...base(size, color)}>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2.4M12 19v2.4M4.4 4.4l1.7 1.7M17.9 17.9l1.7 1.7M2.5 12h2.4M19 12h2.4M4.4 19.6l1.7-1.7M17.9 6.1l1.7-1.7" />
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

// Speedometer/gauge — mewakili dashboard & instrument panel.
export function GaugeIcon({ size, color }: IconProps) {
  return (
    <svg {...base(size, color)}>
      <path d="M4 15a8 8 0 1 1 16 0" />
      <path d="M12 15 15 10" />
      <path d="M12 15h.01" />
    </svg>
  );
}

// Tuas gear shift di konsol tengah — mewakili konsol & area gear.
export function GearShiftIcon({ size, color }: IconProps) {
  return (
    <svg {...base(size, color)}>
      <path d="M8.5 19h7l-1-6.5h-5Z" />
      <path d="M12 12.5V4.5" />
      <circle cx="12" cy="4.5" r="2" />
    </svg>
  );
}

// Siluet panel pintu mobil (garis atas melengkung + armrest + speaker) —
// lebih jelas kebaca sebagai "pintu mobil" dibanding kotak polos.
export function DoorIcon({ size, color }: IconProps) {
  return (
    <svg {...base(size, color)}>
      <path d="M5 4h9c2.8 0 5 2.2 5 5v11.5" />
      <path d="M5 4v16.5h14" />
      <path d="M7.5 13h6.5" />
      <circle cx="8.3" cy="17" r="1" />
    </svg>
  );
}
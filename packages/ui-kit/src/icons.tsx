import React from "react";

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number | string;
};

function Icon({ children, size, className, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const ArrowLeft: React.FC<IconProps> = (props) => (
  <Icon {...props}><path d="m15 18-6-6 6-6" /><path d="M21 12H9" /></Icon>
);

export const ArrowRight: React.FC<IconProps> = (props) => (
  <Icon {...props}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></Icon>
);

export const Bell: React.FC<IconProps> = (props) => (
  <Icon {...props}><path d="M10 21h4" /><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /></Icon>
);

export const Calendar: React.FC<IconProps> = (props) => (
  <Icon {...props}><path d="M8 2v4" /><path d="M16 2v4" /><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M3 10h18" /></Icon>
);

export const Check: React.FC<IconProps> = (props) => (
  <Icon {...props}><path d="m20 6-11 11-5-5" /></Icon>
);

export const ChevronRight: React.FC<IconProps> = (props) => (
  <Icon {...props}><path d="m9 18 6-6-6-6" /></Icon>
);

export const CreditCard: React.FC<IconProps> = (props) => (
  <Icon {...props}><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></Icon>
);

export const FileText: React.FC<IconProps> = (props) => (
  <Icon {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="M8 13h8" /><path d="M8 17h8" /></Icon>
);

export const Heart: React.FC<IconProps> = (props) => (
  <Icon {...props}><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" /></Icon>
);

export const History: React.FC<IconProps> = (props) => (
  <Icon {...props}><path d="M3 12a9 9 0 1 0 3-6.7" /><path d="M3 3v6h6" /><path d="M12 7v5l3 2" /></Icon>
);

export const Home: React.FC<IconProps> = (props) => (
  <Icon {...props}><path d="m3 11 9-8 9 8" /><path d="M5 10v10h14V10" /><path d="M9 20v-6h6v6" /></Icon>
);

export const LayoutGrid: React.FC<IconProps> = (props) => (
  <Icon {...props}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></Icon>
);

export const LogOut: React.FC<IconProps> = (props) => (
  <Icon {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="M16 17l5-5-5-5" /><path d="M21 12H9" /></Icon>
);

export const MapPin: React.FC<IconProps> = (props) => (
  <Icon {...props}><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="3" /></Icon>
);

export const Minus: React.FC<IconProps> = (props) => (
  <Icon {...props}><path d="M5 12h14" /></Icon>
);

export const Plus: React.FC<IconProps> = (props) => (
  <Icon {...props}><path d="M12 5v14" /><path d="M5 12h14" /></Icon>
);

export const QrCode: React.FC<IconProps> = (props) => (
  <Icon {...props}><rect x="3" y="3" width="5" height="5" /><rect x="16" y="3" width="5" height="5" /><rect x="3" y="16" width="5" height="5" /><path d="M16 16h2v2h-2z" /><path d="M21 21h-5v-2" /><path d="M12 7v4h4" /><path d="M7 12h4" /></Icon>
);

export const Search: React.FC<IconProps> = (props) => (
  <Icon {...props}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></Icon>
);

export const ShoppingBag: React.FC<IconProps> = (props) => (
  <Icon {...props}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></Icon>
);

export const SlidersHorizontal: React.FC<IconProps> = (props) => (
  <Icon {...props}><path d="M21 4h-7" /><path d="M10 4H3" /><path d="M21 12h-9" /><path d="M8 12H3" /><path d="M21 20h-5" /><path d="M12 20H3" /><circle cx="12" cy="4" r="2" /><circle cx="10" cy="12" r="2" /><circle cx="14" cy="20" r="2" /></Icon>
);

export const Smartphone: React.FC<IconProps> = (props) => (
  <Icon {...props}><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></Icon>
);

export const Sparkles: React.FC<IconProps> = (props) => (
  <Icon {...props}><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8Z" /><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8Z" /></Icon>
);

export const TrendingUp: React.FC<IconProps> = (props) => (
  <Icon {...props}><path d="m22 7-8.5 8.5-5-5L2 17" /><path d="M16 7h6v6" /></Icon>
);

export const Truck: React.FC<IconProps> = (props) => (
  <Icon {...props}><path d="M10 17H6a2 2 0 0 1-2-2V5h10v12" /><path d="M14 8h4l3 4v5h-3" /><circle cx="7" cy="17" r="2" /><circle cx="18" cy="17" r="2" /></Icon>
);

export const UserRound: React.FC<IconProps> = (props) => (
  <Icon {...props}><circle cx="12" cy="8" r="4" /><path d="M20 21a8 8 0 0 0-16 0" /></Icon>
);

export const Wallet: React.FC<IconProps> = (props) => (
  <Icon {...props}><path d="M20 7H5a2 2 0 0 0 0 4h15v8H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h13" /><path d="M16 14h.01" /></Icon>
);

export const X: React.FC<IconProps> = (props) => (
  <Icon {...props}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></Icon>
);

// constants/navigation.ts
import { 
  Baby, FileSignature, Flame, Globe 
} from 'lucide-react';

export const DROPDOWN_MENU_ITEMS = [
  { label: "Thần số học cho con", icon: Baby, href: "/baby-numerology" },
  { label: "Trắc nghiệm DISC", icon: FileSignature, href: "/test-disc" },
  { label: "Trắc nghiệm MBTI", icon: FileSignature, href: "/MBTI" },
  { label: "Tra cứu tử vi", icon: Flame, href: "/tu-vi" },
  { label: "Tra cứu bản đồ sao", icon: Globe, href: "/natal-star" },
];
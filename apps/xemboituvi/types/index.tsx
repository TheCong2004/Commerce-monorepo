import { Dispatch, SetStateAction } from "react";

// --- 1. UI & Layout Component Props ---
export type TheadingProps = {
  title: string;
  description: string;
};

export type TmodallProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

export type TModalProps = {
  isOpen?: boolean;
  onClose: () => void;
  body?: React.ReactElement;
};

export type TuseAlerteModalProps = {
  loading?: boolean;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export type TlogoMarqueeProps = {
  children: React.ReactNode;
  baseVelocity: number;
};

export type TRoundedProps = {
  children: React.ReactNode;
  className?: string;
  backgroundColor: string;
};

export type TtextEditorProps = {
  value?: string;
  onChange?: (value: string) => void;
};

export type TtextHoverProps = {
  title1: string;
  title2: string;
};

export type TlinksProps = {
  data: {
    title: string;
    index: number;
    href: string;
  };
  className: string;
  isActive: boolean;
  setSelectedIndicator: Dispatch<SetStateAction<string>>;
};

// --- 2. Data Models (Core Objects) ---
export type TuserProps = {
  id: bigint;
  name: string;
  email: string;
  image: string;
  role: string;
  created_at: Date | null;
  updated_at: Date | null;
};

export type TcategoryProps = {
  id: bigint;
  title: string;
  created_at: Date | null;
  updated_at: Date | null;
};

export type TordersProps = {
  id: bigint;
  status: string;
  created_at: Date | null;
  updated_at: Date | null;
  checkout_details?: {
    first_name?: string;
    email?: string;
    phone?: string;
  };
  order_items: {
    quantity: number;
    product?: {
      price: string;
    };
  }[];
};

export type Order = {
  id: number;
  user: {
    name: string;
    email: string;
  };
  items: OrderItem[];
  status: string;
  checkout_detail: {
    first_name: string;
    last_name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    phone: string;
    email: string;
  };
};

export type OrderItem = {
  product: {
    image: string;
    title: string;
    price: number;
  };
  quantity: number;
};

export type TbookingsProps = {
  id: bigint;
  status: string;
  created_at: Date | null;
  updated_at: Date | null;
  booking_detail: {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    country?: string;
    street_address?: string;
    town_city?: string;
    state?: string;
    zip?: string;
    timezone?: string;
    notes?: string;
    time_slot_id?: string;
    start_time?: string;
    end_time?: string;
    date?: string;
    meeting_link?: string;
    zoom_meeting_id?: string;
    meeting_start_url?: string;
    meeting_password?: string;
    status?: string;
    birth_date?: string;
    birth_time?: string;
    birth_place?: string;
  };
  items: {
    service: {
      title: string;
      price: string;
      image: string;
    };
  }[];
};

// --- 3. Table Column Props ---
export type TblogsColumnProps = {
  id: bigint;
  title: string;
  short_description: string;
  description: string;
  category: string;
  image: string;
  created_at: Date | null;
  updated_at: Date | null;
};

export type TsalesColumnProps = {
  id: string;
  name: string;
  amount: number;
  date: string;
};

export type TsubscribersColumnProps = {
  id: bigint;
  email: string;
  created_at: Date | null;
  updated_at: Date | null;
};

export type TtimeslotsColumnProps = {
  id: bigint | string;
  date: string | null;
  start_time: string | null;
  end_time: string | null;
  status: string;
  created_at: Date | null;
  updated_at: Date | null;
};

export type TserviceColumnProps = {
  id: bigint;
  title: string;
  price: string;
  description: string;
  image: string;
  created_at: Date | null;
};

export type TServicesColumnProps = {
  id: bigint;
  title: string;
  price: string;
  description: string;
  image: string;
  created_at: Date | null;
  updated_at: Date | null;
};

export type TproductsColumnProps = {
  id: bigint;
  title: string;
  price: string;
  description: string;
  image: string;
  created_at: Date | null;
  updated_at: Date | null;
};

export type TproductColumnProps = {
  id: bigint;
  title: string;
  price: string;
  description: string;
  image: string;
  created_at: Date | null;
};

export type TcartColumnProps = {
  id: bigint;
  user_id: bigint;
  product_id: bigint;
  product: TproductsColumnProps;
  created_at: Date | null;
  updated_at: Date | null;
};

// --- 4. Context, Hooks & Helpers ---
export type TcartContextType = {
  cartCount: number;
  isCartOpen: boolean;
  toggleCart: () => void;
  refreshCart: () => void;
  closeCart: () => void;
};

export type ThooksProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export type TforgotPasswordProps = {
  setShowForgotPassword: (value: boolean) => void;
  showEnterCode: boolean;
  setShowEnterCode: (value: boolean) => void;
  email: string;
  setEmail: (value: string) => void;
  code: string;
  setCode: (value: string) => void;
};

export type TgraphData = {
  name: string;
  total: number;
};

// --- 5. Form & Selection Options ---
export type TcountryOption = {
  value: string;
  label: string;
};

export type TstateOption = {
  value: string;
  label: string;
};

export type TcityOption = {
  value: string;
  label: string;
};
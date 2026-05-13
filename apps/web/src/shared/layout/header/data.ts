export interface NavLink {
  name: string;
  href: string;
  collapsible?: boolean;
}

export interface Campaign {
  id: number;
  name: string;
  Title: string;
  description: string;
  slug?: string;
}

export interface ProductCategory {
  id: number;
  name: string;
  handle: string;
}

export interface BlogPost {
  id: number;
  Title: string;
  documentId: string;
}

export const navLinks: NavLink[] = [
  { name: 'Create Your Own', href: '/create-your-own' },
  { name: 'Order Tracking', href: '/order-tracking' },
  { name: "Happy New Year", href: '/happy-new-year' },
  { name: 'Product', href: '/product', collapsible: true },
  { name: 'Explore Designs', href: '/designs' },
  { name: "Free E-Cart", href: '/free-ecart' },
  { name: 'Blog', href: '/blog', collapsible: true },
];

export const campaign: Campaign[] = [
  { id: 1, name: 'Spring Sale', Title: 'Spring Sale - Up to 60% off!', description: 'Up to 60% off!', slug: '/happy-new-year' },
  { id: 2, name: 'St. Patrick Day', Title: 'St. Patricks Day Sales', description: 'Exclusive deals for St. Patricks Day', slug: '/happy-new-year' },
  { id: 3, name: 'Holiday Special', Title: 'Holiday Special Offers', description: 'Great savings on holiday items', slug: '/happy-new-year' }
];

export const categories: ProductCategory[] = [
  { id: 1, name: 'T-Shirts', handle: 't-shirt' },
  { id: 2, name: 'Hoodies', handle: 'hoodie' },
  { id: 3, name: 'Tank Tops', handle: 'tanktop' },
  { id: 4, name: 'Sweatshirts', handle: 'sweatshirt' },
  { id: 5, name: 'Mugs', handle: 'mug' },
  { id: 6, name: 'Posters', handle: 'poster' },
  { id: 7, name: 'Pets', handle: 'pets' },
  { id: 8, name: 'Digital Reports', handle: 'report' },
];

export const blog: BlogPost[] = [
  { id: 1, Title: 'All Blog', documentId: 'all-blog' },
  { id: 2, Title: 'Gift Ideas', documentId: 'gift-ideas' }
];

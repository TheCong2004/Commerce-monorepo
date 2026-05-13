"use client"
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { IconType } from 'react-icons';
import { FiHeart, FiShoppingBag, FiAlignJustify, FiX } from 'react-icons/fi';
import { SearchBar } from '@/packages/search/components/SearchBar';
import { TopBar } from './TopBar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../ui/dropdown-menu';
import { HeartHandshakeIcon, MapIcon, Package, Sparkles, User, UserCircle } from 'lucide-react';
import { GiFountainPen, GiPaintBrush } from 'react-icons/gi';
import { Badge } from '../../ui/badge';
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "@/shared/ui/drawer";
import { Button } from '@/shared/ui/button';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger } from '@/shared/ui/navigation-menu';
import Sidebar from './SideBar';
import { navLinks, campaign, categories, blog, NavLink } from './data';

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [hoveredNavLink, setHoveredNavLink] = useState<NavLink | null>();
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  const [cartId, setCartId] = useState("");
  const [wishlist, setWishlist] = useState(0);
  const [accessToken, setAccessToken] = useState<string | undefined>();
  const user = { name: 'Mock User', email: 'mock@example.com' };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCartId = localStorage.getItem("cart_id") || "";
      setCartId(savedCartId);

      const wishlistString = localStorage.getItem("wishlist");
      const wishlistArray = wishlistString ? JSON.parse(wishlistString) : [];
      setWishlist(wishlistArray.length);

      const token = sessionStorage.getItem("authToken") ?? localStorage.getItem("authToken") ?? undefined;
      setAccessToken(token);
    }
  }, []);

  const handleShowMenu = (navLink: NavLink) => setHoveredNavLink(navLink);
  const handleCloseMenu = () => setHoveredNavLink(null);

  const sideNavLinks = useMemo<[string, IconType, number][]>(() => [
    ['/wishlist', FiHeart, wishlist],
    ['/cart', FiShoppingBag, cartCount],
  ], [cartCount, wishlist]);

  useEffect(() => {
    const controlHeader = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY && currentScrollY > 80) {
          setIsHeaderVisible(false);
        } else {
          setIsHeaderVisible(true);
        }
        setLastScrollY(currentScrollY);
      }
    };
    window.addEventListener('scroll', controlHeader, { passive: true });
    return () => window.removeEventListener('scroll', controlHeader);
  }, [lastScrollY]);

  const getSolidStyle = (name: string) => {
    switch (name) {
      case 'Create Your Own':
        return "bg-gradient-to-r from-orange-500 to-blue-500 bg-clip-text text-transparent hover:brightness-25";
      case 'Order Tracking': return "text-black-600 hover:text-orange-500 hover:brightness-125";
      case 'Happy New Year': return "text-black-600 hover:text-orange-500 hover:brightness-125";
      case 'Product': return "text-black-600 hover:text-orange-500 hover:brightness-125";
      case 'Explore Designs': return "text-black-600 hover:text-orange-500 hover:brightness-125";
      case 'Free E-Cart': return "text-black-600 hover:text-orange-500 hover:brightness-125";
      case 'Blog': return "text-black-600 hover:text-orange-500 hover:brightness-125";
      default: return "text-black-600 hover:text-orange-500 hover:brightness-125";
    }
  };

  return (
    <header style={{ padding: '20px', background: '#fce4ec', textAlign: 'center', borderBottom: '1px solid #ddd' }}>
      <h1 className="font-Inter font-bold">Header đang ở chế độ Debug</h1>
    </header>
  );
    </>
  );
};
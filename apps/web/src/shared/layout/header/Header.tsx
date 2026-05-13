"use client"
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { IconType } from 'react-icons';
import { FiHeart, FiShoppingBag, FiAlignJustify, FiX } from 'react-icons/fi';
import { SearchBar } from '@/packages/search/components/SearchBar';
import { TopBar } from './TopBar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../ui/dropdown-menu';
import { User, UserCircle } from 'lucide-react';
import { GiFountainPen, GiPaintBrush } from 'react-icons/gi';
import { Badge } from '../../ui/badge';
import Sidebar from './SideBar';
import { navLinks, campaign, categories, NavLink } from './data';

export const Header = () => {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const [cartId, setCartId] = useState("");
  const [wishlist, setWishlist] = useState(0);
  const [accessToken, setAccessToken] = useState<string | undefined>();

  useEffect(() => {
    setMounted(true);
    const savedCartId = localStorage.getItem("cart_id") || "";
    setCartId(savedCartId);
    const wishlistString = localStorage.getItem("wishlist");
    const wishlistArray = wishlistString ? JSON.parse(wishlistString) : [];
    setWishlist(wishlistArray.length);
    const token = sessionStorage.getItem("authToken") ?? localStorage.getItem("authToken") ?? undefined;
    setAccessToken(token);
  }, []);

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
      case 'Create Your Own': return "bg-gradient-to-r from-orange-500 to-blue-500 bg-clip-text text-transparent";
      default: return "text-black-600 hover:text-orange-500";
    }
  };

  return (
    <>
      {mounted && <Sidebar open={sidebar} onClose={() => setSidebar(false)} />}

      <header className={`sticky top-0 z-40 w-full transition-transform duration-300 ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <TopBar blogs={campaign} />

        <div className="relative w-full border-b border-black/5 z-30 shadow-sm bg-[#fce4ec] min-h-[100px]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4 h-[100px]">
              
              {/* Logo - Luôn hiện cho SEO */}
              <div className="flex items-center gap-4">
                <button onClick={() => setSidebar(true)} className="xl:hidden p-1">
                  <FiAlignJustify color="#111111" size={36} />
                </button>
                <Link href="/">
                  <Image src="/FPT_Telecom_logo.svg" alt="Logo" width={100} height={30} priority />
                </Link>
              </div>

              {/* Những phần dùng Hook/UI phức tạp - Chỉ hiện khi đã Mounted */}
              {mounted && (
                <>
                  <div className='flex-grow max-w-2xl hidden md:block'>
                    <SearchBar />
                  </div>

                  <div className="flex items-center gap-5">
                    <Link href="/cart" className='relative'>
                      <FiShoppingBag size={22} />
                      {wishlist > 0 && <Badge className="absolute -top-1.5 -right-2 bg-[#F67273]">{wishlist}</Badge>}
                    </Link>
                    <Link href="/signin">
                      <User size={22} />
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
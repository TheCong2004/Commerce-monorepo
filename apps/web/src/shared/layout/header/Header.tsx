"use client"
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { IconType } from 'react-icons';
import { FiHeart, FiShoppingBag, FiAlignJustify, FiX } from 'react-icons/fi';
import { SearchBar } from '@/packages/search/components/SearchBar';
import { TopBar } from './TopBar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../ui/dropdown-menu';
import { User, UserCircle, Package, MapIcon, HeartHandshakeIcon } from 'lucide-react';
import { GiFountainPen, GiPaintBrush } from 'react-icons/gi';
import { Badge } from '../../ui/badge';
import Sidebar from './SideBar';
import { navLinks, campaign, categories, blog, NavLink } from './data';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger, NavigationMenuContent } from '@/shared/ui/navigation-menu';

export const Header = () => {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const [cartCount, setCartCount] = useState(0);
  const [wishlist, setWishlist] = useState(0);
  const [accessToken, setAccessToken] = useState<string | undefined>();

  useEffect(() => {
    setMounted(true);
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
          {/* Con thỏ bên trái */}
          <div className="absolute left-0 bottom-0 h-full w-auto select-none pointer-events-none z-10 hidden min-[1400px]:block">
            <img src="https://res.cloudinary.com/dm1wqczhm/image/upload/v1774869889/tho1_pszhws.png" alt="rabbit-left" className="h-full object-contain object-left" />
          </div>

          {/* Con thỏ bên phải */}
          <div className="absolute right-0 bottom-0 h-full w-auto select-none pointer-events-none z-10 hidden min-[1400px]:block">
            <img src="https://res.cloudinary.com/dm1wqczhm/image/upload/v1774869517/tho22_qeespt.png" alt="rabbit-right" className="h-full object-contain object-right" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4 h-[100px]">
              
              <div className="flex items-center gap-4">
                <button onClick={() => setSidebar(true)} className="xl:hidden p-1 transition-opacity hover:opacity-60">
                  <FiAlignJustify color="#111111" size={36} />
                </button>
                <Link href="/" className="transition-opacity hover:opacity-80">
                  <Image src="/FPT_Telecom_logo.svg" alt="Logo" width={100} height={30} priority className="h-20 w-auto" />
                </Link>
              </div>

              {/* Categories Dropdown - Desktop */}
              <div className='hidden xl:block flex-shrink-0'>
                <DropdownMenu open={open} onOpenChange={setOpen}>
                  <DropdownMenuTrigger className="flex items-center gap-2 font-Inter font-semibold text-[#111111] hover:text-gray-600 text-base transition-colors focus:outline-none">
                    {open ? <FiX size={30} /> : <FiAlignJustify size={17} />}
                    <span className="hidden sm:inline">Categories</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="rounded-xl overflow-hidden p-0 shadow-lg bg-white w-40 max-h-[500px] border border-gray-100">
                    <div className="overflow-y-auto">
                      {categories?.map((item, index) => (
                        <DropdownMenuItem key={index} className="p-0 focus:bg-gray-50">
                          <Link href={`/collection/${item.handle}`} className="block rounded-lg px-3 py-2 font-Inter w-full text-sm text-[#111111] hover:bg-gray-50">
                            {item.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {mounted && (
                <>
                  <div className='flex-grow max-w-2xl hidden md:block z-[100]'>
                    <SearchBar />
                  </div>

                  <div className="flex items-center gap-5">
                    <Link href="/wishlist" className='relative'>
                      <FiHeart size={22} className="hover:text-orange-400 transition-colors" />
                      {wishlist > 0 && <Badge className="absolute -top-1.5 -right-2 bg-[#F67273] rounded-full w-5 h-5 flex items-center justify-center text-white text-[10px]">{wishlist}</Badge>}
                    </Link>
                    <Link href="/cart" className='relative'>
                      <FiShoppingBag size={22} className="hover:text-orange-400 transition-colors" />
                    </Link>
                    <Link href="/signin">
                      <User size={22} className="hover:text-orange-400 transition-colors" />
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Desktop Navigation */}
          {mounted && (
            <div className="hidden lg:block max-w-7xl mx-auto pb-2">
              <ul className="flex items-center justify-center gap-6">
                {navLinks.map((item, index) => (
                  <li key={index} className="transition-transform hover:scale-105">
                    <Link href={item.href} className={`font-Inter text-[16px] font-semibold transition-all ${getSolidStyle(item.name)}`}>
                      {item.name === 'Create Your Own' && <GiPaintBrush size={18} className="inline mr-1" />}
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </header>
    </>
  );
};
"use client"
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { FiHeart, FiShoppingBag, FiAlignJustify, FiX } from 'react-icons/fi';
import { SearchBar } from '@/packages/search/components/SearchBar';
import { TopBar } from './TopBar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../ui/dropdown-menu';
import { User, ChevronDown } from 'lucide-react';
import { GiPaintBrush } from 'react-icons/gi';
import { Badge } from '../../ui/badge';
import Sidebar from './SideBar';
import { navLinks, campaign, categories } from './data';

export const Header = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const [cartCount, setCartCount] = useState(0);
  const [wishlist, setWishlist] = useState(0);
  const [accessToken, setAccessToken] = useState<string | undefined>();
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const productDropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleProductMouseEnter = () => {
    if (productDropdownTimeoutRef.current) {
      clearTimeout(productDropdownTimeoutRef.current);
    }
    setIsProductDropdownOpen(true);
  };

  const handleProductMouseLeave = () => {
    productDropdownTimeoutRef.current = setTimeout(() => {
      setIsProductDropdownOpen(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (productDropdownTimeoutRef.current) {
        clearTimeout(productDropdownTimeoutRef.current);
      }
    };
  }, []);

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

        <div className="relative z-30 w-full border-b border-black/5 bg-[#fce4ec] shadow-sm">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex min-h-[86px] items-center justify-between gap-3 lg:min-h-[96px]">
              
              <div className="flex min-w-0 items-center gap-3 lg:gap-4">
                <button onClick={() => setSidebar(true)} className="p-1 transition-opacity hover:opacity-60 lg:hidden" aria-label="Open menu">
                  <FiAlignJustify color="#111111" size={32} />
                </button>
                <Link href="/" className="flex-shrink-0 transition-opacity hover:opacity-80">
                  <Image src="/FPT_Telecom_logo.svg" alt="FPT Telecom" width={210} height={64} priority className="h-14 w-auto sm:h-16 lg:h-20" />
                </Link>
              </div>

              {/* Categories Dropdown - Desktop */}
              <div className='hidden flex-shrink-0 md:block'>
                <DropdownMenu open={open} onOpenChange={setOpen}>
                  <DropdownMenuTrigger className="flex items-center gap-2 whitespace-nowrap font-Inter text-sm font-semibold text-[#111111] transition-colors hover:text-gray-600 focus:outline-none lg:text-base">
                    {open ? <FiX size={26} /> : <FiAlignJustify size={17} />}
                    <span>Categories</span>
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
                  <div className='z-[100] hidden min-w-[220px] flex-1 md:block lg:max-w-xl xl:max-w-2xl'>
                    <SearchBar />
                  </div>

                  <div className="flex flex-shrink-0 items-center gap-3 sm:gap-4 lg:gap-5">
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
            <div className="hidden max-w-7xl mx-auto pb-2 lg:block">
              <ul className="flex items-center justify-center gap-4 xl:gap-6">
                {navLinks.map((item, index) => {
                  const isProductMenu = item.name.toLowerCase() === 'products';
                  
                  if (isProductMenu) {
                    return (
                      <li 
                        key={index} 
                        className="relative transition-transform hover:scale-105"
                        onMouseEnter={handleProductMouseEnter}
                        onMouseLeave={handleProductMouseLeave}
                      >
                        <DropdownMenu open={isProductDropdownOpen} onOpenChange={setIsProductDropdownOpen}>
                          <DropdownMenuTrigger asChild>
                            <Link
                              href="/collection"
                              className="flex items-center gap-1 whitespace-nowrap font-Inter text-[15px] font-semibold text-[#111111] transition-all hover:text-orange-500 focus:outline-none xl:text-[16px]"
                              onClick={(e) => {
                                setIsProductDropdownOpen(false);
                                router.push('/collection');
                              }}
                            >
                              {item.name} <ChevronDown size={14} className="mt-0.5" />
                            </Link>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent 
                            className="rounded-xl overflow-hidden p-0 shadow-lg bg-white w-56 max-h-[500px] border border-gray-100 z-50"
                            onMouseEnter={handleProductMouseEnter}
                            onMouseLeave={handleProductMouseLeave}
                          >
                            <div className="overflow-y-auto py-1">
                              <DropdownMenuItem className="p-0 focus:bg-gray-50">
                                <Link 
                                  href="/collection/all" 
                                  className="block rounded-lg px-4 py-2 font-Inter w-full text-sm text-[#111111] hover:bg-gray-50 font-medium"
                                  onClick={() => setIsProductDropdownOpen(false)}
                                >
                                  All Products
                                </Link>
                              </DropdownMenuItem>
                              {categories?.map((cat, catIndex) => (
                                <DropdownMenuItem key={catIndex} className="p-0 focus:bg-gray-50">
                                  <Link 
                                    href={`/collection/${cat.handle}`} 
                                    className="block rounded-lg px-4 py-2 font-Inter w-full text-sm text-[#111111] hover:bg-gray-50"
                                    onClick={() => setIsProductDropdownOpen(false)}
                                  >
                                    Custom {cat.name}
                                  </Link>
                                </DropdownMenuItem>
                              ))}
                            </div>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </li>
                    );
                  }

                  return (
                    <li key={index} className="transition-transform hover:scale-105">
                      <Link href={item.href} className={`whitespace-nowrap font-Inter text-[15px] font-semibold transition-all xl:text-[16px] ${getSolidStyle(item.name)}`}>
                        {item.name === 'Create Your Own' && <GiPaintBrush size={18} className="inline mr-1" />}
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

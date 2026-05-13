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
    <>
      <Sidebar open={sidebar} onClose={() => setSidebar(false)} />

      <header className={`sticky top-0 z-40 w-full transition-transform duration-300 ease-in-out ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <TopBar blogs={campaign} />

        <div className="relative w-full border-b border-black/5 z-30 shadow-sm "
          style={{
            backgroundColor: '#fce4ec',
            minHeight: '100px'
          }}
        >
          <div className="absolute left-0 bottom-0 h-full w-auto select-none pointer-events-none z-10 hidden min-[1400px]:block">
            <img src="https://res.cloudinary.com/dm1wqczhm/image/upload/v1774869889/tho1_pszhws.png" alt="rabbit-left" className="h-full object-contain object-left" />
          </div>

          <div className="absolute right-0 bottom-0 h-full w-auto select-none pointer-events-none z-10 hidden min-[1400px]:block">
            <img src="https://res.cloudinary.com/dm1wqczhm/image/upload/v1774869517/tho22_qeespt.png" alt="rabbit-right" className="h-full object-contain object-right" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4 lg:gap-8">
              <div className="flex items-center gap-4 w-auto">
                <button onClick={() => setSidebar(true)} className="xl:hidden p-1 -ml-1 flex items-center justify-center transition-opacity hover:opacity-60 focus:outline-none">
                  <FiAlignJustify color="#111111" size={36} strokeWidth={1.5} className="cursor-pointer" />
                </button>
                <Link href="/" className="flex flex-shrink-0 items-center transition-opacity hover:opacity-80">
                  <Image className="w-auto h-20 md:h-20 object-contain" priority src="/FPT_Telecom_logo.svg" alt="FPT Telecom Logo" width={100} height={30} quality={100} />
                </Link>
              </div>

              <div className='hidden xl:block flex-shrink-0'>
                <DropdownMenu open={open} onOpenChange={setOpen}>
                  <DropdownMenuTrigger className="flex items-center gap-2 font-Inter font-semibold text-[#111111] hover:text-gray-600 text-base text-[16px] transition-colors focus:outline-none">
                    {open ? <FiX size={30} /> : <FiAlignJustify size={17} />}
                    <span className="hidden sm:inline">Categories</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="rounded-xl overflow-hidden p-0 shadow-lg !bg-white w-40 max-h-[500px] border border-gray-100 ">
                    <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-transparent">
                      {categories?.map((item, index) => (
                        <DropdownMenuItem key={index} className="p-0 focus:bg-gray-50">
                          <Link href={`/collection/${item.handle}`} className="block rounded-lg px-3 py-2 font-Inter w-full text-sm text-[#111111] transition-colors hover:bg-gray-50" onClick={handleCloseMenu}>
                            <span className="truncate">{item.name}</span>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className='flex-grow max-w-2xl relative z-[100] hidden md:block'>
                <SearchBar />
              </div>

              <div className="flex items-center justify-end gap-5 flex-shrink-0">
                {accessToken ? (
                  <div className="hidden md:block">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex items-center gap-2 hover:opacity-80 transition-all focus:outline-none">
                        <User size={18} className="text-black" />
                        <span className=" font-Inter text-[16px] max-w-[100px] truncate">My Account</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56 mt-2 rounded-xl p-2 border-gray-100 shadow-lg">
                        <DropdownMenuItem asChild className="rounded-lg mb-1 cursor-pointer">
                          <Link href="/user/account" className="flex items-center gap-3 text-sm"><UserCircle size={16} /> User profile</Link>
                        </DropdownMenuItem>
                        <div className="h-px bg-gray-100 my-1"></div>
                        <DropdownMenuItem className="cursor-pointer text-red-600 rounded-lg flex items-center gap-3 text-sm hover:bg-red-50 hover:text-red-700" onClick={() => { localStorage.removeItem('authToken'); window.location.href = '/'; }}>
                          <GiFountainPen size={16} /> Logout
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ) : (
                  <Link href="/signin">
                    <User className="text-[#111111] transition-opacity hover:opacity-60 hidden md:block" size={22} />
                    <div className="rounded-full md:hidden flex gap-1.5 bg-[#111111] text-white text-[16px] items-center px-3 py-1.5 font-Inter">
                      <User size={14} /> Login
                    </div>
                  </Link>
                )}

                {sideNavLinks.map(([url, Icon, number]) => (
                  <Link key={url} href={url} className='relative flex items-center'>
                    <Icon className={`text-black-600 transition-transform duration-300 hover:text-orange-400`} size={22} />
                    {number > 0 && (
                      <Badge className={` pointer-events-none absolute overflow-hidden rounded-full text-[12px] font-Inter w-5 h-5 p-0 -top-1.5 -right-2 flex justify-center items-center text-white bg-[#F67273] z-10`}>
                        <span className="relative z-10 ">{number}</span>
                      </Badge>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden lg:block max-w-7xl mx-auto ">
            <ul className="flex items-center justify-center gap-6 ">
              {navLinks.map((item, index) => (
                <li className="flex-shrink-0 transition-transform duration-300 hover:scale-110" key={index}>
                  <Link href={item.href} className={`flex h-full items-center gap-2 text-nowrap font-Inter text-[16px] tracking-wide transition-all duration-300 ${getSolidStyle(item.name)}`}>
                    {item.name === 'Create Your Own' && <GiPaintBrush size={18} className="text-orange-500" />}
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};
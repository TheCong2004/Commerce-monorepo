"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react"; // Thêm useEffect
import UserMenu from "../../../../features/user/components/user-menu";
import { footerLogo } from "@/public";
import { ShoppingBag, ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion"; // Thêm useScroll, useMotionValueEvent
import { useCart } from "@/features/cart/context/cart-context";
import { dropdownVariants } from "@/motion";
import LeftSideHome from "./LeftSideHome";
import MobileNav from "./MobileNav";
import { NAV_ITEMS } from "./nav-links";

export default function Navbar() {
    const { toggleCart, cartCount } = useCart();
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    // Logic ẩn hiện Header
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        // Nếu lướt xuống và cuộn qua 150px thì ẩn, lướt lên thì hiện
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    return (
        <>
            {/* --- DESKTOP NAV --- */}
            {/* Bọc toàn bộ nav Desktop vào motion.nav */}
            <motion.nav 
                variants={{
                    visible: { y: 0 },
                    hidden: { y: "-100%" },
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className={`w-full bg-[#0F0C29] backdrop-blur-md shadow-sm border-b border-gray-100 fixed top-0 left-0 z-[999] xm:hidden sm:hidden md:hidden ${isMobileMenuOpen ? 'hidden' : ''}`}
            >
                <div className="w-full padding-x">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3">
                            <Image src={footerLogo} className="w-10 h-10 object-contain" alt="Mystic Marguerite" width={40} height={40} />
                            <span className="text-lg font-semibold papyrus text-[#c7a743] font-sans">Mystic Marguerite</span>
                        </Link>

                        {/* Navigation */}
                        <ul className="flex items-center gap-1">
                            {NAV_ITEMS.map((item) => (
                                <div key={item.id} className="relative px-3 py-4 group"
                                    onMouseEnter={() => item.children && item.children.length > 0 && setActiveDropdown(item.id)}
                                    onMouseLeave={() => setActiveDropdown(null)}
                                >
                                    <Link href={item.href} className="flex items-center gap-1 text-sm font-medium text-white hover:text-[#c7a743] transition-colors font-sans uppercase tracking-wide whitespace-nowrap">
                                        {item.label}
                                        {item.id !== 'tarot' && item.children && item.children.length > 0 && (
                                            <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === item.id ? 'rotate-180' : ''}`} />
                                        )}
                                    </Link>
                                    <AnimatePresence>
                                        {activeDropdown === item.id && item.id !== 'tarot' && item.children && item.children.length > 0 && (
                                            <motion.div initial="hidden" animate="visible" exit="hidden" variants={dropdownVariants} className="absolute top-full left-0 mt-0 bg-[#0F0C29]/95 backdrop-blur-md shadow-2xl rounded-lg border border-[#c7a743]/30 min-w-[260px] py-2 max-h-[70vh] overflow-y-auto custom-scrollbar">
                                                <div className="flex flex-col">
                                                    {item.children.map((subItem, index) => (
                                                        <Link key={index} href={subItem.href} className="block px-4 py-3 text-sm font-sans text-[#F3E3BC] hover:bg-[#c7a743] hover:text-white transition-all border-b border-white/10 last:border-0">
                                                            {subItem.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </ul>

                        {/* Actions */}
                        <div className="flex items-center gap-4">
                            <div onClick={toggleCart} className="flex items-center gap-2 bg-[#c7a743] px-4 py-2 rounded-lg cursor-pointer hover:bg-[#b89635] transition-all">
                                <ShoppingBag size={18} className="text-white" />
                                <span className="text-sm font-semibold text-white font-sans">{cartCount}</span>
                            </div>
                            <UserMenu />
                            <Link href="/contact-us" className="hidden xl:block text-sm font-medium bg-[#c7a743] text-white px-4 py-2 rounded-lg hover:bg-[#b89635] transition-all font-sans uppercase tracking-wide">Liên hệ</Link>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* --- MOBILE NAV CONTROLS --- */}
            {/* Cũng bọc phần điều khiển Mobile vào motion.div để ẩn hiện đồng bộ */}
            <motion.div 
                variants={{
                    visible: { y: 0, opacity: 1 },
                    hidden: { y: -100, opacity: 0 },
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="w-full flex items-center justify-between hidden sm:flex xm:flex fixed top-0 left-0 z-[999] bg-transparent pointer-events-none padding-x py-4"
            >
                <div className="pointer-events-auto">
                    <Link href="/">
                        <Image
                            src={footerLogo}
                            className="w-14 h-14 object-contain"
                            alt="margerite-footerLogo"
                            width={60}
                            height={60}
                        />
                    </Link>
                </div>
                <div className="pointer-events-auto">
                    <LeftSideHome isActive={isMobileMenuOpen} setIsActive={setIsMobileMenuOpen} />
                </div>
            </motion.div>

            {/* --- MOBILE NAV OVERLAY --- */}
            <AnimatePresence mode="wait">
                {isMobileMenuOpen && (
                    <MobileNav onClose={() => setIsMobileMenuOpen(false)} />
                )}
            </AnimatePresence>
        </>
    );
}
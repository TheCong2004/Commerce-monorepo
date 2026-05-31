"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";
import { createPortal } from "react-dom";
import { NAV_ITEMS } from "./nav-links";


interface MobileNavProps {
    onClose?: () => void;
}

export default function MobileNav({ onClose }: MobileNavProps) {
    // State để quản lý menu nào đang mở
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        document.body.style.overflow = "hidden";
        return () => {
            setMounted(false);
            document.body.style.overflow = "unset";
        };
    }, []);

    const toggleDropdown = (id: string) => {
        // Nếu bấm vào cái đang mở thì đóng lại, nếu không thì mở cái mới
        setOpenDropdown(openDropdown === id ? null : id);
    };

    // Animation tổng thể của menu
    const menuVars = {
        initial: { opacity: 0, x: "100%" }, // Trượt từ phải sang
        animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" as const } },
        exit: { opacity: 0, x: "100%", transition: { duration: 0.3, ease: "easeIn" as const } }
    };

    // Animation cho dropdown con (Accordion)
    const accordionVars = {
        hidden: { height: 0, opacity: 0, overflow: "hidden" },
        visible: { height: "auto", opacity: 1, transition: { duration: 0.3 } }
    };

    if (!mounted) return null;

    return createPortal(
        <div className="fixed inset-0 z-[999999] flex justify-end">
            {/* 1. Overlay đen mờ (Bấm vào đây để đóng) */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* 2. Panel Menu chính (Trượt từ phải sang) */}
            <motion.div
                variants={menuVars}
                initial="initial"
                animate="animate"
                exit="exit"
                className="relative w-full max-w-sm h-full bg-[#1a1a1a] text-white shadow-2xl overflow-y-auto"
            >
                {/* Header của Menu */}
                <div className="flex items-center justify-between p-5 border-b border-white/10 sticky top-0 bg-[#1a1a1a] z-10">
                    <span className="text-lg font-bold text-[#c7a743] uppercase tracking-wider">Menu</span>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Danh sách Items */}
                <div className="p-4 flex flex-col gap-2">
                    {NAV_ITEMS.map((item) => {
                        const hasChildren = item.children && item.children.length > 0;
                        const isOpen = openDropdown === item.id;

                        return (
                            <div key={item.id} className="border-b border-white/5 last:border-0 pb-2">
                                {/* Dòng cha */}
                                <div className="flex items-center justify-between py-3 px-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                                     onClick={() => hasChildren ? toggleDropdown(item.id) : onClose?.()}
                                >
                                    {hasChildren ? (
                                        // Nếu có con, bấm vào chỉ để mở dropdown
                                        <span className="font-medium text-lg text-gray-100 flex-1">{item.label}</span>
                                    ) : (
                                        // Nếu không có con, bấm vào là chuyển trang
                                        <Link href={item.href} className="font-medium text-lg text-gray-100 flex-1 block" onClick={onClose}>
                                            {item.label}
                                        </Link>
                                    )}

                                    {/* Mũi tên */}
                                    {hasChildren && (
                                        <ChevronDown 
                                            size={20} 
                                            className={`text-[#c7a743] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} 
                                        />
                                    )}
                                </div>

                                {/* Menu con (Dropdown) */}
                                <AnimatePresence>
                                    {hasChildren && isOpen && (
                                        <motion.div
                                            variants={accordionVars}
                                            initial="hidden"
                                            animate="visible"
                                            exit="hidden"
                                            className="ml-4 pl-4 border-l border-white/10"
                                        >
                                            {item.children.map((child, idx) => (
                                                <Link 
                                                    key={idx} 
                                                    href={child.href}
                                                    onClick={onClose}
                                                    className="block py-3 text-sm text-gray-400 hover:text-[#c7a743] transition-colors"
                                                >
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </motion.div>
        </div>,
        document.body
    );
}
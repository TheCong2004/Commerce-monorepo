"use client";

import { useState, useEffect } from "react";
import { cardImageMap } from "./tarot"; 
import { TextReveal } from "@/components/ui";
import { motion, AnimatePresence } from "framer-motion";
import WoodenFrame from "../home/container/WoodenFrame";


const allCardIds = Object.keys(cardImageMap).filter((id) => id !== "back");

export default function Tarotbai() {
  const [selected, setSelected] = useState<string | null>(null);
  const [displayedCards, setDisplayedCards] = useState<string[]>([]);
  const [screenWidth, setScreenWidth] = useState(0);

  // Theo dõi chiều rộng màn hình để căn chỉnh left chính xác
  useEffect(() => {
    setScreenWidth(window.innerWidth);
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const shuffleNineCards = () => {
    const shuffled = [...allCardIds].sort(() => 0.5 - Math.random());
    setDisplayedCards(shuffled.slice(0, 9));
  };

  useEffect(() => {
    shuffleNineCards();
  }, []);

  const handleReset = () => {
    setSelected(null);
    shuffleNineCards();
  };

  return (
    <div className="flex flex-col items-center justify-start md:justify-center min-h-screen p-4 md:p-8 overflow-hidden">
      
     {/* SỬ DỤNG KHUNG GỖ Ở ĐÂY */}
      <WoodenFrame className="mb-4">
        <div className="w-full flex flex-col gap-1 items-center text-center">
          <TextReveal>
            <h1 className="text-transparent bg-clip-text bg-gradient-to-b from-[#FFD700] via-[#FDB931] to-[#C08218] papyrus font-bold tracking-wider text-4xl md:text-6xl uppercase leading-[1.5] md:leading-[1.5]">
              💫 Khai Mở Tâm Thức
            </h1>
          </TextReveal>
          <p className="text-[10px] md:text-sm text-[#E0E0E0] montserrat italic opacity-80">
            Hãy chọn một lá ở bên dưới để khám phá thông điệp vũ trụ dành cho bạn
            <br/> Xào lại khi đã chọn xong!
          </p>
        </div>
      </WoodenFrame>

      {/* --- KHU VỰC KẾT QUẢ --- */}
      <div className="relative flex-1 w-full flex items-center justify-center min-h-[350px] md:min-h-[450px]">
        <AnimatePresence mode="wait">
          {selected ? (
            <motion.div 
              key={selected}
              initial={{ y: 150, opacity: 0, scale: 0.5, rotateY: 180 }}
              animate={{ y: 0, opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 60, damping: 15 }}
              className="text-center z-20"
            >
              <h3 className="text-xs md:text-lg font-black text-[#D4AF37] mb-4 uppercase tracking-[0.2em] papyrus">
                Lá bài dành cho bạn
              </h3>
              <div className="relative group">
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -inset-10 bg-[#D4AF37]/20 blur-3xl rounded-full"
                ></motion.div>
                <motion.img
                  src={cardImageMap[selected]}
                  alt={selected}
                  className="relative w-40 h-64 md:w-56 md:h-80 mx-auto rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] border-2 md:border-4 border-[#D4AF37] bg-[#0a0a0a]"
                />
              </div>
              <p className="mt-4 text-[#D4AF37] font-bold papyrus text-lg md:text-xl">
                — {selected} —
              </p>
              <button 
                onClick={handleReset}
                className="mt-4 px-5 py-1.5 rounded-full border border-[#D4AF37]/40 text-[#D4AF37] text-[9px] md:text-[11px] uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all"
              >
                Xào lại bộ bài
              </button>
            </motion.div>
          ) : (
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-[#D4AF37]/20 italic papyrus tracking-[0.4em] text-sm md:text-xl animate-pulse"
            >
              — ĐANG KẾT NỐI NĂNG LƯỢNG —
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* --- KHU VỰC 9 LÁ BÀI (FAN) --- */}
      <div className="relative w-full  h-[220px] md:h-[320px] flex items-end justify-center mb-6">
        <div className="relative w-full max-w-screen-md h-full flex justify-center items-end">
          {displayedCards.map((id, idx) => {
            const total = displayedCards.length;
            const angle = (idx / (total - 1)) * 80 - 40; 
            const isSelected = selected === id;

            // Tính toán khoảng cách dãn bài phù hợp
            const gap = screenWidth < 768 ? 38 : 65; 

            return (
              <motion.div
                key={`${id}-${idx}`}
                onClick={() => setSelected(id)}
                initial={{ opacity: 0, y: 100 }}
                animate={{
                  opacity: isSelected ? 0 : 1,
                  y: isSelected ? -100 : 0,
                  rotate: isSelected ? 0 : angle,
                  scale: isSelected ? 1.2 : 1,
                }}
                whileHover={{ y: -25, scale: 1.05, transition: { duration: 0.2 } }}
                className="absolute origin-bottom"
                style={{
                  zIndex: isSelected ? 0 : idx,
                  cursor: "pointer",
                  // Căn giữa dựa trên tâm (idx-4 là lá ở giữa)
                  left: `calc(50% + ${(idx - 4) * gap}px)`,
                  transform: 'translateX(-50%)', // Căn chỉnh anchor point về giữa lá bài
                }}
              >
                <div className={`relative rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                  isSelected ? "border-[#D4AF37] scale-110" : "border-white/10 shadow-2xl shadow-black/50"
                }`}>
                  <img
                    src={cardImageMap["back"]}
                    alt="Back"
                    /* Mobile: w-20 h-32 (Đủ to để thấy họa tiết)
                       Desktop: md:w-28 md:h-44
                    */
                    className="w-30 h-52 md:w-28 md:h-44 object-cover bg-[#1a1a1a]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/5 opacity-50"></div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
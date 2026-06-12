import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "../icons";
import { cn, pageTransition } from "../helpers";

interface WalletHistoryViewProps {
  goBack: () => void;
}

export function WalletHistoryView({ goBack }: WalletHistoryViewProps) {
  return (
    <motion.div key="wallet-history" {...pageTransition} className="p-5 space-y-4">
      <header className="flex items-center gap-3 pb-2 border-b border-zinc-100 dark:border-zinc-900">
        <button onClick={goBack} className="p-1 rounded-full text-neutral-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h2 className="text-[20px] font-bold tracking-tight">Payment History</h2>
      </header>

      {/* Dropdown date selector */}
      <div className="flex justify-between items-center text-xs">
        <span className="font-bold text-zinc-400">Lịch sử giao dịch</span>
        <select className="bg-zinc-100 dark:bg-zinc-900 rounded-xl px-3 py-1.5 font-bold outline-none border-none">
          <option>June 2026</option>
          <option>May 2026</option>
          <option>April 2026</option>
        </select>
      </div>

      {/* Timeline lists */}
      <div className="space-y-5">
        {/* Group 1: 24th June 2026 */}
        <div className="space-y-2.5">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">24th June 2026</h3>
          <div className="space-y-2">
            {[
              { name: "Sai Sankar Ram", phone: "+1 (354) 7854 1423", amount: "-$54.24", time: "11:50 pm", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100", type: "send" },
              { name: "Alekya Allu", phone: "+1 (354) 7854 1423", amount: "-$4.00", time: "12:00 am", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100", type: "send" },
              { name: "Chris Evan", phone: "+1 (354) 7854 1423", amount: "+$74.85", time: "2:00 am", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100", type: "receive" }
            ].map((tx, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-900/50">
                <div className="flex items-center gap-3">
                  <img src={tx.avatar} alt={tx.name} className="h-8 w-8 rounded-full object-cover" />
                  <div>
                    <p className="text-xs font-bold text-neutral-800 dark:text-zinc-200">{tx.name}</p>
                    <p className="text-[9px] text-zinc-400 font-semibold">{tx.phone}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={cn("text-xs font-bold", tx.type === "send" ? "text-red-500" : "text-emerald-500")}>
                    {tx.amount}
                  </p>
                  <p className="text-[9px] text-zinc-400">{tx.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Group 2: 23rd June 2026 */}
        <div className="space-y-2.5">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">23rd June 2026</h3>
          <div className="space-y-2">
            {[
              { name: "Angelino", phone: "+1 (354) 7854 1423", amount: "-$54.24", time: "11:50 pm", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100", type: "send" },
              { name: "Mark Sole", phone: "+1 (354) 7854 1423", amount: "-$4.00", time: "12:00 pm", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100", type: "send" }
            ].map((tx, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-900/50">
                <div className="flex items-center gap-3">
                  <img src={tx.avatar} alt={tx.name} className="h-8 w-8 rounded-full object-cover" />
                  <div>
                    <p className="text-xs font-bold text-neutral-800 dark:text-zinc-200">{tx.name}</p>
                    <p className="text-[9px] text-zinc-400 font-semibold">{tx.phone}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={cn("text-xs font-bold", tx.type === "send" ? "text-red-500" : "text-emerald-500")}>
                    {tx.amount}
                  </p>
                  <p className="text-[9px] text-zinc-400">{tx.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

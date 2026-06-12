import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "../components/Button";
import { cn, pageTransition } from "../helpers";

interface WalletSendViewProps {
  sendAmountVal: string;
  setSendAmountVal: (val: string) => void;
  goBack: () => void;
  navigateTo: (screen: any) => void;
}

export function WalletSendView({
  sendAmountVal,
  setSendAmountVal,
  goBack,
  navigateTo,
}: WalletSendViewProps) {
  return (
    <motion.div key="wallet-send" {...pageTransition} className="p-5 space-y-5">
      <header className="flex items-center gap-3 pb-2 border-b border-zinc-100 dark:border-zinc-900">
        <button onClick={goBack} className="p-1 rounded-full text-neutral-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h2 className="text-[20px] font-bold tracking-tight">Send Amount</h2>
      </header>

      {/* Recipient info */}
      <div className="space-y-2">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Người nhận</h3>
        <div className="flex items-center gap-3 p-4 rounded-3xl border border-zinc-100 bg-white dark:border-zinc-900 dark:bg-zinc-900/30">
          <img
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100"
            alt="Recipient avatar"
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-neutral-800 dark:text-zinc-200">Sai Sankar Ram</p>
            <p className="text-[11px] text-zinc-400 font-medium">+1 (354) 7854 1423</p>
          </div>
        </div>
      </div>

      {/* Big Amount Card */}
      <div className="relative overflow-hidden rounded-[32px] bg-amber-400 dark:bg-amber-500 text-neutral-900 p-6 text-center space-y-2 shadow-sm">
        <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-900/70">
          Enter Amount You Want to Request
        </p>
        <div className="flex items-center justify-center gap-1 font-bold">
          <span className="text-xl">$</span>
          <input
            type="text"
            value={sendAmountVal}
            onChange={(e) => setSendAmountVal((e.target as any).value)}
            className="w-40 bg-transparent text-center text-4xl font-extrabold outline-none border-b border-neutral-900/20 focus:border-neutral-900/40 py-1"
          />
        </div>
        <p className="text-[10px] font-semibold text-neutral-900/60">
          You can only send $54.24
        </p>
      </div>

      {/* Payment history list preview */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Lịch sử giao dịch ví</h3>
          <button
            onClick={() => navigateTo("wallet-history")}
            className="text-xs font-bold text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
          >
            Xem tất cả
          </button>
        </div>

        <div className="space-y-2.5">
          {[
            { name: "Sai Sankar Ram", phone: "+1 (354) 7854 1423", amount: "-$54.24", time: "11:50 pm", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100", type: "send" },
            { name: "Alekya Allu", phone: "+1 (354) 7854 1423", amount: "+$4.00", time: "12:00 am", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100", type: "receive" }
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

      {/* Bottom Actions */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        <Button
          variant="outline"
          className="rounded-2xl h-12 font-bold"
          onClick={() => (globalThis as any).alert(`Yêu cầu nhận $${sendAmountVal} đã được gửi!`)}
        >
          Request Now
        </Button>
        <Button
          className="rounded-2xl h-12 font-bold bg-amber-500 text-neutral-950 hover:bg-amber-600 dark:bg-amber-400 dark:text-neutral-950"
          onClick={() => navigateTo("wallet-receive")}
        >
          QR Code
        </Button>
      </div>
    </motion.div>
  );
}

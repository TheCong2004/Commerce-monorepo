import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, QrCode } from "lucide-react";
import { pageTransition } from "../helpers";

interface WalletReceiveViewProps {
  sendAmountVal: string;
  goBack: () => void;
}

export function WalletReceiveView({
  sendAmountVal,
  goBack,
}: WalletReceiveViewProps) {
  return (
    <motion.div key="wallet-receive" {...pageTransition} className="absolute inset-0 z-10 bg-amber-400 dark:bg-amber-500 flex flex-col justify-between p-6 overflow-y-auto">
      {/* Header */}
      <header className="flex items-center gap-3">
        <button onClick={goBack} className="p-1 rounded-full text-neutral-900 bg-white/20 hover:bg-white/40">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h2 className="text-[20px] font-bold text-neutral-900 tracking-tight">Receive Payment</h2>
      </header>

      {/* QR Card Container */}
      <div className="my-6 bg-white dark:bg-zinc-900 rounded-[36px] p-6 text-center shadow-lg space-y-5">
        {/* QR Image Box */}
        <div className="relative grid h-48 w-48 place-items-center bg-zinc-50 dark:bg-zinc-950 rounded-3xl mx-auto p-4 border border-zinc-100 dark:border-zinc-800">
          <QrCode className="h-40 w-40 text-neutral-955 dark:text-white" />
        </div>

        {/* Transaction Key */}
        <p className="text-[10px] font-bold font-mono text-zinc-400 select-all truncate px-4">
          ad8d6fcfb2a1a8c88fb739f7fb9c86a6
        </p>

        {/* Large Amount */}
        <div className="text-3xl font-extrabold text-neutral-950 dark:text-white">
          ${sendAmountVal}
        </div>

        {/* Target User */}
        <div className="flex items-center justify-center gap-2.5 border-t border-zinc-100 dark:border-zinc-800 pt-4">
          <img
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100"
            alt="Recipient avatar"
            className="h-9 w-9 rounded-full object-cover"
          />
          <div className="text-left">
            <p className="text-xs font-bold text-neutral-800 dark:text-zinc-200">Sai Sankar Ram</p>
            <p className="text-[10px] text-zinc-400 font-medium">+1 (354) 7854 1423</p>
          </div>
        </div>
      </div>

      {/* Footer link */}
      <div className="text-center mb-4">
        <button
          onClick={() => {
            const newCode = Math.random().toString(36).substring(2, 18);
            (globalThis as any).alert(`Generated new QR transaction session: ${newCode}`);
          }}
          className="text-xs font-bold text-neutral-900/70 hover:text-neutral-900 hover:underline"
        >
          Retry Again with new QR code
        </button>
      </div>
    </motion.div>
  );
}

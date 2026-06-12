import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/Button";
import { pageTransition } from "../helpers";

interface AuthViewProps {
  onLoginSuccess: (name: string, email: string) => void;
}

export function AuthView({ onLoginSuccess }: AuthViewProps) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password || (mode === "register" && !fullName)) {
      setError("Vui lòng điền đầy đủ các trường dữ liệu.");
      return;
    }

    if (!email.includes("@")) {
      setError("Email không hợp lệ.");
      return;
    }

    // Simulate Auth success
    onLoginSuccess(fullName || email.split("@")[0], email);
  };

  return (
    <motion.div {...pageTransition} className="absolute inset-0 z-10 bg-white dark:bg-zinc-950 flex flex-col justify-between p-6 overflow-y-auto">
      {/* Brand logo header */}
      <div className="text-center pt-8">
        <h1 className="text-4xl font-extrabold tracking-tighter text-neutral-950 dark:text-white">
          Shope<span className="text-neutral-955 dark:text-white font-extrabold">.</span>
        </h1>
        <p className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mt-1">
          Minimalist E-Commerce UI KIT
        </p>
      </div>

      {/* Forms Area */}
      <form onSubmit={handleSubmit} className="space-y-4 my-8 max-w-sm mx-auto w-full">
        <h2 className="text-lg font-bold text-neutral-900 dark:text-white text-center">
          {mode === "login" ? "Chào mừng quay lại" : "Tạo tài khoản mới"}
        </h2>
        
        {error && (
          <div className="p-3 text-[11px] font-semibold text-red-600 bg-red-50 border border-red-100 rounded-2xl dark:bg-red-950/20 dark:border-red-900 dark:text-red-400">
            {error}
          </div>
        )}

        {mode === "register" && (
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest pl-1">Họ và tên</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName((e.target as any).value)}
              placeholder="Roberto Juarez"
              className="h-12 w-full rounded-2xl border border-zinc-200/60 bg-zinc-50 px-4 text-xs text-neutral-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-zinc-400"
            />
          </div>
        )}

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest pl-1">Địa chỉ Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail((e.target as any).value)}
            placeholder="name@example.com"
            className="h-12 w-full rounded-2xl border border-zinc-200/60 bg-zinc-50 px-4 text-xs text-neutral-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-zinc-400"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest pl-1">Mật khẩu</label>
            {mode === "login" && (
              <button type="button" className="text-[10px] text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 font-bold">
                Quên mật khẩu?
              </button>
            )}
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword((e.target as any).value)}
            placeholder="••••••••"
            className="h-12 w-full rounded-2xl border border-zinc-200/60 bg-zinc-50 px-4 text-xs text-neutral-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-zinc-400"
          />
        </div>

        <Button type="submit" size="lg" className="w-full mt-4 font-bold rounded-2xl h-12">
          {mode === "login" ? "Đăng nhập" : "Đăng ký tài khoản"}
        </Button>
      </form>

      {/* Switch modes link */}
      <div className="text-center pb-8">
        <p className="text-xs text-zinc-400">
          {mode === "login" ? "Chưa có tài khoản?" : "Đã có tài khoản?"}{" "}
          <button
            onClick={() => {
              setError("");
              setMode((prev) => (prev === "login" ? "register" : "login"));
            }}
            className="font-bold text-neutral-950 dark:text-white hover:underline ml-1"
          >
            {mode === "login" ? "Đăng ký ngay" : "Đăng nhập ngay"}
          </button>
        </p>
      </div>
    </motion.div>
  );
}

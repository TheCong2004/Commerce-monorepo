"use client";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { fromImage } from "@/public"; // Đảm bảo đường dẫn này đúng trong dự án của bạn
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import useLoginModal from "@/features/auth/hooks/use-login-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import useRegisterModal from "@/features/auth/hooks/use-register-modal";
import { loginFormSchema, TloginFormData } from "@/features/auth/schemas";
import { AtSign, Eye, EyeOff, Loader2, Lock, X } from "lucide-react";

// 1. Icon Google (Thêm vào đây)
const GoogleIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#FFC107"
      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    />
    <path
      fill="#FF3D00"
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
    />
    <path
      fill="#4CAF50"
      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
    />
    <path
      fill="#1976D2"
      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
    />
  </svg>
);

export default function LoginForm({ onClose }: { onClose: () => void }) {
  const router = useRouter();

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<TloginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  // Cấu hình URL API
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const onSubmits = async (data: TloginFormData) => {
    try {
      // Sửa lại đường dẫn API động
      const response = await axios.post(`${API_URL}/login`, data);

      if (response?.data?.success) {
        toast.success("Đăng nhập thành công!");
        const { access_token, user } = response.data;

        // Logic phân quyền giữ nguyên
        if (user.role === "user") {
          Cookies.set("authToken", access_token, { expires: 1 });
          loginModal.onClose();
          router.refresh();
        } else if (user.role === "admin") {
          Cookies.set("adminAuthToken", access_token, { expires: 1 });
          loginModal.onClose();
          router.push("/dashboard");
        }
      }
    } catch (error: any) {
      // Xử lý lỗi gọn gàng hơn
      const serverMessage =
        error.response?.data?.error || error.response?.data?.message;
      if (serverMessage) {
        toast.error(serverMessage);
      } else {
        toast.error("Đã xảy ra lỗi khi đăng nhập.");
      }
    }
  };

  // Hàm chuyển hướng Google
  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  return (
    <motion.div
      initial={{ y: "115%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="w-full bg-[#04031b] py-5 h-[80vh] relative z-[999]"
    >
      <div className="absolute top-4 right-4">
        <button
          className="w-fit bg-[#2f1d88] text-white py-2 px-4 text-lg rounded-lg"
          onClick={onClose}
        >
          <X />
        </button>
      </div>
      <div className="w-full h-full flex">
        {/* CỘT TRÁI - ẢNH */}
        <div className="hidden lg:block md:w-1/2 h-full pointer-events-none">
          <Image
            src={fromImage}
            alt="fromImage"
            className="w-full h-full object-cover"
          />
        </div>
        {/* CỘT PHẢI - FORM */}
        <div className="w-full flex items-center justify-center">
          <div className="w-full flex flex-col gap-8 px-4">
            <div className="flex flex-col gap-4">
              <h1 className="subHeading text-white font-bold">Đăng nhập</h1>

              <div className="flex items-center gap-2">
                <p className="text-sm text-[#ADABB8] ">
                  Bạn chưa có tài khoản?
                </p>
                <button
                  onClick={() => {
                    loginModal.onClose();
                    registerModal.onOpen();
                  }}
                  className="text-sm text-[#9887c9] underline"
                >
                  Đăng ký
                </button>
              </div>
            </div>
            <form
              onSubmit={handleSubmit(onSubmits)}
              className="flex flex-col gap-5"
            >
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <div
                      className={`w-full flex items-center bg-[#3c375269] rounded-lg p-4 focus-within:border-[#3920BA] focus-within:border-[1px] focus-within:ring-1 ${
                        errors.email && "border-red-500 border-[1px]"
                      }`}
                    >
                      <AtSign className="text-[#6D6980] mr-3" />
                      <input
                        type="email"
                        {...register("email")}
                        placeholder="Email"
                        className={`bg-transparent text-white placeholder:text-[#6D6980] focus:outline-none outline-none w-full font-sans`}
                      />
                    </div>
                    {errors.email && (
                      <span className="text-red-500 text-sm font-sans">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <div
                      className={`w-full flex items-center bg-[#3c375269] rounded-lg p-4 focus-within:border-[#3920BA] focus-within:border-[1px] focus-within:ring-1 ${
                        errors.password && "border-red-500 border-[1px]"
                      }`}
                    >
                      <Lock className="text-[#6D6980] mr-3" />
                      <input
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                        placeholder="Nhập mật khẩu"
                        className={`bg-transparent text-white placeholder:text-[#6D6980] focus:outline-none outline-none w-full font-sans`}
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="ml-2"
                      >
                        {showPassword ? (
                          <EyeOff className="text-[#6D6980]" />
                        ) : (
                          <Eye className="text-[#6D6980]" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <span className="text-red-500 text-sm font-sans">
                        {errors.password.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#2f1d88] rounded-lg p-4 text-[16px] text-white font-normal text-center leading-tight tracking-tight cursor-pointer font-sans"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin mx-auto" />
                ) : (
                  "Đăng nhập"
                )}
              </button>

              {/* --- PHẦN MỚI THÊM: NÚT GOOGLE --- */}
              <div className="relative flex items-center">
                <div className="flex-grow border-t border-[#3c3752]"></div>
                <span className="flex-shrink-0 mx-4 text-gray-400 text-xs font-sans">
                  HOẶC
                </span>
                <div className="flex-grow border-t border-[#3c3752]"></div>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full bg-white hover:bg-gray-100 transition-colors rounded-lg p-3 text-[16px] text-black font-medium text-center leading-tight tracking-tight cursor-pointer flex justify-center items-center gap-3 font-sans"
              >
                <GoogleIcon />
                <span className="text-sm">Đăng nhập với Google</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

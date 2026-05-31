"use client";
import axios from "axios";
import Image from "next/image";
import Cookies from "js-cookie";
import { useState } from "react";
import toast from "react-hot-toast";
import { fromImage } from "@/public";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import useLoginModal from "@/features/auth/hooks/use-login-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import useRegisterModal from "@/features/auth/hooks/use-register-modal";
import { registerFormSchema, TregisterFormData } from "@/features/auth/schemas";
import { AtSign, Eye, EyeOff, Loader2, Lock, User, X } from "lucide-react";

export default function RegisterForm({ onClose }: { onClose: () => void }) {
	const loginModal = useLoginModal();
	const registerModal = useRegisterModal();
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const toggleConfirmPasswordVisibility = () => {
		setShowConfirmPassword(!showConfirmPassword);
	};

	const {
		register,
		reset,
		handleSubmit,
		watch,
		formState: { isSubmitting, errors },
	} = useForm<TregisterFormData>({
		resolver: zodResolver(registerFormSchema),
	});

	const password = watch("password");
	const API_URL = process.env.NEXT_PUBLIC_API_URL;
	const onSubmits = async (data: TregisterFormData) => {
	   if (data.password !== data.confirmPassword) {
		   toast.error("Mật khẩu không khớp");
		   return;
	   }
		try{
			const response = await axios.post(`${API_URL}/register`, data);
			if (response?.data?.success) {
				toast.success(response.data.success);
				const { access_token } = response.data;
				Cookies.set("userAuthToken", access_token, { expires: 1 });
				// reset fomr sau khi đăng ký thành công
				reset();
				registerModal.onClose();
			}
		} catch (error: any) {
			//xử lý lỗi 
			console.log("Registration error:", error);
			//ưu tiên lỗi hiển thị từ server
			const serverMessage = error.response?.data?.message || error.response?.data?.error;
			   if (serverMessage) {
				   toast.error(serverMessage);
			   } else  if (error.request){
				   // lỗi không nhận được phản hồi từ server
				   toast.error("Không nhận được phản hồi từ máy chủ. Vui lòng thử lại sau.");
			   } else {
				   // lỗi khác
				   toast.error("Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại.");
			   }      
	}
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
					onClick={onClose}>
					<X />
				</button>
			</div>
			<div className="w-full h-full flex">
				<div className="hidden lg:block md:w-1/2 h-full pointer-events-none">
					<Image
						src={fromImage}
						alt="fromImage"
						className="w-full h-full object-cover rounded-xl"
						width={1000}
						height={1000}
					/>
				</div>
				 <div className="w-full flex items-center justify-center">
					<div className="w-full flex flex-col gap-8 px-4">
						<div className="flex flex-col gap-4">
							   <h1 className="subHeading text-white font-bold leading-tight montserrat">
								   Tạo tài khoản
							   </h1>
							   <div className="flex items-center gap-2">
								   <p className="text-sm  text-[#ADABB8]">
									   Đã có tài khoản?
								   </p>
								   <button
									   onClick={() => {
										   registerModal.onClose();
										   loginModal.onOpen();
									   }}
									   className="text-sm text-[#9887c9] font-normal leading-tight tracking-tight underline montserrat cursor-pointer">
									   Đăng nhập
								   </button>
							   </div>
						</div>
						<form
							onSubmit={handleSubmit(onSubmits)}
							className="flex flex-col gap-5">
							<div className="flex flex-col gap-2">
								<div className="flex flex-col gap-5">
									<div className="flex flex-col gap-2">
										<div
											className={`w-full flex items-center bg-[#3c375269] rounded-lg p-4 focus-within:border-[#3920BA] focus-within:border-[1px] focus-within:ring-1 ${
												errors.name && "border-red-500 border-[1px]"
											}`}>
											<User className="text-[#6D6980] mr-3" />
											<input
												type="text"
												{...register("name")}
												   placeholder="Họ và tên"
												className={`bg-transparent text-white placeholder:text-[#6D6980] focus:outline-none outline-none w-full montserrat`}
											/>
										</div>
										{errors.name && (
											<span className="text-red-500 text-sm montserrat">
												{errors.name.message}
											</span>
										)}
									</div>
									<div className="flex flex-col gap-2">
										<div
											className={`w-full flex items-center bg-[#3c375269] rounded-lg p-4 focus-within:border-[#3920BA] focus-within:border-[1px] focus-within:ring-1 ${
												errors.email && "border-red-500 border-[1px]"
											}`}>
											<AtSign className="text-[#6D6980] mr-3" />
											<input
												type="email"
												{...register("email")}
												   placeholder="Email"
												className={`bg-transparent text-white placeholder:text-[#6D6980] focus:outline-none outline-none w-full montserrat`}
											/>
										</div>
										{errors.email && (
											<span className="text-red-500 text-sm montserrat">
												{errors.email.message}
											</span>
										)}
									</div>
									<div className="flex flex-col gap-2">
										<div
											className={`w-full flex items-center bg-[#3c375269] rounded-lg p-4 focus-within:border-[#3920BA] focus-within:border-[1px] focus-within:ring-1 ${
												errors.password && "border-red-500 border-[1px]"
											}`}>
											<Lock className="text-[#6D6980] mr-3" />
											<input
												type={showPassword ? "text" : "password"}
												{...register("password")}
												   placeholder="Nhập mật khẩu"
												className={`bg-transparent text-white placeholder:text-[#6D6980] focus:outline-none outline-none w-full montserrat`}
											/>
											<button
												type="button"
												onClick={togglePasswordVisibility}
												className="ml-2">
												{showPassword ? (
													<EyeOff className="text-[#6D6980]" />
												) : (
													<Eye className="text-[#6D6980]" />
												)}
											</button>
										</div>
										{errors.password && (
											<span className="text-red-500 text-sm montserrat">
												{errors.password.message}
											</span>
										)}
									</div>
									<div className="flex flex-col gap-2">
										<div
											className={`w-full flex items-center bg-[#3c375269] rounded-lg p-4 focus-within:border-[#3920BA] focus-within:border-[1px] focus-within:ring-1 ${
												errors.confirmPassword && "border-red-500 border-[1px]"
											}`}>
											<Lock className="text-[#6D6980] mr-3" />
											<input
												type={showConfirmPassword ? "text" : "password"}
												{...register("confirmPassword", {
													validate: (value) =>
														value === password || "Passwords do not match",
												})}
												   placeholder="Xác nhận mật khẩu"
												className={`bg-transparent text-white placeholder:text-[#6D6980] focus:outline-none outline-none w-full montserrat`}
											/>
											<button
												type="button"
												onClick={toggleConfirmPasswordVisibility}
												className="ml-2">
												{showConfirmPassword ? (
													<EyeOff className="text-[#6D6980]" />
												) : (
													<Eye className="text-[#6D6980]" />
												)}
											</button>
										</div>
										{errors.confirmPassword && (
											<span className="text-red-500 text-sm montserrat">
												{errors.confirmPassword.message}
											</span>
										)}
									</div>
								</div>
							</div>
							<button
								type="submit"
								className="w-full bg-[#2f1d88] rounded-lg p-4 text-[16px] text-white font-normal text-center leading-tight tracking-tight cursor-pointer montserrat"
								disabled={isSubmitting}>
								   {isSubmitting ? (
									   <Loader2 className="animate-spin mx-auto" />
								   ) : (
									   "Đăng ký"
								   )}
							</button>
						</form>
					</div>
				</div>
			</div>
		</motion.div>
	);
}

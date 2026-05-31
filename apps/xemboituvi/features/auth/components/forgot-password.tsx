import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { TforgotPasswordProps } from "@/types";
import { AtSign, Lock, Eye, EyeOff } from "lucide-react";

export default function ForgotPasswordForm({
	setShowForgotPassword,
	showEnterCode,
	setShowEnterCode,
	email,
	setEmail,
	code,
	setCode,
}: TforgotPasswordProps) {
	const router = useRouter();
	const [newPassword, setNewPassword] = useState<string>("");
	const [showResetForm, setShowResetForm] = useState<boolean>(false);
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showConfirmPassword, setShowConfirmPassword] =
		useState<boolean>(false);

	const handleForgotPassword = async () => {
		if (!email) {
			toast.error("Email is required.");
			return;
		}
		try {
			setIsLoading(true);
			await axios.post(
				`https://mysticmarguerite.com/new/backend/api/forgot-password`,
				{ email },
			);
			toast.success("A 6-digit code has been sent to your email.");
			setShowEnterCode(true);
		} catch (error) {
			toast.error(
				axios.isAxiosError(error) && error.response?.data?.error
					? error.response.data.error
					: "An unexpected error occurred.",
			);
		} finally {
			setIsLoading(false);
		}
	};

	const handleVerifyCode = async () => {
		if (!code) {
			toast.error("Code is required.");
			return;
		}
		try {
			setIsLoading(true);
			const response = await axios.post(
				`https://mysticmarguerite.com/new/backend/api/verify-reset-code`,
				{
					email,
					code,
				},
			);
			if (response?.data?.success) {
				toast.success("Code verified successfully.");
				setShowResetForm(true);
			}
		} catch (error) {
			console.log(error);
			toast.error("Invalid or expired code.");
		} finally {
			setIsLoading(false);
		}
	};

	const handleResetPassword = async () => {
		if (!newPassword) {
			toast.error("Password is required.");
			return;
		}
		if (newPassword.length < 8) {
			toast.error("Password must be at least 8 characters long.");
			return;
		}
		if (newPassword !== confirmPassword) {
			toast.error("Passwords do not match.");
			return;
		}
		try {
			setIsLoading(true);
			const response = await axios.post(
				`https://mysticmarguerite.com/new/backend/api/reset-password`,
				{
					email,
					code,
					password: newPassword,
					password_confirmation: confirmPassword,
				},
			);
			if (response?.data?.success) {
				toast.success("Password reset successfully.");
				router.refresh();
			}
		} catch (error) {
			console.log(error);
			toast.error("Failed to reset password.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="w-full padding-x flex justify-center flex-col gap-8">
			<div className="flex flex-col gap-5">
				<h1 className="text-[40px] text-white font-medium leading-tight tracking-tight">
					{showResetForm
						? "Reset Password"
						: showEnterCode
						? "Enter Code"
						: "Forgot Password"}
				</h1>
				<p className="text-sm text-[#ADABB8] font-normal leading-normal tracking-tight">
					{showResetForm
						? "Enter your new password"
						: showEnterCode
						? "Enter the 6-digit code sent to your email."
						: "Enter your email to receive a 6 digit code for email verification."}
				</p>
			</div>
			<div className="flex flex-col gap-5">
				<div className="flex flex-col gap-5">
					{showResetForm ? (
						<div className="flex flex-col gap-2">
							<div
								className={`w-full flex items-center bg-[#3c375269] rounded-lg p-4 focus-within:border-[#2f1d88] focus-within:border-[1px] focus-within:ring-1`}>
								<Lock className="text-[#6D6980] mr-3" />
								<input
									type={showPassword ? "text" : "password"}
									placeholder="Enter new password"
									value={newPassword}
									required
									onChange={(e) => setNewPassword(e.target.value)}
									className={`bg-transparent text-white placeholder:text-[#6D6980] focus:outline-none outline-none w-full font-Monstrate`}
								/>
								<div
									className="cursor-pointer"
									onClick={() => setShowPassword(!showPassword)}>
									{showPassword ? (
										<EyeOff className="text-[#6D6980]" />
									) : (
										<Eye className="text-[#6D6980]" />
									)}
								</div>
							</div>
							<div
								className={`w-full flex items-center bg-[#3c375269] rounded-lg p-4 focus-within:border-[#2f1d88] focus-within:border-[1px] focus-within:ring-1`}>
								<Lock className="text-[#6D6980] mr-3" />
								<input
									type={showConfirmPassword ? "text" : "password"}
									placeholder="Confirm new password"
									value={confirmPassword}
									required
									onChange={(e) => setConfirmPassword(e.target.value)}
									className={`bg-transparent text-white placeholder:text-[#6D6980] focus:outline-none outline-none w-full font-Monstrate`}
								/>
								<div
									className="cursor-pointer"
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
									{showConfirmPassword ? (
										<EyeOff className="text-[#6D6980]" />
									) : (
										<Eye className="text-[#6D6980]" />
									)}
								</div>
							</div>
						</div>
					) : !showEnterCode ? (
						<div className="flex flex-col gap-2">
							<div
								className={`w-full flex items-center bg-[#3c375269] rounded-lg p-4 focus-within:border-[#2f1d88] focus-within:border-[1px] focus-within:ring-1`}>
								<AtSign className="text-[#6D6980] mr-3" />
								<input
									type="email"
									placeholder="Enter your email"
									value={email}
									required
									onChange={(e) => setEmail(e.target.value)}
									className={`bg-transparent text-white placeholder:text-[#6D6980] focus:outline-none outline-none w-full font-Monstrate`}
								/>
							</div>
						</div>
					) : (
						<div className="flex flex-col gap-2">
							<div
								className={`w-full flex items-center bg-[#3c375269] rounded-lg p-4 focus-within:border-[#2f1d88] focus-within:border-[1px] focus-within:ring-1`}>
								<input
									type="text"
									placeholder="Enter 6-digit code"
									value={code}
									required
									onChange={(e) => setCode(e.target.value)}
									maxLength={6}
									className={`bg-transparent text-white placeholder:text-[#6D6980] focus:outline-none outline-none w-full font-Monstrate`}
								/>
							</div>
						</div>
					)}
					<div className="w-full flex items-end justify-end gap-4 flex-col">
						<button
							type="submit"
							disabled={isLoading}
							className="w-full bg-[#2f1d88] rounded-lg p-4 text-[16px] text-white font-normal text-center leading-tight tracking-tight cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
							onClick={
								showResetForm
									? handleResetPassword
									: showEnterCode
									? handleVerifyCode
									: handleForgotPassword
							}>
							{isLoading ? (
								<div className="flex items-center justify-center">
									<Loader2 className="animate-spin" />
								</div>
							) : (
								<>
									{showResetForm
										? "Reset Password"
										: showEnterCode
										? "Verify Code"
										: "Send code"}
								</>
							)}
						</button>
						{!showResetForm && !showEnterCode && (
							<button
								className="text-sm text-[#ADABB8] leading-tight tracking-tight font-Monstrate font-normal"
								onClick={() => {
									setShowForgotPassword(false);
									setShowEnterCode(false);
								}}>
								Back to Login
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

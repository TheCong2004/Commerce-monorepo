"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { Mail, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function NewsLetter() {
	const [email, setEmail] = useState("");
	const searchParams = useSearchParams();
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		const status = searchParams.get("status");
		const message = searchParams.get("message");

		   if (status === "success") {
			   toast.success(message || "Bạn đã đăng ký nhận tin thành công!");
		   } else if (status === "error") {
			   toast.error(message || "Đã xảy ra lỗi!");
		   }
	}, [searchParams]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const response = await axios.post(
				"https://mysticmarguerite.com/new/backend/api/newsletter/subscribe",
				{
					email,
					redirect_url: window.location.href,
				},
			);
			   if (response.data.success) {
				   toast.success("Đăng ký nhận tin thành công!");
				   setEmail("");
			   } else {
				   toast.error("Đăng ký thất bại.");
			   }
		} catch (err: unknown) {
			   if (axios.isAxiosError(err) && err.response?.data?.error) {
				   toast.error(err.response.data.error);
			   } else {
				   toast.error("Đã xảy ra lỗi.");
			   }
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section className="w-full padding-x padding-y from-[#f7edd6] to-[#f3e2c2] relative z-50 overflow-hidden">
			{/* Decorative background elements */}
			<div className="absolute top-10 left-10 text-[#c7a743] opacity-10">
				<Star className="w-24 h-24 animate-pulse" />
			</div>
			<div className="absolute bottom-10 right-10 text-[#c7a743] opacity-10">
				<Star className="w-20 h-20 animate-pulse delay-300" />
			</div>

			<div className="max-w-5xl mx-auto relative">
				{/* Main Container */}
				<div className="relative">
					{/* Outer gold border */}
					<div className="absolute inset-0 bg-gradient-to-r from-[#bf7e26] via-[#c7a743] to-[#bf7e26] rounded-3xl p-1 shadow-2xl"></div>
					
					{/* Inner brown border */}
					<div className="absolute inset-1 bg-[#8B4513] rounded-3xl"></div>

					{/* Content */}
					<div className="relative bg-gradient-to-br from-[#f9f4e8] via-[#f5e8d8] to-[#f0dcc8] rounded-3xl p-8 md:p-14">
						{/* Top decorative line */}
						<div className="flex items-center justify-center gap-4 mb-8">
							<div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-[#c7a743]"></div>
							<span className="text-[#bf7e26] text-2xl">✦</span>
							<div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-[#c7a743]"></div>
						</div>

						{/* Header */}
						<div className="text-center mb-12">
							   <h2 className="papyrus text-4xl md:text-5xl font-bold text-[#3a2a14] tracking-wider uppercase mb-3">
								   Tri thức cổ xưa
								   <br />
								   <span className="text-[#bf7e26]">Gửi mỗi tháng</span>
							   </h2>
							   <p className="montserrat text-[#5c4033] text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
								   Nhận thông tin chiêm tinh độc quyền, hướng dẫn huyền bí và tri thức chọn lọc trực tiếp vào hộp thư của bạn. Kết nối với những bí mật sâu thẳm của vũ trụ.
							   </p>
						</div>

						{/* Benefits */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
							<div className="flex items-center justify-center gap-3 p-4 bg-white/50 rounded-lg border border-[#d4c5a9]">
								<Star className="w-5 h-5 text-[#bf7e26]" />
								   <span className="montserrat text-sm font-medium text-[#3a2a14]">
									   Tử vi độc quyền
								   </span>
							</div>
							<div className="flex items-center justify-center gap-3 p-4 bg-white/50 rounded-lg border border-[#d4c5a9]">
								<Star className="w-5 h-5 text-[#bf7e26]" />
								   <span className="montserrat text-sm font-medium text-[#3a2a14]">
									   Trải bài Tarot
								   </span>
							</div>
							<div className="flex items-center justify-center gap-3 p-4 bg-white/50 rounded-lg border border-[#d4c5a9]">
								<Star className="w-5 h-5 text-[#bf7e26]" />
								   <span className="montserrat text-sm font-medium text-[#3a2a14]">
									   Ưu đãi đặc biệt
								   </span>
							</div>
						</div>

						{/* Form */}
						<form
							onSubmit={handleSubmit}
							className="flex flex-col sm:flex-row items-center gap-3 justify-center mb-6">
							<div className="w-full sm:flex-1 relative group">
								<Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#bf7e26] w-5 h-5" />
								<input
									type="email"
									   placeholder="nhap@email.com"
									className="w-full pl-12 pr-4 py-3 montserrat text-[#3a2a14] bg-white border-2 border-[#d4c5a9] rounded-full focus:outline-none focus:border-[#bf7e26] focus:ring-2 focus:ring-[#bf7e26]/20 transition-all duration-300 placeholder:text-[#b0a090]"
									id="email"
									name="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>
							<button
								disabled={isSubmitting}
								type="submit"
								className="papyrus w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-[#bf7e26] to-[#c7a743] hover:from-[#a66a1d] hover:to-[#b5931f] disabled:from-[#d0d0d0] disabled:to-[#e0e0e0] text-white font-bold uppercase tracking-widest rounded-full shadow-lg hover:shadow-xl disabled:shadow-none transition-all duration-300 border-2 border-[#8B4513] disabled:border-[#b0b0b0]">
								   {isSubmitting ? "Đang đăng ký..." : "Đăng ký"}
							</button>
						</form>

						{/* Bottom message */}
						   <p className="text-center montserrat text-xs text-[#8B4513] italic">
							   ✨ Không spam, chỉ gửi tri thức vũ trụ tinh túy. Có thể hủy đăng ký bất cứ lúc nào. ✨
						   </p>
					</div>
				</div>
			</div>
		</section>
	);
}

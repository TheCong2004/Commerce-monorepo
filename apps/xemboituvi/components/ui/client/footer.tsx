import Link from "next/link";
import Image from "next/image";
import { footerLogo } from "@/public";
import { MdEmail } from "react-icons/md";
import { FaFacebookF, FaInstagram, FaYoutube, FaPhone } from "react-icons/fa";
import { MapPin, Star } from "lucide-react";

export default function Footer() {
	   return (
		   <footer className="w-full relative z-50 bg-gradient-to-b from-[#3a2a14] via-[#4a3520] to-[#2e1f0f] text-white overflow-hidden">
			   {/* Viền trang trí phía trên */}
			   <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#c7a743] to-transparent"></div>
           
			   {/* Họa tiết nền huyền bí */}
			   <div className="absolute inset-0 opacity-5">
				   <div className="absolute top-10 left-10 text-[#c7a743]">
					   <Star className="w-16 h-16 animate-pulse" />
				   </div>
				   <div className="absolute top-32 right-20 text-[#c7a743]">
					   <Star className="w-12 h-12 animate-pulse delay-150" />
				   </div>
				   <div className="absolute bottom-20 left-1/4 text-[#c7a743]">
					   <Star className="w-10 h-10 animate-pulse delay-300" />
				   </div>
			   </div>

			   <div className="relative w-full padding-y padding-x">
				   {/* Nội dung chính footer */}
				   <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
					   {/* Thông tin công ty */}
					   <div className="flex flex-col gap-6">
						   <Image
							   src={footerLogo}
							   alt="Logo chân trang"
							   className="w-[160px] object-cover filter brightness-110"
						   />
						   <p className="paragraph font-sans text-[#e9ddc0] leading-relaxed">
							   Khám phá sự dẫn dắt huyền bí từ chuyên gia chiêm tinh của chúng tôi, mang đến những hiểu biết sâu sắc về hành trình vũ trụ của bạn. Để các vì sao soi sáng con đường phía trước.
						   </p>
						   {/* Mạng xã hội */}
						   <div className="flex gap-3">
							   <a href="#" className="w-10 h-10 rounded-full bg-[#bf7e26] hover:bg-[#c7a743] flex items-center justify-center transition-all duration-300 hover:scale-110 group">
								   <FaFacebookF className="text-white group-hover:rotate-12 transition-transform" />
							   </a>
							   <a href="#" className="w-10 h-10 rounded-full bg-[#bf7e26] hover:bg-[#c7a743] flex items-center justify-center transition-all duration-300 hover:scale-110 group">
								   <FaInstagram className="text-white group-hover:rotate-12 transition-transform" />
							   </a>
							   <a href="#" className="w-10 h-10 rounded-full bg-[#bf7e26] hover:bg-[#c7a743] flex items-center justify-center transition-all duration-300 hover:scale-110 group">
								   <FaYoutube className="text-white group-hover:rotate-12 transition-transform" />
							   </a>
						   </div>
					   </div>

					   {/* Đường dẫn nhanh */}
					   <div>
						   <h3 className="font-semibold papyrus text-xl mb-6 font-bold text-[#c7a743] uppercase tracking-wider relative inline-block">
							   Đường dẫn nhanh
							   <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#c7a743] to-transparent"></span>
						   </h3>
						   <ul className="space-y-3">
							   {[
								   { href: "/", label: "Trang chủ" },
								   { href: "/about-us", label: "Về chúng tôi" },
								   { href: "/services", label: "Dịch vụ" },
								   { href: "/blogs/astrology", label: "Blog Chiêm tinh" },
								   { href: "/planetary-meditations", label: "Thiền Hành Tinh" },
								   { href: "/products", label: "Sản phẩm" },
								   { href: "/life-healing", label: "Cân bằng cuộc sống" },
								   { href: "/stars/star-&-planets", label: "Sao & Hành tinh" }
							   ].map((link) => (
								   <li key={link.href}>
									   <Link
										   href={link.href}
										   className="text-[#d4c5a9] hover:text-[#c7a743] font-sans paragraph transition-colors duration-300 flex items-center gap-2 group">
										   <span className="w-1 h-1 rounded-full bg-[#bf7e26] group-hover:w-2 group-hover:h-2 transition-all"></span>
										   {link.label}
									   </Link>
								   </li>
							   ))}
						   </ul>
					   </div>

					   {/* Dịch vụ */}
					   <div>
						   <h3 className="font-semibold papyrus text-xl mb-6 font-bold text-[#c7a743] uppercase tracking-wider relative inline-block">
							   Dịch vụ
							   <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#c7a743] to-transparent"></span>
						   </h3>
						   <ul className="space-y-3">
							   {[
								   "Tư vấn chiêm tinh",
								   "Phong thủy",
								   "Xem tuổi hợp",
								   "Xem vận mệnh",
								   "Chọn ngày tốt",
								   "Lịch âm dương"
							   ].map((service) => (
								   <li key={service}>
									   <Link
										   href="#"
										   className="text-[#d4c5a9] hover:text-[#c7a743] font-sans paragraph transition-colors duration-300 flex items-center gap-2 group">
										   <span className="w-1 h-1 rounded-full bg-[#bf7e26] group-hover:w-2 group-hover:h-2 transition-all"></span>
										   {service}
									   </Link>
								   </li>
							   ))}
						   </ul>
					   </div>

					   {/* Liên hệ */}
					   <div>
						   <h3 className="font-semibold papyrus text-xl mb-6 font-bold text-[#c7a743] uppercase tracking-wider relative inline-block">
							   Liên hệ
							   <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#c7a743] to-transparent"></span>
						   </h3>
						   <ul className="space-y-4">
							   <li>
								   <a
									   href="mailto:info@mysticmarguerite.com"
									   className="text-[#d4c5a9] hover:text-[#c7a743] font-sans paragraph flex items-center gap-3 transition-colors duration-300 group">
									   <div className="w-10 h-10 rounded-full bg-[#bf7e26]/20 group-hover:bg-[#bf7e26] flex items-center justify-center transition-all">
										   <MdEmail className="text-[#c7a743] group-hover:text-white" size={20} />
									   </div>
									   <span className="break-all">info@mysticmarguerite.com</span>
								   </a>
							   </li>
							   <li>
								   <a
									   href="tel:+84123456789"
									   className="text-[#d4c5a9] hover:text-[#c7a743] font-sans paragraph flex items-center gap-3 transition-colors duration-300 group">
									   <div className="w-10 h-10 rounded-full bg-[#bf7e26]/20 group-hover:bg-[#bf7e26] flex items-center justify-center transition-all">
										   <FaPhone className="text-[#c7a743] group-hover:text-white" size={18} />
									   </div>
									   +84 123 456 789
								   </a>
							   </li>
							   <li>
								   <div className="text-[#d4c5a9] font-sans paragraph flex items-start gap-3">
									   <div className="w-10 h-10 rounded-full bg-[#bf7e26]/20 flex items-center justify-center flex-shrink-0 mt-1">
										   <MapPin className="text-[#c7a743]" size={18} />
									   </div>
									   <span>123 Đường Huyền Bí, Quận Tâm Linh, Việt Nam</span>
								   </div>
							   </li>
						   </ul>
					   </div>
				   </div>

				   {/* Thanh dưới cùng */}
				   <div className="w-full pt-8 border-t border-[#bf7e26]/30">
					   <div className="flex flex-col md:flex-row items-center justify-between gap-4">
						   <div className="flex items-center gap-4">
							   <Link
								   className="text-[#d4c5a9] hover:text-[#c7a743] paragraph font-sans transition-colors"
								   href="/privacy-policy">
								   Chính sách bảo mật
							   </Link>
							   <span className="text-[#bf7e26]">•</span>
							   <Link
								   href="/terms-and-condition"
								   className="text-[#d4c5a9] hover:text-[#c7a743] paragraph font-sans transition-colors">
								   Điều khoản & Điều kiện
							   </Link>
						   </div>
					   </div>
				   </div>
			   </div>
		   </footer>
	   );
}

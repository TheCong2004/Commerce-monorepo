"use client";
import { motion } from "framer-motion";
// Lưu ý: Đảm bảo đường dẫn import circle1, circle2 đúng với dự án của bạn
import { circle1, circle2 } from "@/public"; 
import TextReveal from "@/components/ui/client/text-reveal";
import RoundButton from "@/components/ui/client/round-button";
// 1. Import component Image của Next.js
import Image from "next/image";

export default function Hero() {
    // URL ảnh nền của bạn
    const bgImageUrl = "https://res.cloudinary.com/dzkcqktcl/image/upload/v1766148903/numerology-collage-concept_emjzhn.jpg";

    return (
            <div className="w-full min-h-[100dvh] flex items-center justify-between padding-x relative overflow-hidden xm:flex-col sm:flex-col">
            
            {/* 3. Component ảnh nền */}
            <Image
                src={bgImageUrl}
                alt="Numerology Background"
                fill
                priority 
                className="object-cover object-center -z-20" 
            />
            {/* 4. (Tùy chọn) Lớp phủ tối để làm nổi bật chữ */}
            {/* Bạn có thể điều chỉnh độ đậm nhạt bằng cách thay đổi bg-black/30 thành /40, /50... hoặc xóa dòng này nếu không thích */}
            <div className="absolute inset-0 bg-black/30 -z-10"></div>


            {/* Nội dung chính (Thêm z-10 để đảm bảo nó nổi lên trên nền) */}
            <div className="flex-1 flex flex-col gap-5 z-10 relative xm:pt-22 sm:pt-22">
                <div className="flex flex-col">
                        <TextReveal>
                            {/* Tiêu đề tiếng Việt */}
                            <h1 className="text-[#e8cd79] heading font-semibold papyrus leading-tight tracking-tight">
                                Cân bằng năng lượng
                                <br />
                                cùng Định hướng cuộc sống
                            </h1>
                        </TextReveal>
                </div>
                <TextReveal>
                    {/* Đoạn mô tả tiếng Việt */}
                    <h1 className="text-white paragraph font-normal montserrat leading-normal">
                        Tìm hiểu về chiêm tinh, cung hoàng đạo, các hiện tượng nghịch hành và nhiều hơn nữa! Cuộc sống của bạn sẽ rõ ràng hơn khi hiểu được sự ảnh hưởng của vũ trụ.
                    </h1>
                </TextReveal>
                <div className="w-fit flex items-center justify-between cursor-pointer rounded-md group bg-amber-900 p-1">
                    <RoundButton
                        href="/services"
                        title="Đặt lịch tư vấn"
                        className="bg-white text-black"
                        bgcolor="#000"
                        style={{ color: "#beccc0ff" }}
                    />
                </div>
            </div>
            
            {/* Phần vòng tròn động (Cũng thêm z-10 để nổi lên) */}
            <div className="w-full h-full flex-1 flex justify-center items-center relative z-10">
                <div className="relative w-[80%] max-w-[600px] aspect-square flex justify-center items-center">
                    <motion.img
                        animate={{ rotate: 360 }}
                        transition={{
                            repeat: Infinity,
                            duration: 20,
                            ease: "linear",
                        }}
                        src={circle1.src}
                        alt=""
                        className="absolute w-full h-full object-contain transform-origin-center"
                    />
                    <motion.img
                        animate={{ rotate: -360 }}
                        transition={{
                            repeat: Infinity,
                            duration: 20,
                            ease: "linear",
                        }}
                        src={circle2.src}
                        alt=""
                        className="absolute w-full h-full object-contain transform-origin-center"
                    />
                </div>
            </div>
        </div>
    );
}
"use client";
import Image from "next/image";
import parse from "html-react-parser";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { TServicesColumnProps } from "@/types";
import getServices from "@/features/service/actions/get-services";
import TextReveal from "@/components/ui/client/text-reveal";
import RoundButton from "@/components/ui/client/round-button";
import { ASTROLOGY_INFO, BOOKING_HEADING, INTRO_TEXT, PHILOSOPHY_TEXT } from "../services/servicesContent";
import { getImageUrl } from "@/features/user/services/urlService";


export default function Services() {
    const [services, setServices] = useState<TServicesColumnProps[] | null>([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await getServices();
                setServices(response.services);
            } catch (err) {
                console.error("Error fetching services:", err);
            }
        };
        fetchServices();
    }, []);

    return (
        <div className="w-full padding-y padding-x">
            <div className="w-full flex justify-center flex-col gap-10">
                {/* Phần Intro */}
                <div className="flex flex-col gap-5">
                    <TextReveal>
                        <h1 className="subHeading font-semibold text-[#2E073F] forum leading-tight tracking-tight">
                            {INTRO_TEXT.heading}
                        </h1>
                    </TextReveal>
                    <TextReveal>
                        <ul className="flex flex-col list-disc list-inside">
                            {INTRO_TEXT.list.map((text, index) => (
                                <li key={index} className="text-black paragraph font-normal montserrat leading-loose tracking-normal">
                                    {text}
                                </li>
                            ))}
                        </ul>
                    </TextReveal>
                </div>

                {/* Phần Services List */}
                <TextReveal>
                    <h1 className="subHeading font-semibold text-[#2E073F] forum leading-tight tracking-tight">
                        {BOOKING_HEADING}
                    </h1>
                </TextReveal>
                <div className="w-full flex gap-4 justify-between">
                    {services?.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "linear" }}
                            viewport={{ once: true }}
                            className="w-full flex flex-col items-center gap-4 bg-[#000] relative rounded-lg overflow-hidden shadow-lg hover:shadow-lg">
                            <div className="w-full relative">
                                {/* Xử lý link ảnh chuẩn ở đây */}
                                <Image
                                    src={getImageUrl(item?.image) || 'https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266650/Wands14_py0tik.png'} 
                                    alt="service"
                                    className="w-full h-[500px] object-cover"
                                    width={500}
                                    height={500}
                                />
                                <div className="p-4 w-full flex flex-col justify-between gap-5">
                                    <h3 className="text-white subHeading font-semibold forum leading-tight tracking-tight">
                                        {item.title}
                                    </h3>
                                    <p className="paragraph leading-normal text-white font-normal montserrat">
                                        {item?.description ? parse(item.description) : ""}
                                    </p>
                                    <div className="w-full flex items-center justify-between gap-5">
                                        <span className="paragraph text-white leading-tight tracking-tight montserrat font-semibold w-fit bg-[#936d42] flex items-center justify-between bg-secondry rounded-md pointer-events-none p-5">
                                            Price: ${item.price}.00
                                        </span>
                                        <div className="w-fit bg-[#936d42] flex items-center justify-between cursor-pointer rounded-md group">
                                            <RoundButton
                                                href={`/services/${item.id}/booking-form`}
                                                title="View Detail"
                                                className="bg-white text-black"
                                                bgcolor="#c7a743"
                                                style={{ color: "#fff" }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Phần Info & Image */}
                <div className="w-full flex items-center gap-10 flex-col">
                    <div className="w-full flex items-center justify-center gap-10">
                        <div className="flex-1">
                            <Image
                                src={'https://res.cloudinary.com/dzkcqktcl/image/upload/v1767266650/SolarReturnChart_yxqf4m.png'}
                                alt="The Solar Return Chart"
                                className="w-full h-full object-cover"
                                width={500}
                                height={500}
                            />
                        </div>
                        <TextReveal className="flex-1 flex flex-col gap-5">
                            {ASTROLOGY_INFO.map((paragraph, idx) => (
                                <p key={idx} className="text-black paragraph font-normal montserrat leading-loose tracking-normal">
                                    {paragraph}
                                </p>
                            ))}
                        </TextReveal>
                    </div>

                    {/* Phần Philosophy Text */}
                    <TextReveal className="flex flex-col gap-4">
                        {PHILOSOPHY_TEXT.map((paragraph, idx) => (
                            <p key={idx} className="text-black paragraph font-normal montserrat leading-loose tracking-normal">
                                {paragraph}
                            </p>
                        ))}
                    </TextReveal>
                </div>
            </div>
        </div>
    );
}
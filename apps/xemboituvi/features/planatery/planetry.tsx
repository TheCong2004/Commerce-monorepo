"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { planetryItems } from "@/constants";
import { DirectionAwareHover } from "@/components/ui";

export default function Planetary() {
  return (
    <div className="w-full padding-y padding-x relative z-50 bg-white">
      <div className="flex items-center justify-center flex-col gap-10">
        <div className="grid grid-cols-4 gap-6">
          {planetryItems.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "linear" }}
              viewport={{ once: true }}
              key={index}
              className="flex flex-col items-center gap-4"
            >
              <Link
                href={`/planetary-meditations/${item.id}`}
                className="w-full relative"
              >
                <DirectionAwareHover imageUrl={item.Image}>
                  {item.name}
                </DirectionAwareHover>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

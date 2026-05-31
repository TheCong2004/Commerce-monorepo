"use client";
import React from "react";
import Image from "next/image";
import MysticSphere from "../components/MysticSphere";
import RenderModel from "../components/Render-model";
import { Environment } from "@react-three/drei";
import Navigation from "../navigation.tsx";
import FireflyBackground from "../components/FireflyBackground";

export default function HomePage() {
  const isMobile =
  typeof window !== "undefined" && window.innerWidth < 768;

  return (
    // Xóa bg-[#050505] để không bị màu đen đè nếu có lỗi load
    <main className="relative min-h-screen w-full ">
      {/* Ảnh nền */}
      <Image
        src="https://res.cloudinary.com/dzkcqktcl/image/upload/v1767416867/home-background_fxua3g.png"
        alt="Background"
        fill
        priority // Giữ priority để load nhanh nhất
        className="object-cover -z-20" // Xóa opacity-60 hoặc tăng lên 100 để nhìn rõ nền
        sizes="100vw"
      />

      {/* Lớp phủ mờ nếu bạn muốn nền tối lại một chút để nổi bật nhân vật, 
          nếu muốn nền sáng rõ thì xóa div này đi */}
      <div className="absolute inset-0 bg-black/30 -z-10" /> 

      <div className="w-full h-screen relative z-10">
        <Navigation />
        
        <RenderModel>
          <MysticSphere scale={isMobile ? 0.05 : 0.07}  rotation={[0.25, 0, 0]} baseY={isMobile ? -15 : -25} />
          <Environment preset="dawn" />
          
          <FireflyBackground 
            count={150} 
            range={50} 
            speed={0.3} 
            color="#e2e209ff" 
          />
        </RenderModel>
      </div>
    </main>
  );
}
"use client";
import React, { Suspense, useState, useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, useProgress } from "@react-three/drei";
import * as THREE from "three";

// Hiệu ứng Portal Loading xoay tròn (Đã xóa Stars và Background)
function MagicPortalLoader() {
  const { progress } = useProgress();
  const portalRef = useRef<THREE.Group>(null!);
  
  // Tạo dữ liệu cho các hạt xoắn ốc (Tăng số lượng hạt cho đặc hơn)
  const [particles] = useMemo(() => {
    const count = 800; // Tăng số lượng hạt
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Công thức toán học tạo hình xoắn ốc galaxy
      const angle = i * 0.15;
      const radius = i * 0.003;
      const dist = 0.5; // Độ phân tán của hạt
      
      positions[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * dist;
      positions[i * 3 + 1] = Math.sin(angle) * radius + (Math.random() - 0.5) * dist;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1;
    }
    return [positions];
  }, []);

  useFrame((state) => {
    if (portalRef.current) {
      // Xoay portal liên tục (Ngược chiều kim đồng hồ như ảnh)
      portalRef.current.rotation.z -= 0.015;
      // Hiệu ứng co giãn nhẹ tạo cảm giác cổng đang mở
      const s = 1 + Math.sin(state.clock.getElapsedTime() * 1.5) * 0.03;
      portalRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group>
      <group ref={portalRef}>
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={particles.length / 3}
              array={particles}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.07}
            color="#ffffff"
            transparent
            opacity={0.6}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>
      </group>

      {/* Chữ Loading mờ ảo */}
      <Html center>
        <div className="flex flex-col items-center justify-center pointer-events-none select-none">
          <p className="text-white font-serif italic text-xl tracking-[0.3em] animate-pulse whitespace-nowrap" 
             style={{ 
               textShadow: "0 0 15px rgba(255,255,255,0.6)",
               fontVariant: "small-caps"
             }}>
          {Math.round(progress)}
          </p>
        </div>
      </Html>
    </group>
  );
}

export default function RenderModel({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Trả về div rỗng hoàn toàn để thấy hình nền phía dưới khi chưa client-side
  if (!isClient) return <div className="h-screen w-screen bg-transparent" />;

  return (
  <Canvas
  style={{ 
    width: "100vw", 
    height: "100vh", 
    position: "absolute", // Để nó nằm trên ảnh nền
    top: 0, 
    left: 0,
    pointerEvents: "none" // Để vẫn click được vào Navigation bên dưới
  }}
  gl={{ 
    alpha: true, // Cho phép nhìn xuyên qua Canvas thấy ảnh nền
    antialias: true,
    powerPreference: "high-performance"
  }}
>
  <Suspense fallback={<MagicPortalLoader />}>
    {children}
  </Suspense>
</Canvas>
  );
}
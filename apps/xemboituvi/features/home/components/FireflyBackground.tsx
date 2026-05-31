'use client';
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FireflyBackgroundProps {
  count?: number; // Số lượng đom đóm
  range?: number; // Phạm vi bay của đom đóm
  speed?: number; // Tốc độ bay
  color?: string; // Màu của đom đóm
}

export default function FireflyBackground({ 
  count = 100, 
  range = 20, 
  speed = 0.5, 
  color = '#d6d628ff' 
}: FireflyBackgroundProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);

  // Tạo vị trí ngẫu nhiên cho từng đom đóm
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * range;
      const y = (Math.random() - 0.5) * range;
      const z = (Math.random() - 0.5) * range;
      const scale = Math.random() * 1 + 0.05; // Kích thước đom đóm
      const phase = Math.random() * Math.PI * 2; // Giai đoạn nhấp nháy

      temp.push({ position: new THREE.Vector3(x, y, z), scale, phase });
    }
    return temp;
  }, [count, range]);

  // Animation cho đom đóm
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    particles.forEach((particle, i) => {
      const { position, scale, phase } = particle;

      // Di chuyển ngẫu nhiên bằng cách kết hợp sin/cos
      position.x += Math.sin(time * speed + phase) * 0.01;
      position.y += Math.cos(time * speed * 0.8 + phase) * 0.01;
      position.z += Math.sin(time * speed * 1.2 + phase) * 0.01;

      // Giới hạn trong phạm vi
      if (position.x > range / 2) position.x -= range;
      if (position.x < -range / 2) position.x += range;
      if (position.y > range / 2) position.y -= range;
      if (position.y < -range / 2) position.y += range;
      if (position.z > range / 2) position.z -= range;
      if (position.z < -range / 2) position.z += range;

      // Hiệu ứng nhấp nháy phát sáng (sử dụng opacity hoặc scale)
      const opacity = Math.sin(time * 3 + phase) * 0.5 + 0.5; // Nhấp nháy từ 0.5 đến 1.0
      const currentScale = scale * (1 + Math.sin(time * 5 + phase) * 0.5); // Thay đổi kích thước để mô phỏng nhấp nháy

      // Cập nhật ma trận vị trí và kích thước cho từng đom đóm
      const matrix = new THREE.Matrix4();
      matrix.compose(
        position,
        new THREE.Quaternion(), // Không xoay
        new THREE.Vector3(currentScale, currentScale, currentScale)
      );
      meshRef.current.setMatrixAt(i, matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true; // Cập nhật tất cả ma trận
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.05, 8, 8]} /> {/* Hình dạng đom đóm là quả cầu nhỏ */}
      <meshStandardMaterial 
        color={color} 
        transparent 
        opacity={1} // Sẽ thay đổi opacity trong useFrame nếu cần nhấp nháy
        emissive={new THREE.Color(color)} // Phát sáng
        emissiveIntensity={1} // Cường độ phát sáng
      />
    </instancedMesh>
  );
}
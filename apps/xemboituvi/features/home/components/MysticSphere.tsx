'use client';
import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function MysticSphere({ baseY = -3, ...props }: any) {
  // Load model và texture
  const { nodes, materials } = useGLTF("models/wizard-transformed.glb");
  const magicCircleTexture = useTexture("https://res.cloudinary.com/dzkcqktcl/image/upload/v1767411790/circle2_xeks6e.png");

  const groupRef = useRef<THREE.Group>(null!);
  const circleRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const introDuration = 3.0;

    if (groupRef.current) {
      if (time < introDuration) {
        const progress = time / introDuration;
        
        // Hiệu ứng lướt đến: mượt hơn bằng cách dùng smoothstep
        const easedProgress = THREE.MathUtils.smoothstep(progress, 0, 1);
        
        groupRef.current.position.z = THREE.MathUtils.lerp(-100, 0, easedProgress);
        groupRef.current.position.y = baseY + Math.sin(progress * Math.PI) * 5; 
        groupRef.current.rotation.y = THREE.MathUtils.lerp(Math.PI, 0, easedProgress);

        const scaleProgress = THREE.MathUtils.smoothstep(progress, 0, 1);
        groupRef.current.scale.setScalar(scaleProgress);
      } else {
        // Trạng thái bay bồng bềnh sau khi vào xong
        groupRef.current.position.y = baseY + Math.sin(time * 1.2) * 2; // Giảm biên độ xuống 2 cho đỡ say xe
        groupRef.current.position.z = 0;
        groupRef.current.rotation.y = 0;
      }
    }

    if (circleRef.current) {
      circleRef.current.rotation.z = time * 0.4;
      if (time < introDuration) {
        circleRef.current.scale.setScalar(THREE.MathUtils.smoothstep(time / introDuration, 0, 1));
      }
    }
  });

  // Tối ưu hàm render bằng useMemo để không re-render dư thừa
  const modelParts = useMemo(() => {
    if (!nodes || !materials) return null;

    const renderMesh = (nodeName: string, material: any) => {
      const node = nodes[nodeName];
      if (!node || !(node as THREE.Mesh).geometry) return null;
      return (
        <mesh 
          key={nodeName} 
          geometry={(node as THREE.Mesh).geometry} 
          material={material} 
          scale={0.832} 
          frustumCulled={true} // Không render nếu nằm ngoài camera
        />
      );
    };

    return (
      <>
        {renderMesh("Evil_Hathattty_mesh_Evil_HatBLN_Hat_0", materials.Evil_HatBLN_Hat)}
        {renderMesh("WandpCylinder1_Wandq_0", materials.PaletteMaterial001)}
        {renderMesh("R_shoe_tongue_mesh_BLN_Shoe_tongue_0", materials.BLN_Shoe_tongue)}
        {renderMesh("Chest_piece_mesh_BLN_chest_piece_0", materials.BLN_chest_piece)}
        {renderMesh("Right_Eyeball_Mesh_Lam_eyeball_0", materials.material_0)}
        {renderMesh("pants_mesh_BLN_Pants_0", materials.BLN_Pants)}
        {renderMesh("lower_coat_mesh_FK_BLN_Lower_coat_0", materials.BLN_Lower_coat)}
        {renderMesh("R_shoe_mesh_BLN_shoes_0", materials.BLN_shoes)}
        {renderMesh("Upper_coat_mesh_BLN_upper_coat_0", materials.Upper_coat_material || materials.BLN_upper_coat)}
        {renderMesh("upper_body_mesh_BLN_shirt_0", materials.BLN_shirt)}
        {renderMesh("upper_body_mesh_BLN_Shirt_collar_0", materials.BLN_Shirt_collar)}
        {renderMesh("Coat_collar_mesh_BLN_collar_piece_0", materials.BLN_collar_piece)}
        {renderMesh("BookpolySurface5_Bookblinn1_0", materials.Bookblinn1)}
        {renderMesh("BookBook_corner_mesh4_Booklam_book_corners_0", materials.Booklam_book_corners)}
        {renderMesh("BookpolySurface20_BookBLN_Metal_parts_0", materials.BookBLN_Metal_parts)}
        {renderMesh("BookFront_glow_mesh_Booklambert8_0", materials.PaletteMaterial002)}
        {renderMesh("BookpolySurface2_BookBLN_Book_covers_0", materials.BookBLN_Book_covers)}
        {renderMesh("BookpCube10_Booklam_front_bits_0", materials.material_2)}
        {renderMesh("BookpolySurface28_Booklam_back_bits_0", materials.Booklam_back_bits)}
      </>
    );
  }, [nodes, materials]);

  return (
    <group {...props} dispose={null}>
      <group ref={groupRef}>
        {modelParts}

        <mesh ref={circleRef} position={[-1.0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[70, 70]} />
          <meshBasicMaterial 
            map={magicCircleTexture} 
            transparent 
            side={THREE.DoubleSide} 
            polygonOffset 
            polygonOffsetFactor={-1} 
          />
        </mesh>
      </group>

      <pointLight position={[0, baseY, 0]} intensity={15} color="#ffaa00" distance={30} />
    </group>
  );
}

useGLTF.preload("models/wizard-transformed.glb");
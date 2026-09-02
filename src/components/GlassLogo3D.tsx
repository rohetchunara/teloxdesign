import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

function useGlowTexture() {
  return useMemo(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;

    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, "rgba(70, 130, 220, 0.9)");
    gradient.addColorStop(0.25, "rgba(40, 90, 180, 0.75)");
    gradient.addColorStop(0.5, "rgba(20, 50, 120, 0.5)");
    gradient.addColorStop(0.75, "rgba(10, 25, 70, 0.25)");
    gradient.addColorStop(1, "rgba(5, 15, 40, 0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);
}

function SolidCube({
  position,
  size,
}: {
  position: [number, number, number];
  size: number;
}) {
  const glowTexture = useGlowTexture();

  return (
    <group position={position}>
      {/* Inner glow */}
      <mesh position={[0, 0, size * 0.02]}>
        <planeGeometry args={[size * 0.92, size * 0.92]} />
        <meshBasicMaterial map={glowTexture} toneMapped={false} transparent opacity={0.85} />
      </mesh>

      {/* Solid glass shell */}
      <RoundedBox args={[size, size, size]} radius={size * 0.12} smoothness={4}>
        <meshPhysicalMaterial
          roughness={0.28}
          thickness={size * 0.35}
          ior={1.15}
          clearcoat={0.25}
          clearcoatRoughness={0.45}
          attenuationColor="#0a1840"
          attenuationDistance={1.8}
          color="#2a5aaa"
          transparent
          opacity={0.7}
          side={THREE.DoubleSide}
          envMapIntensity={0.6}
        />
      </RoundedBox>

      {/* Frost layer - slightly larger, very subtle */}
      <RoundedBox args={[size * 1.015, size * 1.015, size * 1.015]} radius={size * 0.12} smoothness={4}>
        <meshPhysicalMaterial
          roughness={0.85}
          thickness={0.1}
          ior={1.0}
          color="#8090b0"
          transparent
          opacity={0.06}
          side={THREE.FrontSide}
          depthWrite={false}
        />
      </RoundedBox>
    </group>
  );
}

function SolidCubesGroup() {
  const groupRef = useRef<THREE.Group>(null);
  const rawMouse = useRef({ x: 0, y: 0 });
  const smoothMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      rawMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      rawMouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        rawMouse.current.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
        rawMouse.current.y = (e.touches[0].clientY / window.innerHeight) * 2 - 1;
      }
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchstart", onTouch);
    };
  }, []);

  const cubeSize = 1.6;
  const gap = 0.22;
  const offset = (cubeSize + gap) / 2;

  useFrame((state, delta) => {
    const dt = Math.min(delta, 1 / 30);
    smoothMouse.current.x = THREE.MathUtils.damp(smoothMouse.current.x, rawMouse.current.x, 6, dt);
    smoothMouse.current.y = THREE.MathUtils.damp(smoothMouse.current.y, rawMouse.current.y, 6, dt);

    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      groupRef.current.rotation.y = smoothMouse.current.x * 0.35;
      groupRef.current.rotation.x = -smoothMouse.current.y * 0.25;
      groupRef.current.position.y = Math.sin(t * 0.6) * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      <SolidCube position={[-offset, offset, 0]} size={cubeSize} />
      <SolidCube position={[offset, offset, 0]} size={cubeSize} />
      <SolidCube position={[0, -offset, 0]} size={cubeSize} />
    </group>
  );
}

export default function GlassLogo3D({ className = "" }: { className?: string }) {
  return (
    <div className={`h-full w-full ${className}`}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 8], fov: 35 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        className="pointer-events-none"
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 6, 5]} intensity={0.8} color="#90b0e0" />
        <directionalLight position={[-5, -2, -4]} intensity={0.3} color="#103080" />
        <pointLight position={[0, 0, 4]} intensity={3} color="#3070d0" distance={10} />

        <SolidCubesGroup />
      </Canvas>
    </div>
  );
}

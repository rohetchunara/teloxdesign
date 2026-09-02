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
    gradient.addColorStop(0, "rgba(120, 180, 255, 1)");
    gradient.addColorStop(0.2, "rgba(80, 140, 240, 0.9)");
    gradient.addColorStop(0.45, "rgba(40, 90, 200, 0.7)");
    gradient.addColorStop(0.7, "rgba(20, 50, 140, 0.4)");
    gradient.addColorStop(1, "rgba(5, 20, 80, 0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);
}

function JellyCube({
  position,
  size,
  wobbleOffset,
  mouseInfluence,
}: {
  position: [number, number, number];
  size: number;
  wobbleOffset: number;
  mouseInfluence: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const glowTexture = useGlowTexture();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    const wobbleSpeed = 2.5;
    const wobbleAmount = 0.08;
    const wobble = Math.sin(t * wobbleSpeed + wobbleOffset) * wobbleAmount;

    const mouseWobbleX = mouseInfluence.current.x * 0.06;
    const mouseWobbleY = mouseInfluence.current.y * 0.06;

    meshRef.current.scale.x = 1 + wobble + mouseWobbleX;
    meshRef.current.scale.y = 1 - wobble + mouseWobbleY;
    meshRef.current.scale.z = 1 + wobble * 0.5;

    meshRef.current.position.y = position[1] + Math.sin(t * 1.8 + wobbleOffset) * 0.04;
    meshRef.current.position.x = position[0] + Math.sin(t * 1.2 + wobbleOffset) * 0.02;
  });

  return (
    <group ref={meshRef} position={position}>
      <mesh position={[0, 0, size * 0.02]}>
        <planeGeometry args={[size * 0.9, size * 0.9]} />
        <meshBasicMaterial map={glowTexture} toneMapped={false} transparent opacity={0.9} />
      </mesh>

      <RoundedBox args={[size, size, size]} radius={size * 0.15} smoothness={4}>
        <meshPhysicalMaterial
          roughness={0.2}
          thickness={size * 0.4}
          ior={1.3}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
          attenuationColor="#0a2060"
          attenuationDistance={1.5}
          color="#4080e0"
          transparent
          opacity={0.65}
          side={THREE.DoubleSide}
          envMapIntensity={1.2}
        />
      </RoundedBox>
    </group>
  );
}

function JellyCubesGroup() {
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
  const gap = 0.25;
  const offset = (cubeSize + gap) / 2;

  useFrame((state, delta) => {
    const dt = Math.min(delta, 1 / 30);
    smoothMouse.current.x = THREE.MathUtils.damp(smoothMouse.current.x, rawMouse.current.x, 5, dt);
    smoothMouse.current.y = THREE.MathUtils.damp(smoothMouse.current.y, rawMouse.current.y, 5, dt);

    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      groupRef.current.rotation.y = smoothMouse.current.x * 0.4;
      groupRef.current.rotation.x = -smoothMouse.current.y * 0.3;
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.06;
      groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      <JellyCube position={[-offset, offset, 0]} size={cubeSize} wobbleOffset={0} mouseInfluence={smoothMouse} />
      <JellyCube position={[offset, offset, 0]} size={cubeSize} wobbleOffset={Math.PI * 0.66} mouseInfluence={smoothMouse} />
      <JellyCube position={[0, -offset, 0]} size={cubeSize} wobbleOffset={Math.PI * 1.33} mouseInfluence={smoothMouse} />
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
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 6, 5]} intensity={1} color="#a0c0ff" />
        <directionalLight position={[-5, -2, -4]} intensity={0.4} color="#1040a0" />
        <pointLight position={[0, 0, 4]} intensity={4} color="#4090ff" distance={10} />
        <pointLight position={[-3, 2, 2]} intensity={2} color="#60a0ff" distance={8} />

        <JellyCubesGroup />
      </Canvas>
    </div>
  );
}

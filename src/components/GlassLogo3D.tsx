/**
 * GlassLogo3D
 * ------------------------------------------------------------------------
 * A single, self-contained, drop-in 3D logo component: three glassmorphism
 * cubes arranged in a "T" formation with a navy-blue inner glow, that
 * tilts toward the user's mouse and gently floats.
 *
 * HOW TO USE IN ANOTHER PROJECT:
 * 1. Install dependencies:
 *      npm install three @react-three/fiber @react-three/drei
 * 2. Copy this file into your project (e.g. src/components/GlassLogo3D.tsx).
 * 3. Import and drop it anywhere with a sized parent container:
 *
 *      import GlassLogo3D from "./components/GlassLogo3D";
 *
 *      <div style={{ width: 400, height: 400 }}>
 *        <GlassLogo3D />
 *      </div>
 *
 *    The component fills 100% width/height of its parent, so just give
 *    the parent a size (via width/height, or Tailwind classes like
 *    "h-96 w-96").
 * ------------------------------------------------------------------------
 */

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  RoundedBox,
  Environment,
} from "@react-three/drei";
import * as THREE from "three";

/** Generates the radial navy-blue glow texture used inside each cube. */
function useGlowTexture() {
  return useMemo(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;

    const gradient = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2
    );
    gradient.addColorStop(0, "rgba(120, 200, 255, 1)");
    gradient.addColorStop(0.2, "rgba(60, 160, 255, 0.9)");
    gradient.addColorStop(0.5, "rgba(30, 100, 200, 0.6)");
    gradient.addColorStop(0.75, "rgba(10, 50, 120, 0.3)");
    gradient.addColorStop(1, "rgba(5, 20, 60, 0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);
}

/** One glass cube: frosted transmissive shell + inner glow pane. */
function GlassCube({
  position,
  size,
}: {
  position: [number, number, number];
  size: number;
}) {
  const glowTexture = useGlowTexture();

  return (
    <group position={position}>
      {/* Inner glow, visible through the frosted glass */}
      <mesh position={[0, 0, size * 0.02]}>
        <planeGeometry args={[size * 0.94, size * 0.94]} />
        <meshBasicMaterial map={glowTexture} toneMapped={false} transparent opacity={1} />
      </mesh>

      {/* Frosted glassmorphism shell */}
      <RoundedBox args={[size, size, size]} radius={size * 0.12} smoothness={4}>
        <meshPhysicalMaterial
          roughness={0.15}
          thickness={size * 0.3}
          ior={1.2}
          clearcoat={0.8}
          clearcoatRoughness={0.15}
          attenuationColor="#0a2a5e"
          attenuationDistance={1.5}
          color="#a0d0ff"
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </RoundedBox>
    </group>
  );
}

/** The three cubes arranged in a "T", reacting to the mouse and floating. */
function CubesGroup() {
  const groupRef = useRef<THREE.Group>(null);

  // Raw normalized mouse position (-1 to 1), updated from a window-level
  // listener so the logo keeps reacting smoothly no matter where the
  // cursor is on the page (not just while hovering the canvas).
  const rawMouse = useRef({ x: 0, y: 0 });
  // A first pass of smoothed mouse position (damped toward rawMouse).
  const smoothMouse = useRef({ x: 0, y: 0 });
  // The current rotation actually applied to the group (damped toward the
  // smoothed mouse target). This double-smoothing removes any residual
  // jitter and produces a fluid, buttery motion.
  const currentRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      rawMouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      rawMouse.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        rawMouse.current.x = (touch.clientX / window.innerWidth) * 2 - 1;
        rawMouse.current.y = (touch.clientY / window.innerHeight) * 2 - 1;
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        rawMouse.current.x = (touch.clientX / window.innerWidth) * 2 - 1;
        rawMouse.current.y = (touch.clientY / window.innerHeight) * 2 - 1;
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);

  const cubeSize = 1.6;
  const gap = 0.22;
  const offset = (cubeSize + gap) / 2;

  useFrame((state, delta) => {
    const { clock } = state;
    // Clamp delta to avoid big jumps after tab switches / frame drops.
    const dt = Math.min(delta, 1 / 30);

    // Stage 1: ease the smoothed mouse toward the raw mouse position.
    smoothMouse.current.x = THREE.MathUtils.damp(smoothMouse.current.x, rawMouse.current.x, 6, dt);
    smoothMouse.current.y = THREE.MathUtils.damp(smoothMouse.current.y, rawMouse.current.y, 6, dt);

    // Convert smoothed mouse position into target rotation values.
    const targetY = smoothMouse.current.x * 0.5;
    const targetX = -smoothMouse.current.y * 0.35;

    // Stage 2: ease the actual rotation toward that target, frame-rate
    // independent thanks to THREE.MathUtils.damp (exponential decay).
    currentRotation.current.x = THREE.MathUtils.damp(currentRotation.current.x, targetX, 5, dt);
    currentRotation.current.y = THREE.MathUtils.damp(currentRotation.current.y, targetY, 5, dt);

    if (groupRef.current) {
      groupRef.current.rotation.x = currentRotation.current.x;
      groupRef.current.rotation.y = currentRotation.current.y;

      // Subtle floating/bobbing animation.
      const t = clock.getElapsedTime();
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.08;
      groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.015;
    }
  });

  return (
    <group ref={groupRef}>
      <GlassCube position={[-offset, offset, 0]} size={cubeSize} />
      <GlassCube position={[offset, offset, 0]} size={cubeSize} />
      <GlassCube position={[0, -offset, 0]} size={cubeSize} />
    </group>
  );
}

export interface GlassLogo3DProps {
  /** Extra classes for the wrapping div (e.g. Tailwind sizing classes). */
  className?: string;
}

export default function GlassLogo3D({ className = "" }: GlassLogo3DProps) {
  return (
    <div className={`h-full w-full ${className}`}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 8], fov: 35 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        className="pointer-events-none"
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 6, 5]} intensity={1.2} color="#d0e8ff" />
        <directionalLight position={[-5, -2, -4]} intensity={0.4} color="#2060b0" />
        <pointLight position={[0, 0, 3]} intensity={5} color="#4090ff" distance={8} />
        <pointLight position={[2, 2, 2]} intensity={2} color="#80c0ff" distance={6} />

        <CubesGroup />
      </Canvas>
    </div>
  );
}

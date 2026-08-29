import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, Preload } from '@react-three/drei';
import ChurchScene from './ChurchScene';

interface Hero3DProps {
  className?: string;
}

export default function Hero3D({ className = '' }: Hero3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className={className} aria-hidden="true">
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [0, 1, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <ChurchScene />
          <Preload all />
        </Suspense>
        <AdaptiveDpr pixelated />
      </Canvas>
    </div>
  );
}

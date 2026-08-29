import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* Floating illuminated cross */
function FloatingCross() {
  const group = useRef<THREE.Group>(null);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#ffffff',
        emissive: '#fbbf24',
        emissiveIntensity: 0.6,
        roughness: 0.2,
        metalness: 0.8,
      }),
    [],
  );

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = Math.sin(t * 0.3) * 0.3;
    group.current.position.y = Math.sin(t * 0.5) * 0.3;
    group.current.rotation.z = Math.sin(t * 0.2) * 0.05;
  });

  return (
    <group ref={group} position={[0, 0.5, 0]} scale={1.2}>
      {/* Vertical bar */}
      <mesh material={material} position={[0, 0.6, 0]}>
        <boxGeometry args={[0.28, 1.6, 0.28]} />
      </mesh>
      {/* Horizontal bar */}
      <mesh material={material} position={[0, 0.9, 0]}>
        <boxGeometry args={[1.0, 0.28, 0.28]} />
      </mesh>
      {/* Glow point light */}
      <pointLight position={[0, 0.9, 0.5]} color="#fbbf24" intensity={3} distance={6} />
    </group>
  );
}

/* Floating Bible */
function FloatingBible() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.position.y = -1.2 + Math.sin(t * 0.4 + 1) * 0.25;
    group.current.rotation.y = t * 0.15;
    group.current.rotation.x = Math.sin(t * 0.3) * 0.1;
  });

  return (
    <group ref={group} position={[-2.6, -1.2, -1]} scale={0.55}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.4, 0.18, 1.0]} />
        <meshStandardMaterial color="#1e40af" roughness={0.35} metalness={0.3} />
      </mesh>
      {/* Pages */}
      <mesh position={[0, 0, 0.01]}>
        <boxGeometry args={[1.3, 0.14, 0.92]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.9} />
      </mesh>
      {/* Cross on cover */}
      <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.12, 0.4]} />
        <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.3, 0.1]} />
        <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

/* Light rays from above */
function LightRays() {
  const rays = useMemo(() => {
    const items: { position: [number, number, number]; rotation: number; scale: number }[] = [];
    for (let i = 0; i < 7; i++) {
      items.push({
        position: [(Math.random() - 0.5) * 8, 3, -2 - Math.random() * 3],
        rotation: (Math.random() - 0.5) * 0.3,
        scale: 0.5 + Math.random() * 0.8,
      });
    }
    return items;
  }, []);

  return (
    <group>
      {rays.map((r, i) => (
        <mesh key={i} position={r.position} rotation={[0.2, 0, r.rotation]} scale={r.scale}>
          <coneGeometry args={[0.4, 6, 8, 1, true]} />
          <meshBasicMaterial
            color="#fef3c7"
            transparent
            opacity={0.06}
            side={THREE.DoubleSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

/* Moving clouds */
function Clouds() {
  const group = useRef<THREE.Group>(null);
  const clouds = useMemo(() => {
    const items: { position: [number, number, number]; scale: number; speed: number }[] = [];
    for (let i = 0; i < 6; i++) {
      items.push({
        position: [(Math.random() - 0.5) * 12, 2 + Math.random() * 2, -3 - Math.random() * 4],
        scale: 1 + Math.random() * 1.5,
        speed: 0.02 + Math.random() * 0.03,
      });
    }
    return items;
  }, []);

  useFrame(() => {
    if (!group.current) return;
    group.current.children.forEach((child, i) => {
      child.position.x += clouds[i].speed;
      if (child.position.x > 7) child.position.x = -7;
    });
  });

  return (
    <group ref={group}>
      {clouds.map((c, i) => (
        <group key={i} position={c.position} scale={c.scale}>
          <mesh>
            <sphereGeometry args={[0.6, 16, 16]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.4} roughness={1} />
          </mesh>
          <mesh position={[0.5, -0.1, 0]}>
            <sphereGeometry args={[0.45, 16, 16]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.4} roughness={1} />
          </mesh>
          <mesh position={[-0.5, -0.05, 0]}>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.4} roughness={1} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* Birds flying slowly */
function Birds() {
  const group = useRef<THREE.Group>(null);
  const birds = useMemo(() => {
    const items: { position: [number, number, number]; speed: number; offset: number }[] = [];
    for (let i = 0; i < 5; i++) {
      items.push({
        position: [Math.random() * 10 - 5, 1.5 + Math.random() * 1.5, -1 - Math.random() * 2],
        speed: 0.01 + Math.random() * 0.015,
        offset: Math.random() * Math.PI * 2,
      });
    }
    return items;
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.children.forEach((child, i) => {
      child.position.x += birds[i].speed;
      if (child.position.x > 6) child.position.x = -6;
      child.position.y += Math.sin(t + birds[i].offset) * 0.003;
      // wing flap
      const wing = child.children[0] as THREE.Mesh;
      const wingR = child.children[1] as THREE.Mesh;
      const flap = Math.sin(t * 4 + birds[i].offset) * 0.4;
      wing.rotation.z = flap;
      wingR.rotation.z = -flap;
    });
  });

  return (
    <group ref={group}>
      {birds.map((b, i) => (
        <group key={i} position={b.position}>
          <mesh position={[-0.15, 0, 0]} rotation={[0, 0, 0]}>
            <planeGeometry args={[0.2, 0.08]} />
            <meshBasicMaterial color="#1e3a8a" side={THREE.DoubleSide} transparent opacity={0.6} />
          </mesh>
          <mesh position={[0.15, 0, 0]} rotation={[0, 0, 0]}>
            <planeGeometry args={[0.2, 0.08]} />
            <meshBasicMaterial color="#1e3a8a" side={THREE.DoubleSide} transparent opacity={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* Floating particles */
function Particles() {
  const points = useRef<THREE.Points>(null);
  const count = 200;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!points.current) return;
    const t = state.clock.getElapsedTime();
    const pos = points.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += Math.sin(t + i) * 0.001 + 0.002;
      if (pos[i * 3 + 1] > 4) pos[i * 3 + 1] = -4;
    }
    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#fbbf24"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* Mouse parallax camera */
function CameraRig() {
  const { camera, pointer } = useThree();
  useFrame(() => {
    camera.position.x += (pointer.x * 1.5 - camera.position.x) * 0.03;
    camera.position.y += (1 + pointer.y * 0.8 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

interface ChurchSceneProps {
  className?: string;
}

export default function ChurchScene({ className: _className }: ChurchSceneProps) {
  return (
    <group>
      <CameraRig />
      <ambientLight intensity={0.6} color="#fef3c7" />
      <directionalLight position={[3, 6, 2]} intensity={1.2} color="#ffffff" castShadow />
      <directionalLight position={[-3, 4, -2]} intensity={0.4} color="#38bdf8" />
      <FloatingCross />
      <FloatingBible />
      <LightRays />
      <Clouds />
      <Birds />
      <Particles />
    </group>
  );
}

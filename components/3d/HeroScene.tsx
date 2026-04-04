"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

function FloatingShape({
  position,
  geometry,
  speed,
  rotationSpeed,
}: {
  position: [number, number, number]
  geometry: "icosahedron" | "torus" | "octahedron"
  speed: number
  rotationSpeed: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime * speed
    meshRef.current.position.y = position[1] + Math.sin(t) * 0.3
    meshRef.current.position.x = position[0] + Math.cos(t * 0.7) * 0.15
    meshRef.current.rotation.x += rotationSpeed * 0.01
    meshRef.current.rotation.z += rotationSpeed * 0.005
  })

  return (
    <mesh ref={meshRef} position={position}>
      {geometry === "icosahedron" && <icosahedronGeometry args={[0.4, 0]} />}
      {geometry === "torus" && <torusGeometry args={[0.35, 0.12, 16, 32]} />}
      {geometry === "octahedron" && <octahedronGeometry args={[0.35, 0]} />}
      <meshStandardMaterial
        color="#00f5ff"
        wireframe
        transparent
        opacity={0.2}
        emissive="#00f5ff"
        emissiveIntensity={0.1}
      />
    </mesh>
  )
}

function MouseParallax({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null)
  const { pointer } = useThree()

  useFrame(() => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      pointer.x * 0.12,
      0.05
    )
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -pointer.y * 0.08,
      0.05
    )
  })

  return <group ref={groupRef}>{children}</group>
}

function Particles({ count = 150 }: { count?: number }) {
  const points = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (!points.current) return
    points.current.rotation.y = state.clock.elapsedTime * 0.015
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#00f5ff" size={0.02} transparent opacity={0.4} sizeAttenuation />
    </points>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.6} color="#00f5ff" />
      <pointLight position={[-10, -5, 5]} intensity={0.3} color="#7b61ff" />
      <MouseParallax>
        <FloatingShape position={[-4, 1.5, -2]} geometry="icosahedron" speed={0.8} rotationSpeed={1} />
        <FloatingShape position={[4.5, -1, -1]} geometry="torus" speed={0.6} rotationSpeed={0.8} />
        <FloatingShape position={[-3.5, -1.5, -3]} geometry="octahedron" speed={1} rotationSpeed={1.2} />
        <FloatingShape position={[3, 2, -2.5]} geometry="icosahedron" speed={0.7} rotationSpeed={0.9} />
        <FloatingShape position={[0, -2.5, -1.5]} geometry="torus" speed={0.9} rotationSpeed={0.7} />
        <FloatingShape position={[-5, 0, -2]} geometry="octahedron" speed={0.5} rotationSpeed={1.1} />
      </MouseParallax>
      <Particles />
    </>
  )
}

export function HeroCanvas() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}

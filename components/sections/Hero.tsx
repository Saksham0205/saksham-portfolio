"use client"

import { RefObject, useState, useEffect } from "react"
import { Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import dynamic from "next/dynamic"
import flutterLogo from "@/components/logos/flutter.jpg"
import mongodbLogo from "@/components/logos/mongodb-logo.png"
import nestjsLogo from "@/components/logos/nest js.jpg"
import firebaseLogo from "@/components/logos/firebase-logo.png"
import githubLogo from "@/components/logos/GitHub-Symbol.png"
import v0Logo from "@/components/logos/v0-logo.png"
import reddyAiLogo from "@/components/logos/readdy-ai-logo.jpg"

const HeroCanvas = dynamic(
  () => import("@/components/3d/HeroScene").then((mod) => ({ default: mod.HeroCanvas })),
  { ssr: false }
)

interface HeroProps {
  heroRef: RefObject<HTMLDivElement | null>
}

const techStack = [
  { name: "Flutter", logo: flutterLogo, delay: "0s", needsWhiteBg: false },
  { name: "MongoDB", logo: mongodbLogo, delay: "0.5s", needsWhiteBg: true },
  { name: "NestJS", logo: nestjsLogo, delay: "1s", needsWhiteBg: false },
  { name: "Firebase", logo: firebaseLogo, delay: "1.5s", needsWhiteBg: false },
  { name: "GitHub", logo: githubLogo, delay: "2s", needsWhiteBg: true },
  { name: "V0", logo: v0Logo, delay: "2.5s", needsWhiteBg: false },
  { name: "Readdy AI", logo: reddyAiLogo, delay: "3s", needsWhiteBg: false },
]

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])
  return isMobile
}

export function Hero({ heroRef }: HeroProps) {
  const isMobile = useIsMobile()

  return (
    <section
      ref={heroRef}
      className="relative min-h-[calc(100vh-5rem)] sm:min-h-screen flex items-start sm:items-center justify-center pt-24 sm:pt-20 pb-12 sm:pb-0 px-4 sm:px-6 overflow-hidden"
    >
      {/* 3D Background - floating shapes & particles on desktop */}
      {!isMobile && <HeroCanvas />}

      {/* Mobile gradient fallback */}
      {isMobile && (
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0a1a2e] to-[#0a0a0a]" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[#00f5ff]/5 rounded-full blur-[100px]" />
        </div>
      )}

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-4 sm:space-y-6 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-glow" style={{ color: "#00f5ff" }}>
              Saksham
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
              SDE Intern at Spyne and Founder of Ajnabee. Building scalable products with Next.js, Flutter, and modern
              cloud technologies.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <Button asChild size="lg" className="w-full sm:w-auto bg-[#00f5ff] text-[#0a0a0a] hover:bg-[#00f5ff]/80 font-semibold">
                <a href="#contact">Get in Touch</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto bg-transparent border-[#00f5ff]/30 text-[#00f5ff] hover:bg-[#00f5ff]/10 hover:border-[#00f5ff]/60">
                <a href="#projects">View Projects</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto bg-transparent border-[#00f5ff]/30 text-[#00f5ff] hover:bg-[#00f5ff]/10 hover:border-[#00f5ff]/60">
                <a href="https://drive.google.com/uc?export=download&id=1A3f2wUDBBTSC0t_eCSbsU2Qrtxy2dfPN" target="_blank" rel="noopener noreferrer">
                  Download Resume
                </a>
              </Button>
            </div>
            <div className="flex gap-4 sm:gap-6 pt-2">
              <a
                href="https://github.com/Saksham0205"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-[#00f5ff] transition-colors"
              >
                <Github className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a
                href="https://linkedin.com/in/saksham-chauhan-252003"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-[#00f5ff] transition-colors"
              >
                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a href="mailto:saksham252003@gmail.com" className="text-muted-foreground hover:text-[#00f5ff] transition-colors">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            </div>
          </div>

          {/* Right side - Floating Tech Stack */}
          <div className="hidden lg:flex relative h-[400px] items-center justify-center">
            <div className="relative w-full h-full">
              {techStack.map((tech, index) => {
                const angle = (index / techStack.length) * 2 * Math.PI
                const radius = 140
                const x = Math.cos(angle) * radius
                const y = Math.sin(angle) * radius

                return (
                  <div
                    key={tech.name}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{
                      animation: `float 3s ease-in-out infinite`,
                      animationDelay: tech.delay,
                    }}
                  >
                    <div
                      className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[#111111]/80 backdrop-blur-sm border border-[#1f1f1f] hover:border-[#00f5ff]/50 transition-all hover:scale-110 cursor-default glow-border"
                      style={{
                        transform: `translate(${x}px, ${y}px)`,
                      }}
                    >
                      <div className={`relative w-12 h-12 rounded-lg overflow-hidden ${tech.needsWhiteBg ? 'bg-white p-1' : ''}`}>
                        <Image
                          src={tech.logo}
                          alt={tech.name}
                          fill
                          className="object-contain"
                          sizes="48px"
                        />
                      </div>
                      <span className="text-xs font-medium whitespace-nowrap text-[#e5e5e5]">{tech.name}</span>
                    </div>
                  </div>
                )
              })}

              {/* Center circle with glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-[#00f5ff]/10 border-2 border-[#00f5ff]/30 flex items-center justify-center animate-glow-pulse">
                <span className="text-2xl">💻</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

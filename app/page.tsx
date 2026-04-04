"use client"

import { useState, useEffect, useRef } from "react"
import { Navigation } from "@/components/sections/Navigation"
import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { Experience } from "@/components/sections/Experience"
import { Projects } from "@/components/sections/Projects"
import { Skills } from "@/components/sections/Skills"
import { Achievements } from "@/components/sections/Achievements"
import { Certifications } from "@/components/sections/Certifications"
import { Leadership } from "@/components/sections/Leadership"
import { Contact } from "@/components/sections/Contact"
import { Footer } from "@/components/sections/Footer"
import { SmoothScroll } from "@/components/SmoothScroll"
import { NoiseOverlay } from "@/components/NoiseOverlay"

export default function Portfolio() {
  const heroRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<(HTMLElement | null)[]>([])
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
          }
        })
      },
      { threshold: 0.1 },
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })
    return () => observer.disconnect()
  }, [])

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el)
    }
  }

  const handleMobileNavClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-background text-foreground">
        <NoiseOverlay />
        <Navigation
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          handleMobileNavClick={handleMobileNavClick}
        />
        <Hero heroRef={heroRef} />
        <About addToRefs={addToRefs} />
        <Experience addToRefs={addToRefs} />
        <Projects addToRefs={addToRefs} />
        <Skills addToRefs={addToRefs} />
        <Achievements addToRefs={addToRefs} />
        <Certifications addToRefs={addToRefs} />
        <Leadership addToRefs={addToRefs} />
        <Contact addToRefs={addToRefs} />
        <Footer />
      </div>
    </SmoothScroll>
  )
}

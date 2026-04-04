"use client"

import { useEffect } from "react"
import Lenis from "lenis"

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Support hash links with smooth scroll
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest("a")
      if (anchor?.hash) {
        const el = document.querySelector(anchor.hash)
        if (el) {
          e.preventDefault()
          lenis.scrollTo(el as HTMLElement, { offset: -80 })
        }
      }
    }

    document.addEventListener("click", handleAnchorClick)
    return () => {
      lenis.destroy()
      document.removeEventListener("click", handleAnchorClick)
    }
  }, [])

  return <>{children}</>
}

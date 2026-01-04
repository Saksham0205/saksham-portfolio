"use client"

import { X } from "lucide-react"

interface NavigationProps {
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  handleMobileNavClick: () => void
}

export function Navigation({ mobileMenuOpen, setMobileMenuOpen, handleMobileNavClick }: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-lg sm:text-xl font-bold">Saksham</div>
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3 6H21M3 12H21M3 18H21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
          <div className="hidden md:flex gap-4 lg:gap-6 text-sm lg:text-base">
            <a href="#about" className="hover:text-primary transition-colors">
              About
            </a>
            <a href="#experience" className="hover:text-primary transition-colors">
              Experience
            </a>
            <a href="#projects" className="hover:text-primary transition-colors">
              Projects
            </a>
            <a href="#achievements" className="hover:text-primary transition-colors">
              Achievements
            </a>
            <a href="#certifications" className="hover:text-primary transition-colors">
              Certifications
            </a>
            <a href="#contact" className="hover:text-primary transition-colors">
              Contact
            </a>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-4 border-t border-border pt-4">
            <a href="#about" className="hover:text-primary transition-colors" onClick={handleMobileNavClick}>
              About
            </a>
            <a href="#experience" className="hover:text-primary transition-colors" onClick={handleMobileNavClick}>
              Experience
            </a>
            <a href="#projects" className="hover:text-primary transition-colors" onClick={handleMobileNavClick}>
              Projects
            </a>
            <a href="#achievements" className="hover:text-primary transition-colors" onClick={handleMobileNavClick}>
              Achievements
            </a>
            <a href="#certifications" className="hover:text-primary transition-colors" onClick={handleMobileNavClick}>
              Certifications
            </a>
            <a href="#contact" className="hover:text-primary transition-colors" onClick={handleMobileNavClick}>
              Contact
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}


import { RefObject } from "react"
import { Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeroProps {
  heroRef: RefObject<HTMLDivElement | null>
}

export function Hero({ heroRef }: HeroProps) {
  return (
    <section ref={heroRef} className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="space-y-4 sm:space-y-6 animate-fade-in">
          <div className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider">
            Full-Stack Developer
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">Saksham</h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
            SDE Intern at Spyne and Founder of Ajnabee. Building scalable products with Next.js, Flutter, and modern
            cloud technologies.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <a href="#contact">Get in Touch</a>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
              <a href="#projects">View Projects</a>
            </Button>
          </div>
          <div className="flex gap-4 sm:gap-6 pt-2">
            <a
              href="https://github.com/Saksham0205"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              <Github className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <a
              href="https://linkedin.com/in/saksham-chauhan-252003"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <a href="mailto:saksham252003@gmail.com" className="hover:text-primary transition-colors">
              <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}


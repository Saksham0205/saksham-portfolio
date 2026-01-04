import { Github, Linkedin, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ContactProps {
  addToRefs: (el: HTMLElement | null) => void
}

export function Contact({ addToRefs }: ContactProps) {
  return (
    <section id="contact" ref={addToRefs} className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 opacity-0">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">Let's Connect</h2>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-8 sm:mb-12 px-4">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <a href="mailto:saksham252003@gmail.com">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Email Me
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
            <a href="tel:+918376063400">
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              +91-8376063400
            </a>
          </Button>
        </div>
        <div className="flex gap-6 justify-center mt-8 sm:mt-12">
          <a
            href="https://github.com/Saksham0205"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Github className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
          <a
            href="https://linkedin.com/in/saksham-chauhan-252003"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
          <a
            href="mailto:saksham252003@gmail.com"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
        </div>
      </div>
    </section>
  )
}


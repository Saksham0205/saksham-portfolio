import { ExternalLink, ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ExperienceProps {
  addToRefs: (el: HTMLElement | null) => void
}

export function Experience({ addToRefs }: ExperienceProps) {
  return (
    <section id="experience" ref={addToRefs} className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 opacity-0">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12">Experience</h2>
        <div className="space-y-6 sm:space-y-8">
          <Card className="p-4 sm:p-6 lg:p-8 hover:shadow-lg transition-shadow group">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4 mb-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold group-hover:text-primary transition-colors">
                  PM + SDE Intern
                </h3>
                <div className="flex items-center gap-2">
                  <p className="text-lg sm:text-xl text-muted-foreground">Spyne</p>
                  <a
                    href="https://www.spyne.ai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors"
                    aria-label="Visit Spyne website"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
              <div className="sm:text-right">
                <span className="text-sm text-muted-foreground">May 2025 – Present</span>
                <p className="text-sm text-muted-foreground">Gurgaon, India</p>
              </div>
            </div>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground">
              <li className="flex gap-2 sm:gap-3">
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-1 text-primary" />
                <span>
                  Delivered 5+ production-grade products within six months, accelerating cross-team delivery cycles.
                </span>
              </li>
              <li className="flex gap-2 sm:gap-3">
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-1 text-primary" />
                <span>
                  Architected a multi-channel outbound communication engine enabling automated, AI-driven voice
                  workflows.
                </span>
              </li>
              <li className="flex gap-2 sm:gap-3">
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-1 text-primary" />
                <span>
                  Designed and deployed an AI-enabled call insights platform analyzing 100+ sales/service calls weekly
                  with automated scoring.
                </span>
              </li>
            </ul>
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="secondary" className="text-xs">
                Next.js
              </Badge>
              <Badge variant="secondary" className="text-xs">
                Nest.js
              </Badge>
              <Badge variant="secondary" className="text-xs">
                MongoDB
              </Badge>
              <Badge variant="secondary" className="text-xs">
                REST APIs
              </Badge>
              <Badge variant="secondary" className="text-xs">
                CI/CD
              </Badge>
            </div>
          </Card>

          <Card className="p-4 sm:p-6 lg:p-8 hover:shadow-lg transition-shadow group">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4 mb-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold group-hover:text-primary transition-colors">
                  Founder
                </h3>
                <div className="flex items-center gap-2">
                  <p className="text-lg sm:text-xl text-muted-foreground">Ajnabee</p>
                  <a
                    href="https://ajnabee.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors"
                    aria-label="Visit Ajnabee website"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
              <div className="sm:text-right">
                <span className="text-sm text-muted-foreground">Jan 2024 – Present</span>
                <p className="text-sm text-muted-foreground">New Delhi, India</p>
              </div>
            </div>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground">
              <li className="flex gap-2 sm:gap-3">
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-1 text-primary" />
                <span>
                  Launched a scalable women-first salon booking ecosystem targeting 3.3M+ users across Delhi-NCR.
                </span>
              </li>
              <li className="flex gap-2 sm:gap-3">
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-1 text-primary" />
                <span>Implemented robust UPI payment infrastructure, reducing payment failures by 30%.</span>
              </li>
              <li className="flex gap-2 sm:gap-3">
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-1 text-primary" />
                <span>
                  Directed a 10-member engineering and operations team across product strategy, development, and
                  deployment.
                </span>
              </li>
            </ul>
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="secondary" className="text-xs">
                Flutter
              </Badge>
              <Badge variant="secondary" className="text-xs">
                Firebase
              </Badge>
              <Badge variant="secondary" className="text-xs">
                Node.js
              </Badge>
              <Badge variant="secondary" className="text-xs">
                Firestore
              </Badge>
              <Badge variant="secondary" className="text-xs">
                GCP
              </Badge>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}


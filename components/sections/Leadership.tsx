import { Card } from "@/components/ui/card"

interface LeadershipProps {
  addToRefs: (el: HTMLElement | null) => void
}

export function Leadership({ addToRefs }: LeadershipProps) {
  return (
    <section ref={addToRefs} className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 opacity-0">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12">Leadership</h2>
        <div className="space-y-4 sm:space-y-6">
          <Card className="p-6 sm:p-8 hover:shadow-lg transition-shadow">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold">Flutter Mentor</h3>
                <p className="text-base sm:text-lg text-muted-foreground">GDG MAIT</p>
              </div>
              <span className="text-sm text-muted-foreground">Sept 2024 – Apr 2025</span>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground">
              Trained 100+ developers across structured Flutter workshops and hands-on sessions.
            </p>
          </Card>
          <Card className="p-6 sm:p-8 hover:shadow-lg transition-shadow">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold">P.R Head</h3>
                <p className="text-base sm:text-lg text-muted-foreground">TechCom, MAIT</p>
              </div>
              <span className="text-sm text-muted-foreground">Oct 2023 – Present</span>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground">
              Managed outreach and execution for HackWithMAIT and ML/Blockchain events with 1000+ participants.
            </p>
          </Card>
        </div>
      </div>
    </section>
  )
}


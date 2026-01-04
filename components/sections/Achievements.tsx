import { Card } from "@/components/ui/card"

interface AchievementsProps {
  addToRefs: (el: HTMLElement | null) => void
}

export function Achievements({ addToRefs }: AchievementsProps) {
  return (
    <section id="achievements" ref={addToRefs} className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 opacity-0">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12">Achievements</h2>
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          <Card className="p-4 sm:p-6 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-base sm:text-lg mb-2">IIIT Delhi 25 Under 25 Winner</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Recognized for building a high-impact, scalable tech solution.
            </p>
          </Card>
          <Card className="p-4 sm:p-6 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-base sm:text-lg mb-2">Tech.Future Hackathon Finalist (IIT Delhi)</h3>
            <p className="text-sm sm:text-base text-muted-foreground">Ranked Top 25 out of 500+ teams.</p>
          </Card>
          <Card className="p-4 sm:p-6 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-base sm:text-lg mb-2">Pitch Your Idea Summit Winner</h3>
            <p className="text-sm sm:text-base text-muted-foreground">Presented solutions to 10+ investors.</p>
          </Card>
          <Card className="p-4 sm:p-6 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-base sm:text-lg mb-2">Survive-AI Winner</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Built resilient AI architecture outperforming 100+ teams.
            </p>
          </Card>
        </div>
      </div>
    </section>
  )
}


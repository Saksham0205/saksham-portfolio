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
              Selected as one of Delhi's top young innovators under 25. Won <span className="font-medium text-foreground">Best Startup Idea</span> at age 20 for building Ajnabee — a scalable women-first salon booking ecosystem targeting 3.3M+ users across Delhi-NCR.
            </p>
          </Card>
          <Card className="p-4 sm:p-6 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-base sm:text-lg mb-2">Tech.Future Hackathon Finalist</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Ranked in the <span className="font-medium text-foreground">Top 25 out of 500+ teams</span> at IIT Delhi's Tech.Future Hackathon — one of the most competitive student-led innovation challenges in the country.
            </p>
          </Card>
          <Card className="p-4 sm:p-6 hover:shadow-lg transition-shadow">
  <h3 className="font-semibold text-base sm:text-lg mb-2">Pitch Your Idea Summit Winner</h3>
  <p className="text-sm sm:text-base text-muted-foreground">
    Secured <span className="font-medium text-foreground">3rd place</span> pitching Ajnabee to 10+ investors at MAIT's Pitch Your Idea Summit.
  </p>
</Card>
<Card className="p-4 sm:p-6 hover:shadow-lg transition-shadow">
  <h3 className="font-semibold text-base sm:text-lg mb-2">Survive-AI Winner</h3>
  <p className="text-sm sm:text-base text-muted-foreground">
    Secured <span className="font-medium text-foreground">1st place</span> at Survive AI, Enspire'23 — organized by the Young Entrepreneurs Society, University of Delhi. Built an AI system that outperformed 100+ competing teams in November 2023.
  </p>
</Card>
        </div>
      </div>
    </section>
  )
}
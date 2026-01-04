import { Card } from "@/components/ui/card"

interface AboutProps {
  addToRefs: (el: HTMLElement | null) => void
}

export function About({ addToRefs }: AboutProps) {
  return (
    <section id="about" ref={addToRefs} className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 opacity-0">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12">About</h2>
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
          <div>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4 sm:mb-6">
              I'm a B.Tech Computer Science student at Maharaja Agrasen Institute of Technology, passionate about
              building products that make a difference. Currently working at Spyne as an SDE Intern, where I've
              delivered 5+ production-grade products within six months.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              As the founder of Ajnabee, I'm building a scalable women-first salon booking ecosystem targeting 3.3M+
              users across Delhi-NCR, leading a team of 10 members.
            </p>
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Education</h3>
            <Card className="p-4 sm:p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                <div>
                  <h4 className="font-semibold text-sm sm:text-base">Maharaja Agrasen Institute of Technology</h4>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    B.Tech in Computer Science and Engineering
                  </p>
                </div>
                <span className="text-xs sm:text-sm text-muted-foreground">2022 – 2026</span>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground mt-2">New Delhi, India</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}


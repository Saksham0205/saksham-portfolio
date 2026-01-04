import { Badge } from "@/components/ui/badge"

interface SkillsProps {
  addToRefs: (el: HTMLElement | null) => void
}

export function Skills({ addToRefs }: SkillsProps) {
  return (
    <section ref={addToRefs} className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 opacity-0">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12">Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Languages</h3>
            <div className="flex flex-wrap gap-2">
              <Badge className="text-xs">Python</Badge>
              <Badge className="text-xs">C/C++</Badge>
              <Badge className="text-xs">Dart</Badge>
              <Badge className="text-xs">SQL</Badge>
              <Badge className="text-xs">JavaScript</Badge>
              <Badge className="text-xs">TypeScript</Badge>
            </div>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Backend</h3>
            <div className="flex flex-wrap gap-2">
              <Badge className="text-xs">REST APIs</Badge>
              <Badge className="text-xs">Firebase</Badge>
              <Badge className="text-xs">MongoDB</Badge>
              <Badge className="text-xs">SQL</Badge>
              <Badge className="text-xs">Docker</Badge>
              <Badge className="text-xs">Postman</Badge>
            </div>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Frameworks</h3>
            <div className="flex flex-wrap gap-2">
              <Badge className="text-xs">Flutter</Badge>
              <Badge className="text-xs">Node.js</Badge>
              <Badge className="text-xs">Nest.js</Badge>
              <Badge className="text-xs">Next.js</Badge>
              <Badge className="text-xs">Bloc/Provider</Badge>
            </div>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Tools</h3>
            <div className="flex flex-wrap gap-2">
              <Badge className="text-xs">Git</Badge>
              <Badge className="text-xs">CI/CD</Badge>
              <Badge className="text-xs">Android Studio</Badge>
              <Badge className="text-xs">AWS</Badge>
              <Badge className="text-xs">GCP</Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


import { ExternalLink } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProjectsProps {
  addToRefs: (el: HTMLElement | null) => void
}

export function Projects({ addToRefs }: ProjectsProps) {
  return (
    <section id="projects" ref={addToRefs} className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 opacity-0">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12">Projects</h2>
        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
          {/* Ajnabee salon booking app */}
          <Card className="overflow-hidden hover:shadow-lg transition-all group hover:-translate-y-1">
            <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-primary/5 overflow-hidden">
              <div className="flex gap-2 h-full p-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
                <img
                  src="https://play-lh.googleusercontent.com/_ZthzOweDAIPnn9x7dl1aE1zhfHq54uYnhonoBWca8T2wFIy7ZRdG0yrepGgLf5fx5Y=w526-h296-rw"
                  alt="Ajnabee Screenshot 1"
                  className="h-full w-auto object-contain snap-center shrink-0 rounded-lg shadow-lg"
                />
                <img
                  src="https://play-lh.googleusercontent.com/e-XpjOzK0K9dUpsZR5vcXIPjJ5n5gG9PN3omEBR8qCRG7FTzbjh2uQ0HK8ibzSAOu3DP=w526-h296-rw"
                  alt="Ajnabee Screenshot 2"
                  className="h-full w-auto object-contain snap-center shrink-0 rounded-lg shadow-lg"
                />
                <img
                  src="https://play-lh.googleusercontent.com/p1Co7eO5hJCD0CXRT8UYK0YM8CmjvgS71LsjtURdNrKnUhkvSoP460gSMUtwg2dSY2I=w526-h296-rw"
                  alt="Ajnabee Screenshot 3"
                  className="h-full w-auto object-contain snap-center shrink-0 rounded-lg shadow-lg"
                />
                <img
                  src="https://play-lh.googleusercontent.com/owDGmGIRDoUTEZ2EcHc94tOxSdlIJn2jmmGp-_b5scSs857xM_-sici3lqT3w0_ZO4a1=w526-h296-rw"
                  alt="Ajnabee Screenshot 4"
                  className="h-full w-auto object-contain snap-center shrink-0 rounded-lg shadow-lg"
                />
                <img
                  src="https://play-lh.googleusercontent.com/eSV4Wd-aQ3TifsjYzkBB8NYIFc1du4aH0qqn_krKVvmxbh3d23ZOlF3MBpDDo3y7jg=w526-h296-rw"
                  alt="Ajnabee Screenshot 5"
                  className="h-full w-auto object-contain snap-center shrink-0 rounded-lg shadow-lg"
                />
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl sm:text-2xl font-semibold group-hover:text-primary transition-colors">
                  Ajnabee
                </h3>
                <a
                  href="https://play.google.com/store/apps/details?id=com.ajnabee.ajnabee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80"
                >
                  <ExternalLink className="w-5 h-5 shrink-0" />
                </a>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground mb-4">
                One-stop solution for hassle-free salon booking for women. Explore top salons, book appointments
                instantly, and manage bookings with real-time availability and ratings.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-xs">
                  Flutter
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Firebase
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  REST APIs
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Payment Integration
                </Badge>
              </div>
            </div>
          </Card>

          {/* Ajnabee Partner */}
          <Card className="overflow-hidden hover:shadow-lg transition-all group hover:-translate-y-1">
            <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-primary/5 overflow-hidden">
              <div className="flex gap-2 h-full p-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
                <img
                  src="https://play-lh.googleusercontent.com/B7_pbAzEiWn5RBs5ecjJDoq4A9Jy8UN5DwJHmbi4KjkJ4V9VccHShibPXvOED0L0e6I=w526-h296-rw"
                  alt="Ajnabee Partner Screenshot 1"
                  className="h-full w-auto object-contain snap-center shrink-0 rounded-lg shadow-lg"
                />
                <img
                  src="https://play-lh.googleusercontent.com/NxWC1GsZEwcKJTeT2QNZrgCEj1qqbn8RIDGBhCfUsi4c94oESNBzK12VVRQSd_C6Z8k=w526-h296-rw"
                  alt="Ajnabee Partner Screenshot 2"
                  className="h-full w-auto object-contain snap-center shrink-0 rounded-lg shadow-lg"
                />
                <img
                  src="https://play-lh.googleusercontent.com/vDmhF5-Ixf4Q5ZAEh-rTTqUB5E-DqNBIrB_aD1MG-4l4-buXxLy8KmYKp_ptZd7sgLY=w526-h296-rw"
                  alt="Ajnabee Partner Screenshot 3"
                  className="h-full w-auto object-contain snap-center shrink-0 rounded-lg shadow-lg"
                />
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl sm:text-2xl font-semibold group-hover:text-primary transition-colors">
                  Ajnabee Partner
                </h3>
                <a
                  href="https://play.google.com/store/apps/details?id=com.ajnabeecorp.ajnabee_partner"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80"
                >
                  <ExternalLink className="w-5 h-5 shrink-0" />
                </a>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground mb-4">
                Created a salon-operations platform with integrated payments and workflow automation, improving
                efficiency by 40%. Built scalable state management using Bloc/Provider.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-xs">
                  Flutter
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Firebase
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  REST APIs
                </Badge>
              </div>
            </div>
          </Card>

          {/* Reswipe */}
          <Card className="overflow-hidden hover:shadow-lg transition-all group hover:-translate-y-1">
            <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-primary/5 overflow-hidden">
              <div className="flex gap-2 h-full p-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
                <img
                  src="/images/reswipe-1.jpg"
                  alt="ReSwipe job listing with swipe interaction"
                  className="h-full w-auto object-contain snap-center shrink-0 rounded-lg shadow-lg"
                />
                <img
                  src="/images/reswipe-5.jpg"
                  alt="ReSwipe AI matching analysis"
                  className="h-full w-auto object-contain snap-center shrink-0 rounded-lg shadow-lg"
                />
                <img
                  src="/images/reswipe-6.jpg"
                  alt="ReSwipe profile with swipe interface"
                  className="h-full w-auto object-contain snap-center shrink-0 rounded-lg shadow-lg"
                />
                <img
                  src="/images/reswipe-2.jpg"
                  alt="ReSwipe applications tracking"
                  className="h-full w-auto object-contain snap-center shrink-0 rounded-lg shadow-lg"
                />
                <img
                  src="/images/reswipe-4.jpg"
                  alt="ReSwipe user profile"
                  className="h-full w-auto object-contain snap-center shrink-0 rounded-lg shadow-lg"
                />
                <img
                  src="/images/reswipe-3.jpg"
                  alt="ReSwipe settings and AI features"
                  className="h-full w-auto object-contain snap-center shrink-0 rounded-lg shadow-lg"
                />
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl sm:text-2xl font-semibold group-hover:text-primary transition-colors">
                  Reswipe
                </h3>
                <a
                  href="https://github.com/Saksham0205"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80"
                >
                  <ExternalLink className="w-5 h-5 shrink-0" />
                </a>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground mb-4">
                Developed an ML-powered resume-matching and recommendation engine with swipe-based UX. Boosted user
                engagement by 50% through real-time personalization.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-xs">
                  Flutter
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Firebase
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  ML
                </Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}


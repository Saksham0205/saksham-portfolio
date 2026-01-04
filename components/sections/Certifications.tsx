import { Card } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import Image from "next/image"

interface CertificationsProps {
  addToRefs: (el: HTMLElement | null) => void
}

export function Certifications({ addToRefs }: CertificationsProps) {
  const certifications = [
    {
      title: "Using AI as Your SEO Assistant",
      organizer: "LinkedIn",
      date: "Sep 2024",
      logo: { bg: "#0077B5", text: "in" },
      link: "https://www.linkedin.com/learning/certificates/036c0f1d409f3cd48f5c8b6d1870024236d5c58739b64b7a5205c59f01572dec",
    },
    {
      title: "IIT Bombay Eureka Zonalist",
      organizer: "E-Cell, IIT Bombay",
      date: "May 2024",
      logo: { bg: "gradient-to-br from-blue-500 to-blue-700", text: "IIT-B" },
      link: "https://drive.google.com/file/d/1ZrnSs5wwx0y-m7MaPh0u9Hv3Owu5yZpi/view",
    },
    {
      title: "Survive AI First Position",
      organizer: "Shaheed Bhagat Singh College",
      date: "Nov 2023",
      logo: { bg: "gradient-to-br from-yellow-600 to-orange-600", text: "SBSC" },
      link: "https://drive.google.com/file/d/19fRDRQxMv1w1QTCcxpMSHyRxaV9_DSWc/view",
    },
    {
      title: "Pitch Your Idea",
      organizer: "MAIT, Delhi",
      date: "Oct 2023",
      logo: { bg: "gradient-to-br from-red-500 to-orange-500", text: "MAIT" },
      link: "https://drive.google.com/file/d/1JcPTqJdakrr9uGTxfK7IFi05fo3R3ywd/view",
    },
    {
      title: "Flutter Development Bootcamp with Dart",
      organizer: "Udemy",
      date: "Sep 2023",
      logo: { bg: "#A435F0", text: "U" },
      link: "https://drive.google.com/file/d/1jFs7ppm_BaJGSaucVTJlCmmjuL-rf7ia/view",
    },
    {
      title: "National Finalist @VENTURE VERSE",
      organizer: "SSCBS INNOVATION (SIIF)",
      date: "Sep 2023",
      logo: { bg: "gradient-to-br from-teal-500 to-green-500", text: "VV" },
      link: "https://drive.google.com/file/d/1BQFGEkd8TwDU9Eb_9A83cHDd89Shgf91/view",
    },
    {
      title: "Software Engineering Job Simulation",
      organizer: "Forage - NY Jobs CEO Council",
      date: "Aug 2023",
      logo: { image: "/logos/theforage_logo.jpg" },
      link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/New%20York%20Jobs%20CEO%20Council/7GYaMYxc6zEcbpjYL_New%20York%20Jobs%20CEO%20Council_FwPf2gJfAKBBviuhC_1693485333805_completion_certificate.pdf",
    },
    {
      title: "Mastercard Cybersecurity Virtual Experience",
      organizer: "Forage",
      date: "Apr 2022",
      logo: { image: "/logos/theforage_logo.jpg" },
      link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/mastercard/vcKAB5yYAgvemepGQ_Mastercard_FwPf2gJfAKBBviuhC_1649418681499_completion_certificate.pdf",
    },
  ]

  return (
    <section id="certifications" ref={addToRefs} className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 opacity-0">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12">Certifications</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {certifications.map((cert, index) => (
            <Card key={index} className="p-4 sm:p-6 hover:shadow-lg transition-all group relative">
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="flex items-start gap-4 mb-3">
                  {cert.logo.image ? (
                    <div className="w-12 h-12 shrink-0 rounded-lg bg-white border border-border flex items-center justify-center p-2">
                      <Image
                        src={cert.logo.image}
                        alt={`${cert.organizer} logo`}
                        width={48}
                        height={48}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div
                      className={`w-12 h-12 shrink-0 rounded-lg ${cert.logo.bg?.startsWith("#") ? "" : "bg-"}${cert.logo.bg} flex items-center justify-center`}
                      style={cert.logo.bg?.startsWith("#") ? { backgroundColor: cert.logo.bg } : {}}
                    >
                      <span className="text-white font-bold text-xs">{cert.logo.text}</span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-sm sm:text-base mb-1 group-hover:text-primary transition-colors">
                        {cert.title}
                      </h3>
                      <ExternalLink className="w-4 h-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">{cert.organizer}</p>
                    <p className="text-xs text-muted-foreground mt-1">{cert.date}</p>
                  </div>
                </div>
              </a>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}


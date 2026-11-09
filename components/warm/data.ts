export const links = {
  email: "saksham252003@gmail.com",
  phone: "+918376063400",
  linkedin: "https://linkedin.com/in/saksham-chauhan-252003",
  github: "https://github.com/Saksham0205",
  resume: "https://drive.google.com/uc?export=download&id=1Zgdvu51SOXNTGc5SwK2-0X4A4kwZUwR_",
};

export const experience = [
  {
    company: "OmniDimension", url: "https://omnidim.io", role: "Software Engineer",
    period: "May 2026 — Sep 2026", place: "Remote · US", color: "bg-accent",
    points: [
      "Built conversational AI workflows from requirements to production, integrating LLM APIs, prompt logic and REST API integrations.",
      "Evaluated TTS and STT providers based on latency, transcription accuracy and voice quality for production voice agents.",
      "Designed and built an internal invoice management tool end-to-end, including the data model, service layer and REST endpoints, automating billing workflows across customer accounts.",
    ],
    tech: ["Python", "LLM APIs", "TTS/STT", "Prompt Engineering", "REST APIs", "Analytics Pipelines", "Voice Agents"],
  },
  {
    company: "Spyne", url: "https://www.spyne.ai/", role: "SDE Intern",
    period: "May 2025 — Jan 2026", place: "Gurgaon, India", color: "bg-secondary",
    points: [
      "Architected a multi-channel AI outbound campaign engine from scratch — automated voice-call workflows built with Sales and Ops, specced end-to-end and launched to production.",
      "Delivered 5+ production-grade products within six months, accelerating cross-team delivery cycles.",
      "Built 10+ internal dashboards on MongoDB aggregation pipelines and REST APIs, giving leadership real-time operational visibility.",
      "Designed and deployed an AI-enabled call insights platform analyzing 100+ sales/service calls weekly with automated scoring.",
    ],
    featured: {
      title: "Conversational AI for Car Dealers",
      summary: "Virtual sales assistant handling after-hours inbound calls — understands customer intent, answers inventory queries, and schedules appointments autonomously with a human-like voice.",
      pipeline: ["Inbound Call", "Speech-to-Text", "LLM Intent", "Response Gen", "Text-to-Speech", "Action"],
      integrations: ["Vapi", "ElevenLabs"],
    },
    tech: ["Next.js", "Nest.js", "MongoDB", "REST APIs", "CI/CD", "AI Voice Workflows"],
  },
  {
    company: "Ajnabee", url: "https://play.google.com/store/apps/details?id=com.ajnabee.ajnabee", role: "Founder & Lead Engineer",
    period: "Jan 2024 — May 2025", place: "New Delhi, India", color: "bg-bloom",
    points: [
      "Founded and directed a 10-member engineering and operations team building a women-first salon booking ecosystem targeting 3.3M+ users across Delhi-NCR.",
      "Built the entire Flutter app from the ground up — screen flows, Bloc state management, and backend API integration.",
      "Implemented robust UPI payment infrastructure, reducing payment failures by 30%.",
    ],
    tech: ["Flutter", "Firebase", "Node.js", "Firestore", "GCP", "REST APIs", "Bloc"],
  },
];

export const projects = [
  {
    name: "Ajnabee",
    summary: "One-stop solution for hassle-free salon booking for women. Explore top salons, book appointments instantly, and manage bookings with real-time availability and ratings.",
    metric: { value: "3.3M+", label: "Target userbase Delhi-NCR" },
    tech: ["Flutter", "Firebase", "REST APIs", "UPI Payments"],
    link: { label: "Play Store", url: "https://play.google.com/store/apps/details?id=com.ajnabee.ajnabee" },
    shots: [
      "https://play-lh.googleusercontent.com/_ZthzOweDAIPnn9x7dl1aE1zhfHq54uYnhonoBWca8T2wFIy7ZRdG0yrepGgLf5fx5Y=w526-h296-rw",
      "https://play-lh.googleusercontent.com/e-XpjOzK0K9dUpsZR5vcXIPjJ5n5gG9PN3omEBR8qCRG7FTzbjh2uQ0HK8ibzSAOu3DP=w526-h296-rw",
      "https://play-lh.googleusercontent.com/p1Co7eO5hJCD0CXRT8UYK0YM8CmjvgS71LsjtURdNrKnUhkvSoP460gSMUtwg2dSY2I=w526-h296-rw",
    ],
  },
  {
    name: "Ajnabee Partner",
    summary: "The salon-side app handling bookings, payment collection, staff scheduling, and daily workflow automation. Improved operations efficiency by 40%.",
    metric: { value: "40%", label: "Ops efficiency gain" },
    tech: ["Flutter", "Firebase", "Bloc", "REST APIs"],
    link: { label: "Play Store", url: "https://play.google.com/store/apps/details?id=com.ajnabeecorp.ajnabee_partner" },
    shots: [
      "https://play-lh.googleusercontent.com/B7_pbAzEiWn5RBs5ecjJDoq4A9Jy8UN5DwJHmbi4KjkJ4V9VccHShibPXvOED0L0e6I=w526-h296-rw",
      "https://play-lh.googleusercontent.com/NxWC1GsZEwcKJTeT2QNZrgCEj1qqbn8RIDGBhCfUsi4c94oESNBzK12VVRQSd_C6Z8k=w526-h296-rw",
      "https://play-lh.googleusercontent.com/vDmhF5-Ixf4Q5ZAEh-rTTqUB5E-DqNBIrB_aD1MG-4l4-buXxLy8KmYKp_ptZd7sgLY=w526-h296-rw",
    ],
  },
  {
    name: "Reswipe",
    summary: "ML-powered resume-matching and recommendation engine with a swipe-based UX — recruiters and candidates matched in real-time. Boosted engagement by 50%.",
    metric: { value: "50%", label: "Engagement lift" },
    tech: ["Flutter", "Firebase", "Machine Learning", "Recommendation Engine"],
    link: { label: "GitHub", url: "https://github.com/Saksham0205" },
    shots: ["/images/reswipe-1.jpg", "/images/reswipe-5.jpg", "/images/reswipe-6.jpg"],
  },
];

export const skills = [
  { group: "Languages", items: ["Python", "Dart", "JavaScript", "TypeScript", "C/C++", "SQL"] },
  { group: "Backend & Databases", items: ["Node.js", "Nest.js", "REST APIs", "Firebase & Firestore", "MongoDB Pipelines", "Redis", "ClickHouse", "Docker"] },
  { group: "Frontend & Mobile", items: ["Flutter (Bloc / Provider)", "Next.js", "React", "Tailwind CSS", "Modern Web Architecture"] },
  { group: "AI & Voice Engineering", items: ["Conversational Voice Agents", "LLM Workflows & Tool Calling", "Prompt Engineering", "Vapi & ElevenLabs", "Evaluation & Analytics"] },
  { group: "Cloud & DevSecOps", items: ["Google Cloud Platform (GCP)", "AWS", "CI/CD Pipelines", "Git & GitHub Actions", "Postman & API Specs"] },
];

export const achievements = [
  { title: "IIIT Delhi 25 Under 25 — Winner", year: "2023", desc: "Selected as one of Delhi's top young innovators under 25, and won Best Startup Idea at age 20 for building Ajnabee — a scalable salon booking ecosystem for 3.3M+ users." },
  { title: "Survive-AI, Enspire'23 — Winner", year: "2023", desc: "Secured 1st place at Survive AI (Young Entrepreneurs Society, University of Delhi). Built an AI system that outperformed 100+ competing teams." },
  { title: "Pitch Your Idea Summit — Winner", year: "2023", desc: "Secured 3rd place pitching Ajnabee to a panel of 10+ active angel and venture investors at MAIT's Pitch Your Idea Summit." },
];

export const certifications = [
  { title: "Using AI as Your SEO Assistant", org: "LinkedIn", date: "Sep 2024", link: "https://www.linkedin.com/learning/certificates/036c0f1d409f3cd48f5c8b6d1870024236d5c58739b64b7a5205c59f01572dec" },
  { title: "IIT Bombay Eureka Zonalist", org: "E-Cell, IIT Bombay", date: "May 2024", link: "https://drive.google.com/file/d/1ZrnSs5wwx0y-m7MaPh0u9Hv3Owu5yZpi/view" },
  { title: "Survive AI First Position", org: "Shaheed Bhagat Singh College, DU", date: "Nov 2023", link: "https://drive.google.com/file/d/19fRDRQxMv1w1QTCcxpMSHyRxaV9_DSWc/view" },
  { title: "Pitch Your Idea", org: "MAIT, Delhi", date: "Oct 2023", link: "https://drive.google.com/file/d/1JcPTqJdakrr9uGTxfK7IFi05fo3R3ywd/view" },
  { title: "Flutter Development Bootcamp with Dart", org: "Udemy", date: "Sep 2023", link: "https://drive.google.com/file/d/1jFs7ppm_BaJGSaucVTJlCmmjuL-rf7ia/view" },
  { title: "National Finalist @VENTURE VERSE", org: "SSCBS INNOVATION (SIIF)", date: "Sep 2023", link: "https://drive.google.com/file/d/1BQFGEkd8TwDU9Eb_9A83cHDd89Shgf91/view" },
  { title: "Software Engineering Job Simulation", org: "Forage - NY Jobs CEO Council", date: "Aug 2023", link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/New%20York%20Jobs%20CEO%20Council/7GYaMYxc6zEcbpjYL_New%20York%20Jobs%20CEO%20Council_FwPf2gJfAKBBviuhC_1693485333805_completion_certificate.pdf" },
  { title: "Mastercard Cybersecurity Virtual Experience", org: "Forage", date: "Apr 2022", link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/mastercard/vcKAB5yYAgvemepGQ_Mastercard_FwPf2gJfAKBBviuhC_1649418681499_completion_certificate.pdf" },
];

export const leadership = [
  { role: "Flutter Mentor", org: "GDG MAIT", period: "Sept 2024 — Apr 2025", desc: "Trained 100+ developers across structured Flutter workshops and hands-on building sessions." },
  { role: "P.R Head", org: "TechCom, MAIT", period: "Oct 2023 — May 2026", desc: "Managed outreach and execution for HackWithMAIT and national ML/Blockchain events with 1000+ participants." },
];

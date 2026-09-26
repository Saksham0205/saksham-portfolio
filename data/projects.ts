// Projects shown as artifacts in The Lab. Summaries, metrics, tech and links
// are carried over from the previous site. `problem` and `built` re-phrase the
// existing summaries; nothing here is new information.

export type ProjectId = "ajnabee" | "ajnabee-partner" | "reswipe";

export interface Project {
  id: ProjectId;
  name: string;
  kind: string;
  summary: string;
  problem: string;
  built: string[];
  outcome: { value: string; label: string };
  tech: string[];
  links: { label: string; url: string }[];
  /** Steps the artifact animates through when opened. */
  flow: string[];
}

export const projects: Project[] = [
  {
    id: "ajnabee",
    name: "Ajnabee",
    kind: "Customer app · Founder",
    summary:
      "One-stop solution for hassle-free salon booking for women. Explore top salons, book appointments instantly, and manage bookings with real-time availability and ratings.",
    problem: "Booking a salon should be one hassle-free flow, from finding a salon to paying for the appointment.",
    built: [
      "The entire Flutter app from the ground up — screen flows, Bloc state management and backend API integration.",
      "UPI payment infrastructure that reduced payment failures by 30%.",
      "Real-time availability, ratings and booking management.",
    ],
    outcome: { value: "3.3M+", label: "target userbase in Delhi-NCR" },
    tech: ["Flutter", "Firebase", "REST APIs", "UPI Payments"],
    links: [{ label: "Play Store", url: "https://play.google.com/store/apps/details?id=com.ajnabee.ajnabee" }],
    flow: ["Discover", "Salon", "Service", "Booking", "Payment"],
  },
  {
    id: "ajnabee-partner",
    name: "Ajnabee Partner",
    kind: "Salon operations app",
    summary:
      "The salon-side app handling bookings, payment collection, staff scheduling, and daily workflow automation. Improved operations efficiency by 40%.",
    problem: "Salons need bookings, payment collection, staff scheduling and daily workflow in one place.",
    built: [
      "Booking intake and payment collection for salon partners.",
      "Staff scheduling and daily workflow automation.",
    ],
    outcome: { value: "40%", label: "operations efficiency gain" },
    tech: ["Flutter", "Firebase", "Bloc", "REST APIs"],
    links: [
      { label: "Play Store", url: "https://play.google.com/store/apps/details?id=com.ajnabeecorp.ajnabee_partner" },
    ],
    flow: ["Booking in", "Payment", "Staff schedule", "Daily workflow"],
  },
  {
    id: "reswipe",
    name: "ReSwipe",
    kind: "AI matching",
    summary:
      "ML-powered resume-matching and recommendation engine with a swipe-based UX — recruiters and candidates matched in real-time. Boosted engagement by 50%.",
    problem: "Matching recruiters and candidates in real time, in a format people actually want to use.",
    built: [
      "An ML-powered resume-matching and recommendation engine.",
      "A swipe-based UX for acting on recommendations.",
    ],
    outcome: { value: "50%", label: "engagement lift" },
    tech: ["Flutter", "Firebase", "Machine Learning", "Recommendation Engine"],
    links: [{ label: "GitHub", url: "https://github.com/Saksham0205" }],
    flow: ["Resume", "AI matching", "Recommendation", "Swipe UX", "Opportunity"],
  },
];

export const reswipeScreens = ["/images/reswipe-1.jpg", "/images/reswipe-5.jpg", "/images/reswipe-6.jpg"];

export const getProject = (id: ProjectId) => projects.find((p) => p.id === id)!;

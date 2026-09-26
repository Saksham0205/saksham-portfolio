// Experience content, carried over verbatim from the previous site.
// The pipeline/phase structures only re-arrange existing bullets so the 3D
// rooms can tell the story visually; they add no new claims.

export interface PipelineStep {
  id: string;
  label: string;
  /** What happens at this step, grounded in an existing bullet. */
  note: string;
}

export interface Role {
  id: string;
  company: string;
  url: string;
  role: string;
  period: string;
  place: string;
  points: string[];
  tech: string[];
}

export const omnidimension: Role & {
  pipeline: PipelineStep[];
  internalTool: { title: string; layers: string[]; point: string };
} = {
  id: "omnidimension",
  company: "OmniDimension",
  url: "https://omnidim.io",
  // Job title as stated on the resume. Positioning ("Product Engineer") lives in profile.roles.
  role: "Software Engineer",
  period: "May 2026 — Sep 2026",
  place: "Remote · US",
  points: [
    "Built conversational AI workflows from requirements to production, integrating LLM APIs, prompt logic and REST API integrations.",
    "Evaluated TTS and STT providers based on latency, transcription accuracy and voice quality for production voice agents.",
    "Designed and built an internal invoice management tool end-to-end, including the data model, service layer and REST endpoints, automating billing workflows across customer accounts.",
  ],
  tech: ["Python", "LLM APIs", "TTS/STT", "Prompt Engineering", "REST APIs", "Analytics Pipelines", "Voice Agents"],
  pipeline: [
    { id: "user", label: "User", note: "A caller starts a conversation with a production voice agent." },
    { id: "speech", label: "Speech", note: "STT providers evaluated on latency and transcription accuracy." },
    { id: "agent", label: "AI agent", note: "Conversational workflows built on LLM APIs and prompt logic." },
    { id: "tools", label: "Tools", note: "The agent calls out through REST API integrations." },
    { id: "data", label: "Data / API", note: "Workflows taken from client requirements to production." },
    { id: "response", label: "Response", note: "The workflow composes what the agent says next." },
    { id: "voice", label: "Voice", note: "TTS providers evaluated on latency and voice quality." },
  ],
  internalTool: {
    title: "Internal invoice management tool",
    layers: ["Data model", "Service layer", "REST endpoints"],
    point: "Built end-to-end, automating billing workflows across customer accounts.",
  },
};

export const spyne: Role & {
  phases: { id: string; title: string; point: string }[];
  metrics: { value: number; suffix: string; label: string }[];
  featuredBuild: { title: string; summary: string; pipeline: string[]; integrations: string[] };
} = {
  id: "spyne",
  company: "Spyne",
  url: "https://www.spyne.ai/",
  role: "SDE Intern",
  period: "May 2025 — Jan 2026",
  place: "Gurgaon, India",
  points: [
    "Architected a multi-channel AI outbound campaign engine from scratch — automated voice-call workflows built with Sales and Ops, specced end-to-end and launched to production.",
    "Delivered 5+ production-grade products within six months, accelerating cross-team delivery cycles.",
    "Built 10+ internal dashboards on MongoDB aggregation pipelines and REST APIs, giving leadership real-time operational visibility.",
    "Designed and deployed an AI-enabled call insights platform analyzing 100+ sales/service calls weekly with automated scoring.",
  ],
  phases: [
    {
      id: "campaigns",
      title: "Campaigns",
      point: "A multi-channel AI outbound campaign engine, built from scratch with Sales and Ops and launched to production.",
    },
    {
      id: "insights",
      title: "Call insights",
      point: "An AI-enabled call insights platform analyzing 100+ sales and service calls weekly with automated scoring.",
    },
    {
      id: "dashboards",
      title: "Dashboards",
      point: "10+ internal dashboards on MongoDB aggregation pipelines and REST APIs, giving leadership real-time operational visibility.",
    },
  ],
  metrics: [
    { value: 100, suffix: "+", label: "calls analyzed weekly" },
    { value: 10, suffix: "+", label: "internal dashboards" },
    { value: 5, suffix: "+", label: "production products in six months" },
  ],
  featuredBuild: {
    title: "Conversational AI for car dealers",
    summary:
      "Virtual sales assistant handling after-hours inbound calls — understands customer intent, answers inventory queries, and schedules appointments autonomously with a human-like voice.",
    pipeline: ["Inbound call", "Speech-to-text", "LLM intent", "Response gen", "Text-to-speech", "Action"],
    integrations: ["Vapi", "ElevenLabs"],
  },
  tech: ["Next.js", "Nest.js", "MongoDB", "REST APIs", "CI/CD", "AI Voice Workflows"],
};

export const ajnabee: Role & {
  flow: { id: string; label: string; screen: string }[];
  metrics: { value: string; label: string }[];
} = {
  id: "ajnabee",
  company: "Ajnabee",
  url: "https://play.google.com/store/apps/details?id=com.ajnabee.ajnabee",
  role: "Founder & Lead Engineer",
  period: "Jan 2024 — May 2025",
  place: "New Delhi, India",
  points: [
    "Founded and directed a 10-member engineering and operations team building a women-first salon booking ecosystem targeting 3.3M+ users across Delhi-NCR.",
    "Built the entire Flutter app from the ground up — screen flows, Bloc state management, and backend API integration.",
    "Implemented robust UPI payment infrastructure, reducing payment failures by 30%.",
  ],
  // The customer journey through the two apps. `screen` is UI copy for the
  // illustrative phone screen, not a product claim.
  flow: [
    { id: "discover", label: "Discover", screen: "Explore top salons" },
    { id: "salon", label: "Salon", screen: "Ratings & availability" },
    { id: "service", label: "Service", screen: "Choose a service" },
    { id: "booking", label: "Booking", screen: "Book instantly" },
    { id: "payment", label: "Payment", screen: "Pay with UPI" },
    { id: "partner", label: "Partner", screen: "Sent to the salon" },
  ],
  metrics: [
    { value: "3.3M+", label: "target users across Delhi-NCR" },
    { value: "30%", label: "fewer UPI payment failures" },
    { value: "40%", label: "salon operations efficiency gain (Partner app)" },
    { value: "10", label: "member engineering & ops team" },
  ],
  tech: ["Flutter", "Firebase", "Node.js", "Firestore", "GCP", "REST APIs", "Bloc"],
};

export const roles = [omnidimension, spyne, ajnabee] as const;

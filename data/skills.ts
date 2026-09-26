// Capabilities regroup the technologies listed on the previous site into what
// they let me do. The "Product" group only lists practices evidenced by the
// experience entries (see data/experience.ts).

export interface Capability {
  id: string;
  title: string;
  line: string;
  groups: { name: string; items: string[] }[];
}

export const capabilities: Capability[] = [
  {
    id: "engineering",
    title: "Product engineering",
    line: "Frontend, backend and mobile — the whole product, not one layer of it.",
    groups: [
      { name: "Frontend & mobile", items: ["Flutter (Bloc / Provider)", "Next.js", "React", "Tailwind CSS"] },
      { name: "Backend & APIs", items: ["Node.js", "Nest.js", "REST APIs", "Postman & API specs"] },
      { name: "Data", items: ["Firebase & Firestore", "MongoDB pipelines", "Redis", "ClickHouse", "SQL"] },
      { name: "Languages", items: ["Python", "Dart", "JavaScript", "TypeScript", "C/C++"] },
    ],
  },
  {
    id: "ai",
    title: "AI & voice",
    line: "Agents that listen, reason, call tools and talk back.",
    groups: [
      { name: "Voice", items: ["Conversational voice agents", "TTS / STT evaluation", "Vapi", "ElevenLabs"] },
      { name: "LLMs", items: ["LLM workflows & tool calling", "Prompt engineering", "Evaluation & analytics"] },
    ],
  },
  {
    id: "product",
    title: "Product, 0 → 1",
    line: "From a problem to something people use, then back again.",
    groups: [
      { name: "Founding", items: ["Founded Ajnabee", "Led a 10-member engineering & ops team"] },
      {
        name: "Shipping",
        items: ["Requirements to production", "Specced end-to-end with Sales & Ops", "Internal tools", "Operational dashboards"],
      },
    ],
  },
  {
    id: "infra",
    title: "Cloud & delivery",
    line: "Getting it to production, and keeping it there.",
    groups: [{ name: "Platform", items: ["Google Cloud Platform", "AWS", "Docker", "CI/CD pipelines", "Git & GitHub Actions"] }],
  },
];

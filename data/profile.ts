// Single source of truth for personal info. Every value here was carried over
// from the previous version of the site — do not add unverified claims.

export const profile = {
  name: "Saksham Chauhan",
  firstName: "Saksham",
  lastName: "Chauhan",
  roles: ["Product Engineer", "AI Builder", "Founder"],
  statement: "I build AI products, voice systems, and digital products from 0 → 1.",
  currently: "Software Engineer at OmniDimension · Remote (US)",
  location: "New Delhi, India",
  coordinates: "28.5450° N, 77.2732° E",
  siteUrl: "https://www.saksham-portfolio.me",
  email: "saksham252003@gmail.com",
  phone: "+91-8376063400",
  links: {
    github: "https://github.com/Saksham0205",
    linkedin: "https://linkedin.com/in/saksham-chauhan-252003",
    resume: "https://drive.google.com/uc?export=download&id=1WTWIRiNM0WeQpy3h3WjtxUNKvFXPi1hJ",
  },
  education: {
    school: "Maharaja Agrasen Institute of Technology",
    degree: "B.Tech in Computer Science and Engineering",
    period: "2022 — 2026",
    place: "New Delhi, India",
  },
  // Short fragments for the About room, each lifted from the existing bio.
  story: [
    "B.Tech Computer Science at Maharaja Agrasen Institute of Technology.",
    "Passionate about building products that make a real difference.",
    "Now at OmniDimension, building conversational AI and voice agents.",
    "At Spyne, architected AI campaign engines and shipped 5+ production products and 10+ dashboards.",
    "Founded Ajnabee, a women-first salon booking ecosystem targeting 3.3M+ users across Delhi-NCR, and led a 10-member engineering and operations team.",
  ],
} as const;

export type Profile = typeof profile;

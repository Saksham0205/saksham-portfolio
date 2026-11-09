import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Github, Linkedin, Mail, Phone, FileText, Copy, Check } from "lucide-react";
import { achievements, certifications, experience, leadership, links, projects, skills } from "./data";
import { MusicToggle } from "./MusicToggle";

function Fade({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Heading({ kicker, children }: { kicker: string; children: ReactNode }) {
  return (
    <Fade className="mb-12">
      <span className="inline-block rotate-[-2deg] rounded-full bg-secondary px-3 py-1 font-sans text-xs font-extrabold uppercase tracking-widest pop">
        {kicker}
      </span>
      <h2 className="mt-5 font-display text-4xl font-black tracking-tight md:text-6xl">{children}</h2>
    </Fade>
  );
}

function Loader() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1800);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 rounded-b-[32px] bg-secondary"
        >
          <span className="wobble text-7xl" aria-hidden>👋</span>
          <p className="font-display text-5xl font-black tracking-tight md:text-7xl">Hi there!</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const nav = [
  ["Journey", "#journey"],
  ["Work", "#work"],
  ["Stack", "#stack"],
  ["Wins", "#wins"],
  ["Contact", "#contact"],
];

export function Portfolio() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Open the portfolio at its introduction even if the browser restored an old section hash or scroll position.
    if (window.location.hash) {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-secondary">
      <Loader />
      <MusicToggle />

      <header className="sticky top-0 z-40 border-b-2 border-foreground bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <a href="#top" className="font-display text-2xl font-black">Saksham<span className="text-primary">.</span></a>
          <nav className="hidden gap-6 text-sm font-bold md:flex">
            {nav.map(([l, h]) => (
              <a key={h} href={h} className="hover:text-primary">{l}</a>
            ))}
          </nav>
          <a href={links.resume} className="pop rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">Resume</a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-24 pt-16 md:grid-cols-12 md:pt-24">
        <div className="md:col-span-7">
          <Fade>
            <p className="font-bold text-muted-foreground">Hey, I'm Saksham Chauhan 👋</p>
            <h1 className="mt-4 font-display text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
              I build AI that <span className="relative inline-block text-primary">talks back<svg viewBox="0 0 200 12" className="absolute -bottom-2 left-0 w-full" aria-hidden><path d="M2 8 Q50 0 100 7 T198 5" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" /></svg></span>, and products people use.
            </h1>
          </Fade>
          <Fade delay={0.15}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Most recently a Software Engineer at OmniDimension (till Sep 2026), building conversational AI & voice agents. Before that at Spyne as an SDE Intern, where I architected AI campaign engines and shipped 5+ production products and 10+ dashboards.
            </p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
              As the founder of Ajnabee, I built a women-first salon booking ecosystem targeting 3.3M+ users across Delhi-NCR, leading a 10-member engineering and operations team.
            </p>
          </Fade>
          <Fade delay={0.3} className="mt-10 flex flex-wrap gap-3">
            <a href="#work" className="pop rounded-full bg-foreground px-6 py-3 font-bold text-background">See my work →</a>
            <a href="#contact" className="pop rounded-full bg-surface px-6 py-3 font-bold">Say hello</a>
          </Fade>
        </div>
        <Fade delay={0.2} className="md:col-span-5">
          <div className="relative mx-auto max-w-sm">
            <div className="pop rotate-[3deg] rounded-3xl bg-accent p-8">
              <p className="font-display text-2xl font-black">Open to new roles ✦</p>
              <p className="mt-2 font-bold">Ex-OmniDimension · Ex-Spyne · Founder of Ajnabee</p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {[["5+", "products shipped"], ["10+", "dashboards"], ["3.3M+", "users targeted"], ["100+", "devs mentored"]].map(([v, l]) => (
                  <div key={l} className="rounded-2xl border-2 border-foreground bg-surface p-3">
                    <p className="font-display text-2xl font-black text-primary">{v}</p>
                    <p className="text-xs font-bold text-muted-foreground">{l}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="pop absolute -bottom-6 -left-6 rotate-[-6deg] rounded-2xl bg-bloom px-4 py-2 font-bold">Founder of Ajnabee ✿</div>
          </div>
        </Fade>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden border-y-2 border-foreground bg-foreground py-4 text-background">
        <div className="animate-marquee-x flex w-max gap-10 whitespace-nowrap font-display text-2xl font-black">
          {Array.from({ length: 2 }).flatMap((_, k) =>
            ["Voice Agents", "✦", "LLM Workflows", "✦", "Flutter", "✦", "Next.js", "✦", "Founder", "✦", "Shipping fast", "✦"].map((w, i) => <span key={`${k}${i}`}>{w}</span>),
          )}
        </div>
      </div>

      {/* JOURNEY */}
      <section id="journey" className="mx-auto max-w-6xl px-5 py-28">
        <Heading kicker="My journey">Where I've built</Heading>
        <div className="relative space-y-10 border-l-2 border-dashed border-foreground pl-8 md:pl-12">
          {experience.map((e, i) => (
            <Fade key={e.company} delay={i * 0.05}>
              <article className="relative">
                <span className={`absolute -left-[45px] top-6 h-6 w-6 rounded-full border-2 border-foreground md:-left-[61px] ${e.color}`} />
                <div className={`pop rounded-3xl bg-surface p-6 md:p-8`}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-3xl font-black">{e.role}</h3>
                      <a href={e.url} target="_blank" rel="noreferrer" className="mt-1 inline-flex items-center gap-1 font-bold text-primary hover:underline">
                        {e.company} <ArrowUpRight className="size-4" />
                      </a>
                      <span className="ml-2 text-sm font-semibold text-muted-foreground">· {e.place}</span>
                    </div>
                    <span className={`rounded-full border-2 border-foreground px-3 py-1 text-xs font-extrabold ${e.color}`}>{e.period}</span>
                  </div>
                  <ul className="mt-6 space-y-3">
                    {e.points.map((p) => (
                      <li key={p} className="flex gap-3 leading-relaxed">
                        <span className="mt-1 text-primary">✦</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  {e.featured && (
                    <div className="mt-6 rounded-2xl border-2 border-dashed border-foreground bg-secondary/50 p-5">
                      <p className="text-xs font-extrabold uppercase tracking-widest text-primary">Featured build</p>
                      <p className="mt-1 font-display text-xl font-black">{e.featured.title}</p>
                      <p className="mt-2 text-sm leading-relaxed">{e.featured.summary}</p>
                      <div className="mt-4 flex flex-wrap items-center gap-1.5 text-xs font-bold">
                        {e.featured.pipeline.map((s, idx, arr) => (
                          <span key={s} className="flex items-center gap-1.5">
                            <span className="rounded-full border-2 border-foreground bg-surface px-2.5 py-1">{s}</span>
                            {idx < arr.length - 1 && <span>→</span>}
                          </span>
                        ))}
                      </div>
                      <p className="mt-3 text-xs font-bold text-muted-foreground">Engineered via {e.featured.integrations.join(" & ")}</p>
                    </div>
                  )}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {e.tech.map((t) => (
                      <span key={t} className="rounded-full bg-muted px-3 py-1 text-xs font-bold">{t}</span>
                    ))}
                  </div>
                </div>
              </article>
            </Fade>
          ))}
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="bg-surface-2 py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Heading kicker="Selected work">Things I've shipped</Heading>
          <div className="grid gap-10 md:grid-cols-3">
            {projects.map((p, i) => (
              <Fade key={p.name} delay={i * 0.1}>
                <article className={`pop flex h-full flex-col rounded-3xl bg-surface p-4 ${i % 2 ? "md:rotate-[1.5deg]" : "md:rotate-[-1.5deg]"}`}>
                  <div className="flex gap-2 overflow-x-auto rounded-2xl border-2 border-foreground bg-muted p-2">
                    {p.shots.map((s) => (
                      <img key={s} src={s} alt={`${p.name} screenshot`} referrerPolicy="no-referrer" className="h-48 w-auto shrink-0 rounded-xl object-cover" />
                    ))}
                  </div>
                  <div className="flex flex-1 flex-col p-3">
                    <div className="mt-3 flex items-baseline justify-between">
                      <h3 className="font-display text-2xl font-black">{p.name}</h3>
                      <span className="font-display text-2xl font-black text-primary">{p.metric.value}</span>
                    </div>
                    <p className="text-right text-xs font-bold text-muted-foreground">{p.metric.label}</p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed">{p.summary}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.tech.map((t) => <span key={t} className="rounded-full bg-muted px-2.5 py-1 text-xs font-bold">{t}</span>)}
                    </div>
                    <a href={p.link.url} target="_blank" rel="noreferrer" className="pop mt-5 inline-flex items-center justify-center gap-1 rounded-full bg-secondary px-4 py-2 text-sm font-bold">
                      View on {p.link.label} <ArrowUpRight className="size-4" />
                    </a>
                  </div>
                </article>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* STACK */}
      <section id="stack" className="mx-auto max-w-6xl px-5 py-28">
        <Heading kicker="Toolbox">What I work with</Heading>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((s, i) => (
            <Fade key={s.group} delay={i * 0.05}>
              <div className={`pop h-full rounded-3xl p-6 ${["bg-secondary", "bg-accent", "bg-bloom", "bg-surface", "bg-secondary"][i]}`}>
                <h3 className="font-display text-xl font-black">{s.group}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.items.map((t) => <span key={t} className="rounded-full border-2 border-foreground bg-surface px-3 py-1 text-sm font-bold">{t}</span>)}
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </section>

      {/* WINS */}
      <section id="wins" className="bg-foreground py-28 text-background">
        <div className="mx-auto max-w-6xl px-5">
          <Fade className="mb-12">
            <span className="inline-block rotate-[-2deg] rounded-full bg-secondary px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-foreground">Awards</span>
            <h2 className="mt-5 font-display text-4xl font-black md:text-6xl">Big bets, landed.</h2>
          </Fade>
          <div className="grid gap-6 md:grid-cols-3">
            {achievements.map((a, i) => (
              <Fade key={a.title} delay={i * 0.1}>
                <div className="h-full rounded-3xl border-2 border-background/30 p-6">
                  <span className="text-4xl">🏆</span>
                  <p className="mt-4 text-sm font-bold text-secondary">{a.year}</p>
                  <h3 className="mt-1 font-display text-2xl font-black">{a.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed opacity-75">{a.desc}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP + CERTS */}
      <section className="mx-auto grid max-w-6xl gap-16 px-5 py-28 lg:grid-cols-2">
        <div>
          <Heading kicker="Leadership">Lifting others up</Heading>
          <div className="space-y-6">
            {leadership.map((l) => (
              <Fade key={l.role}>
                <div className="pop rounded-3xl bg-accent p-6">
                  <p className="text-xs font-extrabold uppercase tracking-widest">{l.period}</p>
                  <h3 className="mt-2 font-display text-2xl font-black">{l.role} <span className="text-primary">@ {l.org}</span></h3>
                  <p className="mt-2 leading-relaxed">{l.desc}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
        <div>
          <Heading kicker="Certifications">Always learning</Heading>
          <ul className="divide-y-2 divide-dashed divide-foreground/30 rounded-3xl border-2 border-foreground bg-surface">
            {certifications.map((c) => (
              <li key={c.title}>
                <a href={c.link} target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-4 px-5 py-4 hover:bg-secondary/50">
                  <div>
                    <p className="font-bold">{c.title}</p>
                    <p className="text-xs font-semibold text-muted-foreground">{c.org} · {c.date}</p>
                  </div>
                  <ArrowUpRight className="size-5 shrink-0 transition-transform group-hover:rotate-45" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-5 pb-28">
        <Fade className="mx-auto max-w-5xl">
          <div className="pop rounded-[40px] bg-secondary p-10 text-center md:p-16">
            <span className="wobble inline-block text-6xl" aria-hidden>☎️</span>
            <h2 className="mt-4 font-display text-5xl font-black tracking-tight md:text-7xl">Call me, maybe?</h2>
            <p className="mx-auto mt-4 max-w-lg text-lg">Building something with voice, AI or mobile? I'd love to hear about it.</p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(links.email);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1800);
                }}
                className="pop inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 font-bold text-background"
              >
                {copied ? <Check className="size-4" /> : <Copy className="size-4" />} {copied ? "Copied!" : links.email}
              </button>
              {[
                [Mail, "Email", `mailto:${links.email}`],
                [Phone, "Call", `tel:${links.phone}`],
                [Linkedin, "LinkedIn", links.linkedin],
                [Github, "GitHub", links.github],
                [FileText, "Resume", links.resume],
              ].map(([Icon, label, href]) => {
                const I = Icon as typeof Mail;
                return (
                  <a key={label as string} href={href as string} target="_blank" rel="noreferrer" className="pop inline-flex items-center gap-2 rounded-full bg-surface px-5 py-3 font-bold">
                    <I className="size-4" /> {label as string}
                  </a>
                );
              })}
            </div>
          </div>
        </Fade>
      </section>

      <footer className="border-t-2 border-foreground py-8 text-center text-sm font-bold text-muted-foreground">
        Made with ☕ and curiosity by Saksham Chauhan · {new Date().getFullYear()}
      </footer>
    </div>
  );
}

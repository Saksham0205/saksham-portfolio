"use client";

import { RefObject } from "react";
import { Github, Linkedin, Mail, FileText, ArrowRight } from "lucide-react";
import { AnimatedHeading, Reveal } from "@/components/Reveal";
import { TechStackOrbit } from "@/components/three/TechStackOrbit";

interface HeroProps {
  heroRef?: RefObject<HTMLDivElement | null>;
}

export function Hero({ heroRef }: HeroProps) {
  return (
    <section
      ref={heroRef}
      className="relative flex min-h-[100svh] flex-col justify-center px-6 pt-32 pb-20 md:px-12"
    >
      <div className="mx-auto w-full max-w-6xl">

        {/* Big Display Name */}
        <h1 className="font-display text-[clamp(2.75rem,9vw,7.5rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.04em]">
          <AnimatedHeading text="Saksham" className="block" />
          <AnimatedHeading text="Chauhan" className="block text-primary" />
        </h1>

        {/* Tagline & Key Highlights Grid */}
        <div className="mt-12 grid gap-10 md:grid-cols-12">
          <Reveal delay={0.5} className="md:col-span-6 space-y-4">
            <p className="text-base leading-relaxed text-foreground/75">
              Software Engineer at OmniDimension building conversational AI & voice agents. Previously at Spyne as an SDE Intern, where I architected AI campaign engines and shipped 5+ production products and 10+ dashboards.
            </p>
            <p className="text-base leading-relaxed text-foreground/75">
              As the founder of Ajnabee, I built a women-first salon booking ecosystem targeting 3.3M+ users across Delhi-NCR, leading a 10-member engineering and operations team.
            </p>
          </Reveal>
          <Reveal delay={0.62} className="md:col-span-5 md:col-start-8">
            <TechStackOrbit />
          </Reveal>
        </div>

        {/* Action CTAs */}
        <Reveal delay={0.75} className="mt-14 flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            className="group inline-flex items-center gap-3 bg-primary px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5"
          >
            See the work
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 border border-border px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-foreground transition-colors duration-300 hover:border-primary hover:text-primary"
          >
            Get in touch
          </a>
          <a
            href="https://drive.google.com/uc?export=download&id=1Zgdvu51SOXNTGc5SwK2-0X4A4kwZUwR_"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-border px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-300 hover:border-primary hover:text-primary"
          >
            <FileText className="size-3.5" />
            Resume
          </a>
        </Reveal>

        {/* Social Quick Links */}
        <Reveal delay={0.85} className="mt-8 flex items-center gap-6">
          <a
            href="https://github.com/Saksham0205"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"
          >
            <Github className="size-4" />
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/saksham-chauhan-252003"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"
          >
            <Linkedin className="size-4" />
            LinkedIn
          </a>
          <a
            href="mailto:saksham252003@gmail.com"
            className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"
          >
            <Mail className="size-4" />
            Email
          </a>
        </Reveal>
      </div>

      {/* Scroll indicator */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2">
        <span className="label">Scroll</span>
      </div>
    </section>
  );
}

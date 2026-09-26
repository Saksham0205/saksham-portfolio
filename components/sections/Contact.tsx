import { profile } from "@/data/profile";
import { RoomTitle } from "@/components/ui-lab/RoomTitle";

const ROOM = 9;

const channels = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, external: false },
  { label: "LinkedIn", value: "saksham-chauhan-252003", href: profile.links.linkedin, external: true },
  { label: "GitHub", value: "Saksham0205", href: profile.links.github, external: true },
  { label: "Resume", value: "Download PDF", href: profile.links.resume, external: true },
  { label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/-/g, "")}`, external: false },
];

/** The way out: the camera pulls up and the whole lab comes into view. */
export function Contact() {
  return (
    <section id="contact" className="room" aria-labelledby="contact-title" style={{ ["--room-h" as string]: "180vh" }}>
      <div className="room-pin !justify-between">
        <div className="col !max-w-none">
          <RoomTitle
            room={ROOM}
            id="contact-title"
            lines={["Let's build", "something."]}
            className="room-title--xl"
          />
        </div>

        <div className="mt-12">
          <ul className="grid max-w-5xl gap-x-10 border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            {channels.map((c) => (
              <li key={c.label} className="border-b border-line">
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-baseline justify-between gap-4 py-4"
                >
                  <span className="text-slate">{c.label}</span>
                  <span className="truncate transition-colors group-hover:text-signal">
                    {c.value} {c.external && <span aria-hidden="true">↗</span>}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <footer className="meta mt-10 flex flex-wrap justify-between gap-x-8 gap-y-2 text-xs">
            <span>© {new Date().getFullYear()} {profile.name}</span>
            <span>
              {profile.location}, {profile.coordinates}
            </span>
            <span>Built as its own product: Next.js, React Three Fiber, custom shaders.</span>
          </footer>
        </div>
      </div>
    </section>
  );
}

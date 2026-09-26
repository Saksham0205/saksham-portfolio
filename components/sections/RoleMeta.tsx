import type { Role } from "@/data/experience";

/** Role, dates and place under a company title. */
export function RoleMeta({ role }: { role: Role }) {
  return (
    <p className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <span className="text-lg font-semibold">{role.role}</span>
      <span className="text-slate">{role.period}</span>
      <span className="text-slate">{role.place}</span>
      <a href={role.url} target="_blank" rel="noopener noreferrer" className="link-line text-sm text-slate">
        {new URL(role.url).hostname.replace("www.", "")} ↗
      </a>
    </p>
  );
}

import { ArrowUpRight, ShieldAlert } from 'lucide-react'
import { Section } from './Section'
import { research } from '../config'

export default function Research() {
  return (
    <Section id="research" label="Research">
      <div className="space-y-12">
        {research.map((r) => (
          <article key={r.title}>
            {r.cve && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-destructive/30 bg-destructive/5 px-3 py-1 text-xs font-medium text-destructive">
                <ShieldAlert className="h-3.5 w-3.5" /> {r.cve}
              </span>
            )}
            <h3 className="font-serif-display mt-3 text-2xl font-semibold leading-snug tracking-tight">
              {r.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {r.venue} · {r.period}
            </p>
            {r.authors && (
              <p className="mt-1 text-sm italic text-muted-foreground">{r.authors}</p>
            )}

            <p className="mt-4 text-[15px] leading-6 text-foreground/75">{r.description}</p>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              {r.links.map((l) => (
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-sm link-underline"
                >
                  {l.label} <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}

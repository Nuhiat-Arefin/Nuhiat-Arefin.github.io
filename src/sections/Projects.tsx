import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import { Section } from './Section'
import { projects } from '../config'

export default function Projects() {
  return (
    <Section id="projects" label="Projects & Open Source">
      <div className="space-y-12">
        {projects.map((p) => (
          <article key={p.title}>
            <Link to={`/projects/${p.slug}`} className="group block">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-serif-display text-2xl font-semibold tracking-tight">
                  <span className="link-underline">{p.title}</span>
                </h3>
                <span className="font-mono-code text-xs text-muted-foreground">{p.period}</span>
              </div>
              <p className="mt-1 text-sm font-medium text-muted-foreground">{p.org}</p>
              <p className="mt-4 text-[15px] leading-6 text-foreground/75">{p.summary}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                Details <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </article>
        ))}
      </div>
    </Section>
  )
}

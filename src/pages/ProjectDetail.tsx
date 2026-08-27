import { useEffect } from 'react'
import { Link, useParams } from 'react-router'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { identity, projects } from '../config'
import type { Issue, Project } from '../config'

function buildRefMap(project: Project): Map<string, string> {
  const map = new Map<string, string>()
  for (const issue of project.issues ?? []) {
    map.set(
      `#${issue.number}`,
      issue.url ?? `https://github.com/${issue.repo}/issues/${issue.number}`,
    )
  }
  for (const link of project.links) {
    const m = link.label.match(/#(\d+)/)
    if (m && link.url.startsWith('http')) map.set(`#${m[1]}`, link.url)
  }
  for (const [key, url] of Object.entries(project.refs ?? {})) map.set(key, url)
  return map
}

function linkifyRefs(text: string, refs: Map<string, string>) {
  return text.split(/(#\d+)/g).map((part, i) => {
    const url = /^#\d+$/.test(part) ? refs.get(part) : undefined
    return url ? (
      <a key={i} href={url} target="_blank" rel="noreferrer" className="link-underline">
        {part}
      </a>
    ) : (
      part
    )
  })
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (project) document.title = `${project.title} · ${identity.name}`
    return () => {
      document.title = `${identity.name} · Security Researcher & Open-Source Contributor`
    }
  }, [project])

  if (!project) {
    return (
      <main className="mx-auto max-w-[680px] px-6 py-32">
        <p>Project not found.</p>
        <Link to="/" className="link-underline mt-4 inline-block">
          ← Back home
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-[680px] px-6 pb-24">
      <div className="pt-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to portfolio
        </Link>
      </div>

      <article className="pt-12">
        <h1 className="font-serif-display text-4xl font-bold leading-[1.15] tracking-tight">
          {project.title}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {project.org} · {project.period}
        </p>

        <p className="mt-8 text-[18px] leading-8 text-foreground/85">{project.summary}</p>
        {project.description && (
          <p className="mt-4 text-[18px] leading-8 text-foreground/85">
            {linkifyRefs(project.description, buildRefMap(project))}
          </p>
        )}

        <div className="mt-8 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
          {project.links.map((l) =>
            l.url.startsWith('/') ? (
              <Link
                key={l.url}
                to={l.url}
                className="inline-flex items-center gap-1 text-sm link-underline"
              >
                {l.label} <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            ) : (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-sm link-underline"
              >
                {l.label} <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            ),
          )}
        </div>

        {project.issues && project.issues.length > 0 && (
          <section className="mt-14">
            <h2 className="font-serif-display text-xl font-bold tracking-tight">
              All issues reported ({project.issues.length})
            </h2>
            <div className="mt-6 space-y-8">
              {[
                ...project.issues
                  .reduce((groups, issue) => {
                    const list = groups.get(issue.repo) ?? []
                    list.push(issue)
                    return groups.set(issue.repo, list)
                  }, new Map<string, Issue[]>())
                  .entries(),
              ].map(([repo, issues]) => (
                <div key={repo}>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    {repo} <span className="text-muted-foreground/60">({issues.length})</span>
                  </h3>
                  <ul className="mt-3 space-y-1.5">
                    {issues.map((issue) => (
                      <li key={issue.number} className="flex items-start gap-2.5">
                        <span
                          className={`mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full ${
                            issue.state === 'open' ? 'bg-green-500' : 'bg-purple-500'
                          }`}
                        />
                        <a
                          href={issue.url ?? `https://github.com/${repo}/issues/${issue.number}`}
                          target="_blank"
                          rel="noreferrer"
                          className="link-underline text-[15px] leading-7 text-foreground/85"
                        >
                          <span className="text-muted-foreground">#{issue.number}</span>{' '}
                          {issue.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}
      </article>
    </main>
  )
}

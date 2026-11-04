import { FileText, Github, Linkedin, Mail, Twitter } from 'lucide-react'
import { Link } from 'react-router'
import { cves, identity } from '../config'

export default function Hero() {
  return (
    <section id="top" className="pt-32 pb-14">
      <p className="font-mono-code text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {identity.role}
      </p>
      <h1 className="font-serif-display mt-4 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
        {identity.name}
      </h1>
      <p className="mt-6 max-w-[60ch] text-lg leading-8 text-foreground/80">{identity.tagline}</p>

      <ul aria-label="Career highlights" className="mt-8 grid grid-cols-3 gap-4 border-y border-border py-5">
        <li>
          <a href="#achievements" className="text-sm font-semibold link-underline">OpenSats Grantee</a>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">Red Team Fund</p>
        </li>
        <li>
          <a href="#achievements" className="text-sm font-semibold link-underline">{cves.length} CVEs</a>
          <ul className="mt-2 space-y-1 text-xs leading-5 text-muted-foreground">
            {cves.map((cve) => (
              <li key={cve.id}>
                <a href={cve.url} target="_blank" rel="noreferrer" aria-label={`${cve.project}: ${cve.id}`} className="link-underline">{cve.project}</a>
              </li>
            ))}
          </ul>
        </li>
        <li>
          <Link to="/gsoc-2026" className="text-sm font-semibold link-underline">GSoC 2026</Link>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">CCExtractor Development</p>
        </li>
      </ul>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
        <a href={`mailto:${identity.email}`} className="inline-flex items-center gap-2 link-underline">
          <Mail className="h-4 w-4" /> {identity.email}
        </a>
        <a
          href={identity.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 link-underline"
        >
          <Github className="h-4 w-4" /> GitHub
        </a>
        <a
          href={identity.linkedin}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 link-underline"
        >
          <Linkedin className="h-4 w-4" /> LinkedIn
        </a>
        <a
          href={identity.twitter}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 link-underline"
        >
          <Twitter className="h-4 w-4" /> X
        </a>
        <a
          href={identity.resumeUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 link-underline"
        >
          <FileText className="h-4 w-4" /> Resume
        </a>
      </div>
    </section>
  )
}

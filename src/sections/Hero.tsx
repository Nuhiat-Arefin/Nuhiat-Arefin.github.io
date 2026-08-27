import { FileText, Github, Linkedin, Mail, Twitter } from 'lucide-react'
import { identity } from '../config'

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

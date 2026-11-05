import { FileText, Github, Linkedin, Mail, Twitter } from 'lucide-react'
import { Section } from './Section'
import { identity } from '../config'

export default function Contact() {
  return (
    <Section id="contact" label="Contact">
      <h3 className="font-serif-display text-3xl font-semibold tracking-tight">
        Let's talk fuzzing.
      </h3>
      <p className="mt-4 max-w-[55ch] leading-7 text-foreground/80">
        Whether it's a bug bounty, a research collaboration, mentorship, or just a good crash
        story, my inbox is open.
      </p>
      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
        <a href={`mailto:${identity.email}`} className="inline-flex items-center gap-2 link-underline">
          <Mail className="h-4 w-4" /> {identity.email}
        </a>
        <a
          href={identity.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 link-underline"
        >
          <Github className="h-4 w-4" /> github.com/{identity.handle}
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

      <div id="sponsor" className="mt-10 scroll-mt-20" aria-labelledby="support-heading">
        <h4 id="support-heading" className="font-mono-code text-xs uppercase tracking-widest text-muted-foreground">
          Support my work
        </h4>
        <p className="mt-3 text-sm leading-7 text-foreground/80">
          <a
            href="bitcoin:bc1qdsp49d3lxhwgnv4nxzvv54w2mzvltvwxtm33j5"
            className="inline-flex max-w-full flex-wrap items-baseline gap-x-2 link-underline"
          >
            <span className="font-semibold text-foreground">Bitcoin</span>
            <span className="break-all font-mono-code text-xs sm:text-sm">
              bc1qdsp49d3lxhwgnv4nxzvv54w2mzvltvwxtm33j5
            </span>
          </a>
        </p>
      </div>

      <footer className="mt-16 border-t border-border pt-6 pb-2 text-xs text-muted-foreground">
        © {new Date().getFullYear()} {identity.name}
      </footer>
    </Section>
  )
}

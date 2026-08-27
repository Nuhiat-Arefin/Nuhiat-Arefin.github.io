import { useEffect, useState } from 'react'
import { identity } from '../config'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Research', href: '#research' },
  { label: 'Writing', href: '#writing' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-background/90 backdrop-blur transition-shadow ${
        scrolled ? 'border-border shadow-[0_1px_0_0_hsl(var(--border))]' : 'border-transparent'
      }`}
    >
      <div className="mx-auto flex h-14 max-w-[720px] items-center justify-between px-6">
        <a href="#top" className="font-serif-display text-lg font-bold tracking-tight">
          {identity.name}
        </a>
        <nav className="hidden items-center gap-5 sm:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

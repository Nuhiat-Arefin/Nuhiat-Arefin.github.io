import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
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
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 640px)')
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false)
    }
    desktop.addEventListener('change', closeOnDesktop)
    return () => desktop.removeEventListener('change', closeOnDesktop)
  }, [])

  return (
    <header
      onKeyDown={(event) => {
        if (event.key === 'Escape' && menuOpen) {
          setMenuOpen(false)
          menuButton.current?.focus()
        }
      }}
      className={`fixed inset-x-0 top-0 z-50 border-b bg-background/90 backdrop-blur transition-shadow ${
        scrolled ? 'border-border shadow-[0_1px_0_0_hsl(var(--border))]' : 'border-transparent'
      }`}
    >
      <div className="mx-auto flex h-14 max-w-[720px] items-center justify-between px-6">
        <a href="#top" onClick={() => setMenuOpen(false)} className="font-serif-display text-lg font-bold tracking-tight">
          {identity.name}
        </a>
        <nav aria-label="Main navigation" className="hidden items-center gap-5 sm:flex">
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
        <button
          ref={menuButton}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex min-h-11 items-center gap-2 rounded px-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:hidden"
        >
          {menuOpen ? <X aria-hidden="true" className="h-4 w-4" /> : <Menu aria-hidden="true" className="h-4 w-4" />}
          {menuOpen ? 'Close menu' : 'Menu'}
        </button>
      </div>
      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        hidden={!menuOpen}
        className="border-t border-border bg-background px-6 py-3 sm:hidden"
      >
        <div className="mx-auto grid max-w-[672px]">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded py-3 text-sm text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}

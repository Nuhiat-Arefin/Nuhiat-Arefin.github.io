import type { ReactNode } from 'react'

export function Section({
  id,
  label,
  children,
}: {
  id: string
  label: string
  children: ReactNode
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-20 border-t border-border py-14">
      <h2 id={`${id}-heading`} className="font-mono-code text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </h2>
      <div className="mt-8">{children}</div>
    </section>
  )
}

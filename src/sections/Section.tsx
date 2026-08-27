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
    <section id={id} className="border-t border-border py-14">
      <p className="font-mono-code text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </p>
      <div className="mt-8">{children}</div>
    </section>
  )
}

import { Section } from './Section'
import { skills } from '../config'

export default function Skills() {
  return (
    <Section id="skills" label="Technical Skills">
      <div className="space-y-6">
        {skills.map((g) => (
          <div key={g.name}>
            <p className="font-mono-code text-xs uppercase tracking-widest text-muted-foreground">
              {g.name}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-border px-3 py-1 text-sm text-foreground/80"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

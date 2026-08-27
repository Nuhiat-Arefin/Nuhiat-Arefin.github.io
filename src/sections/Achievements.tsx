import { Trophy } from 'lucide-react'
import { Section } from './Section'
import { achievements } from '../config'

export default function Achievements() {
  return (
    <Section id="achievements" label="Achievements">
      <ul className="space-y-6">
        {achievements.map((a) => (
          <li key={a.title} className="flex gap-4">
            <Trophy className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
            <div>
              <p className="font-medium">
                {a.title}
                <span className="ml-2 font-mono-code text-xs text-muted-foreground">{a.year}</span>
              </p>
              <p className="mt-1 text-sm leading-6 text-foreground/70">{a.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}

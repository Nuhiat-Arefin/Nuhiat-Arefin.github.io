import { Section } from './Section'
import { about, education } from '../config'

export default function About() {
  return (
    <Section id="about" label="About">
      <div className="prose-portfolio space-y-5">
        {about.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <div className="mt-10 space-y-5">
        {education.map((e) => (
          <div key={e.school} className="flex gap-4">
            <span className="text-xl leading-7">{e.icon}</span>
            <div>
              <p className="font-medium">{e.school}</p>
              <p className="text-sm text-muted-foreground">
                {e.degree}
                {e.note ? ` · ${e.note}` : ''} · {e.location}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

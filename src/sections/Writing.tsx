import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { Section } from './Section'
import { posts } from '../blog'

export default function Writing() {
  return (
    <Section id="writing" label="Writing">
      <div className="space-y-8">
        {posts.map((post) => (
          <Link key={post.slug} to={`/blog/${post.slug}`} className="group block">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono-code text-xs text-muted-foreground">
              {post.date && (
                <>
                  <span>{post.date}</span>
                  <span>·</span>
                </>
              )}
              <span>{post.readingTime}</span>
            </div>
            <h3 className="font-serif-display mt-2 text-2xl font-semibold leading-snug tracking-tight group-hover:underline group-hover:decoration-foreground/30 group-hover:underline-offset-4">
              {post.title}
            </h3>
            <p className="mt-2 leading-7 text-foreground/70">{post.subtitle}</p>
            <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium">
              Read post
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </Section>
  )
}

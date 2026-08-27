import { useEffect, type ReactNode } from 'react'
import { Link, useParams } from 'react-router'
import { ArrowLeft, Github, Linkedin, Mail } from 'lucide-react'
import { getPost, type PostBlock } from '../blog'
import { identity } from '../config'

function linkify(text: string): ReactNode {
  const re = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g
  const out: ReactNode[] = []
  let last = 0
  let m: RegExpExecArray | null
  let k = 0
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index))
    out.push(
      <a
        key={k++}
        href={m[2]}
        target="_blank"
        rel="noreferrer"
        className="text-foreground underline decoration-foreground/40 underline-offset-4 transition-colors hover:decoration-foreground"
      >
        {m[1]}
      </a>
    )
    last = m.index + m[0].length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

function Block({ block }: { block: PostBlock }) {
  switch (block.type) {
    case 'h2':
      return (
        <h2 className="font-serif-display mt-12 text-3xl font-semibold tracking-tight">
          {block.text}
        </h2>
      )
    case 'h3':
      return (
        <h3 className="font-serif-display mt-16 text-2xl font-semibold tracking-tight">
          {block.text}
        </h3>
      )
    case 'quote':
      return (
        <blockquote className="my-8 border-l-2 border-foreground pl-6 font-serif-display text-xl italic leading-9 text-foreground/90">
          {block.text}
        </blockquote>
      )
    case 'list':
      return (
        <ul className="my-6 list-disc space-y-3 pl-6 text-[18px] leading-8 text-foreground/85">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )
    case 'code':
      return (
        <pre className="my-6 overflow-x-auto rounded-md bg-secondary p-4 font-mono-code text-sm">
          {block.text}
        </pre>
      )
    case 'image':
      return (
        <figure className="my-12">
          <img
            src={block.src}
            alt={block.alt}
            loading="lazy"
            className="w-full rounded-md border border-border"
          />
          {block.caption && (
            <figcaption className="mt-3 text-center text-sm text-muted-foreground">
              {block.caption}
            </figcaption>
          )}
        </figure>
      )
    case 'pr-table':
      return (
        <div className="my-8 overflow-x-auto rounded-md border border-border">
          <table className="min-w-[620px] w-full table-fixed border-collapse text-left text-sm">
            <thead className="bg-secondary/60">
              <tr className="border-b border-border font-mono-code text-xs uppercase tracking-wider text-muted-foreground">
                <th className="w-[34%] px-4 py-3 font-medium">Pull request</th>
                <th className="w-[43%] px-4 py-3 font-medium">Title</th>
                <th className="w-[23%] px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={`${row.repo}-${row.number}`} className="border-b border-border/60 last:border-0">
                  <td className="px-4 py-3 align-top">
                    <div className="break-words text-foreground/70">{row.repo}</div>
                    <a
                      href={row.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 inline-block text-foreground underline decoration-foreground/40 underline-offset-4 transition-colors hover:decoration-foreground"
                    >
                      #{row.number}
                    </a>
                  </td>
                  <td className="break-words px-4 py-3 align-top text-foreground/85">{row.title}</td>
                  <td className="px-4 py-3 align-top whitespace-nowrap font-medium">{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    default:
      return <p className="my-6 text-[18px] leading-8 text-foreground/85">{linkify(block.text)}</p>
  }
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = slug ? getPost(slug) : undefined

  useEffect(() => {
    window.scrollTo(0, 0)
    if (post) document.title = `${post.title} · ${identity.name}`
    return () => {
      document.title = `${identity.name} · Security Researcher & Open-Source Contributor`
    }
  }, [post])

  if (!post) {
    return (
      <main className="mx-auto max-w-[680px] px-6 py-32">
        <p>Post not found.</p>
        <Link to="/" className="link-underline mt-4 inline-block">
          ← Back home
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-[680px] px-6 pb-24">
      <div className="pt-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to portfolio
        </Link>
      </div>

      <article className="pt-12">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono-code text-xs text-muted-foreground">
          {post.date && (
            <>
              <span>{post.date}</span>
              <span>·</span>
            </>
          )}
          <span>{post.readingTime}</span>
        </div>
        <h1 className="font-serif-display mt-4 text-4xl font-bold leading-[1.15] tracking-tight">
          {post.title}
        </h1>
        <p className="mt-4 text-xl leading-8 text-muted-foreground">{post.subtitle}</p>

        <div className="mt-6 flex items-center gap-3 border-y border-border py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary font-serif-display font-bold">
            {identity.name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-medium">{identity.name}</p>
            <p className="text-xs text-muted-foreground">{identity.role}</p>
          </div>
          <div className="ml-auto flex gap-3">
            <a href={`mailto:${identity.email}`} aria-label="Email">
              <Mail className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            </a>
            <a href={identity.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <Github className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            </a>
            <a href={identity.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            </a>
          </div>
        </div>

        <div className="mt-4">
          {post.blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      </article>
    </main>
  )
}

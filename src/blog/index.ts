import { gsocPost, type Post } from './gsoc2026'

export type { Post, PostBlock } from './gsoc2026'

/** All blog posts. Add future posts here and create their content file beside gsoc2026.ts. */
export const posts: Post[] = [gsocPost]

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}

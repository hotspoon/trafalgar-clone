// app/page.tsx

import Link from "next/link"
import groq from "groq"
import client from "~/client"

interface Post {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
}

const Index = async () => {
  const posts: Post[] = await client.fetch(groq`
    *[_type == "post" && publishedAt < now()] | order(publishedAt desc)
  `)

  return (
    <div>
      <h1>Welcome to a blog!</h1>
      {posts.length > 0 &&
        posts.map(
          ({ _id, title = "", slug, publishedAt = "" }) =>
            slug && ( // Check if slug exists before accessing its properties
              <li key={_id}>
                <Link href={`/post/${encodeURIComponent(slug.current)}`}>{title}</Link> (
                {new Date(publishedAt).toDateString()})
              </li>
            )
        )}
    </div>
  )
}

export default Index

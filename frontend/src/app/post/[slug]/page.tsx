// src/app/post/[slug]/page.tsx

import { Suspense } from "react"
import { notFound } from "next/navigation"
import groq from "groq"
import imageUrlBuilder from "@sanity/image-url"
import { PortableText } from "@portabletext/react"
import client from "~/client"
import Image from "next/image"

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  "name": author->name,
  "categories": categories[]->title,
  "authorImage": author->image,
  body
}`

function urlFor(source: any) {
  return imageUrlBuilder(client).image(source)
}

const ptComponents = {
  types: {
    image: ({ value }: { value: any }) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <img
          alt={value.alt || " "}
          loading="lazy"
          src={urlFor(value).width(320).height(240).fit("max").auto("format").url()}
        />
      )
    }
  }
}

async function getPost(slug: string) {
  const post = await client.fetch(query, { slug })

  if (!post) {
    notFound()
  }

  return post
}

export async function generateStaticParams() {
  const slugs = await client.fetch(groq`
    *[_type == "post" && defined(slug.current)][].slug.current
  `)

  return slugs.map((slug: string) => ({
    slug: slug
  }))
}

async function PostContent({ slug }: { slug: string }) {
  const post = await getPost(slug)

  const {
    title = "Missing title",
    name = "Missing name",
    categories,
    authorImage,
    body = []
  } = post

  return (
    <article>
      <h1>{title}</h1>
      <span>By {name}</span>
      {categories && (
        <ul>
          Posted in
          {categories.map((category: string) => (
            <li key={category}>{category}</li>
          ))}
        </ul>
      )}
      {authorImage && (
        <div>
          <img src={urlFor(authorImage).width(50).url()} alt={`${name}'s picture`} />
        </div>
      )}
      <PortableText value={body} components={ptComponents} />
      {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
    </article>
  )
}

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PostContent slug={params.slug} />
    </Suspense>
  )
}

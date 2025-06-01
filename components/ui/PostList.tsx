import { GetPostQueryResult } from '@/sanity.types'
import { getSiteSettings } from '@/sanity/lib/siteSettings/getSiteSettings'
import React from 'react'
import FilterByTierSelect from './FilterByTierSelect'
import { ClerkLoaded } from '@clerk/nextjs'
import Post from './Post'

async function PostList({ posts }: { posts: GetPostQueryResult }) {
  const siteSettings = await getSiteSettings()

  return (
    <section className='my-8 px-4'>
      <div className='mx-auto max-w-3xl'>
        <h2 className='text-2xl font-bold mb-8 text-center'>
          Recent Posts by {siteSettings?.data?.siteTitle}
        </h2>

        <div className='flex justify-center items-center mb-4'>
          <FilterByTierSelect />
        </div>

        <div className='grid grid-cols-1 gap-6'>
          <ClerkLoaded>
            {posts.map((post) => (
              <Post key={post._id} posts={post} />
            ))}
          </ClerkLoaded>
        </div>
      </div>
    </section>
  )
}

export default PostList

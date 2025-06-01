"use client"
import useMembershipTier from '@/hooks/useMembershipTier'
import { GetPostQueryResult } from '@/sanity.types'
import { TierAccess, tierMap } from '@/types/types';
import { useUser } from '@clerk/nextjs';
import React from 'react'
import LockedPost from './LockedPost';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import Badge from '../Badge/Badge';
import { PortableText } from "@portabletext/react"
import { MessageCircleIcon } from 'lucide-react';
//@ts-ignore
import TimeAgo from 'react-timeago';

function Post({posts}:{posts: GetPostQueryResult[number]}) {
    const membershipTier = useMembershipTier();
    const {user} = useUser()

    const postMembershipLevel = tierMap[posts.tierAccess as TierAccess];
    const isLocked = membershipTier && membershipTier < postMembershipLevel; 
    if(!membershipTier)
    return (
    <div className='bg-white rounded-lg shadow-lg relative animate-pulse'>
      {posts.coverImage && (
        <div className='relative aspect-[16/9] w-full overflow-hidden rounded-t-lg bg-gray-200'/>
      )}

      <div className='p-6'>
        <div className='flex items-center justify-between mb-4'>
          <div className='h-4 bg-gray-200 rounded w-1/4'>
          </div>
        </div>

        {!user &&(
          <div className='space-y-2 text-center my-8'>
            <p className='text-black'>Sign in to view this post</p>
          </div>
        )}

        <div className='space-y-2'>
          <div className='h-4 bg-gray-200 rounded w-full'></div>
          <div className='h-4 bg-gray-200 rounded w-5/6'></div>
          <div className='h-4 bg-gray-200 rounded w-4/6'></div>

        </div>

      </div>
    </div>
  );

  if(isLocked) return <LockedPost post={posts}/>

  return (
    <Link href={`/posts/${posts._id}`}>
        <article className='bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 group cursor-pointer relative'>
        {posts.coverImage?.asset && (
          <div className='relative aspect-[16/9] w-full flex overflow-hidden rounded-t-lg items-center justify-center'>
            <Image
              src={urlFor(posts.coverImage).url()}
              alt={posts.coverImage.alt || posts.title || 'Post Cover Image'}
              width={600}
              height={400}
              className='object-cover w-full h-full group-hover:scale-105 transition-all duration-300'/>
          </div>
        )}

        {posts.tierAccess && (
          <div className='absolute top-4 right-4'>
            <Badge tier={posts.tierAccess} variant={'simple'}/>
          </div>
        )}

          <div className='p-6'>
            <h2 className='text-xl font-semibold text-gray-900 mb-4 border border-gray-200 pb-2'>{posts.title}</h2>
            {posts.body && (
              <div className='text-gray-600 prose'>
                  <PortableText value={posts.body} />
              </div>
            )}
          </div>

          <div className='flex items-center justify-between p-4'>
            <div className='text-sm text-gray-500 text-right border border-gray-200 rounded-full px-4 py-1 flex items-center gap-2'>
              <MessageCircleIcon className='h-4 w-4' />
              {posts.comments?.length} Comments
            </div>

            <div className='text-right text-sm text-gray-500'>
              <TimeAgo date={posts._createdAt} />

            </div>


          </div>
        </article>
    </Link>
  )
}

export default Post
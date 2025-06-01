import { getSocialIcon, SocialMediaPlatform } from '@/lib/socialToIcon';
import { urlFor } from '@/sanity/lib/image';
import { getSiteSettings } from '@/sanity/lib/siteSettings/getSiteSettings'
import Image from 'next/image';
import React from 'react'
import MemberButton from './MemberButton';
import {getPosts} from '@/sanity/lib/post/getPosts';

async function InformationPanel() {
    const siteSettings = await getSiteSettings();
    const posts = await getPosts();
    {console.log(posts.length)}
  return (
    <div className='flex flex-col items-center justify-center max-w-2xl mx-auto py-4 px-4 space-y-2'>
        {/* {Logo} */}
        {siteSettings?.data?.logo && (    
            <Image
            src={urlFor(siteSettings?.data?.logo).url()}
            alt="logo"
            width={175}
            height={175}
            className='rounded-lg z-50'
            />
            )}

        {/* {Title} */}
        <h1 className='text-4xl font-bold text-center mt-4'>
            {siteSettings?.data?.siteTitle || "Default Title"}
        </h1>

        {/* {Description} */}
        <p className='text-sm text-center text-gray-600'>
            {siteSettings?.data?.description || "Default description for the site."}
            </p>

            {/* {Stats} */}

            <div className='flex items-center justify-center space-x-4'>
                <div className='text-center'>
                    <p className='text-2xl font-bold'>{posts.length}</p>

                    <p className=' text-gray-600'>Posts</p>
                </div>
            </div>

        {/* {Member Button} */}
            <MemberButton/>

            {/* {Social Links} */}
          <div className="flex items-center justify-center space-x-4">
                {siteSettings?.data?.socialMediaLinks?.map((socialMediaLink) => {
                const Icon = getSocialIcon(socialMediaLink.platform as SocialMediaPlatform);
                return (
                <a
                href={socialMediaLink.url}
                key={socialMediaLink.platform}
                >
                <Icon className=" text-black " />
                </a>
                    );
                })}
            </div>
        </div>
  )
}

export default InformationPanel
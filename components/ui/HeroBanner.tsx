import { urlFor } from '@/sanity/lib/image';
import { getSiteSettings } from '@/sanity/lib/siteSettings/getSiteSettings'
import Image from 'next/image';
import React from 'react'

async function HeroBanner() {
  const siteSettings = await getSiteSettings();

  return (
    <div className='relative w-full h-[30vh] xl:h-[40vh]'>
      {siteSettings?.data?.mainHeroImage && (
        <>
          <Image
            src={urlFor(siteSettings?.data?.mainHeroImage).url()}
            alt='Hero Image'
            fill
            className='object-cover w-full'
            priority
          />
          <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black/50 pointer-events-none' />
        </>
      )}
    </div>
  );
}

export default HeroBanner;

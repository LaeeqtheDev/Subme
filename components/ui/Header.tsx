import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { Button } from "./button"
import {HeartIcon} from "lucide-react"
import { getSiteSettings } from "@/sanity/lib/siteSettings/getSiteSettings"
import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"
import CurrentTierBadge from "../Badge/CurrentTierBadge"



async function Header() {
  const siteSettings = await getSiteSettings()
  console.log(siteSettings, "siteSettings")
  console.log("siteSettings", siteSettings)
  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-200">
      {/*Left Side */}
        <div>
          <Link href={"/"}>
            {siteSettings?.data?.headerLogo ?(
              <Image
              src={urlFor(siteSettings?.data?.headerLogo).url()}
              alt={siteSettings?.data?.siteTitle || "Logo"}
              width={100}
              height={100}
              className="w-10 h-10 object-cover rounded-full aspect-square"
              />  
            ):(
              <h2>{siteSettings?.data?.siteTitle}</h2>
            ) }

          </Link>
        </div>
       {/*Right Side */}
       <div>
        <SignedIn>
          <div className="flex items-center gap-2 hover:gap-4 px-2 py-2 hover:px-4 hover:bg-orange-100 transition-all duration-200 border border-orange-200 rounded-full">
          {/* <CurrentTierBadge /> */}
          <CurrentTierBadge/>
          <UserButton />
          </div>
        </SignedIn>

        <SignedOut>
          <Button asChild variant="outline" className="bg-orange-400 hover:bg-orange-500 hover:text-white text-white rounded-lg">
          <div>
          <SignInButton mode="modal"/>
          <HeartIcon className="w-4 h-4" />
          </div>
          </Button>
        </SignedOut>
       </div>
    </header>
  )
}

export default Header
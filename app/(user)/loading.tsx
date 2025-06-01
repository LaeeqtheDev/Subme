import { getSiteSettings } from "@/sanity/lib/siteSettings/getSiteSettings";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

async function Loading(){
    const siteSettings = await getSiteSettings();
    return(
        <div className="flex h-[calc(100vh-84px)] w-screen items-center justify-center">
            {siteSettings?.data?.headerLogo  && (
                <Image 
                    src={urlFor(siteSettings?.data.headerLogo).url()} 
                    alt={siteSettings?.data.siteTitle || ""} 
                    width={100} 
                    height={100} 
                    className="h-32 w-32 rounded-full animate-pulse"
                />

            )}

        </div>
    )
            }
    export default Loading
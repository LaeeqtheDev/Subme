import { GetPostQueryResult } from "@/sanity.types"
import Link from "next/link"
import { Lock, MessageCircleIcon } from "lucide-react"
import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"
import TierBadge from "./TierBadge"
import CreatedAt from "./CreatedAt"
//@ts-ignore
function LockedPost({ post }: { post: GetPostQueryResult[number] }) {
  return (
    <Link href="/pricing">
      <article className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 group cursor-pointer relative`}>

      
      {post.coverImage && (
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-lg flex">
          {/* Lock overlay */}
          <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center">
            <Lock className="w-12 h-12 text-white" />
          </div>

          {/* Tier Badge on image */}
          {post.tierAccess && (
            <div className="absolute top-4 right-4 z-20">
              <TierBadge tierAccess={post.tierAccess} />
            </div>
          )}

          {/* Cover Image */}
          <Image
            src={urlFor(post.coverImage).url()}
            alt={post.coverImage.alt || post.title || "Post cover Image"}
            fill
            className="object-cover w-full h-full blur-sm"
          />
        </div>
      )}

      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {post.title}
        </h2>

        <div className="relative">
          {/* Lock pattern background */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-6 gap-4">
              {Array(18).fill(0).map((_, i) => (
                <Lock key={i} className="w-4 h-4 text-gray-400" />
              ))}
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white z-10" />

          <div className="blur-[6px] text-gray-600 prose opacity-75 relative z-20">
            {post.body && (
              <div className="h-fit w-full overflow-hidden flex justify-center items-center">
                {/* Truncated preview text */}
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam magni a facilis sapiente quis, veniam iure error fugiat maiores modi in culpa recusandae explicabo nisi voluptas illo soluta amet? Cum?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci reprehenderit voluptates impedit vero ea, totam cum praesentium, delectus vitae velit incidunt maiores id non fugiat? Ipsa dignissimos debitis repellendus accusamus.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates perspiciatis et dolorum earum commodi optio ab ratione reiciendis, dolorem nihil quasi fugiat sequi eius pariatur ut neque odit voluptate quo.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, accusantium quis, ipsa vitae porro eius quas, placeat architecto ut veritatis delectus velit cupiditate. Iste, vel eveniet facere natus animi fugit?l
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui in pariatur iusto. Enim quos ea, dolores optio veritatis velit, quasi temporibus ipsa minus maiores ratione, accusantium voluptatibus. Cumque, iusto quas!
              </div>
            )}
          </div>

          <div className="absolute inset-0 items-center justify-center z-30 flex">
            <div className="bg-orange-400 text-white px-6 py-2 rounded-full font-medium hover:bg-orange-500 transition-colors duration-200 flex items-center space-x-2 shadow-lg gap-2 text-center w-1/2 justify-center">
              <Lock className="w-4 h-4" />
              Unlock Premium Content
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex text-sm text-gray-500 border border-gray-200 rounded-full px-4 py-1 items-center gap-2">
            <MessageCircleIcon className="w-4 h-4 text-gray-600" />
            {post.comments?.length} Comments
          </div>
          <div className="text-sm text-gray-500 text-right">
            <CreatedAt date={post._createdAt}/>

          </div>
        </div>
      </div>
      </article>
    </Link>
  )
}

export default LockedPost

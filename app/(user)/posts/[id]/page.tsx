import Badge from "@/components/Badge/Badge";
import Comments from "@/components/ui/Comments";
import CreatedAt from "@/components/ui/CreatedAt";
import { urlFor } from "@/sanity/lib/image";
import { getPost } from "@/sanity/lib/post/getPost";
import posts from "@/sanity/schemaTypes/posts";
import { PortableText } from "@portabletext/react";
import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";


async function PostPage({params}: { params: { id: string } }) {
    const { id } =   params;
    const post = await getPost(id)

    if(!post)  return notFound()
    
  return (
    <main className="min-h-screen bg-white">
        {post.coverImage?.asset && (
            <div className="relative h-[50vh] w-full bg-gray-100">
                <div className="absolute inset-0 overflow-hidden">
                    <Image src={urlFor(post.coverImage).url()} 
                    alt={post.coverImage?.alt || "Post Cover Image"}
                    fill 
                    className="object-cover blur-md scale-105 brightness-90" 
                    priority
                    />
                </div>


                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full max-w-3xl h-full max-h-[400px] mx-4">
                        <Image 
                            src={urlFor(post.coverImage).url()} 
                            alt={post.coverImage?.alt || "Post Cover Image"}
                            fill 
                            className="object-contain"
                            priority/>

                    </div>
                </div>
            </div>
        )}

        <div className="max-w-3xl mx-auto px-4 py-12">
            <Link href="/" className="text-sm text-gray-500 flex gap-2 items-center mb-6">
                <ArrowLeftIcon className="w-4 h-4" />
                Return to Posts
            </Link>

            {post.tierAccess && (
                <div className=" relative mb-6 p-4 flex justify-between items-center border border-gray-100 rounded-lg">
                    <Badge tier={post.tierAccess} className="text-sm" variant={"simple"} />
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <p className="font-medium">Posted:</p>
                        <CreatedAt date={post._createdAt}  />
                    </div>
                </div>
            )}

            <div className="space-y-8">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900">{post.title}</h1>
                {post.body &&(
                    <div className="prose prose-lg max-w-none prose-headings:font-semibold prose-a:text-orange-600">
                            <PortableText value={post.body}/>
                    </div>
                )}
            </div>
        </div>
        <hr/>

        <div className="max-w-3xl mx-auto px-4 py-12">
        <Comments post={post} />


        </div>
    </main>
  )
}

export default PostPage

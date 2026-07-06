import HeroBanner from "@/components/ui/HeroBanner";
import InformationPanel from "@/components/ui/InformationPanel";
import PostList from "@/components/ui/PostList";
import { getPosts } from "@/sanity/lib/post/getPosts";


export default async function Feed({searchParams,}: {searchParams:Promise<{tier: string}>}) {
  const {tier} = await searchParams;
  const posts = await getPosts(tier);
  return (
    <div className="bg-gradient-to-t from-orange-200 to-white">
      {/*Hero Banner */}
      <HeroBanner/>

       {/*Information Panel */}
       <div className="-mt-20">
       <InformationPanel/>
       </div>

         {/*Post List */}
         <PostList posts={posts} />
    </div>
  );
}

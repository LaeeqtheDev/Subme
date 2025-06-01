import HeroBanner from "@/components/ui/HeroBanner";
import InformationPanel from "@/components/ui/InformationPanel";
import PostList from "@/components/ui/PostList";
import { getPosts } from "@/sanity/lib/post/getPosts";


export default async function Home({searchParams,}: {searchParams:Promise<{tier: string}>}) {
  const {tier} = await searchParams;
  const posts = await getPosts();
  return (
    <div className="bg-gradient-to-t from-orange-200 to-white h-screen">
      {/*Hero Banner */}
      <HeroBanner/>


       {/*Information Panel */}
       <div className="-mt-20">
       <InformationPanel/>
       </div>



        {/*Hr */}



         {/*Post List */}
         <PostList posts={posts} />
    </div>
  );
}

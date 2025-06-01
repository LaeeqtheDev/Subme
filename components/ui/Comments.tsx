"use client"

import useMembershipTier from "@/hooks/useMembershipTier";
import { GetPostQueryResult } from "@/sanity.types"
import { tierMap } from "@/types/types";
import { useUser } from "@clerk/nextjs";
import { useState, useTransition } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Textarea } from "./textarea";
import { Button } from "./button";
import { Loader2, Send } from "lucide-react";
import addComment from "@/actions/addComment";
import TimeAgo from "react-timeago";
import posts from "@/sanity/schemaTypes/posts";



function Comments({post}: {post: GetPostQueryResult}) {
    const [comment, setComment]= useState("");
    const membershipTier = useMembershipTier();
    const {user} = useUser();
    const [isCommenting, startTransition]= useTransition()
    const hasCommentFeature= membershipTier && membershipTier>= tierMap.crew

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

        if(!post || !hasCommentFeature) return

        startTransition(async() => {
            const id = post._id;
            const text = comment;

            try{
                setComment("");
                await addComment(id,text)
            } catch(error) {
                console.error("Error adding comment:", error);
                setComment(text)
            }
        })
    }

  return (
    <div className="space-y-6">
        {/* Comment INput box */}
        <form onSubmit={handleSubmit} className="mt-6">
        <div className="flex items-start gap-4 bg-white rounded-lg p-2 md:p-6">
            <Avatar>
            <AvatarImage src={user?.imageUrl || ""} alt={user?.fullName || "User Avatar"} />
            <AvatarFallback className="text-lg font-medium">
                {user?.firstName?.charAt(0)}
                {user?.lastName?.charAt(0)}
                </AvatarFallback>
            </Avatar>

            <div className="flex-1">
            <Textarea
            disabled={!user || isCommenting || !hasCommentFeature}
            placeholder={
                isCommenting
                  ? "Adding comment..."
                  : hasCommentFeature
                  ? "Write a comment..."
                  : "Upgrade membership to comment"
              }
            value={comment}
            onKeyDown={(e) => {
                if(
                e.key === "Enter" &&
                !e.shiftKey &&
                !e.altKey &&
                !e.metaKey 
                ) {
                    handleSubmit(
                        e as unknown as React.FormEvent<HTMLFormElement>
                    )
                }
            }}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-3 py-2 border rounded-md bg-white text-black placeholder-orange-300 
            focus:outline-none 
            focus:!ring-2 focus:!ring-orange-300 
            focus:!border-orange-400 
            focus:!shadow-[0_0_10px_rgba(255,115,0,0.8)] 
            transition-all duration-200 min-h-[80px]
            border-orange-300"
          />
            <div className="flex justify-end mt-2">
                <Button type="submit"
                disabled={!user || isCommenting || !hasCommentFeature}
                className="ml-auto">
                    {isCommenting? (
                        <Loader2 className="h-5 w-5 animate-spin"/>
                    ):(
                        <Send className="h-5 w-5" />
                    )}
                </Button>

            </div>
        </div>

        </div>
        </form>

        {/* Comments List */}   
        <div className="space-y-4">

{post?.comments.length === 0 && (
    <p className="text-center text-gray-500">No comments yet Be the first to share your thought!</p>
)}

  {post?.comments?.map((comment) => (
    <div key={comment._id} className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
      {/* Render comment content here */}
      <Avatar>
        <AvatarImage src={comment.userImageUrl || ""} />
        <AvatarFallback>
            {comment.name?.charAt(0)}
            {comment.name?.charAt(0)}
        </AvatarFallback>
      </Avatar>
    y<div className="flex-1">
        <div className="flex items-baseline gap-2">
            <h4 className="font-medium text-gray-900">{comment.name}</h4>
        {comment._createdAt && (
            <span className="text-xs text-gray-500">
                <TimeAgo date={comment._createdAt} />
            </span>
        )}
        </div>

    </div>
    </div>
  ))}
</div>
        </div>
  )
}

export default Comments
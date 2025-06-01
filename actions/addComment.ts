'use server'

import { adminClient } from "@/sanity/lib/adminClient";
import { currentUser } from "@clerk/nextjs/server";

async function addComment(postId: string, comment: string) {
    console.log("[addComment] called with postId:", postId, "and comment:", comment);

    const user = await currentUser();
    if(!user) {
        console.error("[addComment] User not found");
        throw new Error("User not found");
    }

    console.log("[addComment] Current user:", {
      id: user.id,
      firstName: user.firstName,
      email: user.emailAddresses[0]?.emailAddress,
    });

    try {
        // Add comment to Sanity
        const createdComment = await adminClient.create({
            _type: "comment",
            posts: { _type: "reference", _ref: postId }, // note field name: posts (plural)
            name: user.firstName,
            userImageUrl: user.imageUrl || "",
            email: user.emailAddresses[0]?.emailAddress || "",
            comment,
        });

        console.log("[addComment] Comment created successfully with ID:", createdComment._id);

        return {success: true, message: "Comment added successfully"};
        
    } catch (error) {
        console.error("[addComment] Error creating comment:", error);
        if(error instanceof Error) {
            return {success: false, error: error.message};
        }
        return {success: false, error: "An unknown error occurred"};
    }
}

export default addComment;

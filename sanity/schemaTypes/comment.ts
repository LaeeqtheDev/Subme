import { defineField, defineType } from "sanity";
import {MessageSquareIcon} from "lucide-react"

export default defineType({
  name: "comment",
    title: "Comment",
    type: "document",
    icon: MessageSquareIcon,
    description: "Comments on posts, can be restricted by tier access level.",
    preview:{
        select:{
            name: "name",
            comment: "comment",
            post: "post.title",
        },
        prepare({name, comment, post}) {
            return {
                title: post,
                subtitle:`${name}: ${comment}`
            };
        }
    },
    fields: [
        defineField({
            name: "post",
            title: "Post",
            type: "reference",
            to: [{type: "posts"}],
            validation: (Rule) => Rule.required().error("Please select a post for this comment."),
        }),
    defineField({
        name: "name",
        title: "Name",
        type: "string",
        description: "The name of the commenter.",
        validation: (Rule) => Rule.required().error("Please enter your name."),
    }),
    defineField({
        name: "userImageUrl",
        title: "User Image (URL)",
        type: "string",
        validation: (Rule) => Rule.required(),
        
    }),
    defineField({
        name: "email",
        title: "Email",
        type: "string",
        validation: (Rule) => Rule.email().required(),
    }),
    defineField({
        name: "comment",
        title: "Comment",
        type: "text",
        description: "The content of the comment.",
        validation: (Rule) => Rule.required().min(1).max(500).error("Please enter a comment between 1 and 500 characters."),
    }),
    ]
})
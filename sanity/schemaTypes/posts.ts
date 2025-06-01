import { defineField, defineType } from "sanity";
import {FileTextIcon} from "lucide-react"


export default defineType({
  name: "posts",
  title: "Posts",
  type: "document",
  icon: FileTextIcon,
  description: "Content posts that can be restricted by tier access level.",
  preview:{
    select:{
        title: "title",
        tierAccess: "tierAccess",
        media: "coverImage",
    },
    prepare({title, tierAccess, media}) {
      return {
        title,
        subtitle: `Access ${tierAccess || "None"}`,
        media,
      };
    }
  },
  fields:[
    defineField({
        name: "title",
        title: "Title",
        type: "string",
        description: "The title of the post.",
        validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: "body",
        title: "Body",
        type: "array",
        description: "The content of the post.",
        of: [{
            type: "block"
        }],
        validation: (Rule) => Rule.required(),
    }),
    defineField({
        name:"tierAccess",
        title: "Tier Access",
        type: "string",
        description: "The membership tier required to access this post.",
        options: {
            list: [
                {title: "Lvl 1 Backstage", value: "backstage"},
                {title: "Lvl 2 Crew", value: "crew"},
                {title: "Lvl 3 VIP", value: "vip"}
            ],
       
        },
        validation: (Rule) => Rule.required().error("Please select a tier access level for this post."),      
    }),

    defineField({
        name: "coverImage",
        title: "Cover Image",
        type: "image",
        description: "The cover image for the post.",
        fields:[
            {
                name: "alt",
                type: "string",
                description: "Alternative text for the image.",
            }
        ]
    })

  ]
  
});
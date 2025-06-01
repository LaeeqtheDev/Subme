import { defineField, defineType, defineArrayMember } from "sanity";
import { SettingsIcon } from "lucide-react";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: SettingsIcon,
  preview: {
    select: {
      title: "siteTitle",
    },
    prepare({ title }) {
      return {
        title,
        media: SettingsIcon,
      };
    }
  },
  fields: [
    defineField({
      name: "siteTitle",
      title: "Site Title",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "The name of the Creator",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
      description: "A short description of your creator page and what you offer.",
    }),
    defineField({
      name: "headerLogo",
      title: "Header Logo",
      type: "image",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt text",
          description: "Important for SEO and accessibility",
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainHeroImage",
      title: "Main Hero Image",
      type: "image",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt text",
          description: "Important for SEO and accessibility",
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Site Logo",
      type: "image",
      description: "This logo will be used in the header and footer.",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt text",
          description: "Important for SEO and accessibility",
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "socialMediaLinks",
      title: "Social Media Links",
      type: "array",
      description: "Links to your social media profiles.",
      of: [
        defineArrayMember({
          type: "object",
          name: "socialMediaLink",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              description: "Name of the social media platform (e.g., Twitter, Instagram).",
              options: {
                list: [
                  { title: "Twitter", value: "twitter" },
                  { title: "Instagram", value: "instagram" },
                  { title: "Facebook", value: "facebook" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "YouTube", value: "youtube" },
                  { title: "TikTok", value: "tiktok" },
                  { title: "Pinterest", value: "pinterest" },
                  { title: "Snapchat", value: "snapchat" },
                  { title: "Discord", value: "discord" },
                  { title: "GitHub", value: "github" },
                  { title: "Reddit", value: "reddit" },
                  { title: "Tumblr", value: "tumblr" },
                  { title: "Medium", value: "medium" },
                  { title: "WhatsApp", value: "whatsapp" },
                  { title: "Telegram", value: "telegram" },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              description: "The full URL to your social media profile.",
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "callToActionText",
      title: "Call to Action Text",
      type: "string",
      description: "The main CTA text shown to visitors.",
    }),
  ],
  
});

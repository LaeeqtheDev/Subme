import { defineField, defineType } from "sanity";
import { UserIcon } from "lucide-react";

export default defineType({
  name: "creator",
  title: "Creator",
  type: "document",
  icon: UserIcon,
  preview: {
    select: {
      title: "name",
      media: "profileImage",
    },
  },
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "The creator's display name.",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required().max(160),
      description: "A short one or two line description shown on the landing page.",
    }),
    defineField({
      name: "profileImage",
      title: "Profile Image",
      type: "image",
      options: { hotspot: true },
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
      name: "bannerImage",
      title: "Banner Image",
      type: "image",
      options: { hotspot: true },
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
      name: "featuredOrder",
      title: "Featured Order",
      type: "number",
      description:
        "Controls display order on the landing page (lower numbers show first). Only the first 5 creators (by this order, then newest first) are shown.",
    }),
  ],
});

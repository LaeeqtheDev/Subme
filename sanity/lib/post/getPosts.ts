import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

const getPostsQuery = defineQuery(`*[_type == "posts"] | order(_createdAt desc) {
  ...,
  "comments": *[_type == "comment" && post._ref == ^._id] | order(_createdAt desc)
}`);

const getPostQueryWithTier = defineQuery(`*[_type == "posts" && tierAccess == $tier] | order(_createdAt desc) {
  ...,
  "comments": *[_type == "comment" && post._ref == ^._id] | order(_createdAt desc)
}`);

export async function getPosts(tier?: string) {
  if (tier) {
    const { data } = await sanityFetch({
      query: getPostQueryWithTier,
      params: { tier },
    });
    return data;
  }

  const { data } = await sanityFetch({
    query: getPostsQuery,
  });
  return data;
}

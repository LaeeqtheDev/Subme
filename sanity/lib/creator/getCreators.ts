import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

const getCreatorsQuery = defineQuery(`
  *[_type == "creator"] | order(featuredOrder asc, _createdAt desc) [0...5] {
    ...,
    profileImage{
      ...,
      asset->{ _id, url }
    },
    bannerImage{
      ...,
      asset->{ _id, url }
    },
  }
`);

export async function getCreators() {
  const { data } = await sanityFetch({
    query: getCreatorsQuery,
  });
  return data;
}

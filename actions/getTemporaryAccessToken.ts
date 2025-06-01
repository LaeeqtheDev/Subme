"use server";

import { currentUser } from "@clerk/nextjs/server";
import { SchematicClient } from "@schematichq/schematic-typescript-node";

const apiKey = process.env.SCHEMATIC_API_KEY;
const client = new SchematicClient({ apiKey });

export async function getTemporaryAccessToken() {
  const user = await currentUser();
  if (!user) {
    console.log("User not found");
    return null;
  }

  const response = await client.accesstokens.issueTemporaryAccessToken({
    resourceType: "company",
    lookup: { id: user.id },
  });

  console.log(
    "Token Response received ",
    response.data ? "token received" : "No token received"
  );

  return response.data.token;
}

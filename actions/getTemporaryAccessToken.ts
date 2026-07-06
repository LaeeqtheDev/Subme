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

  try {
    const response = await client.accesstokens.issueTemporaryAccessToken({
      lookup: { id: user.id },
    });

    if (!response?.data?.token) {
      // This can happen right after a fresh sign-in: Schematic's identify()
      // call (which registers this Clerk user as a known company/user in
      // Schematic) only runs client-side, in a useEffect - so this server
      // action can fire before that identify() call has ever completed,
      // meaning Schematic has no record of this user's lookup id yet.
      console.error(
        "Schematic returned no token for user",
        user.id,
        "- raw response:",
        JSON.stringify(response)
      );
      return null;
    }

    return response.data.token;
  } catch (error) {
    console.error("Failed to fetch Schematic access token:", error);
    return null;
  }
}

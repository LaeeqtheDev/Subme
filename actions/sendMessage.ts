"use server"

import {client} from "@/lib/schematic";
import { adminClient } from "@/sanity/lib/adminClient";
import { currentUser } from "@clerk/nextjs/server"

export async function sendMessage(message:string) {
    const user = await currentUser()
    if (!user) {
        throw new Error("User not authenticated");
    }


    try {
        const entitlements = await client.entitlements.getFeatureUsageByCompany({
            keys:{
                id: user.id,
            }
        })

        const feature = entitlements.data.features.find(
            (entitlement) => entitlement.feature?.eventSubtype === "send-dm"
        );

        const dmUsage = feature?.usage || 0;
        const dmAllocation = feature?.allocation || 0;

        if(dmUsage >= dmAllocation){
            throw new Error("You have exceeded your message sending limit. Please upgrade your plan to continue sending messages.");
        }

        if(!feature){
            throw new Error("User is not a VIP");
        }

        const newMessage = await adminClient.create({
            _type: "message",
            senderName: user.fullName,
            senderEmail: user.emailAddresses[0]?.emailAddress || "",
            messageBody: message,
        })

        await client.track({
            event: "send-dm",
            company: {
                id: user.id,
            },
            user: {
                id: user.id,
            },
        });

        const updateDmUsage = dmUsage + 1;

        return{
            success: true,
            message: newMessage,
            usage: updateDmUsage,
            allocation: dmAllocation,
        }

    } catch (error) {
        console.log("Error sending message:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
        }
    }
    
}
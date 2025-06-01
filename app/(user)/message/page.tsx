"use client";

import useMembershipTier from "@/hooks/useMembershipTier";
import { getTierFromLevel } from "@/types/types";
import { useUser } from "@clerk/nextjs";
import { useSchematicEntitlement, useSchematicIsPending } from "@schematichq/schematic-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";


// or wherever it's defined
import { Loader, Loader2, LockIcon, MessageCircleIcon, SendIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { sendMessage } from "@/actions/sendMessage";

function MessagePage() {
  const { user, isLoaded } = useUser();
  const membershipTier = useMembershipTier();
  const [message, setMessage] = useState("");
  const [isSending, startTransition] = useTransition();
  const schematicIsPending = useSchematicIsPending();
  const { featureUsageExceeded } = useSchematicEntitlement("send-message");

  const tier = membershipTier ? getTierFromLevel(membershipTier) : null;
  const isVip = tier === "vip";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      (async () => {
        try {
          const toastId = toast.loading("Sending message...");
          const result = await sendMessage(message);

          if (result?.success) {
            setMessage("");
            const { usage, allocation } = result;
            toast.success(`Message sent! Usage: ${usage}, Allocation: ${allocation} used`, {
              id: toastId,
            });
          } else {
            toast.error(`Failed to send message: ${result?.error || "Unknown error"}`, {
              id: toastId,
            });
          }
        } catch (error) {
          console.error("Error sending message:", error);
          toast.error("Unexpected error occurred while sending message.");
        }
      });
    });
  };

  if(!isLoaded || !membershipTier){
    return(
        <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-t from-gray-50 to-white flex items-center justify-center">
            <Loader2 className="animate-spin h-8 w-8 text-orange-500" />
        </div>
    )
  }


  if(!user){
    return(
        <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-t from-gray-50 to-white flex items-center justify-center">
            <h1 className="text-2xl font-bold mb-2">Please Sign In</h1>
            <p className="text-gray-600 mb-4">You need to be signed in to access this feature</p>
        </div>
    )
  }

  if(!isVip) {
    return(
        <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-t from-gray-50 to-white flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="mb-6 bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <LockIcon className="h-8 w-8 text-gray-500" />

            </div>
            <h1 className="text-2xl font-bold mb-2">VIP Acess Required</h1>
            <p className="text-gray-600 mb-6">
                Direct Messaging to the creator is premium feature available only to VIP members.
            </p>

            <Button asChild
            className="w-full bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700"
            >
            <Link href="/pricing">Upgrade to Vip</Link>
            </Button>
        </div>
        </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-t from-gray-50 to-white">
        <div className="min-w-4xl mx-auto px-4 py-12">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* header */}
                <div className="o-6 sm:p-8 bg-gradient-to-r from-orange-500 to-purple-600">
                <div className="flex items-center gap-3 text-white mb-2">
                    <MessageCircleIcon className="h-6 w-6" />
                    <h1 className="text-2xl font-bold">Direct Message to Creator</h1>
                </div>
                <p className="text-orange-100">
                    As a vip member you can send direct messages to the content creator. The creator may choose to respond via your email address
                </p>
                </div>

                    {/* Form */}
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="message">
                            Message
                        </label>

                        <Textarea
                        id="message"
                        value={message}
                        disabled={isSending || featureUsageExceeded}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if(
                                e.key === "Enter" &&
                                !e.shiftKey &&
                                !e.ctrlKey &&
                                !e.metaKey &&
                                !e.altKey
                            ){
                                if(featureUsageExceeded){
                                    toast.error("You have exceeded your message limit for this month.");
                                    return;
                                }
                                e.preventDefault();
                                handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
                            }
                        }}
                        placeholder="Type your message here..."
                        className="w-full min-h-[150px]"
                        required
                        />
                    </div>

                    <div className="pt-4">
                        <Button
                        type="submit"
                        disabled={isSending || schematicIsPending || featureUsageExceeded}  
                        className="w-full bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 sm:w-auto" 
                        >
                            {isSending ?(
                                <>Sending</>
                            ) : featureUsageExceeded ? (
                                <>
                                You have exceeded your message limit for this month.
                                </>
                            ):(
                                <>
                                Send Message
                                <SendIcon className="ms-2 h-4 w-4" />
                                </>
                            )
                        }
                        </Button>

                    </div>
                </form>

            </div>
        </div>
    </div>
  );
}

export default MessagePage;

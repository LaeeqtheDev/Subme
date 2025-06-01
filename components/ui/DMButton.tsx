"use client";

import useMembershipTier from "@/hooks/useMembershipTier";
import { getTierFromLevel } from "@/types/types";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "./button";
import Link from "next/link";
import { LockIcon, MessageCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

function DMButton() {
  const { user } = useUser();
  const membershipTier = useMembershipTier();
  const pathname = usePathname();

   if (pathname.includes("/message")) return null;

  if (!user || !membershipTier) return null;

  const tier = getTierFromLevel(membershipTier);


  if (tier === "vip") {
    return (
      <Button
        asChild
        className="flex items-center gap-2 transition-all hover:bg-primary/90"
      >
        <Link href="/message">
          <MessageCircle className="h-4 w-4" />
          <span>Send Message to Creator</span>
        </Link>
      </Button>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex bg-gray-300 px-4 py-2 rounded-md items-center gap-2 border-dashed cursor-not-allowed opacity-70">
            <LockIcon className="h-4 w-4" />
            <span>Send a message to Creator</span>
          </div>
        </TooltipTrigger>

        <TooltipContent>
          <p className="text-sm mb-2">Upgrade to VIP to message the creator</p>
          <Button asChild size="sm" className="w-full text-xs" variant={"secondary"}>
            <Link href={"/pricing"}>Upgrade Now</Link>
          </Button>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default DMButton;

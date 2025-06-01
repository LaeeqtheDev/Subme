"use client"

import { MembershipLevel } from "@/types/types"
import { useSchematicFlag } from "@schematichq/schematic-react";
import { useRouter } from "next/navigation"
import { useEffect } from "react";


interface PlanChangeDetail {
    planId?: string;
    tier?: string;
    status?: string;
}

interface PlanChangedEvent extends CustomEvent {
    detail: PlanChangeDetail;
}

function useMembershipTier(): MembershipLevel | null {
 const router= useRouter();
 const hasBackstageContent = useSchematicFlag("back-stage-content");
 const hasCrewContent = useSchematicFlag("crew-member-content");
 const hasVipContent = useSchematicFlag("vip-access-content");
 

    useEffect(() => {
        //listen for plan-changed events
        const handlePlanChange = (event: PlanChangedEvent) => {
            console.log("Plan changed", event.detail)
            router.refresh()
        }

        window.addEventListener("plan-changed", handlePlanChange as EventListener);

        return() => {
            window.removeEventListener("plan-changed", handlePlanChange as EventListener);  
        }
    }, [router]);

    console.log({
        hasVipContent,
        hasCrewContent,
        hasBackstageContent
    });


    if (hasVipContent) return 3;
    if (hasCrewContent) return 2;
    if (hasBackstageContent) return 1;
    return null;
}

export default useMembershipTier
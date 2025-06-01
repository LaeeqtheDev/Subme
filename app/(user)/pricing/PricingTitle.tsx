"use client"

import useMembershipTier from "@/hooks/useMembershipTier";
import { Heart } from "lucide-react";

function PricingTitle() {
const membershipTier = useMembershipTier()
const isPremium = membershipTier && membershipTier > 1;
  return (
   <div className="text-center mb-12 sm:text-5xl flex items-center justify-center gap-4">
    <h1 className="flex items-center gap-2 text-ce text-4xl font-bold tracking-tight text-gray-900">
        {isPremium ? "Thank you for supporting!":"Support my work"}
        <Heart className="w-8 h-8 fill-orange-400 text-orange-400"/>
    </h1>

    <p className="mt-4 text-lg text-orange-600 max-w-2xl mx-auto">
        {isPremium 
        ? `Manage your membership below`:"Support our work and unlock exclusive content by becoming a valued member of our community" }
    </p>

   </div>
  )
}

export default PricingTitle
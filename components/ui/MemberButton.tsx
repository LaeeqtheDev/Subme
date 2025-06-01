"use client"

import useMembershipTier from "@/hooks/useMembershipTier"
import { useUser } from "@clerk/nextjs"
import { Heart, Loader } from "lucide-react"
import Link from "next/link"
import { Button } from "./button"

function MemberButton() {
    const {user} = useUser()
    const membertiership = useMembershipTier()

    if (!user) return null

    if (!membertiership) return(
        <Link href="/pricing">
            <Button className="bg-orange-500 text-white px-8 py-2 rounded-lg text-base font-semibold hover:bg-orange-700 transition-colors">
                Loading...
                <Loader className="w-4 h-4 animate-spin text-white" />
                </Button>
        </Link>
    )


    if (membertiership === 1) {
        return(
            <Link href="/pricing">
            <Button className="bg-orange-500 text-white px-8 py-2 rounded-lg text-base font-semibold hover:bg-orange-700 transition-colors">
                Become a Member 
                <Heart className="w-4 h-4 a text-white fill-white" />
                </Button>
        </Link>
        )}

        if (membertiership === 2) {
            return(
                <Link href="/pricing">
                <Button className="bg-blue-500 text-white px-8 py-2 rounded-lg text-base font-semibold hover:bg-blue-700 transition-colors">
                   Upgrade to Vip
                    <Heart className="w-4 h-4  text-white fill-white" />
                    </Button>
            </Link>
            )}

            if (membertiership === 3) {
        return(
            <Link href="/pricing">
            <Button className="bg-black/90 text-white px-8 py-2 rounded-lg text-base font-semibold hover:bg-black transition-colors">
                Thanks for being a VIP {" "}
                <Heart className="w-4 h-4  text-white fill-white " />
                </Button>
        </Link>
        )}



  return (
    <div>MemberButton</div>
  )
}

export default MemberButton
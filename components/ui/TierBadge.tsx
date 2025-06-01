import { TierAccess } from "@/types/types"
import Badge from "../Badge/Badge"

interface TierBadgeProps {
tierAccess: TierAccess
}


function TierBadge({tierAccess}: TierBadgeProps) {
  return <Badge tier={tierAccess} variant={"simple"}/>
}

export default TierBadge
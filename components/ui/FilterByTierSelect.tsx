"use client"

import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { membershipMap, tierMap } from "@/types/types";

function FilterByTierSelect() {
  const router = useRouter();

  const handleValueChange = (value: string) => {
    if (value === "all") {
      router.push("/");
    } else {
      router.push(`/?tier=${value}`);
    }
  }

  return (
    <Select onValueChange={handleValueChange}>
  <SelectTrigger className="w-[200px] border border-black bg-black text-white hover:bg-black hover:text-white focus:ring-0 focus:border-black">
    <SelectValue placeholder="Filter posts by Tier" />
  </SelectTrigger>
  <SelectContent className="bg-white text-black border border-black">
    <SelectItem value="all" className="hover:bg-black hover:text-white focus:bg-black focus:text-white">
      All
    </SelectItem>
    {Object.entries(tierMap).map(([tier, level]) => (
      <SelectItem
        key={tier}
        value={tier}
        className="hover:bg-black hover:text-white focus:bg-black focus:text-white"
      >
        {membershipMap[level]}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
  )
}

export default FilterByTierSelect

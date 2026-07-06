import Link from "next/link";
import { Crown, Star, User, Check } from "lucide-react";

const tiers = [
  {
    name: "Backstage",
    icon: User,
    gradient: "from-purple-500 to-pink-500",
    perks: [
      "Access to backstage-tier posts",
      "Behind-the-scenes updates",
      "Comment on every post",
    ],
  },
  {
    name: "Crew",
    icon: Star,
    gradient: "from-blue-500 to-cyan-500",
    perks: [
      "Everything in Backstage",
      "Crew-only exclusive posts",
      "Direct message access",
    ],
  },
  {
    name: "VIP",
    icon: Crown,
    gradient: "from-amber-500 to-yellow-500",
    perks: [
      "Everything in Crew",
      "VIP-only exclusive content",
      "Priority replies & shoutouts",
    ],
  },
];

function MembershipTiers() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-center mb-2">
        Pick your level of access
      </h2>
      <p className="text-sm text-gray-600 text-center mb-8">
        Every tier unlocks more of what&apos;s behind the curtain.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {tiers.map((tier) => {
          const Icon = tier.icon;
          return (
            <div
              key={tier.name}
              className="rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col"
            >
              <div
                className={`bg-gradient-to-r ${tier.gradient} text-white p-4 flex items-center gap-2`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-semibold">{tier.name}</span>
              </div>
              <ul className="p-4 space-y-2 flex-1">
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center mt-8">
        <Link
          href="/pricing"
          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          See pricing
        </Link>
      </div>
    </section>
  );
}

export default MembershipTiers;

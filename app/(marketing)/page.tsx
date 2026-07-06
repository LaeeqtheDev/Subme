import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import MembershipTiers from "@/components/ui/MembershipTiers";
import { Heart, Lock, MessageCircle, LayoutGrid, UserRound } from "lucide-react";
import { getCreators } from "@/sanity/lib/creator/getCreators";
import { urlFor } from "@/sanity/lib/image";

export default async function LandingPage() {
  const user = await currentUser();
  if (user) {
    redirect("/feed");
  }

  const creators = (await getCreators()) ?? [];

  return (
    <div className="bg-gradient-to-b from-orange-100 via-orange-50/70 to-white">
      {/* NAV */}
      <header className="sticky top-0 z-30 bg-white/85 backdrop-blur-md border-b border-orange-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <span className="text-xl font-bold flex items-center gap-1">
            Sub<span className="text-orange-500">me</span>
          </span>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#features" className="hover:text-gray-900 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-gray-900 transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-gray-900 transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            <SignInButton mode="modal">
              <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                Log in
              </button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-5 shadow-sm shadow-orange-300/50">
                Get Started
              </Button>
            </SignInButton>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* soft depth blobs */}
        <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 bg-orange-300/40 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute top-10 right-0 w-80 h-80 bg-purple-300/30 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 pt-16 pb-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm font-semibold text-orange-600 uppercase tracking-wide mb-4">
              For creators and their biggest fans
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6 text-gray-900">
              Turn your fans into{" "}
              <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                paying members.
              </span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-md">
              Subme gives creators tiered memberships, locked posts, and direct
              fan messaging - all in one place. No spreadsheets, no juggling
              five tools.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <SignInButton mode="modal">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-8 py-3 text-base font-semibold shadow-md shadow-orange-300/50">
                  Get Started
                </Button>
              </SignInButton>
              <a href="#features" className="text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors">
                See how it works &darr;
              </a>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              Free to browse &middot; Cancel anytime
            </p>
          </div>

          {/* Signature visual: fanned membership tier cards */}
          <div className="relative h-72 sm:h-80 flex items-center justify-center">
            <div className="absolute w-48 sm:w-56 h-64 sm:h-72 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-xl -rotate-6 -translate-x-10" />
            <div className="absolute w-48 sm:w-56 h-64 sm:h-72 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-xl rotate-3 translate-x-2" />
            <div className="relative w-48 sm:w-56 h-64 sm:h-72 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-2xl shadow-2xl rotate-12 translate-x-16 flex flex-col items-center justify-center text-white gap-2">
              <Heart className="w-8 h-8 fill-white" />
              <span className="font-semibold">VIP</span>
            </div>
          </div>
        </div>
      </section>

      {/* CREATORS */}
      {creators.length > 0 && (
        <section className="relative overflow-hidden pt-6 pb-16">
          <div className="pointer-events-none absolute top-0 left-1/3 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-1/4 w-72 h-72 bg-orange-200/40 rounded-full blur-3xl" />
          <div className="relative max-w-6xl mx-auto px-4">
            <p className="text-sm font-semibold text-orange-600 uppercase tracking-wide text-center mb-6">
              Creators on Subme
            </p>
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto ${
                creators.length >= 3 ? "lg:grid-cols-3" : ""
              }`}
            >
              {creators.map((creator) => (
                <div
                  key={creator._id}
                  className="rounded-2xl overflow-hidden border border-orange-200 shadow-md shadow-orange-100/60 bg-white flex flex-col hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="relative h-24 w-full bg-gray-100 shrink-0">
                    {creator.bannerImage && (
                      <Image
                        src={urlFor(creator.bannerImage).width(600).height(200).fit("crop").url()}
                        alt={`${creator.name} banner`}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="px-5 pb-5 flex-1 flex flex-col">
                    <div className="relative z-10 flex items-end -mt-7">
                      <div className="w-14 h-14 rounded-full border-4 border-white shadow-md bg-orange-400 flex items-center justify-center shrink-0 overflow-hidden">
                        {creator.profileImage ? (
                          <Image
                            src={urlFor(creator.profileImage).width(112).height(112).fit("crop").url()}
                            alt={creator.name || "Creator"}
                            width={56}
                            height={56}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <UserRound className="w-6 h-6 text-white" strokeWidth={2.5} />
                        )}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold mt-3 text-gray-900">
                      {creator.name}
                    </h3>
                    {creator.tagline && (
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{creator.tagline}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FEATURES */}
      <section id="features" className="bg-orange-50 py-20 border-y border-orange-200">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-2 text-gray-900">Everything you need to get paid for your work</h2>
          <p className="text-gray-600 text-center mb-12 max-w-xl mx-auto">
            No plugins to configure. It&apos;s already built in.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={LayoutGrid}
              title="Tiered memberships"
              description="Set up Backstage, Crew, and VIP tiers so fans can pick their level of support."
            />
            <FeatureCard
              icon={Lock}
              title="Locked content"
              description="Publish posts that only unlock for members at the right tier."
            />
            <FeatureCard
              icon={MessageCircle}
              title="Direct messaging"
              description="Message your top supporters directly, no separate inbox needed."
            />
            <FeatureCard
              icon={Heart}
              title="Simple checkout"
              description="Fans subscribe and manage their membership without leaving the page."
            />
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="relative overflow-hidden py-20">
        <div className="pointer-events-none absolute top-10 left-1/4 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-1/3 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl" />
        <div className="relative">
          <MembershipTiers />
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">Frequently asked questions</h2>
          <div className="divide-y divide-orange-200">
            <FaqItem
              question="How do fans join?"
              answer="A fan signs in, picks a membership tier, and gets instant access to whatever that tier unlocks - no separate account setup."
            />
            <FaqItem
              question="Can I change what each tier unlocks?"
              answer="Yes. Backstage, Crew, and VIP each map to specific posts and perks, and you control what falls under each one."
            />
            <FaqItem
              question="Can members cancel anytime?"
              answer="Yes, members can manage or cancel their membership at any time from their account."
            />
            <FaqItem
              question="Do I need a separate tool for messaging fans?"
              answer="No - direct messaging to members is built in, so you're not paying for or juggling another app."
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden py-20 text-center px-4 bg-gradient-to-r from-orange-100 via-orange-50 to-purple-100">
        <div className="relative">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Ready to turn fans into members?</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Get started in a couple of minutes.
          </p>
          <SignInButton mode="modal">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-10 py-3 text-base font-semibold shadow-md shadow-orange-300/50">
              Get Started
            </Button>
          </SignInButton>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-orange-200 py-10 bg-orange-50">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-lg font-bold text-gray-900">
            Sub<span className="text-orange-500">me</span>
          </span>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="#features" className="hover:text-gray-900 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-gray-900 transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-gray-900 transition-colors">FAQ</a>
          </div>
          <span className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Subme
          </span>
        </div>
      </footer>
    </div>
  );
}

const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100/70 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
    <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
      <Icon className="w-5 h-5 text-orange-500" />
    </div>
    <h3 className="font-semibold mb-2 text-gray-900">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

const FaqItem = ({ question, answer }: { question: string; answer: string }) => (
  <details className="group py-5">
    <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-gray-900">
      {question}
      <span className="ml-4 shrink-0 text-orange-500 transition-transform group-open:rotate-45">
        +
      </span>
    </summary>
    <p className="mt-3 text-sm text-gray-600">{answer}</p>
  </details>
);

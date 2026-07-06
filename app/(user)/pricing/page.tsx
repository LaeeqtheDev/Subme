import { currentUser } from "@clerk/nextjs/server";
import { SignInButton } from "@clerk/nextjs";
import SchematicWrapper from "@/components/Schematic/SchematicWrapper";
import PricingTitle from "./PricingTitle";
import { Button } from "@/components/ui/button";


async function PricingPage() {
    const customerPortalComponentId= process.env.NEXT_PUBLIC_CUSTOMER_PORTAL_COMPONENT_ID;

    if(!customerPortalComponentId) {
        throw new Error("Customer portal component ID is not defined in environment variables");
    }

    const user = await currentUser();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-t from-orange-200 to-white">
   <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
    {/* <PricingTitle /> */}
    <PricingTitle/>

   <div className="bg-white rounded-2xl shadow-xl p-8">
    {user ? (
      <SchematicWrapper componentId={customerPortalComponentId} />
    ) : (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <p className="text-gray-700 font-medium">
          Sign in to see membership options and manage your subscription.
        </p>
        <SignInButton mode="modal">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2 rounded-lg font-semibold">
            Sign in
          </Button>
        </SignInButton>
      </div>
    )}
    </div>
   </div>
  </div>
  
  )
}

export default PricingPage
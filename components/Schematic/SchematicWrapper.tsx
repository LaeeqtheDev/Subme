import { getTemporaryAccessToken } from "@/actions/getTemporaryAccessToken"
import SchematicembeddedComponent from "./SchematicembeddedComponent";


async function SchematicWrapper({componentId}:{componentId: string}) {
    const accesstoken = await getTemporaryAccessToken();


    if (!accesstoken) {
        return (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                <p className="text-gray-700 font-medium">
                    Still setting up your account...
                </p>
                <p className="text-sm text-gray-500 max-w-sm">
                    This can take a few seconds right after signing in. Refresh
                    the page in a moment.
                </p>
            </div>
        );
    }
  return (
    <SchematicembeddedComponent
    accessToken={accesstoken}
    componentId={componentId}
    />

  )
}

export default SchematicWrapper
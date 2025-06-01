import { getTemporaryAccessToken } from "@/actions/getTemporaryAccessToken"
import SchematicembeddedComponent from "./SchematicembeddedComponent";


async function SchematicWrapper({componentId}:{componentId: string}) {
    const accesstoken = await getTemporaryAccessToken();


    if (!accesstoken) {
        throw new Error("No access token found for user");
    }
  return (
    <SchematicembeddedComponent
    accessToken={accesstoken}
    componentId={componentId}
    />

  )
}

export default SchematicWrapper
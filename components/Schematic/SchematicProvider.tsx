"use client"
import React, { useEffect } from 'react';
import { SchematicProvider, useSchematicEvents } from "@schematichq/schematic-react";
import { useUser } from '@clerk/nextjs';


// You must define or import the publishableKey from your environment or config
const publishableKey = process.env.NEXT_PUBLIC_SCHEMATIC_PUBLISHABLE_KEY; // Example usage

if(!publishableKey){
    throw new Error("Schematic publishable key is not defined. Please set NEXT_PUBLIC_SCHEMATIC_KEY in your environment variables.");
}
const SchematicWrapped = ({ children }: { children: React.ReactNode }) => {
    const {identify} = useSchematicEvents();
    const {user} = useUser();

    useEffect(() => {
      const userName = 
      user?.username ??
      user?.fullName ??
      user?.emailAddresses[0]?.emailAddress ??
      user?.id;

      if(user?.id){
        identify({
          company:{
            keys: {
              id: user.id,
            },
            name: userName,
          },
          keys: {
            id: user.id, 
          },
          name: userName,
        })
      }
    },
    [identify, user])
  return children
   

}

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SchematicProvider publishableKey={publishableKey!}>
        <SchematicWrapped>
      {children}
      </SchematicWrapped>
    </SchematicProvider>
  );
}

export default Provider;

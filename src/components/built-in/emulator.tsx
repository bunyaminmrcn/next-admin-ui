"use client";

import { initAuthorizedAppsEmulator } from "@/lib/firebase-apps";
import React, { useEffect } from "react"

export default function EmulatorLoader() {

    React.useEffect(() => {
        console.log("Hooks run")
        //initAuthorizedAppsEmulator().then();
    }, []);

    return <div></div>
}
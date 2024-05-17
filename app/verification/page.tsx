import React, { Suspense } from "react";
import Verification from "./Verification";

const SuspenseVerification = () => {
    return (
        <Suspense>
            <Verification />
        </Suspense>
    )
}

export default SuspenseVerification;

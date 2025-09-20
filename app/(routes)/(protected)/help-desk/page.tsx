"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const HelpDeskPage = () => {
    const router = useRouter();

    useEffect(() => {
        // Redirect to tickets by default
        router.replace("/help-desk/tickets");
    }, [router]);

    return null;
};

export default HelpDeskPage; 
import React, { useEffect, useState } from "react"
import { useRerenderCounter } from "../diagnostics/useRerenderCounter";
import { useBreadcrumbs } from "../breadcrumbs/useBreadcrumbs";
import { LoadingAnimation, LoadingAnimationWithLabel } from "./spinners/LoadingAnimation";


export const About: React.FC<any> = () => {
    const { callCounter, renderCounter } = useRerenderCounter('About');

    const { update } = useBreadcrumbs(["home", "about", "choose an user..."]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // async anon function
        (async () => {
            update(<LoadingAnimationWithLabel label="loading" />)
            await new Promise(resolve => setTimeout(resolve, 876));
            update();
            setLoading(false);
        })();
        return () => {
            console.log("🍑 'About' unmounting");
        }
    }, []);



    return (
        <div>
            <h1 className="text-3xl font-light">About</h1>
            <p>
                {loading && <LoadingAnimation />}
                This is the About page, called <strong>{callCounter}×</strong>, rendered <strong>{renderCounter}×</strong>
            </p>
        </div>
    );
}
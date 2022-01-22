import React from "react"
import { useRerenderCounter } from "../diagnostics/useRerenderCounter";
import { useBreadcrumbs } from "../breadcrumbs/useBreadcrumbs";

export const Home: React.FC<{}> = () => {
    const { callCounter, renderCounter } = useRerenderCounter('Home');
    
     // true so we render the breadcrumbs on mount
    useBreadcrumbs(["home", "sweet home"], true);

    return (
        <div>
            <h1 className="text-3xl font-light">Home</h1>
            <p>This is the Home page, called <strong>{callCounter}×</strong>, rendered <strong>{renderCounter}×</strong></p>
        </div>
    );
}
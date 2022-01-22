import React from "react";
import { useRerenderCounter, UseRerenderCounterOptions } from "./useRerenderCounter";

export const isDebugMode = process.env.NODE_ENV === 'development';

export function withDiagnostics<T>(Component: React.FC<T>, name?: string, options?: UseRerenderCounterOptions) {
    return function (props: T) {
        const { renderCounter, callCounter } = useRerenderCounter(name, options);
        return <div className="border-dashed border border-pink-700 relative p-1 m-1">
            <Component {...props} />
            <span className="absolute top-0 right-0 flex flex-col text-right px-4 text-xs">
                <span>Component <strong>{name}</strong></span>
                <span>called <strong>{callCounter}×</strong>, rendered <strong>{renderCounter}×</strong></span>
            </span>
        </div>;
    };
}
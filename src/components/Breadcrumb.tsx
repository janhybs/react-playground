import { useContext, useEffect } from "react";
import { BreadcrumbContext } from "../breadcrumbs/breadcrumbContext";
import { useRerenderCounter } from "../diagnostics/useRerenderCounter";


export const Breadcrumb: React.FC<any> = () => {
    const { callCounter, renderCounter } = useRerenderCounter('Bread', { fruit: '🍓'});
    const { breadcrumbs } = useContext(BreadcrumbContext);

    return <div className="flex p-3 my-2 bg-teal-100 border items-center border-teal-400 border-solid shadow-xl shadow-teal-200/30">
        <div className="flex items-center">
            {breadcrumbs
                .filter(breadcrumb => breadcrumb !== "")
                .map((breadcrumb, index) => {
                    return <div key={index} className="hover:text-teal-700 font-semibold h-4 inline-flex items-center after:content-['/'] after:p-2 after:text-gray-400 after:last:content-none">{breadcrumb}</div>
                })}
        </div>
        <div className="ml-auto text-xs">
            <p>called <strong>{callCounter}×</strong>, rendered <strong>{renderCounter}×</strong></p>
        </div>
    </div>
}
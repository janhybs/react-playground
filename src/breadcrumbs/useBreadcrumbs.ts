import { useCallback, useContext, useEffect, useMemo } from "react";
import { BreadcrumbContext, Breadcumb } from "./breadcrumbContext";

export const useBreadcrumbs = (template: Breadcumb[], renderOnMount = false) => {
    const { breadcrumbs, setBreadcrumbs } = useContext(BreadcrumbContext);

    // initial render?
    useEffect(() => {
        if (renderOnMount) {
            setBreadcrumbs([...template]);
        }
    }, []);

    // replace the last breadcrumb with the new one
    const update = useCallback(
        (newBreadcrumb: Breadcumb = "") => {
            const newBreadcrumbs = [...template];
            newBreadcrumbs[newBreadcrumbs.length - 1] = newBreadcrumb;
            setBreadcrumbs(newBreadcrumbs);
        }, [template]);
    
    const render = useCallback(
        () => setBreadcrumbs([...template]),
        [template]);

    // const { breadcrumbs, update } = useBreadcrumbs([]);
    return { breadcrumbs, update, render };
}
import { createContext } from "react";

export type Breadcumb = string | JSX.Element;

export interface IBreadcrumbContext {
    breadcrumbs: Breadcumb[];
    setBreadcrumbs: (breadcrumbs: Breadcumb[]) => void;
}

export const BreadcrumbContext = createContext<IBreadcrumbContext>({
    breadcrumbs: [],
    setBreadcrumbs: () => {},
});

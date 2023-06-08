import { Context, createContext } from "react";

export interface PageVarsContextProps {
    headTitle: string;
    setHeadTitle: (headTitle: string) => void;
}

export const PageVarsContext: Context<PageVarsContextProps> = createContext({
    headTitle: "",
    setHeadTitle: (headTitle: string) => {},
});

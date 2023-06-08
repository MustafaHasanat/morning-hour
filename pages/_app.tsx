import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";
import theme from "@/styles/theme";
import LayoutComponent from "@/components/layout";
import { SessionProvider } from "next-auth/react";
import ItemsContextProvider from "@/context/items/itemsContextProvider";
import PageVarsContextProvider from "@/context/pageVars/pageVarsContextProvider";

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps) {
    return (
        <SessionProvider session={session}>
            <ItemsContextProvider>
                <PageVarsContextProvider>
                    <ThemeProvider theme={theme}>
                        <LayoutComponent>
                            <Component {...pageProps} />
                        </LayoutComponent>
                    </ThemeProvider>
                </PageVarsContextProvider>
            </ItemsContextProvider>
        </SessionProvider>
    );
}

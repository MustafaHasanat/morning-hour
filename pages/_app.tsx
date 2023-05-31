import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";
import theme from "@/styles/theme";
import { Provider } from "react-redux";
import store from "@/utils/store";
import LayoutComponent from "@/components/layout";
import { SessionProvider } from "next-auth/react";

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps) {
    return (
        <SessionProvider session={session}>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <LayoutComponent>
                        <Component {...pageProps} />
                    </LayoutComponent>
                </ThemeProvider>{" "}
            </Provider>
        </SessionProvider>
    );
}

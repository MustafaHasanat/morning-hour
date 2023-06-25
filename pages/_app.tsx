import "@/styles/globals.css";
import type { AppProps } from "next/app";
import LayoutComponent from "@/components/layout";
import { SessionProvider } from "next-auth/react";
import ItemsContextProvider from "@/context/items/itemsContextProvider";
import PageVarsContextProvider from "@/context/pageVars/pageVarsContextProvider";
import {
    PayPalScriptProvider,
    ReactPayPalScriptOptions,
} from "@paypal/react-paypal-js";

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps) {
    const initialOptions: ReactPayPalScriptOptions = {
        clientId: `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}`,
        // client_secret: `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_SECRET}`,
    };    

    return (
        <SessionProvider session={session}>
            <ItemsContextProvider>
                <PageVarsContextProvider>
                    <PayPalScriptProvider options={initialOptions}>
                        <LayoutComponent>
                            <Component {...pageProps} />
                        </LayoutComponent>
                    </PayPalScriptProvider>
                </PageVarsContextProvider>
            </ItemsContextProvider>
        </SessionProvider>
    );
}

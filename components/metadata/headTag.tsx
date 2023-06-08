import { PageVarsContext } from "@/context/pageVars/pageVarsContext";
import Head from "next/head";
import { useContext } from "react";

/**
 * the head of the website
 *
 */
const HeadTag = () => {
    const { headTitle } = useContext(PageVarsContext);

    return (
        <Head>
            <title>{headTitle}</title>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
        </Head>
    );
};

export default HeadTag;

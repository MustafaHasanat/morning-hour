import Head from "next/head";
import { useSelector } from "react-redux";

/**
 * the head of the website
 *
 */
const HeadTag = () => {
    const headTitle = useSelector(
        (state: { variablesReducer: { headTitle: string } }) =>
            state.variablesReducer.headTitle
    );

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

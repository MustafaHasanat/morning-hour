/* eslint-disable @next/next/no-page-custom-font */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-sync-scripts */
import Head from "next/head";

/**
 * the head of the website
 *
 */
const HeadTag = () => {
    return (
        <Head>
            <title>Morning Hour</title>
            <meta name="description" content="Generated by create next app" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/logoIcon.png" />

            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
                href="https://fonts.googleapis.com/css2?family=Oswald:wght@200&family=Patua+One&display=swap"
                rel="stylesheet"
            />
        </Head>
    );
};

export default HeadTag;

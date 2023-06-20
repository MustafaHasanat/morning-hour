import { Box, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";

import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";

const Footer = () => {
    const columnTitle = (text: string) => {
        return (
            <Typography textTransform="capitalize" fontSize={{ xs: "1.3rem" }}>
                {text}
            </Typography>
        );
    };

    const itemPair = (icon: ReactNode, url: string) => {
        return (
            <Box
                component={motion.div}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.7 }}
                sx={{
                    cursor: "pointer",
                    width: "2.5rem",
                    height: "2.5rem",
                }}
            >
                <Link href={url} target="_blank">
                    {icon}
                </Link>
            </Box>
        );
    };

    return (
        <Stack
            component="footer"
            alignItems="center"
            bgcolor="background.default"
            p={5}
            spacing={8}
        >
            <Stack
                direction={{ xs: "column", md: "row" }}
                justifyContent={{ xs: "space-evenly" }}
                width="100%"
                spacing={{ xs: 5, lg: 0 }}
            >
                <Stack spacing={2}>
                    {columnTitle("contacts")}
                    <Stack spacing={2} direction="row">
                        {itemPair(
                            <LocalPhoneIcon
                                sx={{
                                    color: "#25ac25",
                                    width: "100%",
                                    height: "100%",
                                }}
                            />,
                            "tel:+962780387522"
                        )}
                        {itemPair(
                            <WhatsAppIcon
                                sx={{
                                    color: "#35ba48",
                                    width: "100%",
                                    height: "100%",
                                }}
                            />,
                            "http://wa.me/+962780387522"
                        )}
                        {itemPair(
                            <EmailIcon
                                sx={{
                                    color: "gray",
                                    width: "100%",
                                    height: "100%",
                                }}
                            />,
                            "mailto:mustafa.hasanat99@gmail.com?Subject=Greeting&body=Hello there."
                        )}
                        {itemPair(
                            <LocationOnIcon
                                sx={{
                                    color: "#de4032",
                                    width: "100%",
                                    height: "100%",
                                }}
                            />,
                            ""
                        )}
                    </Stack>
                </Stack>

                <Stack spacing={2}>
                    {columnTitle("social media")}

                    <Stack spacing={2} direction="row">
                        {itemPair(
                            <FacebookIcon
                                sx={{
                                    color: "#1877f2",
                                    width: "100%",
                                    height: "100%",
                                }}
                            />,
                            "https://www.facebook.com/"
                        )}
                        {itemPair(
                            <InstagramIcon
                                sx={{
                                    color: "#f6076d",
                                    width: "100%",
                                    height: "100%",
                                }}
                            />,
                            "https://www.instagram.com/"
                        )}
                        {itemPair(
                            <YouTubeIcon
                                sx={{
                                    color: "#ff0000",
                                    width: "100%",
                                    height: "100%",
                                }}
                            />,
                            "https://www.youtube.com/"
                        )}
                        {itemPair(
                            <TwitterIcon
                                sx={{
                                    color: "#1d9bf0",
                                    width: "100%",
                                    height: "100%",
                                }}
                            />,
                            "https://twitter.com/"
                        )}
                    </Stack>
                </Stack>
            </Stack>

            <Typography
                textTransform="capitalize"
                sx={{
                    opacity: 0.6,
                }}
            >
                &copy; 2023 morning hour all rights reserved
            </Typography>
        </Stack>
    );
};

export default Footer;

import LoadingPage from "@/components/shared/loadingPage";
import TitleBox from "@/components/shared/titleBox";
import useUserData from "@/hooks/useUserData";
import { Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";

// export const getStaticProps = async (): Promise<{
//     props: {
//         authors: Author[];
//     };
// }> => {
//     const authors = await getAllAuthors();

//     return {
//         props: { authors },
//     };
// };

interface Props {}

export default function Admin({}: Props) {
    const user = useUserData();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            setTimeout(() => {
                router.push("/");
            }, 2000);
        }
    }, [user, router]);

    return !user ? (
        <Stack width="100%" alignItems="center">
            <LoadingPage message="Unauthorized, redirecting ..." />
        </Stack>
    ) : (
        <Stack pt={10} px={5} alignItems="center">
            <TitleBox title="Admin Side" subTitle="" />
        </Stack>
    );
}

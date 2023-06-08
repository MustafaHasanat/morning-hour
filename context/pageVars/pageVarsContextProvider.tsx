import { ReactNode, useMemo, useState } from "react";
import { PageVarsContext } from "./pageVarsContext";

type Props = {
    children: ReactNode;
};

const PageVarsContextProvider = ({ children }: Props) => {
    const [headTitle, setHeadTitle] = useState<string>("Morning Hour");

    const pageVarsProvider = useMemo(
        () => ({
            headTitle,
            setHeadTitle,
        }),
        [headTitle, setHeadTitle]
    );

    return (
        <>
            <PageVarsContext.Provider value={pageVarsProvider}>
                {children}
            </PageVarsContext.Provider>
        </>
    );
};

export default PageVarsContextProvider;

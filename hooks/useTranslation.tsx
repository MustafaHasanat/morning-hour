import { useRouter } from "next/router";
import en from "../public/locales/en";
import ar from "../public/locales/ar";
import { useCallback } from "react";

const languages: { [key: string]: any } = { en, ar };

const resolvePath = (object: any, path: string, defaultValue: any) =>
    path
        .split(".")
        .reduce((o: any, p: string) => (o ? o[p] : defaultValue), object);

export default function useTranslation() {
    const { locale } = useRouter();

    const t = useCallback(
        (keyString: string) => {
            if (locale) {
                return resolvePath(languages[locale] || {}, keyString, "");
            } else {
                return "";
            }
        },
        [locale]
    );

    return { t };
}

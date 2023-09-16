const { XS, SM, MD, LG, XL } = {
    XS: 0,
    SM: 420, // mobile
    MD: 768, // tablet
    LG: 1138, // laptop
    XL: 2550, // 4K
};

const themes = {
    MEDIA_QUERIES: { XS, SM, MD, LG, XL },

    MEDIA_QUERIES_HOOK: {
        XS: `(min-width:${XS}px)`,
        SM: `(min-width:${SM}px)`,
        MD: `(min-width:${MD}px)`,
        LG: `(min-width:${LG}px)`,
        XL: `(min-width:${XL}px)`,
    },
};

export default themes;

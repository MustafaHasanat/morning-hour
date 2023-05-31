const itemTitleSerializer = (
    title: string,
    outputType: "normal" | "underscored"
): string => {
    return outputType === "normal"
        ? title.replace(/_/g, " ")
        : title.replace(/\s/g, "_");
};

export default itemTitleSerializer;

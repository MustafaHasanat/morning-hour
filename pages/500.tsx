import SpecialPagesTemplate from "@/components/shared/specialPagesTemplate";

export default function ServerErrorPage() {
    return <SpecialPagesTemplate text="server error" statusCode="500" />;
}

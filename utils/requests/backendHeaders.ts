import { hash } from "bcrypt";

export const backendAccessTokenHeader = async () => {
    const hashedToken = await hash(
        process.env.NEXT_PUBLIC_BACKEND_ACCESS_TOKEN || "",
        12
    );

    return {
        "backend-access-token": hashedToken,
    };
};

export const backendBearerTokenHeader = (token: string) => {
    return {
        Authorization: `Bearer ${token}`,
    };
};

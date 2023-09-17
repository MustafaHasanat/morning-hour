import assets from "@/utils/constants/assets";
import { backendAccessTokenHeader } from "@/utils/requests/backendHeaders";
import CustomResponse from "@/utils/responses/customResponse";
import get from "axios";

export default async function getAuthors(): Promise<CustomResponse> {
    try {
        const token = await backendAccessTokenHeader()
        const response = await get(assets.BACKEND_BASE_URL + "authors", {
            headers: {
                ...token,
            },
        });

        return {
            message: "Authors data retrieved successfully",
            data: response.data,
            status: 200,
        };
    } catch (error) {
        return {
            message: "Couldn't retrieve authors data",
            data: error,
            status: 200,
        };
    }
}

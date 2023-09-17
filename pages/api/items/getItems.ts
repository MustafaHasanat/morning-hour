import assets from "@/utils/constants/assets";
import CustomResponse from "@/utils/responses/customResponse";
import { backendAccessTokenHeader } from "@/utils/requests/backendHeaders";
import get from "axios";

export default async function getItems(): Promise<CustomResponse> {
    try {
        const token = await backendAccessTokenHeader();
        const response = await get(assets.BACKEND_BASE_URL + "items", {
            headers: {
                ...token,
            },
        });

        return {
            message: "Items data retrieved successfully",
            data: response.data,
            status: 200,
        };
    } catch (error) {
        return {
            message: "Couldn't retrieve items data",
            data: error,
            status: 200,
        };
    }
}

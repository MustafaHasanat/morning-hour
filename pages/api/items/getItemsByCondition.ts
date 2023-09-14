import { Item } from "@/types/item";
import assets from "@/utils/constants/assets";
import jsonToQuery from "@/utils/helpers/jsonToQuery";
import CustomResponse from "@/utils/responses/customResponse";
import get from "axios";

export default async function getItemsByCondition(
  condition: Record<string, any>
): Promise<CustomResponse> {
  try {
    const response = await get(
      assets.BACKEND_BASE_URL + "items?" + jsonToQuery(condition)
    );

    return {
      message: "items data retrieved successfully",
      data: response.data.data as Item[],
      status: 200,
    };
  } catch (error) {
    return {
      message: "Couldn't retrieve items data",
      data: error,
      status: 500,
    };
  }
}

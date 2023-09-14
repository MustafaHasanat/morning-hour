import { Author } from "@/types/author";
import assets from "@/utils/constants/assets";
import jsonToQuery from "@/utils/helpers/jsonToQuery";
import CustomResponse from "@/utils/responses/customResponse";
import get from "axios";

export default async function getAuthorsByCondition(
  condition: Record<string, any>
): Promise<CustomResponse> {
  try {
    const response = await get(
      assets.BACKEND_BASE_URL + "authors?" + jsonToQuery(condition)
    );

    return {
      message: "Authors data retrieved successfully",
      data: response.data.data as Author,
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

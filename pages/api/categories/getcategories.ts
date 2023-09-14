import { Category } from "@/types/category";
import assets from "@/utils/constants/assets";
import CustomResponse from "@/utils/responses/customResponse";
import get from "axios";

export default async function getCategories(): Promise<CustomResponse> {
  try {
    const response = await get(assets.BACKEND_BASE_URL + "categories");

    return {
      message: "Categories data retrieved successfully",
      data: response.data.data as Category,
      status: 200,
    };
  } catch (error) {
    return {
      message: "Couldn't retrieve categories data",
      data: error,
      status: 200,
    };
  }
}

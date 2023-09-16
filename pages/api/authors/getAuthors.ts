import assets from "@/utils/constants/assets";
import CustomResponse from "@/utils/responses/customResponse";
import get from "axios";

// const headers = {
//   'Authorization': `Bearer ${token}`
// };

// , { headers }

export default async function getAuthors(): Promise<CustomResponse> {
  try {
    const response = await get(assets.BACKEND_BASE_URL + "authors");

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

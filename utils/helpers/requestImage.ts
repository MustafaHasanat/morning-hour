import get from "axios";
import assets from "../constants/assets";

interface ResponseProps {
  bufferedImage: string;
  statusCode: 404 | 500 | 200;
}

const requestImage = async (imageURL: string): Promise<ResponseProps> => {
  try {
    // fetch the image
    const response = await get(imageURL, {
      responseType: "arraybuffer",
    });

    // revert the image into its original format
    const base64Image = `data:${
      response.headers["content-type"]
    };base64,${Buffer.from(response.data, "binary").toString("base64")}`;

    return { statusCode: 200, bufferedImage: base64Image };
  } catch (error) {
    console.log("Error occurred: ", error);

    return {
      statusCode: 500,
      bufferedImage: assets.PLACEHOLDER_IMAGE,
    };
  }
};

export default requestImage;

import requestImage from "@/utils/helpers/requestImage";
import { useEffect, useState } from "react";

const useUpdateImage = ({
  placeholderImage,
  imageUrl,
}: {
  placeholderImage: string;
  imageUrl: string;
}) => {
  const [image, setImage] = useState(placeholderImage);

  useEffect(() => {
    const getData = async () => {
      const { bufferedImage, statusCode } = await requestImage(imageUrl);

      if (statusCode == 200) {
        setImage(bufferedImage);
      }
    };

    getData();
  }, [imageUrl]);

  return image;
};

export default useUpdateImage;

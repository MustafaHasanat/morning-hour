import { Section } from "@/types/section";

const assets = {
  BACKEND_BASE_URL: "https://morning-hour-db-production.up.railway.app/",
  BACKEND_IMAGE_URL: (section: Section, image: string) =>
    `https://morning-hour-db-production.up.railway.app/${section}/assets/${image}`,
  PLACEHOLDER_IMAGE: "assets/author-placeholder.jpg",
};

export default assets;

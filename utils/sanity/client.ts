import { createClient } from "next-sanity";

export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, 
    dataset: "production",
    useCdn: true,
    apiVersion: "2023-05-26", 
    token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
});
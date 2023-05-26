import { Author } from "./author";
import { Category } from "./category";
import { Review } from "./review";

export type Item = {
    _id: string;
    title: string;
    description: string;
    currentPrice: number;
    oldPrice: number;
    isBestSelling: boolean;
    rating: number;
    category: Category;
    reviews: Review[];
    author: Author;
    image: {
        asset: {
            url: string;
        };
    };
    screenshots: {
        asset: {
            url: string;
        };
    }[];
};

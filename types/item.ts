export type Item = {
    id: string;
    title: string;
    description: string;
    currentPrice: number;
    oldPrice: number;
    isBestSelling: boolean;
    primaryColor: string;
    categoryId: string;
    authorId: string;
    image: string;
    screenshots: string[];
};

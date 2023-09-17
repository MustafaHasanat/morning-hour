import { CartItem, Item } from "@/typess/item";
import { Divider, Stack } from "@mui/material";
import ImagesFlipper from "./imagesFlipper";
import DetailsBox from "./detailsBox";
import ReviewsBox from "./reviewsBox";
import { Review } from "@/typess/review";
import { useEffect, useState } from "react";
import useUserData from "@/hooks/useUserData";

interface BookPageProps {
  item: Item;
  reviews: Review[];
}

const BookPage = ({ item, reviews }: BookPageProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [wishlist, setWishlist] = useState<Item[]>([]);
  const user = useUserData();

  useEffect(() => {
    if (user && user.wishlist) {
      setWishlist(user.wishlist);
    }
  }, [user]);

  useEffect(() => {
    const matchedList = wishlist.filter((wishlistItem) => {
      if (wishlistItem._id === item._id) {
        return wishlistItem._id;
      }
    });

    if (matchedList.length !== 0) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [item._id, wishlist]);

  return (
    <Stack px={{ xs: 10 }} py={{ xs: 10 }} width={{ xs: "100%" }}>
      <Stack
        direction={{ xs: "column", lg: "row" }}
        width={{ xs: "100%" }}
        justifyContent={{
          xs: "space-between",
        }}
      >
        <ImagesFlipper item={item} isFavorite={isFavorite} />
        <DetailsBox
          item={item}
          reviews={reviews}
          isFavorite={isFavorite}
          setIsFavorite={setIsFavorite}
          user={user}
        />
      </Stack>

      <Divider
        sx={{
          my: 5,
        }}
      />

      <ReviewsBox item={item} reviews={reviews} />
    </Stack>
  );
};

export default BookPage;

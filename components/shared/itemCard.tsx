import { Avatar, Box, Stack, Typography, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import ExpandedWidget from "./expandedWidget";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import itemTitleSerializer from "@/utils/helpers/itemTitleSerializer";
import { PageVarsContext } from "@/context/pageVars/pageVarsContext";
import {
  addToCart,
  addToWishlist,
  changeQuantCartItem,
  removeFromWishlist,
} from "@/utils/sanity/user";
import useUserData from "@/hooks/useUserData";
import sanityUserToLocalUser from "@/utils/helpers/sanityUserToLocalUser";
import { ItemsContext } from "@/context/items/itemsContext";
import { Item } from "@/types/item";

interface ItemCardProps {
  item: Item;
}

const ItemCard = ({ item }: ItemCardProps) => {
  const router = useRouter();
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [updated, setUpdated] = useState(false);
  const theme = useTheme();

  

  const { cartItems, setCartItems, wishlist, setWishlist } =
    useContext(ItemsContext);

  const cartItem = cartItems.filter((cartItemObj) => {
    if (cartItemObj.item._id === item.id) {
      return cartItemObj;
    }
  })[0];

  const user = sanityUserToLocalUser(useUserData());

  const itemData = {
    userId: `${user.id}`,
    itemId: `${item.id}`,
  };

  const { setIsSnackbarOpen, setSnackbarMsg, setSnackbarSeverity } =
    useContext(PageVarsContext);

  const {
    cartSuccessMsg,
    favSuccessMsgAdd,
    favSuccessMsgRemove,
    userErrorMsg,
  } = {
    cartSuccessMsg: "Book is added to cart.",
    favSuccessMsgAdd: "Book is now on your wishlist.",
    favSuccessMsgRemove: "Book is removed from wishlist.",
    userErrorMsg: "You have to sign in first!",
  };

  useEffect(() => {
    if (user.wishlist && user.cart && !updated) {
      const isWishlisted = user.wishlist
        ? user.wishlist.includes(`${item?.id}`)
        : false;
      const isCarted = user.cart ? user.cart.includes(`${item?.id}`) : false;

      setIsFavorite(isWishlisted);
      setIsInCart(isCarted);
      setUpdated(true);
    }
  }, [item?.id, updated, user]);

  const handleCartButton = () => {
    if (!user) {
      setIsSnackbarOpen(true);
      setSnackbarMsg(userErrorMsg);
      setSnackbarSeverity("error");
      return;
    }

    if (user.id) {
      if (isInCart) {
        // increment the item in cart
        changeQuantCartItem({
          ...itemData,
          sign: "+",
          curQuant: cartItem.quantity,
        });
        setSnackbarMsg(favSuccessMsgRemove);
      } else {
        // add the item to cart
        addToCart(itemData);
        setIsInCart(true);
        setSnackbarMsg(cartSuccessMsg);
      }

      setIsSnackbarOpen(true);
      setSnackbarSeverity("success");
    }
  };

  const handleFavoriteButton = () => {
    if (!user) {
      setIsSnackbarOpen(true);
      setSnackbarMsg(userErrorMsg);
      setSnackbarSeverity("error");
      return;
    }

    if (user.id) {
      if (isFavorite) {
        // remove the item from wishlist
        removeFromWishlist(itemData);
        setIsFavorite(false);
        setSnackbarMsg(favSuccessMsgRemove);
      } else {
        // add the item to wishlist
        addToWishlist(itemData);
        setIsFavorite(true);
        setSnackbarMsg(favSuccessMsgAdd);
      }

      setIsSnackbarOpen(true);
      setSnackbarSeverity("success");
    }
  };

  return (
    <Stack
      p={{ xs: "1rem" }}
      width={{ xs: "15rem" }}
      height={{ xs: "23rem" }}
      bgcolor="background.default"
      borderRadius={2}
      justifyContent="space-between"
      alignItems="center"
      boxShadow={`5px 5px 15px 1px ${theme.palette.primary.main}`}
      position="relative"
      sx={{
        overflow: "hidden",
        transition: "0.3s ease",
        "&:hover": {
          transform: "scale(1.1)",
        },
      }}
    >
      <Stack
        component="div"
        alignItems="center"
        sx={{
          cursor: "pointer",
          width: { xs: "10rem" },
          height: { xs: "10em" },
          transition: "0.3s ease",

          "&:hover": {
            opacity: 0.5,
          },
        }}
        onClick={() => {
          router.push(
            item
              ? `/product/${itemTitleSerializer(item.title, "underscored")}`
              : "/"
          );
        }}
      >
        <Avatar
          variant="rounded"
          src={item ? item.image : ""}
          alt={`main card: ${item && item.title}`}
          sx={{
            width: "fit-content",
            height: "100%",
          }}
        />

        <Typography
          mt={{ xs: 2 }}
          fontSize={{ xs: "1.2rem" }}
          textAlign="center"
        >
          {item?.title}
        </Typography>

        <Stack direction="row" spacing={2} mt={{ xs: 2 }}>
          {item?.oldPrice !== 0 && (
            <Typography
              fontWeight="bold"
              fontSize={{ xs: "1rem" }}
              sx={{
                opacity: 0.5,
                textDecoration: "line-through",
              }}
            >
              {item?.oldPrice} JOD
            </Typography>
          )}

          <Typography fontWeight="bold" fontSize={{ xs: "1rem" }}>
            {item?.currentPrice} JOD
          </Typography>
        </Stack>
      </Stack>

      <Stack width="100%" position="relative">
        <Box
          sx={{
            width: isButtonHovered ? "13rem" : "4rem",
            transition: "0.3s ease",
          }}
        >
          <ExpandedWidget
            isOpened={isButtonHovered}
            content={
              <Stack
                sx={{
                  width: isButtonHovered ? "7rem" : "0px",
                  overflow: "hidden",
                  transition: "0.3s ease",
                }}
              >
                <Typography width="7rem">add to cart</Typography>
              </Stack>
            }
            icon={
              <ShoppingCartRoundedIcon
                onMouseEnter={() => {
                  setIsButtonHovered(true);
                }}
                onMouseLeave={() => {
                  setIsButtonHovered(false);
                }}
                sx={{
                  cursor: "pointer",
                  height: "80%",
                  width: "80%",
                  color: isInCart ? item.primaryColor : "secondary",
                }}
              />
            }
            iconOnClick={handleCartButton}
            colorHovered={item?.primaryColor}
            extraSX={{
              cursor: "unset",
            }}
          />
        </Box>

        <Box
          component={motion.div}
          initial={{
            y: "-50%",
            color: theme.palette.secondary.main,
            opacity: 0.5,
          }}
          animate={{
            opacity: isFavorite ? 1 : 0.5,
            color: isFavorite
              ? item?.primaryColor
              : theme.palette.secondary.main,
          }}
          whileHover={{
            opacity: 1,
            scale: 1.4,
          }}
          whileTap={{
            opacity: 1,
            scale: 0.6,
          }}
          sx={{
            position: "absolute",
            right: 0,
            top: "50%",
            width: "2rem",
            height: "2rem",
            cursor: "pointer",
          }}
          onClick={handleFavoriteButton}
        >
          <FavoriteIcon
            sx={{
              width: "100%",
              height: "100%",
            }}
          />
        </Box>
      </Stack>

      <Stack
        component={motion.div}
        initial={{ rotate: 45, y: -130, x: 140 }}
        animate={{ rotate: 45, y: isFavorite ? 40 : -130, x: 140 }}
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          bgcolor: "secondary.main",
          width: "400px",
          height: "40px",
          alignItems: "center",
          justifyContent: "center",
          borderTop: `1px solid ${theme.palette.primary.main}`,
          borderBottom: `1px solid ${theme.palette.primary.main}`,
        }}
      >
        <Typography textTransform="capitalize" fontSize={{ xs: "1rem" }}>
          on wishlist
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ItemCard;

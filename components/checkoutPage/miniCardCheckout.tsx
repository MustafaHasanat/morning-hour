import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CustomDivider from "../shared/customDivider";
import { CartItem } from "@/typess/item";
import { useContext } from "react";
import { ItemsContext } from "@/context/items/itemsContext";
import { changeQuantCartItem, removeFromCart } from "@/utils/sanity/user";
import { motion } from "framer-motion";
import { User } from "@/typess/user";

interface MiniCardProps {
  cartItem: CartItem;
  paymentIsOpen: boolean;
  user: User | null;
}

const MiniCardCheckout = ({ cartItem, paymentIsOpen, user }: MiniCardProps) => {
  const { setCartItems, cartItems } = useContext(ItemsContext);

  const handleRemove = () => {
    if (user) {
      setCartItems(
        cartItems.filter((item: CartItem) => {
          if (item.item._id !== cartItem.item._id) {
            return cartItems;
          }
        })
      );
      removeFromCart({
        userId: user?._id,
        itemId: `${cartItem.item._id}`,
      });
    }
  };

  const handleChangeQuant = (sign: "+" | "-") => {
    if (user) {
      if (sign === "+") {
        changeQuantCartItem({
          userId: user._id,
          itemId: `${cartItem.item._id}`,
          sign: "+",
          curQuant: cartItem.quantity,
        });
      } else {
        changeQuantCartItem({
          userId: user._id,
          itemId: `${cartItem.item._id}`,
          sign: "-",
          curQuant: cartItem.quantity,
        });
      }
    }
  };

  const textPair = (key: string, value: string) => {
    return (
      <Stack direction="row" spacing={1}>
        <Typography
          fontWeight="bold"
          textTransform="capitalize"
          fontSize={{ xs: "0.9rem", lg: "1.6rem" }}
        >
          {key}:
        </Typography>
        <Typography
          fontSize={{ xs: "1rem", lg: "1.6rem" }}
          sx={{ opacity: 0.7 }}
        >
          {value}
        </Typography>
      </Stack>
    );
  };

  const quantButton = (sign: "+" | "-") => {
    return (
      <Box
        component={motion.button}
        initial={{ scale: 1 }}
        whileHover={{ scale: paymentIsOpen ? 1 : 1.2 }}
        whileTap={{ scale: paymentIsOpen ? 1 : 0.7 }}
        disabled={paymentIsOpen}
        sx={{
          cursor: paymentIsOpen ? "unset" : "pointer",
          transition: "0.3s ease",
          bgcolor: "transparent",
          borderRadius: "50%",
          width: "40px",
          aspectRatio: "1 / 1",
          border: 0,
        }}
        onClick={() => {
          handleChangeQuant(sign);
        }}
      >
        {sign === "+" ? (
          <AddCircleIcon
            sx={{
              width: "100%",
              height: "100%",
            }}
          />
        ) : (
          <RemoveCircleIcon
            sx={{
              width: "100%",
              height: "100%",
            }}
          />
        )}
      </Box>
    );
  };

  const quantBox = () => {
    return (
      <Stack direction="row" spacing={5} alignItems="center">
        <Typography
          fontWeight="bold"
          textTransform="capitalize"
          fontSize={{ xs: "0.9rem", lg: "1.6rem" }}
        >
          quant
        </Typography>

        {quantButton("+")}
        <Typography fontSize={{ xs: "1.2rem", lg: "1.6rem" }}>
          {cartItem.quantity}
        </Typography>
        {quantButton("-")}
      </Stack>
    );
  };

  return (
    <Stack alignItems="end" pb={2}>
      <Stack
        direction={{ xs: "column", lg: "row" }}
        justifyContent="start"
        width={{ xs: "100%" }}
        spacing={5}
      >
        <Avatar
          src={cartItem.item.image.asset.url}
          variant="rounded"
          sx={{
            height: "10rem",
            width: "10rem",
            img: {
              height: "100%",
              width: "auto",
            },
          }}
        />

        <Stack spacing={2}>
          {textPair("title", cartItem.item.title)}
          {quantBox()}
          {textPair("price", `${cartItem.item.currentPrice} JOD`)}
        </Stack>
      </Stack>

      <Button
        variant="outlined"
        disabled={paymentIsOpen}
        endIcon={<ClearIcon />}
        sx={{
          my: 1,
          py: 1,
          px: 4,
          textTransform: "lowercase",
          fontSize: "1.3rem",
        }}
        onClick={handleRemove}
      >
        remove
      </Button>

      <CustomDivider />
    </Stack>
  );
};

export default MiniCardCheckout;

import {
    Button,
    CircularProgress,
    List,
    Stack,
    Typography,
} from "@mui/material";
import {
    Dispatch,
    Fragment,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";
import MiniCard from "../shared/miniCard";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import getTotalPrice from "@/utils/helpers/getTotalPrice";
import { useRouter } from "next/router";
import { clearCart } from "@/utils/sanity/user";
import useUserData from "@/hooks/useUserData";
import { ItemsContext } from "@/context/items/itemsContext";

interface CartContentsProps {
    setDropDownContents: Dispatch<SetStateAction<"" | "menu" | "cart">>;
}

const CartContents = ({ setDropDownContents }: CartContentsProps) => {
    const [totalPrice, setTotalPrice] = useState(0);
    const { cartItems, setCartItems } = useContext(ItemsContext);
    const user = useUserData();
    const router = useRouter();

    const handleClearButton = () => {
        setCartItems([]);
        clearCart({ userId: `${user?._id}` });
        setTimeout(() => {
            setDropDownContents("");
        }, 400);
    };

    useEffect(() => {
        const { totalPrice } = getTotalPrice(cartItems);
        setTotalPrice(totalPrice);
    }, [cartItems]);

    return (
        <List sx={{ height: "60%", zIndex: 11 }}>
            {cartItems && cartItems.length !== 0 ? (
                <Stack height="100%" overflow="scroll">
                    {cartItems.map((cartItem, index) => {
                        return (
                            <Fragment
                                key={`cart mini cards header container number ${index}`}
                            >
                                <MiniCard cartItem={cartItem} />
                            </Fragment>
                        );
                    })}
                </Stack>
            ) : (
                <Stack
                    height="100%"
                    alignItems="center"
                    justifyContent="center"
                >
                    <CircularProgress size={80} />
                </Stack>
            )}

            <Stack
                direction="row"
                py={{ xs: 2 }}
                justifyContent="space-between"
            >
                <Typography textTransform="capitalize">total :</Typography>
                <Typography textTransform="capitalize">
                    {totalPrice} JOD
                </Typography>
            </Stack>

            <Button
                variant="outlined"
                endIcon={<DeleteRoundedIcon />}
                sx={{ my: 1, textTransform: "lowercase", width: "100%" }}
                onClick={handleClearButton}
            >
                clear cart
            </Button>

            <Button
                variant="contained"
                endIcon={<ShoppingCartCheckoutIcon />}
                sx={{ my: 1, textTransform: "lowercase", width: "100%" }}
                onClick={() => {
                    router.push("/account/checkout");
                }}
            >
                checkout
            </Button>
        </List>
    );
};

export default CartContents;

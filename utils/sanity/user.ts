import { User } from "@/typess/user";
import { client } from "./client";
import { groq } from "next-sanity";
import { FormDataProps, UserFieldProps } from "@/pages/account/profile";

const userContents = `
    _id,
    userName,
    phoneNumber,
    email,
    password,
    address,
    isAdmin,
    gender,
    recentVisited[]->{
        _id,
        title,
        currentPrice,
        oldPrice,
        rating,
        category,
        image {
            asset->{
                url
            }
        },
    },
    wishlist[]->{
        _id,
        title,
        currentPrice,
        oldPrice,
        rating,
        category,
        image {
            asset->{
                url
            }
        },
    },
    cart {
        item->{
            _id,
            title,
            currentPrice,
            oldPrice,
            rating,
            category,
            image {
                asset->{
                    url
                }
            },
        },
        quantity,
    }[],
    orders[]->{
        items {
            quantity,
            item->{
                _id,
                title,
                currentPrice,
                oldPrice,
                category,
                image {
                    asset->{
                        url
                    }
                },
            },
        }[],
    },
    paymentMethods {
        name,
    }[],
    pricingRange {
        max,
        min,
    },
    avatar {
        asset->{
            url
        }
    },
`;

export async function getAllIUsers(): Promise<User[]> {
  return await client.fetch(groq`*[_type == "user"]{${userContents}}`);
}

export async function getUserByCondition(condition: {
  id?: string;
  email?: string;
}): Promise<User> {
  const { id, email } = condition;
  const query = `${id ? `_id == "${id}"` : `email == "${email}"`}`;
  const user = await client.fetch(
    groq`*[_type == "user" && ${query}]{${userContents}}`
  );
  return user[0];
}

export async function createUser({
  userName,
  email,
  password,
  avatarUrl,
  signUpType,
}: {
  userName: string;
  email: string;
  password: string;
  avatarUrl?: string;
  signUpType: "google" | "local";
}): Promise<Response> {
  try {
    return await fetch("/api/user/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        email,
        password,
        avatarUrl,
        signUpType,
      }),
    });
  } catch (err: any) {
    return err;
  }
}

export async function addToWishlist({
  userId,
  itemId,
}: {
  userId: string;
  itemId: string;
}) {
  try {
    return await fetch("/api/user/addToWishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        itemId,
      }),
    });
  } catch (err: any) {
    return err;
  }
}

export async function removeFromWishlist({
  userId,
  itemId,
}: {
  userId: string;
  itemId: string;
}) {
  try {
    return await fetch("/api/user/removeFromWishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        itemId,
      }),
    });
  } catch (err: any) {
    return err;
  }
}

export async function addToCart({
  userId,
  itemId,
}: {
  userId: string;
  itemId: string;
}) {
  try {
    return await fetch("/api/user/addToCart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        itemId,
      }),
    });
  } catch (err: any) {
    return err;
  }
}

export async function removeFromCart({
  userId,
  itemId,
}: {
  userId: string;
  itemId: string;
}) {
  try {
    return await fetch("/api/user/removeFromCart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        itemId,
      }),
    });
  } catch (err: any) {
    return err;
  }
}

export async function changeQuantCartItem({
  userId,
  itemId,
  sign,
  curQuant,
}: {
  userId: string;
  itemId: string;
  sign: "+" | "-";
  curQuant: number;
}) {
  try {
    return await fetch("/api/user/changeQuantCartItem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        itemId,
        sign,
        curQuant,
      }),
    });
  } catch (err: any) {
    return err;
  }
}

export async function clearCart({ userId }: { userId: string }) {
  try {
    return await fetch("/api/user/clearCart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
      }),
    });
  } catch (err: any) {
    return err;
  }
}

export async function changeDetails({
  userId,
  userOldPass,
  field,
  formData,
}: {
  userId: string;
  userOldPass: string;
  field: UserFieldProps;
  formData: FormDataProps;
}) {
  try {
    return await fetch("/api/user/changeDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        userOldPass,
        field,
        formData,
      }),
    });
  } catch (err: any) {
    return err;
  }
}

export async function deleteUser({ userId }: { userId: string }) {
  try {
    return await fetch(`/api/user/deleteUser?userId=${userId}`, {
      method: "DELETE",
    });
  } catch (err: any) {
    return err;
  }
}

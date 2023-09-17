import { Order } from "@/typess/order";
import { client } from "./client";
import { groq } from "next-sanity";

export async function getAllOrders(): Promise<Order[]> {
  return await client.fetch(groq`*[_type == "order"]{
        _id,
        user->{
            userName,
            phoneNumber,
            email,
            address,
            paymentMethods{
                name,
            }[],
            avatar {
                asset->{
                    url
                }
            },
        },
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
    }`);
}

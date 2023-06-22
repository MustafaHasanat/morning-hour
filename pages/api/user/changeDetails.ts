import { client } from "@/utils/sanity/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function changeDetails(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { userId, userOldPass, field, formData } = req.body;

    let clientObj: {
        [key: string]: string;
    } = {};

    switch (field) {
        case "userName":
            clientObj.userName = formData.userName;

            if (formData.userName.length < 5) {
                return res
                    .status(500)
                    .json({ message: "Username must have at least 5 letters" });
            }

            break;
        case "email":
            clientObj.email = formData.email;
            break;
        case "phoneNumber":
            clientObj.phoneNumber = formData.phoneNumber;
            break;
        case "gender":
            clientObj.gender = formData.gender;

            if (!["male", "female"].includes(formData.gender)) {
                return res.status(500).json({
                    message: `Gender must be either 'male' or 'female' => ${formData.gender}`,
                });
            }

            break;
        case "address":
            clientObj.address = formData.address;
            break;
        case "password":
            clientObj.password = formData.password;

            if (userOldPass !== formData.currentPassword) {
                return res.status(500).json({ message: "Wrong password!" });
            } else if (formData.password !== formData.confirmedPassword) {
                return res
                    .status(500)
                    .json({ message: "New passwords don't match!" });
            } else if (formData.password.length < 8) {
                return res.status(500).json({
                    message: "New password must have at least 8 characters",
                });
            }

            break;
        default:
            break;
    }

    try {
        await client.patch(userId).set(clientObj).commit();
    } catch (err) {
        return res.status(500).json({ message: `Couldn't edit details.`, err });
    }

    return res
        .status(200)
        .json({ message: "User details has been changed!", userId });
}

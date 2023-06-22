import { client } from "@/utils/sanity/client";
import axios from "axios";
import fs from "fs";
import { join } from "path";

interface UserProps {
    userName: string;
    email: string;
    password: string;
    avatarUrl: string;
}

const handleGoogleSignup = async ({
    userName,
    email,
    password,
    avatarUrl,
}: UserProps) => {
    // Download the image from the avatarUrl
    const response = await axios.get(avatarUrl, {
        responseType: "arraybuffer",
    });
    const buffer = Buffer.from(response.data);

    // Create the temp directory if it doesn't exist
    const tempDirPath = join(process.cwd(), "public", "temp");
    if (!fs.existsSync(tempDirPath)) {
        fs.mkdirSync(tempDirPath);
    }

    // Save the image locally
    const localImagePath = join(tempDirPath, "avatar.png");
    fs.writeFileSync(localImagePath, buffer);

    // Upload the image to Sanity as an asset
    const asset = await client.assets.upload(
        "image",
        fs.createReadStream(localImagePath)
    );

    // Create the user with the uploaded asset as the avatar
    await client.create({
        _type: "user",
        userName,
        email,
        password,
        avatar: {
            _type: "image",
            asset: {
                _type: "reference",
                _ref: asset._id,
            },
        },
    });

    // Remove the temporary local image file
    fs.unlinkSync(localImagePath);
};

const handleLocalSignup = async ({
    userName,
    email,
    password,
    avatarUrl,
}: UserProps) => {
    await client.create({
        _type: "user",
        userName,
        email,
        password,
        avatar: {
            _type: "image",
            asset: {
                _type: "reference",
                _ref: avatarUrl,
            },
        },
    });
};

export default async function createUser(req: any, res: any) {
    const { userName, email, password, avatarUrl, signUpType } = req.body;

    try {
        if (signUpType === "google") {
            handleGoogleSignup({
                userName,
                email,
                password,
                avatarUrl,
            });
        } else {
            handleLocalSignup({ userName, email, password, avatarUrl });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: `Couldn't create user`, err });
    }

    return res
        .status(200)
        .json({
            message: "User created!",
            userName,
            email,
            signUpType,
            avatarUrl,
        });
}

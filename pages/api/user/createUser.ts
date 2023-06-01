import { client } from "@/utils/sanity/client";

export default async function createUser(req: any, res: any) {
    const { userName, email, password } = req.body;

    try {
        await client.create({
            _type: "user",
            userName,
            email,
            password,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: `Couldn't create user`, err });
    }

    return res.status(200).json({ message: "User created!", userName, email });
}

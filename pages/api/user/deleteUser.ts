import { client } from "@/utils/sanity/client";

export default async function deleteUser(req: any, res: any) {
    const { userId } = req.query;

    try {
        await client.delete(userId);
    } catch (err) {
        return res
            .status(500)
            .json({ message: `Couldn't delete the account.`, err });
    }

    return res
        .status(200)
        .json({ message: "Account has been deleted!", userId });
}

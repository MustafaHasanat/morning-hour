export default async function createPaypalOrder(req: any, res: any) {
    try {
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create order" });
    }

    return res.status(200).json({ message: "Order is created!" });
}

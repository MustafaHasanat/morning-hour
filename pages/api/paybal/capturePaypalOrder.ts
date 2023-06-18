export default async function capturePaypalOrder(req: any, res: any) {
    try {
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ message: `Couldn't create the order.`, err });
    }

    return res.status(200).json({ message: "Order is created!" });
}

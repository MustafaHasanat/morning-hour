// pages/api/upload.js
import fs from "fs";
import { join } from "path";

export default function uploadLocalPhoto(req: any, res: any) {
    if (req.method !== "POST") {
        return res.status(405).end(); // Method Not Allowed
    }

    const { file } = req.body;
    const tempFolder = join(process.cwd(), "public", "temp");

    // Create the temporary folder if it doesn't exist
    if (!fs.existsSync(tempFolder)) {
        fs.mkdirSync(tempFolder);
    }

    const filePath = join(tempFolder, file);

    // Move the uploaded file to the temporary folder
    file.mv(filePath, (err: any) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error uploading file");
        }

        return res.status(200).send("File uploaded successfully");
    });
}

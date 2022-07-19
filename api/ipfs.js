import { useState } from "react";
import axios from "axios";

export default async function handler(req, res) {
    const imageURI = decodeURI(req.query.imageURI);
    const imageData = await axios
        .get(imageURI, {
            responseType: "arraybuffer",
        })
        .then((response) =>
            Buffer.from(response.data, "binary").toString("base64")
        );
    res.json({
        imageBase64: imageData,
    });
}

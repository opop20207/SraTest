import { useState } from "react";
import axios from "axios";

export default async function handler(req, res) {
    const imageURI = decodeURI(req.query.imageURI);
    res.json({
        imageBase64: await axios
            .get(imageURI)
            .then((response) => response.blob()),
    });
}

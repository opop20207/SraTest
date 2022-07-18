import axios from "axios";
import { useState } from "react";
export default async function handler(req, res) {
    const imageURI = req.query;
    console.log("!!!!!!!!!!!!!!!!!!!!!!!", imageURI);
    res.json({
        imageBase64: axios
            .get(imageURI, {
                responseType: "arraybuffer",
            })
            .then((response) => Buffer.from(response.data, "binary").toString),
    });
}

import { useState } from "react";

export default async function handler(req, res) {
    const imageURI = req.query.imageURI;

    res.json({
        imageBase64: fetch(imageURI).then((response) => response.blob()),
    });
}

import axios from "axios";

export default async function handler(req, res) {
    const imageURI = req.query;
    try {
    } catch {}
    res.json({
        imageBase64: axios
            .get(imageURI, {
                responseType: "arraybuffer",
            })
            .then((response) => Buffer.from(response.data, "binary").toString),
    });
}

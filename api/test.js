import axios from "axios";

export default async function handler(req, res) {
    res.json({
        res: req.query,
    });
}

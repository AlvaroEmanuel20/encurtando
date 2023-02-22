import { Request, Response } from "express";
import { ShortUrl } from "../models/ShortUrl";

export default class Controller {
    async show(req: Request, res: Response) {
        try {
            const { shortId } = req.params;
            const shortUrl = await ShortUrl.findOne({ shortId });
            if (!shortUrl) return res.sendStatus(404);

            const data = {
                _id: shortUrl._id,
                shortUrl: `${process.env.APP_URL}/${shortUrl.shortId}`,
                shortId: shortUrl.shortId,
                originalUrl: shortUrl.originalUrl,
                clicks: shortUrl.clicks,
            };

            res.json(data);
        } catch (error) {
            res.status(500).json({
                msg: "Internal server error.",
                error,
            });
        }
    }

    async redirect(req: Request, res: Response) {
        try {
            const { shortId } = req.params;
            const shortUrl = await ShortUrl.findOne({ shortId });
            if (!shortUrl) return res.sendStatus(404);

            shortUrl.clicks++;
            shortUrl.save();

            res.redirect(shortUrl.originalUrl);
        } catch (error) {
            res.status(500).json({
                msg: "Internal server error.",
                error,
            });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { url } = req.body;
            const shortUrl = await ShortUrl.create({ originalUrl: url });

            const data = {
                _id: shortUrl._id,
                shortUrl: `${process.env.APP_URL}/${shortUrl.shortId}`,
                shortId: shortUrl.shortId,
                originalUrl: shortUrl.originalUrl,
                clicks: shortUrl.clicks,
            };

            res.status(201).json(data);
        } catch (error) {
            res.status(500).json({
                msg: "Internal server error.",
                error,
            });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { shortId } = req.params;
            const shortUrl = await ShortUrl.findOne({ shortId });
            if (!shortUrl) return res.sendStatus(404);

            await ShortUrl.deleteOne({ shortId });
            res.sendStatus(200);
        } catch (error) {
            res.status(500).json({
                msg: "Internal server error.",
                error,
            });
        }
    }
}

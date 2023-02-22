import { NextFunction, Request, Response } from "express";

export default class Validation {
    async validate(req: Request, res: Response, next: NextFunction) {
        try {
            const { url } = req.body;

            if (!url)
                return res.status(400).json({
                    msg: "URL is required.",
                });

            try {
                const isUrl = new URL(url);
                req.body.url = isUrl.href;
            } catch (error) {
                return res.status(400).json({
                    msg: "Incorret URL."
                });
            }

            next();
        } catch (error) {
            res.status(500).json({
                msg: "Internal server error",
                error,
            });
        }
    }
}

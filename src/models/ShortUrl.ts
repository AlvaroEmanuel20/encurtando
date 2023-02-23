import { Schema, model } from "mongoose";
import shortid from "shortid";

export const ShortUrl = model(
    "ShortUrl",
    new Schema({
        shortId: {
            type: String,
            required: true,
            default: shortid.generate,
        },
        originalUrl: {
            type: String,
            required: true,
        },
        clicks: {
            type: Number,
            required: true,
            default: 0,
        },
    })
);

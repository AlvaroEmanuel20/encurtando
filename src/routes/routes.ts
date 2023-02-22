import { Router } from "express";
import Controller from "../controllers/Controller";
import Validation from "../lib/Validation";

export const router = Router();
const controller = new Controller();
const validation = new Validation();

router.get("/show/:shortId", controller.show);
router.get("/:shortId", controller.redirect);
router.post("/", validation.validate, controller.create);
router.delete("/:shortId", controller.delete);

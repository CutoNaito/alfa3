import { Router } from "express";
import { create, readAll, readById, update, remove, importData } from "../controllers/ProduktController";

const router = Router();

router.route("/").post(create).get(readAll);
router.route("/:id").get(readById).put(update).delete(remove);
router.route("/import").post(importData);

export default router;
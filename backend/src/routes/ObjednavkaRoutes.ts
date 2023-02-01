import { Router } from "express";
import { create, readAll, readById, update, remove, readReport } from "../controllers/ObjednavkaController";

const router = Router();

router.route("/").post(create).get(readAll);
router.route("/:id").get(readById).put(update).delete(remove);
router.route("/report/:id_zak").get(readReport);

export default router;
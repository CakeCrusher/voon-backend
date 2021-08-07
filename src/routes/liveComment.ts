import { Router } from "express";
import { getLiveComments } from "../controllers/liveComment";

const router = Router();

router.get("/liveComments", getLiveComments);

export default router;

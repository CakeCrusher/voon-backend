import { Router } from "express";
import { makeFileSnippet } from "../controllers/fileSnippet";

const router = Router();

router.post("/fileSnippet", makeFileSnippet);

export default router;

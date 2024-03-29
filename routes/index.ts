import { Router } from "express";
import middleware from "./../middleware/index.ts";

const router = Router();

router.get("/", middleware);

export default router;

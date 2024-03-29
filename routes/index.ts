import { Router } from "express";
import middleware from "./../middleware/index.ts";
import controller from "../controllers/index.ts";

const router = Router();

router.get("/", middleware, controller);

export default router;

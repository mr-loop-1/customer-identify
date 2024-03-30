import { Router } from "express";
import middleware from "./../middleware/index";
import controller from "../controllers/index";

const router = Router();

router.post("/", middleware, controller);

export default router;

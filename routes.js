import { Router } from "express";
const { middleware } = require("./middleware");

const router = Router();

router.post(middleware);

export default router;

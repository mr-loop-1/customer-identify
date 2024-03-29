const { Router } = require("express");
const { middleware } = require("./middleware");
const router = Router();

router.post(middleware);

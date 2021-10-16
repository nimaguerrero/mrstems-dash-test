const { Router } = require("express");

const { createReport } = require("./report.controller");

const { validateJWT } = require("../../middlewares/validate-jwt.middleware");

const router = Router();

router.post("/", validateJWT, createReport);

module.exports = router;

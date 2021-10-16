const { Router } = require("express");

const {
    getReportsByPage,
    getReport,
    responseReport,
} = require("./report.controller");

const { validateJWT } = require("../../middlewares/validate-jwt.middleware");

const { validateUSER_or_ADMIN } = require("../../middlewares/role.middleware");

const router = Router();

router.get("/paginado", [validateJWT, validateUSER_or_ADMIN], getReportsByPage);

router.patch("/:id", [validateJWT, validateUSER_or_ADMIN], responseReport);

module.exports = router;

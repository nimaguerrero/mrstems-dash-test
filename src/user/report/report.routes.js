const { Router } = require("express");

const {
    getReportsByPage,
    getReport,
    responseReport,
    getCountPendingReports,
} = require("./report.controller");

const { validateJWT } = require("../../middlewares/validate-jwt.middleware");

const { validateUSER_or_ADMIN } = require("../../middlewares/role.middleware");

const router = Router();

router.get("/paginado", [validateJWT, validateUSER_or_ADMIN], getReportsByPage);
router.get(
    "/count",
    [validateJWT, validateUSER_or_ADMIN],
    getCountPendingReports
);

router.patch("/:id", [validateJWT, validateUSER_or_ADMIN], responseReport);

module.exports = router;

const { Router } = require("express");

const {
    getAllOrdersByPage,
    getOrder,
    updateStateOrder,
    cancelOrder,
} = require("./order.controller");
const { validateJWT } = require("../../middlewares/validate-jwt.middleware");
const { validateUSER_or_ADMIN } = require("../../middlewares/role.middleware");

const router = Router();

router.get(
    "/paginado",
    [validateJWT, validateUSER_or_ADMIN],
    getAllOrdersByPage
);
router.get("/:id", [validateJWT, validateUSER_or_ADMIN], getOrder);
router.put("/:id", [validateJWT, validateUSER_or_ADMIN], updateStateOrder);
router.patch("/:id", [validateJWT, validateUSER_or_ADMIN], cancelOrder);

module.exports = router;

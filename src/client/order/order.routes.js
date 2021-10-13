const { Router } = require("express");

const {
    createOrder,
    getOrder,
    getClientOrdersByPage,
    sendTicket,
} = require("./order.controller");
const { validateJWT } = require("../../middlewares/validate-jwt.middleware");

const router = Router();

router.get("/paginado", validateJWT, getClientOrdersByPage);
router.get("/ticket/:id", validateJWT, sendTicket);
router.post("/:id", validateJWT, getOrder);
router.post("/", validateJWT, createOrder);

module.exports = router;

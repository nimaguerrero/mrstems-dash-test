const { Router } = require("express");

const {
    createOrder,
    getOrder,
    getClientOrdersByPage,
} = require("./order.controller");
const { validateJWT } = require("../../middlewares/validate-jwt.middleware");

const router = Router();

router.get("/paginado", validateJWT, getClientOrdersByPage);
// router.get("/ticket/:id", validateJWT, sendTicket); //puede ser a un futuro si no le ha llegado este pero para el admin
router.get("/:id", validateJWT, getOrder);
router.post("/", validateJWT, createOrder);
router.post("/create", validateJWT, createOrder);
router.post("/create-no-password", createOrder);

module.exports = router;

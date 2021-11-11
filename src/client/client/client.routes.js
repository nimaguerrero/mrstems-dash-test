const { Router } = require("express");

const {
    registerClient,
    loginClient,
    updateClient,
    getProfile,
} = require("./client.controller");

const { validateJWT } = require("../../middlewares/validate-jwt.middleware");

const router = Router();

router.get("/profile", validateJWT, getProfile);
router.post("/register", registerClient);
router.post("/login", loginClient);

router.put("/:id", validateJWT, updateClient);

module.exports = router;

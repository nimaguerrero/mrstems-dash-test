const { Router } = require("express");

const {
    registerUser,
    loginUser,
    updateUser,
    getProfile,
    getUser,
} = require("./user.controller");

const { validateJWT } = require("../../middlewares/validate-jwt.middleware");
const {
    validateADMIN_or_SAME_USER,
} = require("../../middlewares/role.middleware");

const router = Router();

router.get("/dash-user", [validateJWT, validateADMIN_or_SAME_USER], getUser);
router.get("/profile", [validateJWT, validateADMIN_or_SAME_USER], getProfile);
router.post("/register", registerUser);
router.post("/login", loginUser);

router.put("/:id", [validateJWT, validateADMIN_or_SAME_USER], updateUser);

module.exports = router;

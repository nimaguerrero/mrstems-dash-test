const { Router } = require("express");

const {
    registerUser,
    loginUser,
    updateUser,
    getProfile,
    getUser,
    sendEmail,
    getTimeCode,
    updatePassword,
} = require("./user.controller");

const { validateJWT } = require("../../middlewares/validate-jwt.middleware");
const {
    validateADMIN_or_SAME_USER,
    validateUSER_or_ADMIN,
} = require("../../middlewares/role.middleware");

const router = Router();

router.get("/change-password/:code", getTimeCode);

router.get("/dash-user", [validateJWT, validateADMIN_or_SAME_USER], getUser);
router.get("/profile", [validateJWT, validateADMIN_or_SAME_USER], getProfile);

router.post("/change-password/email", sendEmail);
router.post("/change-password/update-password", updatePassword);

router.post("/register", registerUser);
router.post("/login", loginUser);

router.put("/:id", [validateJWT, validateADMIN_or_SAME_USER], updateUser);

module.exports = router;

const { Router } = require("express");

const {
    getUsersByPage,
    getUser,
    updateUser,
    deactivateUser,
    createUser,
    deleteUser,
} = require("./user.controller");

const { validateJWT } = require("../../middlewares/validate-jwt.middleware");

const { validateADMIN } = require("../../middlewares/role.middleware");

const router = Router();

router.get("/paginado", [validateJWT, validateADMIN], getUsersByPage);
router.get("/:id", [validateJWT, validateADMIN], getUser);

router.post("/", [validateJWT, validateADMIN], createUser);
router.put("/:id", [validateJWT, validateADMIN], updateUser);
router.patch("/:id", [validateJWT, validateADMIN], deactivateUser);
router.delete("/:id", [validateJWT, validateADMIN], deleteUser);

module.exports = router;

const { Router } = require("express");

const { getSetting, updateSetting } = require("./setting.controller");

const { validateJWT } = require("../../middlewares/validate-jwt.middleware");

const { validateADMIN } = require("../../middlewares/role.middleware");

const router = Router();

router.get("/", [validateJWT, validateADMIN], getSetting);
router.put("/", [validateJWT, validateADMIN], updateSetting);

module.exports = router;

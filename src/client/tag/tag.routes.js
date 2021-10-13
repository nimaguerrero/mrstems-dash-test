const { Router } = require("express");

const { getTags } = require("./tag.controller");

const { validateJWT } = require("../../middlewares/validate-jwt.middleware");

const { validateUSER_or_ADMIN } = require("../../middlewares/role.middleware");

const router = Router();

router.get("/:songID", [validateJWT, validateUSER_or_ADMIN], getTags);

module.exports = router;

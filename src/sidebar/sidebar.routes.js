const { Router } = require("express");

const { validateJWT } = require("../middlewares/validate-jwt.middleware");

const { validateUSER_or_ADMIN } = require("../middlewares/role.middleware");
const { sidebar } = require("./sidebar.controller");

const router = Router();

router.get("/", [validateJWT, validateUSER_or_ADMIN], sidebar);

module.exports = router;

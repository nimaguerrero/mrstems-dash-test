const { Router } = require("express");

const {
    getTags,
    getTag,
    createTag,
    updateTag,
    deleteTag,
} = require("./tag.controller");

const { validateJWT } = require("../../middlewares/validate-jwt.middleware");

const { validateUSER_or_ADMIN } = require("../../middlewares/role.middleware");

const router = Router();

router.get("/:songID", [validateJWT, validateUSER_or_ADMIN], getTags);
router.get("/:id", [validateJWT, validateUSER_or_ADMIN], getTag);

router.post("/", [validateJWT, validateUSER_or_ADMIN], createTag);

router.put("/:id", [validateJWT, validateUSER_or_ADMIN], updateTag);
router.delete("/:id", [validateJWT, validateUSER_or_ADMIN], deleteTag);

module.exports = router;

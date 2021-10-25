const { Router } = require("express");

const {
    getTagsByPage,
    getTag,
    createTag,
    updateTag,
    deleteTag,
    getTagsOfSettings,
} = require("./tag.controller");

const { validateJWT } = require("../../middlewares/validate-jwt.middleware");

const { validateUSER_or_ADMIN } = require("../../middlewares/role.middleware");

const router = Router();

router.get(
    "/settings",
    [validateJWT, validateUSER_or_ADMIN],
    getTagsOfSettings
);
router.get("/paginado", [validateJWT, validateUSER_or_ADMIN], getTagsByPage);
router.get("/:id", [validateJWT, validateUSER_or_ADMIN], getTag);

router.post("/", [validateJWT, validateUSER_or_ADMIN], createTag);

router.put("/:id", [validateJWT, validateUSER_or_ADMIN], updateTag);
router.delete("/:id", [validateJWT, validateUSER_or_ADMIN], deleteTag);

module.exports = router;

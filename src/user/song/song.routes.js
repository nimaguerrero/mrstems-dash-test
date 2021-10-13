const { Router } = require("express");

const {
    getSongsByPage,
    getSong,
    updateSong,
    deactivateSong,
    createSong,
} = require("./song.controller");

const router = Router();

const { validateJWT } = require("../../middlewares/validate-jwt.middleware");
const { validateUSER_or_ADMIN } = require("../../middlewares/role.middleware");

router.get("/paginado", [validateJWT, validateUSER_or_ADMIN], getSongsByPage);
router.get("/:id", [validateJWT, validateUSER_or_ADMIN], getSong);

router.post("/", [validateJWT, validateUSER_or_ADMIN], createSong);

router.put("/:id", [validateJWT, validateUSER_or_ADMIN], updateSong);
router.patch("/:id", [validateJWT, validateUSER_or_ADMIN], deactivateSong);

module.exports = router;

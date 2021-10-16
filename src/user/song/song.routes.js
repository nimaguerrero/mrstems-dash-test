const { Router } = require("express");

const {
    getAllSongs,
    getSongsByPage,
    getSong,
    updateSong,
    deactivateSong,
    createSong,
    deleteSong,
} = require("./song.controller");

const router = Router();

const { validateJWT } = require("../../middlewares/validate-jwt.middleware");
const { validateUSER_or_ADMIN } = require("../../middlewares/role.middleware");

router.get("/all", [validateJWT, validateUSER_or_ADMIN], getAllSongs);
router.get("/paginado", [validateJWT, validateUSER_or_ADMIN], getSongsByPage);
router.get("/:id", [validateJWT, validateUSER_or_ADMIN], getSong);

router.post("/", [validateJWT, validateUSER_or_ADMIN], createSong);

router.put("/:id", [validateJWT, validateUSER_or_ADMIN], updateSong);
router.patch("/:id", [validateJWT, validateUSER_or_ADMIN], deactivateSong);
router.delete("/:id/:pid", [validateJWT, validateUSER_or_ADMIN], deleteSong);

module.exports = router;

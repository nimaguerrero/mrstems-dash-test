const { Router } = require("express");

const { getSongsByPage, getSongBySlug } = require("./song.controller");

const router = Router();

router.get("/paginado", getSongsByPage);
router.get("/:slug", getSongBySlug);

module.exports = router;

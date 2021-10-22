const { Router } = require("express");

const { getSongsByPage, getSong } = require("./song.controller");

const router = Router();

router.get("/paginado", getSongsByPage);
router.get("/:id", getSong);

module.exports = router;

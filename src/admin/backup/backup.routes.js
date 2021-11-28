const { Router } = require("express");

const { validateJWT } = require("../../middlewares/validate-jwt.middleware");

const { validateADMIN } = require("../../middlewares/role.middleware");
const {
  backup,
  backupCompressed,
  backupCollection,
  restore,
  getCollections,
} = require("./backup.controller");

const router = Router();

router.get("/names-collections", [validateJWT, validateADMIN], getCollections);
router.post("/backup", [validateJWT, validateADMIN], backup);
router.post("/backup-gzip", [validateJWT, validateADMIN], backupCompressed);
router.post(
  "/backup/:collection",
  [validateJWT, validateADMIN],
  backupCollection
);
router.post("/restore", [validateJWT, validateADMIN], restore);

module.exports = router;

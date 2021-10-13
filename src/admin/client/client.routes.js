const { Router } = require("express");

const {
    getClientsByPage,
    getClient,
    updateClientTest,
    deactivateClient,
    createClientTest,
    deleteClientTest,
} = require("./client.controller");

const { validateJWT } = require("../../middlewares/validate-jwt.middleware");

const { validateADMIN } = require("../../middlewares/role.middleware");

const router = Router();

router.get("/paginado", [validateJWT, validateADMIN], getClientsByPage);
router.get("/:id", [validateJWT, validateADMIN], getClient);

router.post("/test", [validateJWT, validateADMIN], createClientTest);

router.put("/:id", [validateJWT, validateADMIN], updateClientTest);
router.patch("/:id", [validateJWT, validateADMIN], deactivateClient);
router.delete("/:id", [validateJWT, validateADMIN], deleteClientTest);

module.exports = router;

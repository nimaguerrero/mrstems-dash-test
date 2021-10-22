const { Router } = require("express");

const {
    totalSales,
    totalSalesByMonth,
    graphSaleXMonth,
    bestSellingSongs,
    countClients,
    bestSellingTags,
} = require("./home.controller");

const { validateJWT } = require("../../middlewares/validate-jwt.middleware");

const { validateADMIN } = require("../../middlewares/role.middleware");

const router = Router();

router.get("/count-clients", [validateJWT, validateADMIN], countClients);
router.get("/total", [validateJWT, validateADMIN], totalSales);
router.get(
    "/month/:year/:month",
    [validateJWT, validateADMIN],
    totalSalesByMonth
);
router.get(
    "/graph-sales-month/:year",
    [validateJWT, validateADMIN],
    graphSaleXMonth
);

router.get(
    "/best-selling-songs/:limit",
    [validateJWT, validateADMIN],
    bestSellingSongs
);
router.get("/best-selling-tags", [validateJWT, validateADMIN], bestSellingTags);

module.exports = router;

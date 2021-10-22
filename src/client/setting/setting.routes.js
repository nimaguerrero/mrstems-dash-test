const { Router } = require("express");

const {
    getCategories,
    getDelivery,
    getBlackLogo,
    getWhiteLogo,
} = require("./setting.controller");

const router = Router();

router.get("/black-logo", getBlackLogo);
router.get("/white-logo", getWhiteLogo);
router.get("/delivery", getDelivery);
router.get("/categories", getCategories);

module.exports = router;

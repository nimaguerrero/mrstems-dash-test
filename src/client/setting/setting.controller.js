const { response, request } = require("express");
const Config = require("../../models/setting.model");

const getDelivery = async (req = request, res = response) => {
    const idConfig = process.env.IDCONFIG;
    try {
        const { delivery } = await Config.findById(idConfig);
        res.json({
            ok: true,
            delivery,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const getCategories = async (req = request, res = response) => {
    const idConfig = process.env.IDCONFIG;
    try {
        const { categories } = await Config.findById(idConfig);
        res.json({
            ok: true,
            categories,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const getBlackLogo = async (req = request, res = response) => {
    const idConfig = process.env.IDCONFIG;
    try {
        const { logo } = await Config.findById(idConfig);
        res.json({
            ok: true,
            logo,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};
const getWhiteLogo = async (req = request, res = response) => {
    const idConfig = process.env.IDCONFIG;
    try {
        const { logo_white } = await Config.findById(idConfig);
        res.json({
            ok: true,
            logo: logo_white,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

module.exports = {
    getDelivery,
    getCategories,
    getWhiteLogo,
    getBlackLogo,
};

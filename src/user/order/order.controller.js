const { response, request } = require("express");
const Sale = require("../../models/sale.model");
const SaleDetail = require("../../models/sale-detail.model");
const {
    conditionPrevious,
    conditionNext,
    fillPagesArr,
} = require("../../helpers/pages.helper");

const getAllOrdersByPage = async (req = request, res = response) => {
    const term = req.query.term;
    const regex = new RegExp(term, "i");

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let orders = {
        orders: [],
        next: null,
        previous: null,
        pages: [],
        longitud: 0,
    };

    try {
        const longitud = await Sale.find({
            nsale: regex,
        }).countDocuments();
        orders.longitud = longitud;
        orders.orders = await Sale.find({
            nsale: regex,
        })
            .populate("client", "name lastname email")
            .limit(limit)
            .skip(startIndex);

        const lengthArr = Math.ceil(longitud / limit);
        orders.pages = fillPagesArr(lengthArr);

        orders.previous = conditionPrevious(startIndex, page, limit);
        orders.next = conditionNext(endIndex, longitud, page, limit);

        res.json({
            ok: true,
            orders,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const getClientOrdersByPage = async (req = request, res = response) => {
    const client = req.params.clientID;

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let orders = {
        orders: [],
        next: null,
        previous: null,
        pages: [],
        longitud: 0,
    };

    try {
        const longitud = await Sale.find({
            client,
        }).countDocuments();
        orders.longitud = longitud;
        orders.orders = await Sale.find({
            client,
        })
            .populate("client", "name lastname")
            .limit(limit)
            .skip(startIndex);

        const lengthArr = Math.ceil(longitud / limit);
        orders.pages = fillPagesArr(lengthArr);

        orders.previous = conditionPrevious(startIndex, page, limit);
        orders.next = conditionNext(endIndex, longitud, page, limit);

        res.json({
            ok: true,
            orders,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const getOrder = async (req = request, res = response) => {
    const id = req.params.id;
    try {
        const order = await Sale.findById(id).populate(
            "client",
            "name lastname email"
        );
        const details = await SaleDetail.find({ nsale: id }).populate(
            "tag",
            "name price premium link"
        );
        res.json({
            ok: true,
            order,
            details,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const updateStateOrder = async (req = request, res = response) => {
    const id = req.params.id;
    const { state, email, link } = req.body;
    try {
        await Sale.findByIdAndUpdate(id, { $set: { state } });
        res.json({
            ok: true,
            msg: "Envio de link exitoso",
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
    getAllOrdersByPage,
    getClientOrdersByPage,
    getOrder,
    updateStateOrder,
};

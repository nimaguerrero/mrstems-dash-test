const { response, request } = require("express");
const Sale = require("../../models/sale.model");
const SaleDetail = require("../../models/sale-detail.model");
const Song = require("../../models/song.model");
const Tag = require("../../models/tag.model");
const Setting = require("../../models/setting.model");
const {
    conditionPrevious,
    conditionNext,
    fillPagesArr,
} = require("../../helpers/pages.helper");

const handlebars = require("handlebars");
const ejs = require("ejs");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const path = require("path");

const getClientOrdersByPage = async (req = request, res = response) => {
    const client = req.uid;

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
        const order = await Sale.findById(id);
        const details = await SaleDetail.findById(id);
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

const createOrder = async (req = request, res = response) => {
    const client = req.uid;
    const { details, ...sale } = req.body;
    try {
        const idSetting = process.env.IDCONFIG;
        const { serie, correlative } = await Setting.findById(idSetting);

        const newSale = new Sale(sale);
        newSale.client = client;

        const lastSale = await Sale.find().sort({ createdAt: -1 });
        if (lastSale.length > 0) {
            const sc = lastSale[0].sale.split("-");
            if (sc[1] !== "999999") {
                const newCorrelative = zfill(Number(sc[1]) + 1, 6);
                newSale.sale = `${serie} - ${newCorrelative}`;
            } else {
                const newSerie = zfill(Number(sc[0]) + 1, 3);
                newSale.sale = `${serie} - ${newSerie}`;
            }
        } else {
            newSale.sale = `${serie} - ${correlative}`;
        }

        await newSale.save();

        let sdArr = [];

        details.forEach(async (detail) => {
            const newSaleDetail = new SaleDetail(detail);
            newSaleDetail.client = client;
            newSaleDetail.sale = newSale.id;
            await newSaleDetail.save();
            sdArr.push(detail);
        });

        res.json({
            ok: true,
            msg: "Se registro la venta exitosamente",
            sale,
            details: sdArr,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const sendTicket = async (req = request, res = response) => {
    const id = req.params.id;

    const readHTMLFile = function (path, callback) {
        fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
            if (err) {
                throw err;
                callback(err);
            } else {
                callback(null, html);
            }
        });
    };

    const transporter = nodemailer.createTransport(
        smtpTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            auth: {
                user: "mrstems21@gmail.com",
                pass: "zebdjdlxriizuizc",
            },
        })
    );

    const venta = await Sale.findById(id).populate("client");
    const detalles = await SaleDetail.find({ sale: id }).populate("tag");
    const cliente = `${venta.client.name} ${venta.client.lastname}`;
    const fecha = new Date(venta.createdAt);
    const data = detalles;
    const subtotal = venta.subtotal;
    const total = venta.total;
    const precio_envio = venta.igv;
    //cliente _id fecha data subtotal

    readHTMLFile(process.cwd() + "/mail.html", (err, html) => {
        let rest_html = ejs.render(html, {
            data,
            cliente,
            id,
            fecha,
            subtotal,
            total,
            precio_envio,
        });

        let template = handlebars.compile(rest_html);
        let htmlToSend = template({ op: true });

        let mailOptions = {
            from: "mrstems21@gmail.com",
            to: venta.client.email,
            subject: "Gracias por tu compra, Mi Tienda",
            html: htmlToSend,
        };
        res.status(200).send({ data: true });
        transporter.sendMail(mailOptions, function (error, info) {
            if (!error) {
                console.log("Email sent: " + info.response);
            }
        });
    });
};

const zfill = (number, width) => {
    let numberOutput = Math.abs(number);
    let length = number.toString().length;
    let zero = "0";

    if (width <= length) {
        if (number < 0) {
            return "-" + numberOutput.toString();
        } else {
            return numberOutput.toString();
        }
    } else {
        if (number < 0) {
            return "-" + zero.repeat(width - length) + numberOutput.toString();
        } else {
            return zero.repeat(width - length) + numberOutput.toString();
        }
    }
};

module.exports = {
    getClientOrdersByPage,
    getOrder,
    createOrder,
    sendTicket,
};

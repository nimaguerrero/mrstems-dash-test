const { response, request } = require("express");
const Tag = require("../../models/tag.model");
const Setting = require("../../models/setting.model");
const Sale = require("../../models/sale.model");
const SaleDetail = require("../../models/sale-detail.model");
const {
  conditionPrevious,
  conditionNext,
  fillPagesArr,
} = require("../../helpers/pages.helper");

const fs = require("fs");
const handlebars = require("handlebars");
const ejs = require("ejs");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const path = require("path");

const { IDCONFIG } = require("../../config/production");

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
      $or: [{ nsale: regex }, { transaction: regex }, { client_search: regex }],
    }).countDocuments();
    orders.longitud = longitud;
    orders.orders = await Sale.find({
      $or: [{ nsale: regex }, { transaction: regex }, { client_search: regex }],
    })
      .populate("client", "name lastname email")
      .limit(limit)
      .skip(startIndex)
      .sort({ createdAt: -1 });

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
    const details = await SaleDetail.find({ sale: id }).populate("tag");
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

  const idSetting = IDCONFIG;
  const { logo } = await Setting.findById(idSetting);

  const { state, link, tagid } = req.body;
  try {
    await Sale.findByIdAndUpdate(id, { $set: { state } });
    await sendTicket(id, link, logo, res);
    await Tag.findByIdAndUpdate(tagid, { $inc: { nsales: 1 } });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs",
    });
  }
};

const sendTicket = async (id, link, logo, res) => {
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

  const venta = await Sale.findById(id).populate(
    "client",
    "name lastname email"
  );
  const cliente = `${venta.client.name} ${venta.client.lastname}`;

  readHTMLFile(process.cwd() + "/send-link.html", (err, html) => {
    let rest_html = ejs.render(html, {
      cliente,
      link,
      logo,
    });

    let template = handlebars.compile(rest_html);
    let htmlToSend = template({ op: true });

    let mailOptions = {
      from: "mrstems21@gmail.com",
      to: venta.client.email,
      subject: "Gracias por tu compra, Mi Tienda",
      html: htmlToSend,
    };
    res.json({
      ok: true,
      msg: "Envio de link exitoso",
    });
    transporter.sendMail(mailOptions, function (error, info) {
      if (!error) {
        console.log("Email sent: " + info.response);
      }
    });
  });
};

const cancelOrder = async (req = request, res = response) => {
  const id = req.params.id;
  const { state } = req.body;

  try {
    await Sale.findByIdAndUpdate(id, { $set: { state } });
    res.json({
      ok: true,
      msg: "El pedido se ha cancelado por favor avisar al cliente por correo que su pago fue incorrecto y no se ejecutara el pedido",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs",
    });
  }
};

const deleteOrder = async (req = request, res = Response) => {
  const id = req.params.id;
  try {
    await Sale.findByIdAndDelete(id);
    await SaleDetail.findOneAndDelete({ sale: id });

    res.json({
      ok: true,
      msg: "Orden eliminada",
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
  getOrder,
  updateStateOrder,
  cancelOrder,
  deleteOrder,
};

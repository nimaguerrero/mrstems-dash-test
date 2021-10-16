const { response, request } = require("express");
const Report = require("../../models/report.model");

const createReport = async (req = request, res = response) => {
    const addReport = req.body;
    const client = req.uid;

    try {
        const newReport = new Report(addReport);
        newReport.client = client;
        await newReport.save();

        res.json({
            ok: true,
            msg: "Mensaje enviado",
            report: newReport,
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
    createReport,
};

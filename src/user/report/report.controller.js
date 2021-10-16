const { response, request } = require("express");
const Report = require("../../models/report.model");
const {
    conditionPrevious,
    conditionNext,
    fillPagesArr,
} = require("../../helpers/pages.helper");

const getReportsByPage = async (req = request, res = response) => {
    const term = req.query.term;
    const regex = new RegExp(term, "i");

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let reports = {
        reports: [],
        next: null,
        previous: null,
        pages: [],
        longitud: 0,
    };

    try {
        const longitud = await Report.find({
            $or: [{ problem: regex }, { email: regex }],
        }).countDocuments();
        reports.longitud = longitud;
        reports.reports = await Report.find({
            $or: [{ problem: regex }, { email: regex }],
        })
            .populate("tag", "name search_song")
            .limit(limit)
            .skip(startIndex);

        const lengthArr = Math.ceil(longitud / limit);
        reports.pages = fillPagesArr(lengthArr);

        reports.previous = conditionPrevious(startIndex, page, limit);
        reports.next = conditionNext(endIndex, longitud, page, limit);

        res.json({
            ok: true,
            reports,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const responseReport = async (req = request, res = response) => {
    const id = req.params.id;
    const { state } = req.body;
    const responseM = { $set: { state } };
    try {
        const report = await Report.findByIdAndUpdate(id, responseM, {
            new: true,
        });
        if (report.state === "Resuelto") {
            return res.json({
                ok: true,
                msg: "Reporte solucionado",
            });
        } else {
            return res.json({
                ok: true,
                msg: "Reporte no solucionado, pendiente",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

module.exports = {
    getReportsByPage,
    responseReport,
};

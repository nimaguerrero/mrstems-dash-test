const { response, request } = require("express");
const Sale = require("../../models/sale.model");
const SaleDetail = require("../../models/sale-detail.model");
const Tag = require("../../models/tag.model");
const Client = require("../../models/client.model");
const { combineArrayCount } = require("../../helpers/combineArray.helper");

const totalSales = async (req = request, res = response) => {
    try {
        const totalA = await Sale.find({}, { total: 1, _id: 0 });

        const totalB = [];
        let total = 0;
        totalA.forEach((t, i) => {
            totalB[i] = t.total;
        });
        totalB.forEach((t) => (total += t));
        res.json({
            ok: true,
            total,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const totalSalesByMonth = async (req = request, res = response) => {
    const year = Number(req.params.year);
    const month = Number(req.params.month);
    const year_month = `${year}-${month}`;
    try {
        const fecha_total = await Sale.find(
            {},
            { createdAt: 1, total: 2, _id: 0 }
        );

        if (!fecha_total) {
            res.status(404).json({
                ok: false,
                msg: "No hay ventas",
                total: 0,
            });
        }

        let total = 0;

        fecha_total.forEach((f) => {
            const monthf = Number(f.createdAt.toJSON().split("-")[1]);
            const yearf = Number(f.createdAt.toJSON().split("-")[0]);
            const y_m = `${yearf}-${monthf}`;
            if (y_m === year_month) total += f.total;
        });

        // let monthAux = [];
        // fecha y el total lo iteramos y sacamos los numeros de todos los meses que tiene
        // aqui falta el año tambien
        // fecha_total.forEach((f, i) => {
        //     const fecha = f.createdAt.toJSON();
        //     monthAux[i] = Number(fecha.split("-")[1]);
        // });
        // aqui iteramos estos meses que capturamos anteriormente [8,8,9]
        // si el mes es agosto => 8 entonces total = total + fecha_total[i].total;
        // monthAux.forEach((m, i) => {
        //     if (m === month) total += fecha_total[i].total;
        // });
        res.json({
            ok: true,
            total,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

// graph indica grafico y las palabras siguientes indican eje x y eje y
const graphSaleXMonth = async (req = request, res = response) => {
    const year = Number(req.params.year);
    try {
        const monthNames = [
            "",
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre",
        ];
        const fecha_total = await Sale.find(
            {},
            { createdAt: 1, total: 2, _id: 0 }
        );

        if (!fecha_total) {
            res.status(404).json({
                ok: false,
                msg: "No hay ventas",
                total: 0,
            });
        }

        let series = [];

        fecha_total.forEach((f, i) => {
            const monthf = Number(f.createdAt.toJSON().split("-")[1]);
            const yearf = Number(f.createdAt.toJSON().split("-")[0]);
            if (yearf === year) {
                series[i] = {
                    name: monthNames[monthf],
                    value: f.total,
                };
            }
        });
        series = combineArrayCount(series);

        res.json({
            ok: true,
            series,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const bestSellingTags = async (req = request, res = response) => {
    try {
        let onlyComplete = await Sale.find({ state: "Completado" }, { _id: 1 });

        if (!onlyComplete) {
            res.status(404).json({
                ok: false,
                msg: "No hay ventas",
                tags: [{ name: "No hay ventas", value: 0 }],
            });
        }

        let tags = await SaleDetail.find(
            { nsale: onlyComplete },
            { tag: 1, _id: 0 }
        ).populate("tag", "name");

        tags = tags.map(({ tag }) => {
            return {
                name: tag.name,
                value: 1,
            };
        });
        tags = combineArrayCount(tags);

        res.json({
            ok: true,
            tags,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const bestSellingSongs = async (req = request, res = response) => {
    const limit = Number(req.params.limit);
    try {
        let songs = await Tag.find(
            {},
            { name: 4, nsales: 3, price: 2, search_song: 1, _id: 0 }
        )
            .limit(limit)
            .sort({ nsales: -1 });

        if (!songs) {
            res.status(404).json({
                ok: false,
                msg: "No hay canciones",
                songs: [],
            });
        }

        songs = songs.map(({ name, nsales, price, search_song }) => {
            return {
                name: `${name} - ${search_song}`,
                count: nsales,
                total: price * nsales,
            };
        });

        res.json({
            ok: true,
            songs,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const countClients = async (req = request, res = response) => {
    try {
        const count = await Client.find({ test: false }).countDocuments();
        res.json({
            ok: true,
            count,
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
    countClients,
    totalSales,
    totalSalesByMonth,
    graphSaleXMonth,
    bestSellingSongs,
    bestSellingTags,
};

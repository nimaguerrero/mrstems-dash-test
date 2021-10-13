const { response, request } = require("express");
const Song = require("../../models/song.model");
const {
    conditionPrevious,
    conditionNext,
    fillPagesArr,
} = require("../../helpers/pages.helper");

const getSongsByPage = async (req = request, res = response) => {
    const term = req.query.term;
    const regex = new RegExp(term, "i");

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let songs = {
        songs: [],
        next: null,
        previous: null,
        pages: [],
        longitud: 0,
    };

    try {
        const longitud = await Song.find({
            $or: [{ name: regex }, { artist: regex }],
        }).countDocuments();
        songs.longitud = longitud;
        songs.songs = await Song.find({
            $or: [{ name: regex }, { artist: regex }],
        })
            .limit(limit)
            .skip(startIndex);

        const lengthArr = Math.ceil(longitud / limit);
        songs.pages = fillPagesArr(lengthArr);

        songs.previous = conditionPrevious(startIndex, page, limit);
        songs.next = conditionNext(endIndex, longitud, page, limit);

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

const getSongBySlug = async (req = request, res = response) => {
    const slug = req.params.slug;
    try {
        const song = await Song.find({ slug });
        res.json({
            ok: true,
            song,
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
    getSongsByPage,
    getSongBySlug,
};

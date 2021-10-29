const { response, request } = require("express");
const Tag = require("../../models/tag.model");
const Song = require("../../models/song.model");
const Setting = require("../../models/setting.model");
const {
    conditionPrevious,
    conditionNext,
    fillPagesArr,
} = require("../../helpers/pages.helper");
const { IDCONFIG } = require("../../config/production");

const getTagsByPage = async (req = request, res = response) => {
    const term = req.query.term;
    const regex = new RegExp(term, "i");

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let tags = {
        tags: [],
        next: null,
        previous: null,
        pages: [],
        longitud: 0,
    };

    try {
        const longitud = await Tag.find({
            $or: [{ name: regex }, { search_song: regex }],
        }).countDocuments();
        tags.longitud = longitud;
        tags.tags = await Tag.find({
            $or: [{ name: regex }, { search_song: regex }],
        })
            .limit(limit)
            .skip(startIndex);

        const lengthArr = Math.ceil(longitud / limit);
        tags.pages = fillPagesArr(lengthArr);

        tags.previous = conditionPrevious(startIndex, page, limit);
        tags.next = conditionNext(endIndex, longitud, page, limit);

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

const getTag = async (req = request, res = response) => {
    const id = req.params.id;
    try {
        const tag = await Tag.findById(id);
        res.json({
            ok: true,
            tag,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const getTagsOfSettings = async (req = request, res = response) => {
    const idSetting = IDCONFIG;
    try {
        const { tags } = await Setting.findById(idSetting);
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

const createTag = async (req = request, res = response) => {
    try {
        const tag = new Tag(req.body);
        await tag.save();

        const song = await Song.findById(tag.song);
        if (
            song.state.split(" ").includes("tag") ||
            song.state.split(" ").includes("tags")
        ) {
            const ntag = Number(song.state.split(" ")[0]);
            // NO LE COLOCO IF NTAG=3 PORQUE PUEDE TENER MAS DE 3 CON REMIX NIMA TU PONES COMPLETO EN ACTUALIZAR CANCION
            song.state = `${ntag + 1} tags`;
        } else {
            song.state = "1 tag";
        }
        song.tags_names.push(tag.name);
        await song.save();

        res.json({
            ok: true,
            msg: "Tag creado",
            tag,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const updateTag = async (req = request, res = response) => {
    const newTag = req.body;
    const id = req.params.id;
    try {
        const searchID = await Tag.findById(id);
        if (!searchID) {
            return res.status(404).json({
                ok: true,
                msg: "Tag no encontrado por id",
                tag: {},
            });
        }

        const tag = await Tag.findByIdAndUpdate(id, newTag, {
            new: true,
        });

        const song = await Song.findById(tag.song);
        song.tags_names = tag.name;
        await song.save();

        res.json({
            ok: true,
            msg: "Tag actualizado",
            tag,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const deleteTag = async (req = request, res = Response) => {
    const id = req.params.id;
    try {
        const tag = await Tag.findByIdAndDelete(id);
        const song = await Song.findById(tag.song);

        song.tags_names.pop();

        let ntag = Number(song.state.split(" ")[0]);

        // TODO: MEJORARLO EN UN FUTURO CON [] y endsWith
        if (ntag > 2) {
            song.state = `${ntag - 1} tags`;
        } else {
            ntag == 1
                ? (song.state = "Edicion")
                : (song.state = `${ntag - 1} tag`);
        }
        if (song.state === "Completo") song.state = `${ntag - 1} tags`;

        await song.save();

        res.json({
            ok: true,
            msg: "Tag eliminado",
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
    getTagsOfSettings,
    getTagsByPage,
    getTag,
    createTag,
    updateTag,
    deleteTag,
};

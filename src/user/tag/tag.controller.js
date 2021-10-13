const { response, request } = require("express");
const Tag = require("../../models/tag.model");

const getTags = async (req = request, res = response) => {
    const songID = req.params.songID;
    try {
        const tags = await Tag.find({ song: songID });
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

const createTag = async (req = request, res = response) => {
    try {
        const tag = new Tag(req.body);
        await tag.save();

        res.json({
            ok: true,
            msg: "Tag de creado",
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
        await Tag.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: "Cupon eliminado",
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
    getTags,
    getTag,
    createTag,
    updateTag,
    deleteTag,
};

const { response, request } = require("express");
const Tag = require("../../models/tag.model");

const getTags = async (req = request, res = response) => {
    const songID = req.params.songID;
    try {
        const tags = await Tag.find({ song: songID });
        tags.forEach((tag) => {
            if (tag.premium) {
                tag.link = null;
            }
        });
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

module.exports = {
    getTags,
};

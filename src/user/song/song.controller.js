const { response, request } = require("express");
const fs = require("fs-extra"); //soporte a las promesas
const { v4: uuid_v4 } = require("uuid");
const Song = require("../../models/song.model");
const Tag = require("../../models/tag.model");
const {
    conditionPrevious,
    conditionNext,
    fillPagesArr,
} = require("../../helpers/pages.helper");

const cloudinary = require("cloudinary");

const getAllSongs = async (req = request, res = response) => {
    try {
        const songs = await Song.find({}, { name: 2, _id: 1 });

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
            $or: [{ name: regex }, { album: regex }],
        }).countDocuments();
        songs.longitud = longitud;
        songs.songs = await Song.find({
            $or: [{ name: regex }, { album: regex }],
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

const getSong = async (req = request, res = response) => {
    const id = req.params.id;
    try {
        const song = await Song.findById(id);
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

const createSong = async (req = request, res = response) => {
    const newSong = new Song(req.body);
    try {
        // const result = await cloudinary.v2.uploader.upload(req.file.path);
        // notification_url: "https://mysite.example.com/notify_endpoint"
        const result = await cloudinary.v2.uploader.upload(
            req.file.path,
            {
                resource_type: "image",
                public_id: `mrstems/songs/${uuid_v4()}`,
                overwrite: true,
            },
            (error, result) => {
                if (error) {
                    console.log(error);
                    return {
                        url: "",
                        public_id: "",
                    };
                }
                return result;
            }
        );
        newSong.cover = {
            url: result.url,
            public_id: result.public_id,
        };
        // newSong.slug = newSong.name.toLowerCase().replace(/ /g, "-");
        await newSong.save();
        await fs.unlink(req.file.path);

        res.json({
            ok: true,
            msg: "Cancion creado",
            song: newSong,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const updateSong = async (req = request, res = response) => {
    const newSong_a = req.body;
    const id = req.params.id;
    const public_id = newSong_a.public_id;
    try {
        const searchID = await Song.findById(id);
        if (!searchID) {
            res.status(404).json({
                ok: true,
                msg: "Cancion no encontrado por id",
                song: {},
            });
        }
        if (req.file) {
            await cloudinary.v2.uploader.destroy(public_id);

            const result = await cloudinary.v2.uploader.upload(
                req.file.path,
                {
                    resource_type: "image",
                    public_id: `mrstems/songs/${uuid_v4()}`,
                    overwrite: true,
                },
                (error, result) => {
                    if (error) {
                        console.log(error);
                        return {
                            url: "",
                            public_id: "",
                        };
                    }
                    return result;
                }
            );
            newSong_a.cover = {
                url: result.url,
                public_id: result.public_id,
            };
            await fs.unlink(req.file.path);
        }
        const newSong = await Song.findByIdAndUpdate(id, newSong_a, {
            new: true,
        });

        res.json({
            ok: true,
            msg: "Cancion actualizada",
            song: newSong,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const deactivateSong = async (req = request, res = Response) => {
    const id = req.params.id;
    const { active } = req.body;
    const inactive = { $set: { active } };
    try {
        await Song.findByIdAndUpdate(id, inactive);
        res.json({
            ok: true,
            msg: "Cancion inactiva",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const deleteSong = async (req = request, res = Response) => {
    const id = req.params.id;
    const pid = req.params.pid;
    const public_id = `mrstems/songs/${pid}`;
    try {
        await Song.findByIdAndDelete(id);
        await cloudinary.v2.uploader.destroy(public_id);
        await Tag.deleteMany({ song: id });
        res.json({
            ok: true,
            msg: "Cancion eliminada",
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
    getAllSongs,
    getSongsByPage,
    getSong,
    createSong,
    updateSong,
    deactivateSong,
    deleteSong,
};

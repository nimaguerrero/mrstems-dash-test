const { response, request } = require("express");
const Setting = require("../../models/setting.model");
const fs = require("fs-extra"); //soporte a las promesas
const { v4: uuid_v4 } = require("uuid");
const cloudinary = require("cloudinary");
const { IDCONFIG } = require("../../config/production");

const getSetting = async (req = request, res = response) => {
    const idSetting = IDCONFIG;
    try {
        const setting = await Setting.findById(idSetting);
        console.log(setting);
        res.json({
            ok: true,
            setting,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const updateSetting = async (req = request, res = response) => {
    const idSetting = IDCONFIG;
    const newS = req.body;
    const pidLogo = newS.pidLogo;
    const pidLogoWhite = newS.pidLogoWhite;

    try {
        const searchID = await Setting.findById(idSetting);
        if (!searchID) {
            return res.status(404).json({
                ok: true,
                msg: "Configuracion no encontrado por id",
                setting: {},
            });
        }

        if (req.filelogo) {
            await cloudinary.v2.uploader.destroy(pidLogo);
            const result = await cloudinary.v2.uploader.upload(
                req.fileLogo.path,
                {
                    resource_type: "image",
                    public_id: `mrstems/${uuid_v4()}`,
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
            newS.logo = {
                url: result.url,
                public_id: result.public_id,
            };
            await fs.unlink(req.fileLogo.path);
        }
        if (req.fileLogoWhite) {
            await cloudinary.v2.uploader.destroy(pidLogoWhite);
            const result = await cloudinary.v2.uploader.upload(
                req.fileLogoWhite.path,
                {
                    resource_type: "image",
                    public_id: `mrstems/${uuid_v4()}`,
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
            newS.logo_white = {
                url: result.url,
                public_id: result.public_id,
            };
            await fs.unlink(req.fileLogoWhite.path);
        }
        for (let i = 0; i < newS.tags.length; i++) {
            newS.tags[i] = JSON.parse(newS.tags[i]);
        }

        const newSetting = await Setting.findByIdAndUpdate(idSetting, newS, {
            new: true,
        });
        res.json({
            ok: true,
            msg: "Configuracion actualizada",
            setting: newSetting,
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
    getSetting,
    updateSetting,
};

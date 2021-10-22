const { response, request } = require("express");
const User = require("../../models/user.model");
const { createToken } = require("../../helpers/jwt.helper");
const bcrypt = require("bcryptjs");

const fs = require("fs-extra"); //soporte a las promesas
const { v4: uuid_v4 } = require("uuid");
const cloudinary = require("cloudinary");

const registerUser = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        // Comprobar si ya existe el correo
        const existEmail = await User.findOne({ email });
        if (existEmail) {
            return res.status(404).json({
                ok: false,
                msg: "Correo ya está registrado",
            });
        }
        // Creando un nuevo User
        const newUser = new User(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        newUser.password = bcrypt.hashSync(password, salt);

        // guardar User
        await newUser.save();

        res.json({
            ok: true,
            token: createToken(newUser),
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const loginUser = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: "Correo no encontrado",
            });
        }

        const validPass = bcrypt.compareSync(password, user.password);
        if (!validPass) {
            return res.status(404).json({
                ok: false,
                msg: "Contraseña incorrecta",
            });
        }

        res.json({
            ok: true,
            token: createToken(user),
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const updateUser = async (req = request, res = response) => {
    const { password, ...newUser } = req.body;
    const id = req.params.id;
    try {
        const searchID = await User.findById(id);
        if (!searchID) {
            return res.status(404).json({
                ok: true,
                msg: "Usuario no encontrado por id",
                client: {},
            });
        }

        if (newUser.email != searchID.email) {
            const searchEmail = await User.findOne({ email: newUser.email });
            if (searchEmail) {
                return res.status(404).json({
                    ok: true,
                    msg: "Este correo ya existe",
                    user: {},
                });
            }
        }

        if (req.file) {
            await cloudinary.v2.uploader.destroy(newUser.public_id);
            const result = await cloudinary.v2.uploader.upload(
                req.file.path,
                {
                    resource_type: "image",
                    public_id: `mrstems/users/${uuid_v4()}`,
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
            newUser.profile = {
                url: result.url,
                public_id: result.public_id,
            };
            await fs.unlink(req.file.path);
        }

        const user = await User.findByIdAndUpdate(id, newUser, {
            new: true,
        });
        res.json({
            ok: true,
            msg: "Usuario actualizado",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const getProfile = async (req = request, res = response) => {
    const uid = req.uid;
    console.log(uid);
    try {
        const { profile } = await User.findById(uid);
        res.json({
            ok: true,
            url: profile.url,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const getUser = async (req = request, res = response) => {
    const uid = req.uid;
    try {
        const user = await User.findById(uid);
        res.json({
            ok: true,
            user,
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
    getProfile,
    registerUser,
    loginUser,
    getUser,
    updateUser,
};

const { response, request } = require("express");
const User = require("../../models/user.model");
const { createToken } = require("../../helpers/jwt.helper");
const bcrypt = require("bcryptjs");
const moment = require("moment");

const fse = require("fs-extra"); //soporte a las promesas
const { v4: uuid_v4 } = require("uuid");
const cloudinary = require("cloudinary");

// enviar email
const fs = require("fs");
const handlebars = require("handlebars");
const ejs = require("ejs");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const path = require("path");

const sendEmail = async (req, res = response) => {
    const { email } = req.body;
    try {
        // Comprobar si existe el correo
        const existEmail = await User.findOne({ email });
        if (!existEmail) {
            return res.status(404).json({
                ok: false,
                msg: "Correo no está registrado",
            });
        }

        const { _id: id, name, lastname } = existEmail;
        const code = uuid_v4();

        const recovery_key = {
            code,
            exp: moment().add(1, "hour").unix(),
        };

        await User.findByIdAndUpdate(id, {
            $set: { recovery_key },
        });

        const cliente = `${name} ${lastname}`;
        const link = `https://mrstems-backend-dashboard.herokuapp.com/auth/change-password/${code}`;
        // const link = `${process.env.CHANGE_PASSWORD}/${code}` || `https://mrstems-backend-dashboard.herokuapp.com/auth/change-password/${code}`;

        const readHTMLFile = function (path, callback) {
            fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
                if (err) {
                    throw err;
                    callback(err);
                } else {
                    callback(null, html);
                }
            });
        };

        const transporter = nodemailer.createTransport(
            smtpTransport({
                service: "gmail",
                host: "smtp.gmail.com",
                auth: {
                    user: "mrstems21@gmail.com",
                    pass: "zebdjdlxriizuizc",
                },
            })
        );

        readHTMLFile(process.cwd() + "/change-password.html", (err, html) => {
            let rest_html = ejs.render(html, {
                cliente,
                link,
            });

            let template = handlebars.compile(rest_html);
            let htmlToSend = template({ op: true });

            let mailOptions = {
                from: "mrstems21@gmail.com",
                to: email,
                subject: "Solicita cambio de contraseña",
                html: htmlToSend,
            };
            res.json({
                ok: true,
                msg: "Se ha enviado un correo electrónico con las instrucciones para el cambio de tu contraseña. Por favor verifica la información enviada",
            });
            transporter.sendMail(mailOptions, function (error, info) {
                if (!error) {
                    console.log("Email sent: " + info.response);
                }
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const getTimeCode = async (req, res = response) => {
    const code = req.params.code;
    try {
        const user = await User.find({ "recovery_key.code": code });

        if (!user || user.length <= 0) {
            return res.status(404).json({
                ok: false,
                msg: "Codigo no válido",
                exp: 0,
            });
        }

        const { recovery_key } = user[0];
        res.json({
            ok: true,
            msg: "Tiempo del codigo",
            exp: recovery_key.exp,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

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

        if (!user.active) {
            return res.status(404).json({
                ok: false,
                msg: "Usuario inactivo, por favor consulte con el administrador",
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

const updatePassword = async (req = request, res = response) => {
    const { password: pass, code } = req.body;
    try {
        // Encriptar contraseña

        // const user = await User.find({ "recovery_key.code": code });
        // await user.save();
        // user.password = bcrypt.hashSync(pass, salt);
        const salt = bcrypt.genSaltSync();
        const password = bcrypt.hashSync(pass, salt);
        await User.findOneAndUpdate(
            { "recovery_key.code": code },
            { $set: { password } }
        );

        res.json({
            ok: true,
            msg: "Contraseña actualizada",
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
            await fse.unlink(req.file.path);
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
    sendEmail,
    getTimeCode,
    updatePassword,
};

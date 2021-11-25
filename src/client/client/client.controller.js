const { response, request } = require("express");
const Client = require("../../models/client.model");
const bcrypt = require("bcryptjs");
const { createToken } = require("../../helpers/jwt.helper");

const registerClient = async (req = request, res = response) => {
    const { name, email, password } = req.body;
    try {
        // Comprobar si ya existe el correo
        const existEmail = await Client.findOne({ email });
        if (existEmail) {
            return res.status(404).json({
                ok: false,
                msg: "Correo ya está registrado",
            });
        }

        // Creando un nuevo cliente
        const newClient = new Client(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        newClient.password = bcrypt.hashSync(password, salt);

        // guardar cliente
        await newClient.save();

        const { profile } = newClient;

        res.json({
            ok: true,
            profile,
            token: createToken(newClient),
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const loginClient = async (req = request, res = response) => {
    const { email, password } = req.body;
    try {
        const client = await Client.findOne({ email });
        if (!client) {
            res.status(404).json({
                ok: false,
                msg: "Correo no encontrado",
            });
        }

        if (!client.active) {
            res.status(404).json({
                ok: false,
                msg: "Usted no puede entrar a la pagina, contactese con el administrador",
            });
        }

        const validPass = bcrypt.compareSync(password, client.password);
        if (!validPass) {
            res.status(404).json({
                ok: false,
                msg: "Contraseña incorrecta",
            });
        }
        const { profile } = client;

        res.json({
            ok: true,
            profile,
            token: createToken(client),
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
        const { profile } = await Client.findById(uid);
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

const updateClient = async (req = request, res = response) => {
    const newClient = req.body;
    const id = req.params.id;
    try {
        const searchID = await Client.findById(id);
        if (!searchID) {
            return res.status(404).json({
                ok: true,
                msg: "Cliente no encontrado por id",
                client: {},
            });
        }

        if (newClient.email != searchID.email) {
            const searchEmail = await Client.findOne({
                email: newClient.email,
            });
            if (searchEmail) {
                return res.status(404).json({
                    ok: true,
                    msg: "Este correo ya existe",
                    client: {},
                });
            }
        }

        const client = await Client.findByIdAndUpdate(id, newClient, {
            new: true,
        });
        res.json({
            ok: true,
            msg: "Cliente actualizado",
            client,
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
    registerClient,
    loginClient,
    updateClient,
    getProfile,
};

const User = require("../models/user.model");
const { request, response } = require("express");

const sidebar = async (req = request, res = response) => {
    const uid = req.uid;

    try {
        const usuarioDB = await User.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: "Usuario no existe",
            });
        }

        const sidebarArr = [
            {
                title: "Inicio",
                link: "/admin/home",
                icon: "home-outline",
            },
            {
                title: "Canciones",
                link: "/panel/songs",
                icon: "musical-notes-outline",
            },
            {
                title: "Tags",
                link: "/panel/tags",
                icon: "pricetags-outline",
            },
            { title: "Pedidos", link: "/panel/orders", icon: "cart-outline" },
            {
                title: "Usuarios",
                link: "/admin/users",
                icon: "accessibility-outline",
            },
            {
                title: "Clientes",
                link: "/admin/clients",
                icon: "people-outline",
            },
            {
                title: "Configuraciones",
                link: "/admin/settings",
                icon: "settings-outline",
            },
        ];

        if (usuarioDB.role === "USER") {
            const delTitles = [
                "Inicio",
                "Configuraciones",
                "Usuarios",
                "Clientes",
            ];
            removeElementFromArray(sidebarArr, delTitles);
            return res.json({
                ok: true,
                sidebar: sidebarArr,
            });
        } else if (usuarioDB.role === "ADMIN") {
            return res.json({
                ok: true,
                sidebar: sidebarArr,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
        });
    }
};

const removeElementFromArray = (arr, titles) => {
    for (const title of titles) {
        const indice = arr.findIndex((a) => a.title === title);
        arr.splice(indice, 1);
    }
};

module.exports = {
    sidebar,
};

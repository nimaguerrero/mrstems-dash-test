"use strict";

// por el cross-end si el entorno no es produccion importa variables de entorno locales
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary");

const { dbConnection } = require("./src/database/config");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Admin
const admins = require("./src/admin/admin.module");

// User
const users = require("./src/user/user.module");

// Client
const clients = require("./src/client/client.module");

const SidebarRoutes = require("./src/sidebar/sidebar.routes");

// Multer para imagenes
const storage = multer.diskStorage({
    destination: path.join(__dirname, "src/public/uploads"),
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    },
});
app.use(multer({ storage }).single("file")); //en el formdata hay que ponerle file
// Morgan para mensajes cortos en el backend
app.use(morgan("tiny"));
//// Lectura y parseo del body
app.use(express.json());
////  Leer de formularios
app.use(express.urlencoded({ extended: true }));

dbConnection();

// CORS
// app.use(CORS);
app.use(cors());

// Admin
app.use("/admins/clients", admins.AdminClientRoutes);
app.use("/admins/settings", admins.AdminSettingRoutes);
app.use("/admins/users", admins.AdminUserRoutes);
app.use("/admins/home", admins.AdminHomeRoutes);

// User
app.use("/users/coupons", users.UserCouponRoutes);
app.use("/users/messages", users.UserMessageRoutes);
app.use("/users/songs", users.UserSongRoutes);
app.use("/users/tags", users.UserTagRoutes);
app.use("/users/orders", users.UserOrderRoutes);
app.use("/users", users.UserRoutes);

// Client
app.use("/clients", clients.ClientRoutes);
app.use("/clients/settings", clients.ClientSettingRoutes);
app.use("/clients/orders", clients.ClientOrderRoutes);
app.use("/clients/messages", clients.ClientMessageRoutes);
app.use("/clients/reviews", clients.ClientReviewRoutes);
// app.use("/clients/products", clients.ClientProductRoutes);

// Sidebar
app.use("/sidebar", SidebarRoutes);

// TODO: Lo último PARA PRODUCCION
// app.get('*', (req, res) => {
//     res.sendFile( path.resolve( __dirname, 'public/index.html' ) );
// });

app.listen(process.env.MONGO_PORT, () => {
    console.log("Servidor corriendo en puerto " + process.env.MONGO_PORT);
});

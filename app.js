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

const { dbConnection } = require("./database");
const {
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
} = require("./src/config/production");

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
});

// Admin
const admins = require("./src/admin/admin.module");

// User
const users = require("./src/user/user.module");

// Client
const clients = require("./src/client/client.module");

// Sidebar
const SidebarRoutes = require("./src/sidebar/sidebar.routes");

// settings
app.set("port", process.env.PORT || 4201);

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
app.use("/admins/backups", admins.AdminBackupRoutes);
app.use("/admins/clients", admins.AdminClientRoutes);
app.use("/admins/settings", admins.AdminSettingRoutes);
app.use("/admins/users", admins.AdminUserRoutes);
app.use("/admins/home", admins.AdminHomeRoutes);

// User
app.use("/users/reports", users.UserReportRoutes);
app.use("/users/songs", users.UserSongRoutes);
app.use("/users/tags", users.UserTagRoutes);
app.use("/users/orders", users.UserOrderRoutes);
app.use("/users", users.UserRoutes);

// Clients
app.use("/clients", clients.ClientRoutes);
app.use("/clients/settings", clients.ClientSettingRoutes);
app.use("/clients/orders", clients.ClientOrderRoutes);
app.use("/clients/reports", clients.ClientReportRoutes);
app.use("/clients/reviews", clients.ClientReviewRoutes);
app.use("/clients/songs", clients.ClientSongRoutes);

// Sidebar
app.use("/sidebar", SidebarRoutes);

// TODO: Lo último PARA PRODUCCION
// app.get('*', (req, res) => {
//     res.sendFile( path.resolve( __dirname, 'public/index.html' ) );
// });

app.listen(app.get("port"), () => {
    console.log(`Server on port ${app.get("port")}`);
});

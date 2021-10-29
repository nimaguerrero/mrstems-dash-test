// const cron = require("node-cron");
const { spawn } = require("child_process");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const { request, response } = require("express");
const mongoose = require("mongoose");

// mongodump --db=mrstems --archive=ARCHIVE_PATH --gzip
// mongorestore --db=mrstems --archive=ARCHIVE_PATH --gzip
// TODO: cambiar por uri --uri="mongodb://mongodb0.example.com:27017/reporting"

const getCollections = async (req = request, res = response) => {
    mongoose.connection.db.listCollections().toArray((err, names) => {
        if (err) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: "Error inesperado... revisar logs",
                names: [],
            });
        } else {
            res.json({
                ok: true,
                names,
            });
        }
    });
};

// ESTE BACKUP EXPORTA ARCHIVOS .bson y .json, ES MAS SEGURO
const backup = async (req = request, res = response) => {
    const { directory: dir } = req.body;
    try {
        let archive = `${new Date().toDateString()} - ${uuidv4().substring(
            0,
            7
        )}`;
        let directory = path.join(dir, archive);
        const options = [
            `--uri=${process.env.MONGODB_URI}`,
            `--out=${directory}`,
        ];
        // const options = ["--db=mrstems", `--out=${directory}`];
        const info = await backConsole("mongodump", options);
        res.json({
            ok: true,
            msg: `Backup completado: ${info}`,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

// ESTE BACKUP EXPORTA COMPRIMIDO .gzip
const backupCompressed = async (req = request, res = response) => {
    const { directory: dir } = req.body;
    try {
        let archive = `${new Date().toDateString()} - ${uuidv4().substring(
            0,
            7
        )}.gzip`;
        let directory = path.join(dir, archive);

        const options = [
            `--uri=${process.env.MONGODB_URI}`,
            `--archive=${directory}`,
            "--gzip",
        ];

        const info = await backConsole("mongodump", options);
        res.json({
            ok: true,
            msg: `Backup completado: ${info}`,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

// ESTE BACKUP EXPORTA UNA COLECCION A JSON
const backupCollection = async (req = request, res = response) => {
    const { directory: dir } = req.body;
    const collection = req.params.collection;
    try {
        const directory = path.join(dir, `${collection}.json`);
        const options = [
            `--uri=${process.env.MONGODB_URI}`,
            `--collection=${collection}`,
            `--out=${directory}`,
        ];

        const info = await backConsole("mongoexport", options);
        res.json({
            ok: true,
            msg: `Backup completado: ${info}`,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

// Restaura binario *.bson y *.metadata.json
const restore = async (req = request, res = response) => {
    const { directory } = req.body;
    try {
        if (directory.length > 0) {
            const options = [`--uri=${process.env.MONGODB_URI}`, directory];
            // LOCAL CON .gzip
            // const options = [
            //     `--uri=${process.env.MONGODB_URI}`,
            //     `--archive=${directory}`,
            //     "--gzip",
            // ];

            const info = await backConsole("mongorestore", options);
            res.json({
                ok: true,
                msg: `Backup restaurado: ${info}`,
            });
        } else {
            res.status(404).json({
                ok: false,
                msg: "No hay backup para restaurar",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const restoreCollection = async (req = request, res = response) => {
    const { directory } = req.body;
    try {
        if (directory.length > 0) {
            // Si tuviera s3
            // let archivo = req.file.path.split("\\");
            // archivo = archivo[archivo.length - 1];
            // const directory = path.join(
            //     __dirname,
            //     "../../public/uploads",
            //     archivo
            // );
            const options = [
                `--uri=${process.env.MONGODB_URI}`,
                directory,
                // `--archive=${directory}`,
            ];

            const info = await backConsole("mongoimport", options);
            // await fs.unlink(directory);
            res.json({
                ok: true,
                msg: `Backup restaurado: ${info}`,
            });
        } else {
            res.status(404).json({
                ok: false,
                msg: "No hay backup para restaurar",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const backConsole = (process, options) => {
    return new Promise((resolve, reject) => {
        let backupProcess = spawn(process, options);

        backupProcess.stdout.on("data", (data) => {
            console.log("stdout:\n", data);
        });
        backupProcess.stderr.on("data", (data) => {
            const info = Buffer.from(data).toString();
            console.log("stderr:\n", info);
            resolve(info);
        });
        backupProcess.on("error", (error) => {
            console.log("error:\n", error);
            reject(error);
        });

        backupProcess.on("exit", (code, signal) => {
            if (code) console.log("Process exited with code ", code);
            else if (signal)
                console.error("Process was killed with singal ", signal);
            else console.log(`Se termino el proceso: ${process} correctamente`);
        });
    });
};

module.exports = {
    backup,
    backupCompressed,
    backupCollection,
    restore,
    restoreCollection,
    getCollections,
};

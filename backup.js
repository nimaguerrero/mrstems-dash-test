// const cron = require("node-cron");
// const spawn = require("child_process").spawn;
// const path = require("path");

// const { v4: uuidv4 } = require("uuid");
const { MongoTools, MTOptions } = require("node-mongotools");
const path = require("path");

// mongodump --db=mrstems --archive=ARCHIVE_PATH --gzip
// mongorestore --db=mrstems --archive=ARCHIVE_PATH --gzip

const backupAll = async () => {
    try {
        const DB_NAME = "mrstems";
        const ARCHIVE_PATH = path.join(__dirname, "backup", `${DB_NAME}.gz`);

        let mongoTools = new MongoTools();
        const mtOptions = {
            db: DB_NAME,
            port: 27017,
            path: "/backup",
            dropboxToken: process.env.MYAPP_DROPBOX_SECRET_TOKEN,
        };

        await mongoTools.mongodump(mtOptions);
    } catch (error) {
        console.log(error);
    }

    // const DB_NAME = "mrstems";
    // const ARCHIVE_PATH = path.join(__dirname, "backup", `${DB_NAME}.gzip`);
    // const ARCHIVE_PATH = path.join(process.env.BASEDIR, `${DB_NAME}.gzip`);

    // let dbBackupTask = cron.schedule("*/1 * * *", () => { PROBARLO CADA 1 MINUTO
    // let dbBackupTask = cron.schedule("59 23 * * * *", () => {
    //     let backupProcess = spawn("mongodump", [
    //         `--db=DB_NAME`,
    //         `--archive=${ARCHIVE_PATH}`,
    //         "--gzip",
    //     ]);

    //     backupProcess.on("exit", (code, signal) => {
    //         if (code) console.log("Backup process exited with code ", code);
    //         else if (signal)
    //             console.error("Backup process was killed with singal ", signal);
    //         else console.log("Successfully backedup the database");
    //     });
    // });
};

module.exports = {
    backupAll,
};

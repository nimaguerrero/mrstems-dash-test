const mongoose = require("mongoose");

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_ATLAS, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false,
        });
        console.log("DB online");
    } catch (error) {
        console.log(error.message);
        // throw new Error("Error a la hora de iniciar la BD ver logs");
        process.exit(1);
    }
};

module.exports = {
    dbConnection,
};

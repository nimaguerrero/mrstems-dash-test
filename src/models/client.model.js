"use strict";
const { Schema, model } = require("mongoose");

const ClientSchema = new Schema(
    {
        name: { type: String, required: true },
        lastname: { type: String, required: true },
        country: { type: String, required: false, default: "Peru" },
        email: { type: String, required: true },
        password: { type: String, required: true },
        profile: {
            type: Object,
            required: true,
            default: {
                url: "https://res.cloudinary.com/gigga/image/upload/v1633757380/mrstems/no-user_w9qnac.jpg",
                public_id: "mrstems/no-user_w9qnac",
            },
        },
        phone: { type: String, required: false },
        gender: { type: String, required: false },
        birthday: { type: String, required: false },
        dni: { type: String, required: false },
        active: { type: Boolean, default: true, required: true },
        test: { type: Boolean, default: false, required: true },
    },
    { collection: "clients" }
);

ClientSchema.method("toJSON", function () {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model("Client", ClientSchema);

"use strict";
const { Schema, model } = require("mongoose");

const SaleSchema = new Schema(
    {
        client: { type: Schema.Types.ObjectId, ref: "Client", required: false },
        client_name: { type: String, required: true },
        client_lastname: { type: String, required: true },
        client_email: { type: String, required: true },
        nsale: { type: String, required: true },
        subtotal: { type: Number, required: false },
        total: { type: Number, required: true },
        igv: { type: Number, required: true },
        transaction: { type: String, required: true },
        state: { type: String, default: "Pendiente", required: true },
        phone: { type: String, required: false },
        report: { type: String, required: false },
        createdAt: { type: Date, default: Date.now, required: true },
    },
    { collection: "sales" }
);

SaleSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model("Sale", SaleSchema);

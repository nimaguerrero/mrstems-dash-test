"use strict";
const { Schema, model } = require("mongoose");

const SaleDetailSchema = new Schema(
    {
        name_artist_song: { type: String, required: true },
        tag: { type: Schema.Types.ObjectId, ref: "Tag" },
        sale: { type: Schema.Types.ObjectId, ref: "Sale" },
        subtotal: { type: Number, required: true },
        amount: { type: Number, required: true },
        client: { type: Schema.Types.ObjectId, ref: "Client", required: false },
        client_name: { type: String, required: true },
        client_lastname: { type: String, required: true },
        client_email: { type: String, required: true },
        createdAt: { type: Date, default: Date.now, required: true },
    },
    { collection: "sale-details" }
);

SaleDetailSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model("SaleDetail", SaleDetailSchema);

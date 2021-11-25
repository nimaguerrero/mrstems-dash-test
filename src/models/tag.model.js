"use strict";
const { Schema, model } = require("mongoose");

const TagSchema = new Schema(
    {
        name: { type: String, required: true },
        link: { type: String, required: false },
        song: {
            type: Schema.Types.ObjectId,
            ref: "Song",
            required: true,
        },
        time_download: { type: Number, required: false },
        search_song: { type: String, required: true },
        price: { type: Number, required: false },
        nsales: { type: Number, default: 0, required: false },
        ndownloads: { type: Number, default: 0, required: true },
    },
    { collection: "tags" }
);

TagSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model("Tag", TagSchema);

// linkyt: string | null;
// linkacap: string | null;
// linkinst: string | null;
// linkstem: string | null;

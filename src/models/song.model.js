"use strict";
const { Schema, model, models } = require("mongoose");

const SongSchema = new Schema(
    {
        name: { type: String, required: true },
        author: { type: String, required: false },
        release_year: { type: String, required: false },
        album: { type: String, required: false },
        multimedia: { type: String, required: false },
        tags_names: { type: Array, required: true, default: [] },
        genres: [{ type: String, required: false }],
        artists: [{ type: Object, required: false }],
        link_youtube: { type: String, required: false },
        cover: { type: Object, required: false }, //va a tener url y public_id
        description: { type: String, required: true },
        stars: { type: Number, default: 0, required: true },
        state: { type: String, default: "Edicion", required: true },
        active: { type: Boolean, default: true },
        createdAt: { type: Date, default: Date.now, required: true },
    },
    { collection: "songs" }
);

SongSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = models.Song || model("Song", SongSchema);

"use strict";
const { Schema, model } = require("mongoose");

const ReportSchema = new Schema(
  {
    tag: {
      type: Schema.Types.ObjectId,
      ref: "Tag",
      required: true,
    }, //name, search_song
    email: { type: String, required: false },
    problem: { type: String, required: true },
    state: { type: String, required: true, default: "Pendiente" },
    createdAt: { type: Date, required: true, default: Date.now },
    note: { type: String, required: false },
  },
  { collection: "reports" }
);

ReportSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("Report", ReportSchema);

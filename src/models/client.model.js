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
        url: "https://res.cloudinary.com/gigga/image/upload/v1633757380/mrstems/no-user_c2w7q2.png",
        public_id: "mrstems/no-user_c2w7q2",
      },
    },
    phone: { type: String, required: false },
    gender: { type: String, required: false },
    birthday: { type: String, required: false },
    dni: { type: String, required: false },
    active: { type: Boolean, default: true, required: true },
    test: { type: Boolean, default: false, required: true },
    createdAt: { type: Date, default: Date.now, required: true },
  },
  { collection: "clients" }
);

ClientSchema.method("toJSON", function () {
  const { __v, _id, password, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports = model("Client", ClientSchema);

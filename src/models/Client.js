const { Schema, model } = require("mongoose");

const Provider = require("./Provider");

const ClientSchema = Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  providers: {
    type: [Schema.Types.ObjectId],
    ref: "Provider",
    required: false,
  },
});

ClientSchema.method("toJSON", function () {
  const { __v, _id, ...rest } = this.toObject();
  rest.id = _id;
  return rest;
});

module.exports = model("Client", ClientSchema);

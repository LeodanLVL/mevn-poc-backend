const { Schema, model } = require("mongoose");

const ProviderSchema = Schema({
  name: {
    type: String,
    required: true,
  },
});

ProviderSchema.method("toJSON", function () {
  const { __v, _id, ...rest } = this.toObject();
  rest.id = _id;
  return rest;
});
module.exports = model("Provider", ProviderSchema);

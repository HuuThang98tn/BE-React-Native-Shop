const mongoose = require("mongoose");
const schema = mongoose.Schema;
const Joi = require("joi");

const mIndexImg = new schema(
  {
    imageProduct_: {
      type: String,
    },
    idProduct_: {
      type: schema.Types.ObjectId,
      ref: "products",
    },
  },
  {
    timestamps: true,
  }
);

const Index = mongoose.model("indeximg", mIndexImg);

const mValidateCreactIndex = (product) => {
  const shema = Joi.object({
    imageProduct_: Joi.string(),
    idProduct_: Joi.string().required(),
  });
  return shema.validate(product);
};

module.exports = { Index, mValidateCreactIndex };

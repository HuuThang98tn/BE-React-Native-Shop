const mongoose = require("mongoose");
const schema = mongoose.Schema;
const Joi = require("joi");

const mTypeProduct = new schema(
  {
    type: {
      type: String,
    },
    typeStatus: {
      type: String,
    },
    imageTypeProduct: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const TypeProduct = mongoose.model("tb_typeproducts", mTypeProduct);

const mValidateCreactTyPeProduct = (product) => {
  const shema = Joi.object({
    type: Joi.string().required(),
    typeStatus: Joi.string().required(),
    imageTypeProduct: Joi.string()  ,
  });
  return shema.validate(product);
};

module.exports = { TypeProduct, mValidateCreactTyPeProduct };

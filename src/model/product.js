const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const mProduct = new Schema(
  {
    titleProduct: {
      type: String,
    },
    trademarkProduct: {
      //Thương hiệu
      type: String,
    },
    materialProduct: {
      //chất liệu
      type: String,
    },
    priceProduct: {
      type: String,
    },
    manufacture: {
      //sản xuất
      type: String,
    },
    imageProduct: {
      type: String,
    },
    colorProduct: {
      type: String,
    },
    sizeProduct: {
      type: String,
    },
    descriptionProduct: {
      type: String,
    },
    insuranceProduct: {
      //bảo hành
      type: String,
    },
    idTypeProduct: {
      type: Schema.Types.ObjectId,
      ref: "tb_typeproducts",
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("products", mProduct);

const mValidateCreact = (product) => {
  const shema = Joi.object({
    titleProduct: Joi.string().required(),
    trademarkProduct: Joi.string().required(),
    materialProduct: Joi.string().required(),
    priceProduct: Joi.string().required(),
    manufacture: Joi.string().required(),
    imageProduct: Joi.string(),
    colorProduct: Joi.string().required(),
    sizeProduct: Joi.string().required(),
    descriptionProduct: Joi.string().required(),
    insuranceProduct: Joi.string().required(),
    idTypeProduct: Joi.string().required(),
  });
  return shema.validate(product);
};

module.exports = { Product, mValidateCreact };

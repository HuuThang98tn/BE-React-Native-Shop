const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const mBanner = new Schema(
  {
    imageBn: {
      type: String,
    },
    titleBn: {
      type: String,
    },
    descriptionBn: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const Banner = mongoose.model("banners", mBanner);

const mValidate = (banner) => {
  const shema = Joi.object({
    imageBn: Joi.string(),
    titleBn: Joi.string().required(),
    descriptionBn: Joi.string().required(),
  });
  return shema.validate(banner);
};

module.exports = { Banner, mValidate };


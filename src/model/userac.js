const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const mAccount = new Schema(
  {
    name: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const Account = mongoose.model("user_accounts", mAccount);

const mValidateRegister = (user) => {
  const shema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    passwordConfirm: Joi.string().required(),
  });
  return shema.validate(user);
};

const mValidateLogin = (user) => {
  const shema = Joi.object({
    email: Joi.string().required().trim(),
    password: Joi.string().required().trim(),
  });
  return shema.validate(user);
};

const mValidateChangePassWord = (user) => {
  const shema = Joi.object({
    password: Joi.string().required().trim(),
    passwordNew: Joi.string().required().trim(),
    passwordNewConfirm: Joi.string().required().trim(),
  });
  return shema.validate(user);
};
const mValidateRefreshPassWord = (user) => {
  const sheme = Joi.object({
    email: Joi.string().required().trim(),
  });
  return sheme.validate(user);
};

const mValidateRefreshPassWordNew = (user) => {
  const shema = Joi.object({
    passwordRefreshNew: Joi.string().required().trim(),
    passwordConfirmRefreshNew: Joi.string().required().trim(),
  });
  return shema.validate(user);
};

module.exports = {
  Account,
  mValidateRegister,
  mValidateLogin,
  mValidateChangePassWord,
  mValidateRefreshPassWord,
  mValidateRefreshPassWordNew
};

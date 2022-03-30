const mTypeProduct = require("./tyPeProduct");
const mTypeProduct_ = require("./tyPeProduct_");

const mAdminac = require("./adminac");
const mUserac = require("./userac");
const mBanner = require("./banner");
const mProduct = require("./product");
const mIndexImg = require("./mIndexImg");

function routes(app) {
  //con đường Loại sản phẩm
  app.use("/type_product", mTypeProduct);

  app.use("/type_product_", mTypeProduct_);

  app.use("/img_index", mIndexImg);

  //con đừng sản phẩm

  app.use("/product", mProduct);

  //con đường Tài khoản AD (quản trị viên)

  app.use("/account_ad", mAdminac);

  //con đường Tài khoản user (người dùng)
  app.use("/account_user", mUserac);

  //con đường Banner

  app.use("/banner", mBanner);
}

module.exports = routes;

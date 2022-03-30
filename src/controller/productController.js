const { Product, mValidateCreact } = require("../model/product");
const mongoose = require("mongoose");

class ProductController {
  mCreateProduct(req, res, next) {
    const mFormData = req.body;
    const mProduct = new Product(mFormData);
    const { error } = mValidateCreact(mFormData);

    if (error) {
      // Kiểm tra validate form
      res.status(400).json({
        message: "Đã có lỗi xảy ra",
        error,
      });
    } else {
      if (req.file) {
        // kiểm tra xem trường này nhập vào có phải là 1 file hay không ?
        mProduct.imageProduct = req.file.path;
      }
      mProduct.save((err) => {
        if (!err) {
          res.status(200).json({ message: "Lưu thành công" });
          console.log(mProduct);
        } else {
          res.status(400).json({ message: "Lỗi không lưu được" });
        }
      });
    }
  }
  mListProduct(req, res, next) {
    Product.find({}, function (err, products) {
      for (let i = 0; i < products.length; i++) {
        products[i].imageProduct =
          process.env.BASE_URL + `${products[i].imageProduct}`;
      }
      if (!err) {
        res.json(products);
      } else {
        res.status(400).json({ error: "Lỗi hệ thống" });
      }
    });
  }
  //Top sản phẩm mới nhất
  mTopNewProduct(req, res, next) {
    Product.find({})
      .limit(50)
      .sort({ _id: -1 })
      .select({})
      .exec((err, products) => {
        for (let i = 0; i < products.length; i++) {
          products[i].imageProduct =
            process.env.BASE_URL + `${products[i].imageProduct}`;
        }
        if (err) {
          res.status(400).json({
            message: "Lỗi hệ thống",
          });
        } else {
          res.status(200).json(products);
        }
      });
  }
  //Sản phẩm theo ID
  mListProductID(req, res, next) {
    Product.findById(req.params.id, (err, products) => {
      products.imageProduct = process.env.BASE_URL + `${products.imageProduct}`;
      if (err) {
        res.status(400).json({
          message: "Đã có lỗi xảy ra",
          err,
        });
      } else {
        res.status(200).json(products);
      }
    });
  }
  //Sản phẩm theo loại sản phẩm
  mListProductTypeID(req, res, next) {
    Product.find(
      { idTypeProduct: mongoose.Types.ObjectId(req.params.id) },
      (err, products) => {
        for (let i = 0; i < products.length; i++) {
          products[i].imageProduct =
            process.env.BASE_URL + `${products[i].imageProduct}`;
        }
        if (err) {
          res.status(400).json({
            err,
          });
        } else {
          res.status(200).json(products);
        }
      }
    );
  }
  mEditProduct(req, res, next) {}
  mDestroyProduct(req, res, next) {}

  //Tìm kiếm API

  mSearchProduct(req, res, next) {
    const searchField = req.query.titleProduct;
    Product.find(
      { titleProduct: { $regex: searchField, $options: "$i" } },
      (err, products) => {
        if (err) {
          res.status(400).json({
            err,
          });
        } else {
          res.status(200).json(products);
        }
      }
    );
  }
}

module.exports = new ProductController();

const { Index, mValidateCreactIndex } = require("../model/imgIndex");
const mongoose = require("mongoose");

class IndexController {
  mCreactIndex(req, res, next) {
    const mFormData = req.body;
    const mProduct = new Index(mFormData);
    const { error } = mValidateCreactIndex(mFormData);

    if (error) {
      // Kiểm tra validate form
      res.status(400).json({
        message: "Đã có lỗi xảy ra",
        error,
      });
    } else {
      if (req.file) {
        // kiểm tra xem trường này nhập vào có phải là 1 file hay không ?
        mProduct.imageProduct_ = req.file.path;
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

  mIndexID(req, res, next) {
    Index.find(
      { idProduct_: mongoose.Types.ObjectId(req.params.id) },
      (err, products) => {
        for (let i = 0; i < products.length; i++) {
          products[i].imageProduct_ =
            process.env.BASE_URL + `${products[i].imageProduct_}`;
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
}

module.exports = new IndexController();

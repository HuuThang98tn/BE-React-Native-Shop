const {
  TypeProduct,
  mValidateCreactTyPeProduct,
} = require("../model/typeProduct_");
const fs = require("fs");

class TypeProductController {
  //Thêm mới sản phẩm trong bảng type_product
  mCreateProduct(req, res, next) {
    const mFormData = req.body;
    const mProduct = new TypeProduct(mFormData);
    const { error } = mValidateCreactTyPeProduct(mFormData);

    if (error) {
      // Kiểm tra validate form
      res.status(400).json({
        message: "Đã có lỗi xảy ra",
        error,
      });
    } else {
      if (req.file) {
        // kiểm tra xem trường này nhập vào có phải là 1 file hay không ?
        mProduct.imageTypeProduct = req.file.path;
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

  //Chỉnh sửa sản phẩm trong bảng type_product
  mEditProduct(req, res, next) {
    const mFormData = req.body;
    //accountAdminController.js const mProduct = new TypeProduct(mFormData);

    TypeProduct.findById(req.params.id, (err, tb_typeproducts_) => {
      if (err) {
        res.status(400).json({
          message: "Đã có lỗi xảy ra",
          err,
        });
      } else {
        const img = tb_typeproducts_.imageTypeProduct;
        if (req.file) {
          // kiểm tra xem trường này nhập vào có phải là 1 file hay không ?
          mFormData.imageTypeProduct = req.file.path;

          fs.unlink(img, (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log("Xoá thành công");
            }
          });
        } else {
          mFormData.imageTypeProduct = tb_typeproducts_.imageTypeProduct;
        }
        TypeProduct.updateOne({ _id: req.params.id }, mFormData, (err) => {
          if (err) {
            res.status(400).json({ message: "Lỗi cập nhật", err });
          } else {
            res.status(200).json({ message: "Cập nhật thành công" });
          }
        });
      }
    });

    // console.log(req.body);
  }
  //Xoá sản phẩm trong bảng type_product
  mDestroyProduct(req, res, next) {
    TypeProduct.findById(req.params.id, (err, tb_typeproducts_) => {
      if (err) {
        res.status(400).json({
          message: "Đã có lỗi xảy ra",
          err,
        });
      } else {
        console.log(tb_typeproducts_);
        const img = tb_typeproducts_.imageTypeProduct;

        fs.unlink(img, function (err, data) {
          console.log("Xoá file ảnh thành công");
        });

        // console.log("tb_typeproducts_", tb_typeproducts_);

        TypeProduct.deleteOne(tb_typeproducts_, (err) => {
          // console.log(tb_typeproducts_);
          if (err) {
            res.status(400).json({ message: "Xoá bỏ thất bại" });
          } else {
            res.status(200).json({ message: "Xoá bỏ thành công" });
            //xử lý phần xoá bảng sản phẩm
          }
        });
      }
    });
  }
  //Tất cả các sản phẩm
  mListProduct(req, res, next) {
    //Lấy dữ liệu trong bảng type_product theo kiểu callback
    TypeProduct.find({}, function (err, tb_typeproducts_) {
      for (let i = 0; i < tb_typeproducts_.length; i++) {
        tb_typeproducts_[i].imageTypeProduct =
          process.env.BASE_URL + `${tb_typeproducts_[i].imageTypeProduct}`;
      }
      if (!err) {
        res.json(tb_typeproducts_);
      } else {
        res.status(400).json({ error: "Lỗi hệ thống" });
      }
    });
  }
}

module.exports = new TypeProductController();

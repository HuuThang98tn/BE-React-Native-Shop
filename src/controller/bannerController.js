const { Banner, mValidate } = require("../model/banner");
class BannerController {
  mCreactBanner(req, res, next) {
    const mFormData = req.body;
    const mBanner = new Banner(mFormData);
    const { error } = mValidate(mFormData);

    if (error) {
      // Kiểm tra validate form
      res.status(400).json({
        message: "Đã có lỗi xảy ra",
        error,
      });
    } else {
      if (req.file) {
        // kiểm tra xem trường này nhập vào có phải là 1 file hay không ?
        mBanner.imageBn = req.file.path;
      }
      mBanner.save((err) => {
        if (err) {
          res.status(400).json({ message: "Lỗi không lưu được" });
        } else {
          res.status(200).json({ message: "Lưu thành công" });
          console.log(mBanner);
        }
      });
    }
  }
  mListBaner(req, res, next) {
    Banner.find({}, (err, banners) => {
      for (let i = 0; i < banners.length; i++) {
        banners[i].imageBn = process.env.BASE_URL + `${banners[i].imageBn}`;
      }
      if (err) {
        res.status(400).json({
          err,
        });
      } else {
        res.status(200).json(banners);
      }
    });
  }
  mEditBanner(req, res, next) {}
  mDeleteBanner(req, res, next) {}
}
module.exports = new BannerController();

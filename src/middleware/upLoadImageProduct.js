const path = require("path");
const mMulter = require("multer");

const storage = mMulter.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploadsProduct/");
  },
  filename: function (req, file, cb) {
    const mExt = path.extname(file.originalname);
    cb(null, Date.now() + mExt);
  },
});

const uploads = mMulter({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg"
    ) {
      callback(null, true);
    } else {
      callback(null, false);
      console.log({ message: "Lỗi hệ không tải đc ảnh" });
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});
module.exports = uploads;

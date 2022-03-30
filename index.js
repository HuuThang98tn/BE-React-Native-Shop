const express = require("express");
const app = express();
const port = 3000;
const mDB = require("./src/config/index");
const routes = require("./src/routes/index");
require('dotenv').config();

//Kết nối cơ sở dữ liệu
mDB.connect();

//Body -parse
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//gọi đến phương thức index trong routes
routes(app);

// static đi vào và tìm file 
app.use("/uploads", express.static("uploads"));
app.use("/uploads_", express.static("uploads_"));
app.use("/uploadsProduct", express.static("uploadsProduct"));
app.use("/uploadsIndexImg", express.static("uploadsIndexImg"));


app.listen(port, () => {
  console.log("Đang chạy cổng", port);
});

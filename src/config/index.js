const mMONGOOSE = require("mongoose");

async function connect() {
  try {
    const connectionParams = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    await mMONGOOSE.connect(process.env.DB, connectionParams);

    console.log("Kết nối cơ sở dữ liệu thành công !!!");

  } catch (error) {
    console.log(error);
    console.log("Kết nối cơ sở dữ liệu thất bại !!!");
  }
}
module.exports = { connect };

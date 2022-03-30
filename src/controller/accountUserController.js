const {
    Account,
    mValidateRegister,
    mValidateLogin,
    mValidateChangePassWord,
    mValidateRefreshPassWord,
    mValidateRefreshPassWordNew,
  } = require("../model/userac");
  const bcrypt = require("bcryptjs");
  const jwt = require("jsonwebtoken");
  const Token = require("../model/token");
  const sendEmail = require("../../util/sendEmail");
  const crypto = require("crypto");
  
  class AccountUserController {
    //Xử lý chức năng tạo tài khoản
    async mRegister(req, res, next) {
      try {
        const mFormData = req.body;
        const mAccount = await new Account(mFormData);
        const email = mAccount.email;
        let passwordConfirm = mFormData.passwordConfirm;
        let password = mFormData.password;
        const { error } = mValidateRegister(mFormData);
        //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//
        if (error) {
          // kiểm tra validate form ?
          res.status(400).json({
            error,
            messeage: "Đã xảy ra lỗi",
          });
        } else {
          Account.findOne({ $or: [{ email: email }] }).then((user) => {
            if (user) {
              // kiểm tra xem có trùng email hay không ?
              res.status(400).json({
                messeage: "Email này đã có người sử dụng",
              });
            } else {
              if (password !== passwordConfirm) {
                // kiểm tra mật khẩu nhập có giống nhau hay không
                res.status(400).json({
                  messeage: "Mật khẩu không khớp",
                });
              } else {
                if (password.length <= 6 || passwordConfirm <= 6) {
                  res.status(400).json({
                    messeage: "Mật khẩu phải lớn hơn 6 ký tự",
                  });
                } else {
                  bcrypt.hash(mFormData.password, 10, function (err, hashedPass) {
                    if (err) {
                      //Kiểm tra xem có mã hoá được mật khẩu hay không
                      res.status(400).json({
                        messeage: "Đã xảy ra lỗi",
                        error: err,
                      });
                    } else {
                      mAccount.password = hashedPass;
                      mAccount.save((err) => {
                        if (!err) {
                          // khác error
                          res.status(200).json({
                            messeage: "Đăng ký tài khoản thành công",
                            mFormData,
                          });
                        } else {
                          res.status(400).json({
                            messeage: "Đăng ký tài khoản thất bại",
                            error: err,
                          });
                        }
                      });
                    }
                  });
                }
              }
            }
          });
        }
      } catch (error) {
        res.status(400).json({
          messeage: "Đã xảy ra lỗi",
        });
      }
    }
  
    /// Xử lý chức năng đăng nhập
    mLogin(req, res, next) {
      const formData = req.body;
      const email = formData.email;
      const password = formData.password;
      const { error } = mValidateLogin(formData);
      //- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -//
  
      if (error) {
        // Kiểm tra validate
        res.status(400).json({
          error,
          messeage: "Đã xảy ra lỗi",
        });
      } else {
        Account.findOne({ $or: [{ email: email }] }).then((user) => {
          if (!user) {
            //Kiểm tra người dùng xem có tồn tại hay không ?
            res.status(400).json({
              messeage: "Người dùng không tồn tại",
            });
          } else {
            bcrypt.compare(password, user.password, function (err, result) {
              if (err) {
                //Kiểm tra xem có lỗi hay không
                res.status(400).json({
                  messeage: "Đã xảy ra lỗi",
                  error: err,
                });
              } else {
                if (!result) {
                  // Kiểm tra result
                  res.status(400).json({
                    messeage: "Mật khẩu không chính xác",
                  });
                } else {
                  let token = jwt.sign({ email: user.email }, "verySecretValue", {
                    expiresIn: "1h",
                  });
                  res.status(200).json({
                    messeage: "Đăng nhập thành công",
                    token,
                  });
                }
              }
            });
            //      console.log("lololololol",user)
          }
        });
      }
    }
  
    // Xử lý phần đổi mật khẩu
    async mRefresh(req, res, next) {
      const mFormData = req.body;
      const mAccount = await new Account(mFormData);
      let password = mFormData.password;
      let passwordNew = mFormData.passwordNew;
      let passwordConfirmNew = mFormData.passwordNewConfirm;
  
      const { error } = mValidateChangePassWord(mFormData);
  
      if (error) {
        // Kiểm tra validate
        res.status(400).json({
          error: error,
          messeage: "Đã có lỗi xảy ra",
        });
      } else {
        Account.findById(req.params.id, (err, ad_accounts) => {
          if (err) {
            res.status(400).json({ messeage: "Đã có lỗi xảy ra" });
          } else {
            bcrypt.compare(
              password,
              ad_accounts.password,
              function (err, resule) {
                if (err) {
                  res.status(400).json({
                    messeage: "Đã xảy ra lỗi",
                  });
                } else {
                  if (!resule) {
                    // Check mật khẩu mới nhập có khớp với mật khẩu trong db không
                    res.status(400).json({
                      messeage: "Mật khẩu cũ không hợp lệ",
                    });
                  } else {
                    if (passwordNew !== passwordConfirmNew) {
                      // So sánh mật 2 mật khẩu mới nhập vào có khớp hay không ?
                      res.status(400).json({
                        messeage: "Mật khẩu không khớp ",
                      });
                    } else {
                      if (passwordNew.length <= 6 || passwordConfirmNew <= 6) {
                        res.status(400).json({
                          messeage: "Mật khẩu phải lớn hơn 6 ký tự",
                        });
                      } else {
                        bcrypt.hash(passwordNew, 10, function (err, hashedPass) {
                          if (err) {
                            res.status(400).json({
                              messeage: "Đã xảy ra lỗi 179",
                            });
                          } else {
                            passwordNew = hashedPass;
                            console.log((passwordNew = hashedPass));
                            Account.updateOne(
                              { _id: req.params.id },
                              { password: passwordNew },
                              (err) => {
                                if (!err) {
                                  //Kiểm tra khác error
                                  res.status(200).json({
                                    messeage: "Đổi mật khẩu thành công",
                                  });
                                } else {
                                  res.status(400).json({
                                    messeage: "Đỗi mật khẩu thất bại",
                                  });
                                }
                              }
                            );
                          }
                        });
                      }
                    }
                  }
                }
              }
            );
          }
        });
      }
    }
  
    //Xử lý phần gửi link tới email
    async mReset(req, res, next) {
      const email = req.body.email;
      const mFormData = req.body;
      const { error } = mValidateRefreshPassWord(mFormData);
      try {
        if (error) {
          res.status(400).json({
            messeage: "Đã xảy ra lỗi",
            error,
          });
        } else {
          const user = await Account.findOne({ email: email });
          if (!user) {
            res.status(400).json({
              messeage: "Email không tồn tại, vui lòng kiểm tra lại",
            });
          } else {
            let token = Token.findOne({ userID: user._id });
            console.log(token);
            if (!token) {
              res.status(400).json({
                messeage: "Đã xảy ra lỗi!!!",
              });
            } else {
              token = await new Token({
                userID: user._id,
                token: crypto.randomBytes(32).toString("hex"),
              }).save();
              const link = `${process.env.BASE_URL}/account_ad/link_reset/${user._id}/${token.token}`;
              await sendEmail(user.email, "Đặt lại mật khẩu của mình", link);
              res.status(200).json({
                messeage:
                  "Liên kết đặt lại mật khẩu đã được gửi đến email của bạn",
              });
            }
          }
        }
      } catch (error) {
        res.status(400).json({
          messeage: "Đã có lỗi xảy ra",
        });
        console.log("Đã xảy ra lỗi", error);
      }
    }
  
    //Xử lý web View form nhập mật khẩu mới
    mGetNewResetPassWord(req, res, next) {}
  
    //Xử lý phần nhập mật khẩu
    async mNewResetPassWord(req, res, next) {
      try {
        const user = await Account.findById(req.params.userID);
        const mFormData = req.body;
        const passwordRefreshNew = mFormData.passwordRefreshNew;
        const passwordConfirmRefreshNew = mFormData.passwordConfirmRefreshNew;
        const { error } = mValidateRefreshPassWordNew(mFormData);
        if (error) {
          res.status(400).json({
            messeage: "Đã xảy ra lỗi",
          });
        } else {
          if (!user) {
            res.status(400).json({
              messeage: "Liên kết không hợp lệ hoặc đã hết hạn",
            });
          } else {
            const token = await Token.findOne({
              userID: user._id,
              toke: req.params.token,
            });
            if (!token) {
              res.status(400).json({
                messeage: "Liên kết không hợp lệ hoặc đã hết hạn",
              });
            } else {
              if (passwordRefreshNew !== passwordConfirmRefreshNew) {
                res.status(400).json({
                  messeage: "Mật khẩu không khớp",
                });
              } else {
                if (
                  passwordRefreshNew.length <= 6 ||
                  passwordConfirmRefreshNew.length <= 6
                ) {
                  res.status(400).json({
                    messeage: "Mật khẩu phải lớn hơn 6 ký tự",
                  });
                } else {
                  bcrypt.hash(
                    passwordRefreshNew,
                    10,
                    async function (err, hashedPass) {
                      if (err) {
                        res.status(400).json({
                          error: err,
                        });
                      } else {
                        user.password = hashedPass;
                        await user.save();
                        await token.delete();
                        res.status(200).json({
                          messeage: "Đổi mật khẩu thành công !!!",
                        });
                      }
                    }
                  );
                }
              }
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  
  module.exports = new AccountUserController();
  
const express =require("express");
const router = express.Router();
const mTypeProduct = require("../controller/typeProductController");
const mUpLoad = require("../middleware/upLoadImageTypeProduct")

//con đường thêm loại sản phẩm
router.post('/create_product',mUpLoad.single("imageTypeProduct"),mTypeProduct.mCreateProduct);

//con đường trả ra sản phẩm
router.get('/list_product',mTypeProduct.mListProduct); 

//con đường cập nhật sản phẩm
router.put('/edit_product/:id',mUpLoad.single("imageLoaiSanPham"),mTypeProduct.mEditProduct);

//xoá sản phẩm
router.delete('/delete_product/:id',mTypeProduct.mDestroyProduct);


//con đường trả ra sản phẩm mới nhất (50 sản phẩm)
// router.get('/topnew_product',mTypeProduct.mTopNewProduct);
// //con đường trả ra sản phẩm theo id
// router.get('/list_product/:id',mTypeProduct.mListProductID);

module.exports = router;

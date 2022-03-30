const express = require("express");
const router = express.Router();

const mProduct = require("../controller/productController");
const mUpLoad = require("../middleware/upLoadImageProduct");


//con đường thêm loại sản phẩm
router.post('/create_product',mUpLoad.single("imageProduct"),mProduct.mCreateProduct);

//con đường trả ra sản phẩm
router.get('/list_product', mProduct.mListProduct); 

//con đường trả ra sản phẩm mới nhất (50 sản phẩm)
router.get('/topnew_product',mProduct.mTopNewProduct);

// //con đường trả ra sản phẩm theo id
router.get('/list_product/:id',mProduct.mListProductID);

router.get('/type/list_product/:id',mProduct.mListProductTypeID);

//con đường cập nhật sản phẩm
router.put('/edit_product/:id',mUpLoad.single("imageLoaiSanPham"),mProduct.mEditProduct);

//xoá sản phẩm
router.delete('/delete_product/:id',mProduct.mDestroyProduct);


//API tìm kiếm
router.get('/search-product',mProduct.mSearchProduct);


module.exports = router ; 
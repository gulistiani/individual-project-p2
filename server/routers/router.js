const router = require('express').Router()
const LoginController = require('../controllers/LoginController')
const ProductController = require('../controllers/ProductController')
const CartController = require('../controllers/CartController')
const WishlistController = require('../controllers/WishlistController')
const CategoryController = require('../controllers/CategoryController')
const VoucherController = require('../controllers/VoucherController')
const PromotionController = require('../controllers/PromotionController')
const CheckoutController = require('../controllers/CheckoutController')

const authenticate = require('../middlewares/authentication')

router.post('/register/email', LoginController.registerEmail)
router.post('/register/mobile', LoginController.registerMobile)
router.post('/login/email', LoginController.loginEmail)
router.post('/login/mobile', LoginController.loginMobile)
// router.post('/login/google', LoginController.loginGoogle)

// router.get('/categories', CategoryController.getCategory)

router.get('/products', ProductController.getProduct)
router.get('/products/:productId', ProductController.getProductById)
router.get('/products/category/:categoryId', ProductController.getProductByCategory)
router.get('/products/search/:inputSearch', ProductController.searchProduct)
router.get('/products/image/:name', ProductController.download)


router.use(authenticate)

router.get('/cart', CartController.getCart)
router.post('/cart/delete/:cartId', CartController.deleteFromCart)

router.get('/wishlist', WishlistController.getWishlist)
router.post('/wishlist', WishlistController.addRemoveWishlist)

router.get('/promotions/code/:promotionCode', PromotionController.getPromotionByCode)
router.patch('/promotions/:promotionCode', PromotionController.usePromotion)

router.get('/vouchers/code/:voucherCode', VoucherController.getVoucherByCode)
router.patch('/vouchers/:voucherCode', VoucherController.redeemVoucher)

router.post('/checkout/header', CheckoutController.createHead)
router.post('/checkout/detail', CheckoutController.createDetail)
router.delete('/checkout/deleteCartAfterCheckout/:userId', CheckoutController.deleteCartAfterCheckout)

router.get('/transactions/head', CheckoutController.getTransactionHead)
router.get('/transactions/head/:trxHeadId', CheckoutController.getTransactionHeadById)
router.get('/transactions/detail/:trxHeadId', CheckoutController.getTransactionDetail)

module.exports = router
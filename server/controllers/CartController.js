const { Cart, sequelize } = require('../models')
const { decodeToken } = require('../helpers/jwt')
// const baseURL = 'https://e-commerce-server-side.herokuapp.com/products/image/'
const baseURL = 'http://localhost:3000/products/image/'

class CartController {
    static getCart(req, res, next) {
        const decodedtoken = decodeToken(req.headers.access_token)
        const userId = decodedtoken.id

        console.log(userId);

        sequelize.query(`select c.id,
                                c."userId", 
                                u."firstName", 
                                u."lastName", 
                                c."productId" , 
                                p."name" as "productName", 
                                p.description as "productDescription",
                                p.price as "productPrice",
                                p."discountedPrice" as "productDiscountedPrice",
                                concat('${baseURL}', p."imageURL") as "imagePath" 
                           from "Carts" c 
                          inner join "Products" p on p.id = c."productId" 
                          inner join "Users" u on u.id = c."userId" 
                          where c."userId" = ${userId}
                          order by c.id`, { type: sequelize.QueryTypes.SELECT })
            .then(data => {
                if (!data || data.length === 0) {
                    res.status(200).json({ success: true, result: 'Tidak ada produk di keranjang' })
                } else {
                    res.status(200).json({ success: true, result: data })
                }

            })
            .catch(err => {
                console.log(err);
                next({ message: err.message })
            })
    }

    static addToCart(req, res, next) {
        const decodedtoken = decodeToken(req.headers.access_token)
        const userId = decodedtoken.id
        const productId = +req.params.productId

        sequelize.query(`select * from "Carts" c where "userId" = ${userId} and "productId" = ${productId}`, { type: sequelize.QueryTypes.SELECT })
            .then(data2 => {
                if (!data2 || data2.length === 0) {
                    Cart.create({
                        userId,
                        productId
                    })
                        .then(data => {
                            res.status(201).json({ success: true, message: `Produk berhasil ditambahkan ke keranjang`, result: data })
                        })
                        .catch(err => {
                            console.log(err);
                            next({ message: err.message })
                        })
                } else {
                    throw { message: 'Produk sudah ada di keranjang' }
                }
            })
            .catch(err => {
                console.log(err);
                next({ message: err.message })
            })


    }

    static deleteFromCart(req, res, next) {
        const cartId = +req.params.cartId

        sequelize.query(`delete from "Carts" c where id = ${cartId}`, { type: sequelize.QueryTypes.DELETE })
            .then(data => {
                res.status(200).json({ success: true, message: `Produk berhasil dihapus dari keranjang`, result: data })
            })
            .catch(err => {
                console.log(err);
                next({ message: err.message })
            })
    }
}

module.exports = CartController
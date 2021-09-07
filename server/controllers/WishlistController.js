const { Wishlist, sequelize } = require('../models')
const { decodeToken } = require('../helpers/jwt')

class WishlistController {
    static getWishlist(req, res, next) {
        const decodedtoken = decodeToken(req.headers.access_token)
        const userId = decodedtoken.id

        sequelize.query(`select * from "Wishlists" c where "userId" = ${+userId}`, { type: sequelize.QueryTypes.SELECT })
            .then(data => {
                console.log('-------------------');
                console.log('data');
                if (!data || data.length === 0) {
                    res.status(200).json({ success: true, result: 'Tidak ada produk di wishlist' })
                } else {
                    res.status(200).json({ success: true, result: data })
                }
            })
            .catch(err => {
                console.log(err);
                next({ message: err.message })
            })
    }

    static addRemoveWishlist(req, res, next) {
        const decodedtoken = decodeToken(req.headers.access_token)
        const userId = decodedtoken.id
        const productId = +req.body.productId

        sequelize.query(`select * from "Wishlists" c where "userId" = ${userId} and "productId" = ${productId}`, { type: sequelize.QueryTypes.SELECT })
            .then(data => {

                if (!data || data.length === 0) {
                    Wishlist.create({
                        userId,
                        productId
                    })
                        .then(data => {
                            res.status(201).json({ success: true, message: `Produk berhasil ditambahkan ke wishlist`, result: data })
                        })
                        .catch(err => {
                            console.log(err);
                            next({ message: err.message })
                        })

                } else {
                    sequelize.query(`delete from "Wishlists" where "userId" = ${userId} and "productId" = ${productId}`, { type: sequelize.QueryTypes.UPDATE })
                        .then(data => {
                            res.status(200).json({ success: true, message: `Produk berhasil dihilangkan dari wishlist`, result: data })
                        })
                        .catch(err => {
                            console.log(err);
                            next({ message: err.message })
                        })
                }
            })
            .catch(err => {
                console.log(err);
                next({ message: err.message })
            })
    }

}

module.exports = WishlistController
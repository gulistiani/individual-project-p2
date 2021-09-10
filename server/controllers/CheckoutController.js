const { TrxHead, TrxDetail, Enrollment, sequelize } = require('../models')
const { decodeToken } = require('../helpers/jwt')

class CheckoutController {
    static createHead(req, res, next) {
        const decodedtoken = decodeToken(req.headers.access_token)
        const userId = decodedtoken.id

        TrxHead.create({
            userId: +req.body.userId,
            customerName: req.body.customerName,
            subTotal: +req.body.subTotal,
            promoId: +req.body.promoId ? +req.body.promoId : null,
            promoCode: req.body.promoCode ? req.body.promoCode : null,
            promoAmount: +req.body.promoAmount ? +req.body.promoAmount : null,
            promoAmountUsed: +req.body.promoAmountUsed,
            voucherId: +req.body.voucherId ? +req.body.voucherId : null,
            voucherCode: req.body.voucherCode ? req.body.voucherCode : null,
            voucherAmount: +req.body.voucherAmount ? +req.body.voucherAmount : null,
            voucherAmountUsed: +req.body.voucherAmountUsed,
            ongkir: +req.body.ongkir,
            total: +req.body.total,
            recipientName: req.body.recipientName,
            recipientMobile: req.body.recipientMobile,
            recipientAddress: req.body.recipientAddress
        })
            .then(data => {
                res.status(201).json({ success: true, result: data })
            })
            .catch(err => {
                console.log(err);
                next({ message: err.message })
            })
    }

    static createDetail(req, res, next) {
        TrxDetail.create({
            trxHeadId: +req.body.trxHeadId,
            productName: req.body.productName,
            finalPrice: +req.body.finalPrice,
            quantity: +req.body.quantity,
            totalWeight: +req.body.totalWeight,
            subTotal: +req.body.subTotal,
        })
            .then(data => {
                res.status(201).json({ success: true, result: data })
            })
            .catch(err => {
                console.log(err);
                next({ message: err.message })
            })
    }

    static deleteCartAfterCheckout(req, res, next) {
        sequelize.query(`delete from "Carts"where "userId" = ${+req.params.userId}`, { type: sequelize.QueryTypes.DELETE })
            .then(data => {
                res.status(200).json({ success: true, result: data })
            })
            .catch(err => {
                console.log(err);
                next({ message: err.message })
            })
    }

    static createEnrollment(req, res, next) {
        const decodedtoken = decodeToken(req.headers.access_token)
        const userId = decodedtoken.id
        const productId = +req.body.productId

        Enrollment.create({ userId, productId })
            .then(data => {
                res.status(201).json({ success: true, result: data })
            })
            .catch(err => {
                console.log(err);
                next({ message: err.message })
            })
    }
    static getTransactionHead(req, res, next) {
        TrxHead.findAll({ where: { userId: req.currentUserId } })
            .then(data => {
                res.status(200).json({ success: true, result: data })
            })
            .catch(err => {
                console.log(err);
                next({ message: err.message })
            })
    }

    static getTransactionHeadById(req, res, next) {
        TrxHead.findOne({ where: { id: +req.params.trxHeadId } })
            .then(data => {
                res.status(200).json({ success: true, result: data })
            })
            .catch(err => {
                console.log(err);
                next({ message: err.message })
            })
    }

    static getTransactionDetail(req, res, next) {
        TrxDetail.findAll({ where: { trxHeadId: +req.params.trxHeadId } })
            .then(data => {
                res.status(200).json({ success: true, result: data })
            })
            .catch(err => {
                console.log(err);
                next({ message: err.message })
            })
    }



}

module.exports = CheckoutController
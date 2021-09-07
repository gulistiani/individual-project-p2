const { Promotion, sequelize } = require('../models')

class PromotionController {
    static getPromotion(req, res, next) {
        sequelize.query(`select *, TO_CHAR("expiredDate" :: DATE, 'yyyy-MM-dd') as "exDate" from "Promotions"  order by id desc`, { type: sequelize.QueryTypes.SELECT })
            .then(data => {
                res.status(200).json({ success: true, result: data })
            })
            .catch(err => {
                console.log(err);
                next({ message: err.message })
            })
    }

    static searchPromotion(req, res, next) {
        let item = req.params.inputSearch
        sequelize.query(`select *, TO_CHAR("expiredDate" :: DATE, 'yyyy-MM-dd') as "exDate" 
                           from "Promotions" p 
                          where lower(p.code) like lower('%${item}%')
                          order by id desc`, { type: sequelize.QueryTypes.SELECT })
            .then(data => {
                res.status(200).json({ success: true, result: data })
            })
            .catch(err => {
                console.log(err);
                next({ message: err.message })
            })
    }

    static getPromotionById(req, res, next) {
        sequelize.query(`select * from "Promotions" where id = ${+req.params.promotionId}`, { type: sequelize.QueryTypes.SELECT })
            .then(data => {
                res.status(200).json({ success: true, result: data })
            })
            .catch(err => {
                console.log(err);
                next({ message: err.message })
            })
    }

    static getPromotionByCode(req, res, next) {
        sequelize.query(` select * 
                            from "Promotions" 
                           where lower(code) = lower('${req.params.promotionCode}')
                             and status = 'Y'
                             and "maxRedeem" > "currentCount"
                             and "expiredDate" >= CURRENT_DATE`, { type: sequelize.QueryTypes.SELECT })
            .then(data => {
                res.status(200).json({ success: true, result: data })
            })
            .catch(err => {
                console.log(err);
                next({ message: err.message })
            })
    }

    static addPromotion(req, res, next) {
        if (!+req.body.value) {
            throw { message: 'Value promotion tidak valid' }
        }

        if (req.body.type === '%' && +req.body.value > 100) {
            throw { message: 'Maximum Promotion untuk tipe % adalah 100' }
        }

        if (req.body.type === '%' && +req.body.value <= 0) {
            throw { message: 'Promotion harus lebih dari 0%' }
        }

        if (req.body.type === 'Amount' && +req.body.value <= 0) {
            throw { message: 'Promotion harus lebih dari Rp. 0' }
        }

        Promotion.create({
            code: req.body.code,
            type: req.body.type,
            value: +req.body.value,
            status: req.body.status,
            maxRedeem: +req.body.maxRedeem,
            currentCount: 0,
            expiredDate: req.body.expiredDate
        })
            .then(data => {
                res.status(201).json({ success: true, message: `Promosi berhasil ditambahkan`, result: data })
            })
            .catch(err => {
                console.log(err);
                next({ message: err.message })
            })
    }

    static editPromotion(req, res, next) {
        if (!+req.body.value) {
            throw { message: 'Value promotion tidak valid' }
        }

        if (req.body.type === '%' && +req.body.value > 100) {
            throw { message: 'Maximum Promotion untuk tipe % adalah 100' }
        }

        if (req.body.type === '%' && +req.body.value <= 0) {
            throw { message: 'Promotion harus lebih dari 0%' }
        }

        if (req.body.type === 'Amount' && +req.body.value <= 0) {
            throw { message: 'Promotion harus lebih dari Rp. 0' }
        }

        Promotion.update({
            code: req.body.code,
            type: req.body.type,
            value: +req.body.value,
            status: req.body.status,
            maxRedeem: +req.body.maxRedeem,
            expiredDate: req.body.expiredDate
        }, { where: { id: +req.params.promotionId } })
            .then(data => {
                if (!data || data.length === 0 || data[0] === 0) {
                    throw { message: 'Promosi tidak ditemukan' }
                } else {
                    res.status(200).json({ success: true, message: `Promotion berhasil diubah`, result: data })
                }
            })
            .catch(err => {
                console.log(err);
                next({ message: err.message })
            })
    }

    static usePromotion(req, res, next) {
        Promotion.findOne({ where: { code: req.params.promotionCode } })
            .then(data => {
                if (!data || data.length === 0 || data[0] === 0) {
                    throw { message: 'Kode promo tidak ditemukan' }
                }

                if (data.dataValues.status === 'N') {
                    throw { message: 'Kode promo sudah tidak berlaku' }
                }

                if (Date.now() > data.dataValues.expiredDate) {
                    throw { message: 'Kode promo sudah expired' }
                }

                if (data.dataValues.currentCount >= data.dataValues.maxRedeem) {
                    throw { message: 'Kode promo sudah melebihi batas maximum penggunaan' }
                }

                sequelize.query(`update "Promotions" set "currentCount" = "currentCount" + 1 where code = '${req.params.promotionCode}'`, { type: sequelize.QueryTypes.UPDATE })
                    .then(data => {
                        res.status(200).json({ success: true, message: `Kode promo berhasil digunakan`, result: data })
                    })
                    .catch(err => {
                        console.log(err);
                        next({ message: err.message })
                    })
            })
            .catch(err => {
                console.log(err);
                next({ message: err.message })
            })
    }

    static deletePromotion(req, res, next) {
        Promotion.destroy({ where: { id: +req.params.promotionId, } })
            .then(data => {
                if (!data || data.length === 0 || data[0] === 0) {
                    throw { message: 'Promosi tidak ditemukan' }
                } else {
                    res.status(200).json({ success: true, message: `Promosi berhasil dihapus`, result: data })
                }
            })
            .catch(err => {
                console.log(err);
                next({ message: err.message })
            })
    }
}

module.exports = PromotionController
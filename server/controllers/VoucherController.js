const { Voucher, sequelize } = require('../models')
const VoucherGenerator = require('voucher-code-generator');

class VoucherController {
    static getVoucher(req, res, next) {
        sequelize.query(`select * from "Vouchers" order by id`, { type: sequelize.QueryTypes.SELECT })
            .then(data => {
                res.status(200).json({ success: true, result: data })
            })
            .catch(err => {
                console.log(err);
                next({ message: err.message })
            })
    }

    static searchVoucher(req, res, next) {
        let item = req.params.inputSearch
        sequelize.query(`select * from "Vouchers" v
                          where lower(v.code) like lower('%${item}%') 
                          order by id desc`, { type: sequelize.QueryTypes.SELECT })
            .then(data => {
                res.status(200).json({ success: true, result: data })
            })
            .catch(err => {
                console.log(err);
                next({ message: err.message })
            })
    }

    static getVoucherById(req, res, next) {
        sequelize.query(`select * from "Vouchers" where id = ${+req.params.voucherId}`, { type: sequelize.QueryTypes.SELECT })
            .then(data => {
                res.status(200).json({ success: true, result: data })
            })
            .catch(err => {
                console.log(err);
                next({ message: err.message })
            })
    }

    static getVoucherByCode(req, res, next) {
        sequelize.query(`select * 
                           from "Vouchers" 
                          where code = '${req.params.voucherCode}'
                            and status = 'Y'`, { type: sequelize.QueryTypes.SELECT })
            .then(data => {
                res.status(200).json({ success: true, result: data })
            })
            .catch(err => {
                console.log(err);
                next({ message: err.message })
            })
    }

    static addVoucher(req, res, next) {
        if (+req.body.amount <= 0) {
            throw { message: 'Amount voucher harus > Rp. 0' }
        }

        const code = VoucherGenerator.generate({ count: 1, pattern: "####-####-####-####", charset: VoucherGenerator.charset("alphanumeric") });
        Voucher.create({
            code: code[0],
            amount: +req.body.amount,
            status: req.body.status
        })
            .then(data => {
                res.status(201).json({ success: true, message: `Voucher berhasil ditambahkan`, result: data })
            })
            .catch(err => {
                console.log(err);
                next({ message: err.message })
            })
    }

    static editVoucher(req, res, next) {
        Voucher.update({
            amount: req.body.amount,
            status: req.body.status
        }, { where: { id: +req.params.voucherId } })
            .then(data => {
                if (!data || data.length === 0 || data[0] === 0) {
                    throw { message: 'Voucher tidak ditemukan' }
                } else {
                    res.status(200).json({ success: true, message: `Voucher berhasil diubah`, result: data })
                }
            })
            .catch(err => {
                console.log(err);
                next({ message: err.message })
            })
    }

    static redeemVoucher(req, res, next) {
        Voucher.findOne({ where: { code: req.params.voucherCode } })
            .then(data => {
                if (!data || data.length === 0 || data[0] === 0) {
                    throw { message: 'Kode voucher tidak ditemukan' }
                }

                if (data.dataValues.status === 'N') {
                    throw { message: 'Kode voucher sudah digunakan sebelumnya' }
                }

                Voucher.update({ status: 'N' }, { where: { code: req.params.voucherCode } })
                    .then(data => {
                        res.status(200).json({ success: true, message: `Kode voucher berhasil digunakan`, result: data })
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

    static deleteVoucher(req, res, next) {
        Voucher.destroy({ where: { id: +req.params.voucherId, } })
            .then(data => {
                if (!data || data.length === 0 || data[0] === 0) {
                    throw { message: 'Voucher tidak ditemukan' }
                } else {
                    res.status(200).json({ success: true, message: `Voucher berhasil dihapus`, result: data })
                }

            })
            .catch(err => {
                console.log(err);
                next({ message: err.message })
            })
    }
}

module.exports = VoucherController
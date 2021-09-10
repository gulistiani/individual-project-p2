const { Category, sequelize } = require('../models')
const validateMobile = require('../helpers/validateMobile')
const uploadFile = require("../middlewares/upload");
const fs = require('fs')
const moment = require('moment')
//const baseURL = 'https://e-commerce-server-side.herokuapp.com/products/image/'
//const baseURL = 'http://localhost:3000/products/image/'
const baseURL = ''

class CategoryController {
    static getCategory(req, res, next) {
        sequelize.query(`select c.*, 
                                concat('${baseURL}', c."imageURL") as "imagePath"
                          from "Categories" c 
                         order by c.id`, { type: sequelize.QueryTypes.SELECT })
            .then(data => {
                if (!data || data.length === 0 || data[0] === 0) {
                    res.status(200).json({ success: true, result: 'Tidak ada data kategori' })
                } else {
                    res.status(200).json({ success: true, result: data })
                }
            })
            .catch(err => {
                console.log(err);
                next({ message: err.message })
            })
    }
}

module.exports = CategoryController
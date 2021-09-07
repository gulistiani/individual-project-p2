const { Product, sequelize } = require('../models')
const { decodeToken } = require('../helpers/jwt')
const uploadFile = require("../middlewares/upload");
const fs = require('fs')
const moment = require('moment')
// const baseURL = 'https://e-commerce-server-side.herokuapp.com/products/image/'
const baseURL = 'http://localhost:3000/products/image/'

class ProductController {
    static getProduct(req, res, next) {
        if (!req.headers.access_token || req.headers.access_token === 'undefined') {
            sequelize.query(` select p.*, 
                                     0 as cartQuantity,
                                     concat('${baseURL}', p."imageURL") as "imagePath"
                                from "Products" p order by name`, { type: sequelize.QueryTypes.SELECT })
                .then(data => {
                    res.status(200).json({ success: true, result: data })
                })
                .catch(err => {
                    console.log('------------------------------ getProduct 1');
                    console.log(err);
                    next({ message: err.message, error: err })
                })

        } else {
            console.log(req.headers.access_token);
            const decodedtoken = decodeToken(req.headers.access_token)
            const userId = decodedtoken.id

            sequelize.query(`select p.id,
                                    p."name",
                                    p.description,
                                    p.alias,
                                    p.stock,
                                    p.weight,
                                    p.price,
                                    p."discountedPrice",
                                    p."categoryId",
                                    case when c.quantity is null then 0 else c.quantity end as cartQuantity,
                                    concat('${baseURL}', p."imageURL") as "imagePath"
                              from "Products" p
                              left outer join "Carts" c on p.id = c."productId" and c."userId" = ${userId}
                             order by p.name`, { type: sequelize.QueryTypes.SELECT })
                .then(data => {
                    res.status(200).json({ success: true, result: data })
                })
                .catch(err => {
                    console.log('------------------------------ getProduct 2');
                    console.log(err);
                    next({ message: err.message, error: err })
                })
        }
    }

    static getProductById(req, res, next) {
        sequelize.query(`select * from "Products" where id = ${+req.params.productId}`, { type: sequelize.QueryTypes.SELECT })
            .then(data => {
                res.status(200).json({ success: true, result: data })
            })
            .catch(err => {
                console.log('------------------------------ getProductById');
                console.log(err);
                next({ message: err.message, error: err })
            })
    }

    static getProductByCategory(req, res, next) {
        console.log(req.headers.access_token);
        if (!req.headers.access_token || req.headers.access_token === 'undefined') {
            sequelize.query(`select p.*, 
                                    0 as cartQuantity,
                                    concat('${baseURL}', p."imageURL") as "imagePath"
                              from "Products" p  
                             where "categoryId" = ${+req.params.categoryId}
                             order by name`, { type: sequelize.QueryTypes.SELECT })
                .then(data => {
                    res.status(200).json({ success: true, result: data })
                })
                .catch(err => {
                    console.log('------------------------------ getProductByCategory');
                    console.log(err);
                    next({ message: err.message, error: err })
                })
        } else {
            const decodedtoken = decodeToken(req.headers.access_token)
            const userId = decodedtoken.id
            sequelize.query(`select p.id,
                                    p."name",
                                    p.description,
                                    p.alias,
                                    p.stock,
                                    p.weight,
                                    p.price,
                                    p."discountedPrice",
                                    p."categoryId",
                                    case when c.quantity is null then 0 else c.quantity end as cartQuantity,
                                    concat('${baseURL}', p."imageURL") as "imagePath"
                              from "Products" p
                              left outer join "Carts" c on p.id = c."productId" and c."userId" = ${userId}
                              where "categoryId" = ${+req.params.categoryId}
                              order by p.name`, { type: sequelize.QueryTypes.SELECT })
                .then(data => {
                    res.status(200).json({ success: true, result: data })
                })
                .catch(err => {
                    console.log('------------------------------ getProductByCategory 2');
                    console.log(err);
                    next({ message: err.message, error: err })
                })
        }
    }

    static searchProduct(req, res, next) {
        if (!req.headers.access_token || req.headers.access_token === 'undefined') {
            sequelize.query(` select p.*, 
                                                          0 as cartQuantity,
                                                          concat('${baseURL}', p."imageURL") as "imagePath"
                                                     from "Products" p 
                                                    where LOWER("name") like '%${req.params.inputSearch.toLowerCase()}%' 
                                                       or LOWER("alias") like '%${req.params.inputSearch.toLowerCase()}%'
                                                    order by name`, { type: sequelize.QueryTypes.SELECT })
                .then(data => {
                    res.status(200).json({ success: true, result: data })
                })
                .catch(err => {
                    console.log('------------------------------ searchProduct 1');
                    console.log(err);
                    next({ message: err.message, error: err })
                })

        } else {
            console.log(req.headers.access_token);
            const decodedtoken = decodeToken(req.headers.access_token)
            const userId = decodedtoken.id

            sequelize.query(`select p.id,
                                                         p."name",
                                                         p.description,
                                                         p.alias,
                                                         p.stock,
                                                         p.weight,
                                                         p.price,
                                                         p."discountedPrice",
                                                         p."categoryId",
                                                         case when c.quantity is null then 0 else c.quantity end as cartQuantity,
                                                         concat('${baseURL}', p."imageURL") as "imagePath"
                                                   from "Products" p
                                                   left outer join "Carts" c on p.id = c."productId" and c."userId" = ${userId}
                                                  where LOWER("name") like '%${req.params.inputSearch.toLowerCase()}%' 
                                                     or LOWER("alias") like '%${req.params.inputSearch.toLowerCase()}%'
                                                  order by p.name`, { type: sequelize.QueryTypes.SELECT })
                .then(data => {
                    res.status(200).json({ success: true, result: data })
                })
                .catch(err => {
                    console.log('------------------------------ searchProduct 2');
                    console.log(err);
                    next({ message: err.message, error: err })
                })
        }
    }

    static download = (req, res, next) => {
        const fileName = req.params.name;
        const directoryPath = __basedir + "/resources/static/assets/product/";

        res.sendFile(directoryPath + fileName, fileName, (err) => {
            if (err) {
                console.log('------------------------------ download');
                next({ message: 'Could not download the file' })
            }
        });
    };
}

module.exports = ProductController
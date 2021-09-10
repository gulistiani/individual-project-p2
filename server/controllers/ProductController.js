const { Product, Progress, sequelize } = require('../models')
const { decodeToken } = require('../helpers/jwt')
const uploadFile = require("../middlewares/upload");
const fs = require('fs')
const moment = require('moment')
const baseURL = 'https://e-commerce-server-side.herokuapp.com/products/image/'
//const baseURL = 'http://localhost:3000/products/image/'

class ProductController {
    static getProduct(req, res, next) {
        const limit = req.body.limit
        console.log(req.headers.access_token);
        if (!req.headers.access_token || typeof req.headers.access_token === 'undefined' || req.headers.access_token === 'undefined') {
            console.log(' ---------------------------------- tanpa login');
            sequelize.query(` select p.*, 
                                     0 as enrollment,
                                     0 as "inCart",
                                     concat('${baseURL}', p."imageURL") as "imagePath"
                                from "Products" p 
                                order by p.id
                                limit ${limit}`, { type: sequelize.QueryTypes.SELECT })
                .then(data => {
                    res.status(200).json({ success: true, result: data })
                })
                .catch(err => {
                    console.log('------------------------------ getProduct 1');
                    // console.log(err);
                    // next({ message: err.message, error: err })
                })

        } else {
            console.log(' ---------------------------------- dengan login');
            const decodedtoken = decodeToken(req.headers.access_token)
            const userId = decodedtoken.id

            sequelize.query(`select p.id,
                                    p."name",
                                    p.description,
                                    p.alias,
                                    p.price,
                                    p."discountedPrice",
                                    p."categoryId",
                                    case when e.id is null then 0 else 1 end as enrollment,
                                    case when c.id is null then 0 else 1 end as "inCart",
                                    concat('${baseURL}', p."imageURL") as "imagePath"
                               from "Products" p
                               left outer join "Enrollments" e on p.id = e."productId" and e."userId" = ${userId}
                               left outer join "Carts" c on c."productId"  = p.id and c."userId" = ${userId}
                              order by p.id, e.id
                              limit ${limit}`, { type: sequelize.QueryTypes.SELECT })
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

    static getProductDetail(req, res, next) {
        const id = +req.params.productId

        if (!req.headers.access_token || typeof req.headers.access_token === 'undefined') {
            sequelize.query(`select p.id,
                                    p."name",
                                    p.description,
                                    p.price, 
                                    p."discountedPrice",
                                    p.instructor,
                                    c."name" as "categoryName",
                                    0 as enrollment,
                                    0 as "inCart",
                                    ROUND(CAST(sum(pd.duration) AS NUMERIC)/3600,2) * interval '1 hour' as "totalDuration",
                                    concat('${baseURL}', p."imageURL") as "imagePath"
                              from "Products" p
                              left outer join "ProductDetails" pd on p.id = pd."productId" 
                              left outer join "Categories" c on p."categoryId" = c.id
                             where p.id = ${id}
                             group by p.id,
                                      p."name",
                                      p.description,
                                      p.price, 
                                      p."discountedPrice",
                                      p.instructor,
                                      c."name",
                                      p."imageURL"`, { type: sequelize.QueryTypes.SELECT })
                .then(data => {
                    res.status(200).json({ success: true, result: data })
                })
                .catch(err => {
                    console.log('------------------------------ getProductById 1');
                    console.log(err);
                    next({ message: err.message, error: err })
                })

        } else {
            const decodedtoken = decodeToken(req.headers.access_token)
            const userId = decodedtoken.id

            sequelize.query(`select p.id,
                                    p."name",
                                    p.description,
                                    p.price, 
                                    p."discountedPrice",
                                    p.instructor,
                                    cat."name" as "categoryName",
                                    case when e.id is null then 0 else 1 end as enrollment,
                                    case when c.id is null then 0 else 1 end as "inCart",
                                    ROUND(CAST(sum(pd.duration) AS NUMERIC)/3600,2) * interval '1 hour' as "totalDuration",
                                    concat('${baseURL}', p."imageURL") as "imagePath"
                               from "Products" p
                               left outer join "ProductDetails" pd on p.id = pd."productId" 
                               left outer join "Categories" cat on p."categoryId" = cat.id
                               left outer join "Enrollments" e on p.id = e."productId" and e."userId" = ${userId}
                               left outer join "Carts" c on c."productId"  = p.id and c."userId" = ${userId}
                              where p.id = ${id}
                              group by p.id, 
                                       p."name",
                                       p.description,
                                       p.price, 
                                       p."discountedPrice",
                                       p.instructor,
                                       cat."name",
                                       p."imageURL",
                                       e.id,
                                       c.id`, { type: sequelize.QueryTypes.SELECT })
                .then(data => {
                    res.status(200).json({ success: true, result: data })
                })
                .catch(err => {
                    console.log('------------------------------ getProductById 2');
                    console.log(err);
                    next({ message: err.message, error: err })
                })
        }
    }

    static getProductTopic(req, res, next) {
        const id = +req.params.productId

        if (!req.headers.access_token || typeof req.headers.access_token === 'undefined') {
            sequelize.query(` select p.*, '0%' as progress, 'width:0%' as bar,
                                from "ProductDetails" p
                               where p."productId" = ${id}
                               order by sequence`, { type: sequelize.QueryTypes.SELECT })
                .then(data => {
                    res.status(200).json({ success: true, result: data })
                })
                .catch(err => {
                    console.log('------------------------------ getProductTopic 1');
                    console.log(err);
                    next({ message: err.message, error: err })
                })

        } else {
            const decodedtoken = decodeToken(req.headers.access_token)
            const userId = decodedtoken.id

            sequelize.query(`select p.id,
                                    p."productId",
                                    p."sequence",
                                    p.title,
                                    p.url,
                                    p.duration,
                                    pr.watched,
                                    round(pr.watched/p.duration*100)||'%' as progress,
                                    'width:'||round(pr.watched/p.duration*100)||'%' as bar
                              from "ProductDetails" p
                              left outer join "Progresses" pr on p."id" = pr."productDetailId" 
                                                           and pr."userId" = ${userId}
                             where p."productId" = ${id}
                             order by sequence`, { type: sequelize.QueryTypes.SELECT })
                .then(data => {
                    res.status(200).json({ success: true, result: data })
                })
                .catch(err => {
                    console.log('------------------------------ getProductTopic 2');
                    console.log(err);
                    next({ message: err.message, error: err })
                })
        }
    }

    static getTopicDetail(req, res, next) {
        const productId = +req.body.productId
        const sequence = +req.body.sequence

        const decodedtoken = decodeToken(req.headers.access_token)
        const userId = decodedtoken.id

        sequelize.query(` select pd.id,
                                 pd."productId",
                                 pd.sequence,
                                 pd.title,
                                 pd.url,
                                 pd.duration,
                                 pr.watched,
                                 (select max(sequence) from "ProductDetails" pd1 where pd1."productId" = ${productId}) as "maxSequence"
                           from "ProductDetails" pd
                           left outer join "Progresses" pr on pd."id" = pr."productDetailId" 
                                                          and pr."userId" = ${userId}
                          where pd."productId" = ${productId}
                            and pd.sequence = ${sequence}`, { type: sequelize.QueryTypes.SELECT })
            .then(data => {
                console.log(data);
                res.status(200).json({ success: true, result: data })
            })
            .catch(err => {
                console.log('------------------------------ getTopicDetail');
                console.log(err);
                next({ message: err.message, error: err })
            })
    }

    static saveWatched(req, res, next) {
        const productId = +req.body.productId
        const productDetailId = +req.body.productDetailId
        const watched = +req.body.watched

        const decodedtoken = decodeToken(req.headers.access_token)
        const userId = decodedtoken.id

        sequelize.query(` select * 
                           from "Progresses" p
                          where p."userId" = ${userId}
                            and p."productDetailId" = ${productDetailId}`, { type: sequelize.QueryTypes.SELECT })
            .then(data => {
                console.log(' ******************************************************* 219');
                console.log(data);
                if (data.length === 0) {
                    Progress.create({ userId, productId, productDetailId, watched })
                        .then(data => {
                            res.status(201).json({ success: true, result: data })
                        })
                        .catch(err => {
                            console.log('------------------------------ saveWatched 1');
                            console.log(err);
                            next({ message: err.message, error: err })
                        })

                } else {
                    Progress.update({ watched }, { where: { id: +data[0].id } })
                        .then(data => {
                            res.status(200).json({ success: true, result: data })
                        })
                        .catch(err => {
                            console.log('------------------------------ saveWatched 2');
                            console.log(err);
                            next({ message: err.message, error: err })
                        })
                }
            })
            .catch(err => {
                console.log('------------------------------ saveWatched 3');
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
        if (!req.headers.access_token || typeof req.headers.access_token === 'undefined' || req.headers.access_token === 'undefined') {
            sequelize.query(` select p.*, 
                                     0 as enrollment,
                                     0 as "inCart",
                                     concat('${baseURL}', p."imageURL") as "imagePath"
                                from "Products" p 
                                where LOWER("name") like '%${req.params.inputSearch.toLowerCase()}%' 
                                    or LOWER("alias") like '%${req.params.inputSearch.toLowerCase()}%'
                                order by "name"`, { type: sequelize.QueryTypes.SELECT })
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
                                    p.price,
                                    p."discountedPrice",
                                    p."categoryId",
                                    case when e.id is null then 0 else 1 end as enrollment,
                                    case when c.id is null then 0 else 1 end as "inCart",
                                    concat('${baseURL}', p."imageURL") as "imagePath"
                              from "Products" p
                               left outer join "Enrollments" e on p.id = e."productId" and e."userId" = ${userId}
                               left outer join "Carts" c on c."productId"  = p.id and c."userId" = ${userId}
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
        const directoryPath = __basedir + "/public/image/courses/";

        res.sendFile(directoryPath + fileName, fileName, (err) => {
            if (err) {
                console.log('------------------------------ download');
                console.log(err);
                next({ message: 'Could not download the file' })
            }
        });
    };
}

module.exports = ProductController
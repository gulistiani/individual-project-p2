const { User, sequelize } = require('../models')
const { hashPassword, comparePassword } = require('../helpers/hash')
const validateEmail = require('../helpers/validateEmail')
const validateMobile = require('../helpers/validateMobile')
const { generateToken } = require('../helpers/jwt')

class LoginController {

    static registerEmail(req, res, next) {
        const { firstName, lastName, email, password, mobile } = req.body
        const isEmailValid = validateEmail(email)
        const isMobileValid = validateMobile(mobile)

        if (isEmailValid === false) {
            throw { name: 'Registration failed', message: 'Email tidak valid' }
        }

        if (mobile) {
            if (isMobileValid === false) {
                throw { name: 'Registration failed', message: 'No HP tidak valid' }
            }
        }


        User.findOne({ where: { email } })
            .then(data => {
                if (data) {
                    throw { name: 'Registration failed', message: 'Email sudah terdaftar' }
                }

                if (mobile) {
                    User.findOne({ where: { mobile } })
                        .then(data => {
                            if (data) {
                                throw { name: 'Registration failed', message: 'No HP sudah terdaftar' }
                            }

                            User.create({
                                firstName,
                                lastName,
                                email,
                                password: hashPassword(password),
                                mobile
                            })
                                .then(data => {
                                    res.status(201).json({ success: true, message: `Registrasi dengan email ${email} berhasil`, result: data })
                                })
                                .catch(err => {
                                    console.log(err);
                                    next({ name: 'Registration failed', message: err.message })
                                })
                        })

                        .catch(err => {
                            console.log(err);
                            next({ name: 'Registration failed', message: err.message })
                        })
                }
                else {
                    User.create({
                        firstName,
                        lastName,
                        email,
                        password: hashPassword(password),
                        mobile
                    })
                        .then(data => {
                            res.status(201).json({ success: true, message: `Registrasi dengan email ${email} berhasil`, result: data })
                        })
                        .catch(err => {
                            console.log(err);
                            next({ name: 'Registration failed', message: err.message })
                        })
                }

            })
            .catch(err => {
                console.log(err);
                next({ name: 'Registration failed', message: err.message })
            })
    }

    static registerMobile(req, res, next) {
        const { firstName, lastName, email, password, mobile } = req.body
        const isEmailValid = validateEmail(email)
        const isMobileValid = validateMobile(mobile)

        console.log(mobile);

        if (isMobileValid === false) {
            throw { name: 'Registration failed', message: 'No HP tidak valid' }
        }

        if (email) {
            if (isEmailValid === false) {
                throw { name: 'Registration failed', message: 'Email tidak valid' }
            }
        }

        User.findOne({ where: { mobile } })
            .then(data => {
                if (data) {
                    throw { name: 'Registration failed', message: 'No HP sudah terdaftar' }
                }

                if (email) {
                    User.findOne({ where: { email } })
                        .then(data => {
                            if (data) {
                                throw { name: 'Registration failed', message: 'Email sudah terdaftar' }
                            }

                            User.create({
                                firstName,
                                lastName,
                                email,
                                password: hashPassword(password),
                                mobile
                            })
                                .then(data => {
                                    res.status(201).json({ success: true, message: `Registrasi dengan no HP ${mobile} berhasil`, result: data })
                                })
                                .catch(err => {
                                    console.log(err);
                                    next({ name: 'Registration failed', message: err.message })
                                })
                        })

                        .catch(err => {
                            console.log(err);
                            next({ name: 'Registration failed', message: err.message })
                        })
                }
                else {
                    User.create({
                        firstName,
                        lastName,
                        email,
                        password: hashPassword(password),
                        mobile
                    })
                        .then(data => {
                            res.status(201).json({ success: true, message: `Registrasi dengan no HP ${mobile} berhasil`, result: data })
                        })
                        .catch(err => {
                            console.log(err);
                            next({ name: 'Registration failed', message: err.message })
                        })
                }

            })
            .catch(err => {
                console.log(err);
                next({ name: 'Registration failed', message: err.message })
            })

    }

    static loginEmail(req, res, next) {
        const { email, password } = req.body
        sequelize.query(`select u.id,
                                u.email,
                                u.password,
                                u."firstName", 
                                u."lastName"
                        from "Users" u 
                        where u.email = '${email}' limit 1
                        `, { type: sequelize.QueryTypes.SELECT })
            .then(data => {
                if (data.length === 0) {
                    throw { name: 'Login failed', message: 'Email not found' }
                }

                const isPasswordMatch = comparePassword(password, data[0].password)
                if (!isPasswordMatch) {
                    throw { name: 'Login failed', message: 'Wrong email/password' }
                }

                const payload = { id: data[0].id, email: data[0].email }
                const generatedToken = generateToken(payload)

                res.status(200).json({
                    success: true, message: 'Successfully logged in', access_token: generatedToken,
                    result: {
                        id: data[0].id, firstName: data[0].firstName
                    }
                })
            })
            .catch(err => {
                next({ name: 'Login failed', message: err.message })
            })
    }

    static loginMobile(req, res, next) {
        const { mobile, password } = req.body
        sequelize.query(`select u.id,
                                u.mobile,
                                u.password,
                                u."firstName", 
                                u."lastName"
                        from "Users" u 
                        where u.mobile = '${mobile}' limit 1
                        `, { type: sequelize.QueryTypes.SELECT })
            .then(data => {
                if (data.length === 0) {
                    throw { name: 'Login failed', message: 'No Handphone not found' }
                }

                const isPasswordMatch = comparePassword(password, data[0].password)
                if (!isPasswordMatch) {
                    throw { name: 'Login failed', message: 'Wrong mobile phone/password' }
                }

                const payload = { id: data[0].id, mobile: data[0].mobile }
                const generatedToken = generateToken(payload)

                res.status(200).json({
                    success: true, message: 'Successfully logged in', access_token: generatedToken,
                    result: {
                        id: data[0].id, firstName: data[0].firstName
                    }
                })
            })
            .catch(err => {
                next({ name: 'Login failed', message: err.message })
            })
    }

    static loginGoogle(req, res, next) {
        const { idToken } = req.body

        const CLIENT_ID = process.env.CLIENT_ID;
        const { OAuth2Client } = require('google-auth-library');
        const client = new OAuth2Client(CLIENT_ID);

        let email_google = ''
        let token_google = ''

        client.verifyIdToken({
            idToken: idToken,
            audience: CLIENT_ID
        })
            .then(ticket => {
                const payload = ticket.getPayload();
                email_google = payload.email

                sequelize.query(`select u.id from "Users" u  where u.email = '${email_google}' limit 1`, { type: sequelize.QueryTypes.SELECT })
                    .then(data => {
                        if (data.length === 0) {

                            User.create({
                                firstName: payload.given_name,
                                lastName: payload.family_name,
                                email: payload.email,
                                password: '12345678'
                            })
                                .then(data => {
                                    console.log('-------------------------9');
                                    sequelize.query(`select u.id,
                                                                    u.email,
                                                                    u.password,
                                                                    u."firstName", 
                                                                    u."lastName"
                                                            from "Users" u 
                                                            where u.email = '${email_google}' limit 1
                                                            `, { type: sequelize.QueryTypes.SELECT })
                                        .then(data => {
                                            token_google = generateToken({ id: data[0].id, email: data[0].email });

                                            res.status(201).json({
                                                success: true, message: 'Successfully created & logged in', access_token: token_google,
                                                result: {
                                                    id: data[0].id, firstName: data[0].firstName
                                                }
                                            })
                                        })
                                        .catch(err => {
                                            console.log(err)
                                            next({ name: 'Login failed', message: err })
                                        })
                                })
                                .catch(err => {
                                    console.log(err)
                                    next({ name: 'Login failed', message: err })
                                })

                        } else {
                            sequelize.query(`select u.id,
                                                    u.email,
                                                    u.password,
                                                    u."firstName", 
                                                    u."lastName"
                                            from "Users" u 
                                            where u.email = '${email_google}' limit 1
                                            `, { type: sequelize.QueryTypes.SELECT })
                                .then(data => {
                                    token_google = generateToken({ id: data[0].id, email: data[0].email });

                                    res.status(200).json({
                                        success: true, message: 'Successfully logged in', access_token: token_google,
                                        result: {
                                            id: data[0].id, firstName: data[0].firstName
                                        }
                                    })
                                })
                                .catch(err => {
                                    console.log(err)
                                    next(err)
                                })
                        }

                    })
                    .catch(err => {
                        console.log(err)
                        next(err)
                    })
            })
            .catch(err => {
                console.log(err);
                next(err)
            })

    }
}

module.exports = LoginController
const { User } = require('../models')
const { decodeToken } = require('../helpers/jwt')

function authorize(req, res, next) {
    const decodedtoken = decodeToken(req.headers.access_token)
    const role = decodedtoken.role
    if (role === 'admin') {
        next()
    } else {
        next({ message: 'Not authorized' })
    }

}

module.exports = authorize

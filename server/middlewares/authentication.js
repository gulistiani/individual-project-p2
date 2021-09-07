const { decodeToken } = require('../helpers/jwt')
const { User } = require('../models')

function authenticate(req, res, next) {

    const token = req.headers.access_token
    const decodedtoken = decodeToken(token) // isinya { id, email}

    User.findByPk(decodedtoken.id) // return null when not found
        .then(data => {
            if (!data) {
                throw { message: 'Authentication failed' }
            }

            req.currentUserId = decodedtoken.id
            next()
        })
        .catch(err => {
            console.log(err);
            next(err)
        })

}

module.exports = authenticate

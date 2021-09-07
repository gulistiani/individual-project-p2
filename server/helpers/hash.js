const bcrypt = require('bcryptjs')

function hashPassword(PasswordOri) {
    return bcrypt.hashSync(PasswordOri, bcrypt.genSaltSync(10))
}

function comparePassword(PasswordOri, hashedPassword) {
    return bcrypt.compareSync(PasswordOri, hashedPassword)
}

module.exports = { hashPassword, comparePassword }

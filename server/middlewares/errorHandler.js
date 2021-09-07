function errorHandler(err, req, res, next) {
    let statusCode = 500
    let error = err.error
    console.log(err);

    if (err.name === 'Login failed' || err.name === 'Registration failed') {
        statusCode = 400
    } else {
        statusCode = 500
    }

    return res.status(statusCode).json({ success: false, error: err })
}

module.exports = errorHandler
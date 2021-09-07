// require('dotenv').config()
if (process.env.NODE_DEV != 'production') require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const router = require('./routers/router')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')

global.__basedir = __dirname;
// var corsOptions = {
//     origin: "https://e-commerce-admin-fd223.web.app"
// };
var corsOptions = {
    origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(router)
app.use(errorHandler)

if (process.env.NODE_ENV === 'test') module.exports = app;
else app.listen(port, () => console.log(`listening to port ${port}`));
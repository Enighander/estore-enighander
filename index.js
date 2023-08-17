require('dotenv').config()
const express = require('express');
const cors = require('cors');
const createError = require('http-errors');
const app = express();
const productRouter = require('./src/routes/products.js')

//middleware
app.use(express.json());
app.use(cors())


app.use('/products', productRouter)

app.all('*', (req, res, next) => {
  next(new createError.NotFound())
})

app.get('/', function (req, res) {
  res.send('hello, world!')
})


const host = process.env.DB_HOST;
const port = process.env.PORT
app.listen(port, ()=> {
    console.log(`server running on http://${host}:${port}`)
})





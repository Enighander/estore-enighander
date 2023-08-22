require('dotenv').config()
const express = require('express');
const cors = require('cors');
const createError = require('http-errors');
const app = express();
const mainRouter = require('./src/routes/index.js')
const host = process.env.DB_HOST;
const port = process.env.PORT



app.use(express.json());
app.use(cors())
app.use('/api/v1', mainRouter)

app.all('*', (req, res, next) => {
  next(new createError.NotFound())
})

// app.use((err,req,res,next)=>{
//   const messageError = err.message || "internal server error"
//   const statusCode = err.status || 500

//   res.status(statusCode).json({
//     message : messageError
//   })
// })

app.listen(port, ()=> {
    console.log(`server running on http://${host}:${port}`)
})





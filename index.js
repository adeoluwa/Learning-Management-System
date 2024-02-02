const express = require('express');
const dbConnect = require('./config/dbConnect');
const { notFound, handleError } = require('./middlewares/errorHandler');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000;

dbConnect();


app.get("/", (req, res) => {
    res.send("Api for LMS")
});

app.use(notFound)
app.use(handleError)

app.listen(PORT,() =>{
    console.log(`Server is Running at http://localhost:${PORT}`)
});


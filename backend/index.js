require('dotenv').config()
const express = require("express")
const cors = require("cors");

//custom error handler middllware
const errorHandler = require("./middleware/error");

const app = express()

//doing this to be able to retrive data from req.body and from data
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//main route 
app.get("/api/v1", (req, res) => {
    res.send("Welcome to Inventos API V1")
})

//stores route 
app.use('/api/v1/stores', require('./routes/stores'));




// Error Handler Middleware
app.use(errorHandler);


//porst number that server listen on
const PORT = process.env.PORT || 5000

//create an express server
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
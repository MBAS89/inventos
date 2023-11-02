require('dotenv').config()
const express = require("express")
const sequelize = require('./config/database');
const cors = require("cors");

//modles 
const Stores = require('./models/sotres/stores');
const Owners = require('./models/sotres/owners');
const Admins = require('./models/sotres/admins');
const OwnersStore = require('./models/sotres/ownerStores');
const Categories = require('./models/inventory/categories');
const Brands = require('./models/inventory/brands');
const Products = require('./models/inventory/products');
const { Invoices, InvoiceItems } = require('./models/sales/invoices');
const CustomersTypes = require('./models/cutomers/customersTypes');
const Customers = require('./models/cutomers/cutomers')
const Suppliers = require('./models/suppliers/suppliers');
const SuppliersTypes = require('./models/suppliers/suppliersType');

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

//store admins route
app.use('/api/v1/store/admins', require('./routes/admins'));

//inventroy routes 
app.use('/api/v1/store/inventory', require('./routes/inventory'));

//inventroy routes 
app.use('/api/v1/store/sales', require('./routes/sales'));

//Customers routes 
app.use('/api/v1/store/customers', require('./routes/customers'));

//Suppliers routes
app.use('/api/v1/store/suppliers', require('./routes/suppliers'));

// Error Handler Middleware
app.use(errorHandler);


//porst number that server listen on
const PORT = process.env.PORT || 5000

//create an express server


// Sync Sequelize with the database
sequelize.sync({ alter:true }).then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`)
    })
});
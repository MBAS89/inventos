require('dotenv').config()
const express = require("express")
const sequelize = require('./config/database');
const cors = require("cors");
const cron = require('node-cron');
const cookieParser = require('cookie-parser')

//modles 
const Stores = require('./models/sotres/stores');
const Owners = require('./models/sotres/owners');
const Admins = require('./models/sotres/admins');
const OwnersStore = require('./models/sotres/ownerStores');
const { Invoices, InvoiceItems } = require('./models/sales/invoices');
const CustomersTypes = require('./models/cutomers/customersTypes');
const Suppliers = require('./models/suppliers/suppliers');
const SuppliersTypes = require('./models/suppliers/suppliersType');
const SalaryTypes = require('./models/employees/salarytypes');
const Employees = require('./config/associations/employees');
const Contracts = require('./config/associations/employees');
const Roles = require('./config/associations/employees');
const Departments = require('./config/associations/employees');
const Permissions = require('./config/associations/employees');
const RolePermissions = require('./config/associations/employees');
const Customers = require('./config/associations/customers')
const Categories = require('./config/associations/inventory')
const Products = require('./config/associations/inventory')
const Brands = require('./config/associations/inventory');

//custom error handler middllware
const errorHandler = require("./middleware/error");

//corns funtions
const contractCron = require('./crons/contractCron');


const app = express()
app.use(cookieParser())

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

//Suppliers routes
app.use('/api/v1/store/employees', require('./routes/employees'));


// Error Handler Middleware
app.use(errorHandler);


// Schedule the cron job to run every day at midnight
cron.schedule('0 0 * * *', () => {
    contractCron(); // Call the cron job function
}, {
    scheduled: true,
    timezone: "Asia/Jerusalem" // Set your timezone here
});


//porst number that server listen on
const PORT = process.env.PORT || 5000

// Sync Sequelize with the database
sequelize.sync({ alter: true }).then(() => {
    console.log('Database synced');
    //create an express server
    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`)
    })
});
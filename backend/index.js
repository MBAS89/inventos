require('dotenv').config()
const express = require("express")
const sequelize = require('./config/database');
const cors = require("cors");
const cron = require('node-cron');
const cookieParser = require('cookie-parser')

//modles 
const Stores = require('./config/associations/stores');
const Owners = require('./config/associations/stores');
const Admins = require('./models/sotres/admins');
const OwnersStore = require('./models/sotres/ownerStores');
const { Invoices, InvoiceItems } = require('./models/sales/invoices');
const CustomersTypes = require('./models/cutomers/customersTypes');
const Suppliers = require('./config/associations/suppliers');
const SuppliersTypes = require('./config/associations/suppliers');
const Expenses = require('./config/associations/expenses');
const ExpensesTypes = require('./config/associations/expenses');
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
const createPayment = require('./crons/createPayment');


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
app.use('/api/v1/admins', require('./routes/admins'));

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

//Casher routes
app.use('/api/v1/store/casher', require('./routes/casher'));

//Casher routes
app.use('/api/v1/store/expenses', require('./routes/expenses'));


//test routes
app.use('/api/v1/store/test', require('./routes/test'))


// Error Handler Middleware
app.use(errorHandler);

// Schedule the cron job only if testing is not false
if (process.env.NODE_ENV !== 'test') {

    cron.schedule('0 0 * * *', () => {
        contractCron(); 
    }, {
        scheduled: true,
        timezone: "Asia/Jerusalem" 
    });

    // Schedule createPayment to run daily at 11 PM
    cron.schedule('0 23 * * *', () => {
        createPayment();
    }, {
        scheduled: true,
        timezone: "Asia/Jerusalem" 
    });

}


//porst number that server listen on
const PORT = process.env.PORT || 5000

// Sync Sequelize with the database if not in test environment
if (process.env.NODE_ENV !== 'test') {
    sequelize.sync({ alter: true })
        .then(() => {
            console.log('Database synced');

            // Create an express server
            app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
            });
        })
        .catch(error => {
            console.error('Error syncing database:', error);
            process.exit(1); // Exit the process on error
        });
}

module.exports = app
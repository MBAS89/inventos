const { Op, fn, col, literal } = require('sequelize');
const sequelize = require('../config/database');

//modles
const Employees = require("../models/employees/employees");
const Log = require("../models/employees/log");
const Payment = require("../models/employees/payments");
const SalaryTypes = require('../models/employees/salarytypes');
const Customers = require('../models/cutomers/cutomers')
const CustomersTypes = require('../models/cutomers/customersTypes')
const Suppliers = require("../models/suppliers/suppliers")
const SuppliersTypes = require("../models/suppliers/suppliersType")
const Expenses = require("../models/expenses/expenses")
const { Invoices, InvoiceItems } = require("../models/sales/invoices")
const { OuterInvoices, OuterInvoiceItems } = require("../models/sales/outerInvoices")
const Products = require('../models/inventory/products')

//Employee Analytics 
const getWeeklySums = async () => {
    const today = new Date();
    const weeks = [];

    for (let i = 0; i < 5; i++) {
        const endOfWeek = new Date(today);
        endOfWeek.setDate(today.getDate() - (today.getDay() - 6) - (i * 7));
        endOfWeek.setHours(23, 59, 59, 999);
        const startOfWeek = new Date(endOfWeek);
        startOfWeek.setDate(startOfWeek.getDate() - 6);
        startOfWeek.setHours(0, 0, 0, 0);
        const year = startOfWeek.getFullYear();
        const weekNumber = Math.ceil(((startOfWeek - new Date(startOfWeek.getFullYear(), 0, 1)) / 86400000 + new Date(startOfWeek.getFullYear(), 0, 1).getDay() + 1) / 7);

        const paidSum = await Payment.sum('amount', {
            where: {
                status: 'paid',
                paymentDate: {
                    [Op.gte]: startOfWeek,
                    [Op.lte]: endOfWeek
                }
            }
        }) || 0;

        const debtSum = await Payment.sum('amount', {
            where: {
                status: 'due',
                paymentDate: {
                    [Op.gte]: startOfWeek,
                    [Op.lte]: endOfWeek
                }
            }
        }) || 0;

        weeks.unshift({ year, week: weekNumber, totalPaid: paidSum, totalDebt: debtSum });
    }

    return weeks;
};

const getMonthlySums = async () => {
    const months = [];
    const today = new Date();
    const currentYear = today.getFullYear();

    for (let i = 0; i < 12; i++) {
        const startOfMonth = new Date(currentYear, i, 1);
        const endOfMonth = new Date(currentYear, i + 1, 0);
        endOfMonth.setHours(23, 59, 59, 999);

        const [result] = await Payment.findAll({
            attributes: [
                [fn('SUM', literal(`CASE WHEN status = 'paid' THEN amount ELSE 0 END`)), 'totalPaid'],
                [fn('SUM', literal(`CASE WHEN status = 'due' THEN amount ELSE 0 END`)), 'totalDebt']
            ],
            where: {
                paymentDate: {
                    [Op.gte]: startOfMonth,
                    [Op.lte]: endOfMonth
                }
            },
            raw: true
        });

        months.push({
            month: startOfMonth.toLocaleString('default', { month: 'short' }),
            totalPaid: result.totalPaid || 0,
            totalDebt: result.totalDebt || 0
        });
    }

    return months;
};

const getYearlySums = async () => {
    const years = [];
    const today = new Date();
    const currentYear = today.getFullYear();

    for (let i = 0; i < 5; i++) {
        const year = currentYear - i;
        const startOfYear = new Date(year, 0, 1);
        const endOfYear = new Date(year, 11, 31);
        endOfYear.setHours(23, 59, 59, 999);

        const paidSum = await Payment.sum('amount', {
            where: {
                status: 'paid',
                paymentDate:{
                    [Op.gte]: startOfYear,
                    [Op.lte]: endOfYear
                }
            }
        }) || 0;

        const debtSum = await Payment.sum('amount', {
            where: {
                status: 'due',
                paymentDate:{
                    [Op.gte]: startOfYear,
                    [Op.lte]: endOfYear
                }
            }
        }) || 0;

        years.push({
            year: year,
            totalPaid: paidSum,
            totalDebt: debtSum
        });
    }

    return years;
};

const getDailySums = async () => {
    const days = [];
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);

        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
    
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const paidSum = await Payment.sum('amount', {
            where: {
                status: 'paid',
                paymentDate: {
                    [Op.gte]: startOfDay,
                    [Op.lte]: endOfDay
                }
            }
        }) || 0;

        const debtSum = await Payment.sum('amount', {
            where: {
                status: 'due',
                paymentDate: {
                    [Op.gte]: startOfDay,
                    [Op.lte]: endOfDay
                }
            }
        }) || 0;

        days.push({
            day: date.toLocaleString('default', { weekday: 'short' }),
            totalPaid: paidSum,
            totalDebt: debtSum
        });
    }

    return days;
};

const getWorkTypeCounts = async () => {
    // Define all possible work types
    const allWorkTypes = [
        'full-time', 'part-time', 'temporary', 'remote', 'hybrid', 'contract-based', 'not-installed'
    ];

    // Perform the query to get counts of existing work types
    const workTypeCounts = await Employees.findAll({
        attributes: ['work_type', [fn('COUNT', col('id')), 'count']],
        group: ['work_type'],
        raw: true
    });

    // Create a map for easier lookup
    const workTypeMap = {};
    workTypeCounts.forEach(entry => {
        workTypeMap[entry.work_type] = entry.count;
    });

    // Map results to include all work types with count 0 where necessary
    const results = allWorkTypes.map(work_type => ({
        work_type,
        count: workTypeMap[work_type] || 0
    }));

    return results ;
};


//Customers Analytics
const getWeeklyCustomersSums = async () => {
    const today = new Date();
    const weeks = [];

    for (let i = 0; i < 5; i++) {
        const endOfWeek = new Date(today);
        endOfWeek.setDate(today.getDate() - (today.getDay() - 6) - (i * 7));
        endOfWeek.setHours(23, 59, 59, 999);

        const startOfWeek = new Date(endOfWeek);
        startOfWeek.setDate(startOfWeek.getDate() - 6);
        startOfWeek.setHours(0, 0, 0, 0);

        const year = startOfWeek.getFullYear();
        const weekNumber = Math.ceil(((startOfWeek - new Date(startOfWeek.getFullYear(), 0, 1)) / 86400000 + new Date(startOfWeek.getFullYear(), 0, 1).getDay() + 1) / 7);

        // Count customers created within the week
        const totalCustomers = await Customers.count({
            where: {
                createdAt: {
                    [Op.gte]: startOfWeek,
                    [Op.lte]: endOfWeek
                }
            }
        });

        weeks.unshift({ year, week: weekNumber, totalCustomers });
    }

    return weeks;
};

const getMonthlyCustomersSums = async () => {
    const months = [];
    const today = new Date();
    const currentYear = today.getFullYear();

    for (let i = 0; i < 12; i++) {
        const startOfMonth = new Date(currentYear, i, 1);
        const endOfMonth = new Date(currentYear, i + 1, 0);
        endOfMonth.setHours(23, 59, 59, 999);

        // Count customers created within the month
        const totalCustomers = await Customers.count({
            where: {
                createdAt: {
                    [Op.gte]: startOfMonth,
                    [Op.lte]: endOfMonth
                }
            }
        });

        months.push({
            month: startOfMonth.toLocaleString('default', { month: 'short' }),
            totalCustomers
        });
    }

    return months;
};


const getYearlyCustomersSums = async () => {
    const years = [];
    const today = new Date();
    const currentYear = today.getFullYear();

    for (let i = 0; i < 5; i++) {
        const year = currentYear - i;
        const startOfYear = new Date(year, 0, 1);
        const endOfYear = new Date(year, 11, 31);
        endOfYear.setHours(23, 59, 59, 999);

        // Count customers created within the year
        const totalCustomers = await Customers.count({
            where: {
                createdAt: {
                    [Op.gte]: startOfYear,
                    [Op.lte]: endOfYear
                }
            }
        });

        years.push({
            year: year,
            totalCustomers
        });
    }

    return years;
};


const getDailyCustomersSums = async () => {
    const days = [];
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);

        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        // Count customers created within the day
        const totalCustomers = await Customers.count({
            where: {
                createdAt: {
                    [Op.gte]: startOfDay,
                    [Op.lte]: endOfDay
                }
            }
        });

        days.push({
            day: date.toLocaleString('default', { weekday: 'short' }),
            totalCustomers
        });
    }

    return days;
};



//Expenses & Sales Analytics
const getWeeklyExpensesAndSalesSums = async () => {
    const today = new Date();
    const weeks = [];

    for (let i = 0; i < 5; i++) {
        const endOfWeek = new Date(today);
        endOfWeek.setDate(today.getDate() - (today.getDay() - 6) - (i * 7));
        endOfWeek.setHours(23, 59, 59, 999);

        const startOfWeek = new Date(endOfWeek);
        startOfWeek.setDate(startOfWeek.getDate() - 6);
        startOfWeek.setHours(0, 0, 0, 0);

        const year = startOfWeek.getFullYear();
        const weekNumber = Math.ceil(((startOfWeek - new Date(startOfWeek.getFullYear(), 0, 1)) / 86400000 + new Date(startOfWeek.getFullYear(), 0, 1).getDay() + 1) / 7);

        // Sum of all sales in this week 
        const totalSales = await Invoices.sum('total_paid', {
            where: {
                createdAt: {
                    [Op.gte]: startOfWeek,
                    [Op.lte]: endOfWeek
                }
            }
        }) || 0;

        // Sum of all Due in this week 
        const totalDue = await Invoices.sum('total_due', {
            where: {
                createdAt: {
                    [Op.gte]: startOfWeek,
                    [Op.lte]: endOfWeek
                }
            }
        }) || 0;

        // Sum of all Due in this week 
        const totalDebt = await OuterInvoices.sum('total_due', {
            where: {
                createdAt: {
                    [Op.gte]: startOfWeek,
                    [Op.lte]: endOfWeek
                }
            }
        }) || 0;

        // Sum of all Expenses in this week
        const totalExpenses = await Expenses.sum('amount', {
            where: {
                createdAt: {
                    [Op.gte]: startOfWeek,
                    [Op.lte]: endOfWeek
                }
            }
        }) || 0;

        // Sum of all Cost in this week 
        const totalCost = await Invoices.sum('total_cost', {
            where: {
                createdAt: {
                    [Op.gte]: startOfWeek,
                    [Op.lte]: endOfWeek
                }
            }
        }) || 0;


        const totalProfit = totalSales - totalCost - totalExpenses


        weeks.unshift({ year, week: weekNumber, totalSales, totalDue, totalDebt, totalExpenses, totalProfit });
    }

    return weeks;
};

const getMonthlyExpensesAndSalesSums = async () => {
    const months = [];
    const today = new Date();
    const currentYear = today.getFullYear();

    for (let i = 0; i < 12; i++) {
        const startOfMonth = new Date(currentYear, i, 1);
        const endOfMonth = new Date(currentYear, i + 1, 0);
        endOfMonth.setHours(23, 59, 59, 999);

        // Sum of all sales in this Month 
        const totalSales = await Invoices.sum('total_paid', {
            where: {
                createdAt: {
                    [Op.gte]: startOfMonth,
                    [Op.lte]: endOfMonth
                }
            }
        }) || 0;

        // Sum of all Due in this Month 
        const totalDue = await Invoices.sum('total_due', {
            where: {
                createdAt: {
                    [Op.gte]: startOfMonth,
                    [Op.lte]: endOfMonth
                }
            }
        }) || 0;

        // Sum of all Due in this Month 
        const totalDebt = await OuterInvoices.sum('total_due', {
            where: {
                createdAt: {
                    [Op.gte]: startOfMonth,
                    [Op.lte]: endOfMonth
                }
            }
        }) || 0;

        // Sum of all Expenses in this Month
        const totalExpenses = await Expenses.sum('amount', {
            where: {
                createdAt: {
                    [Op.gte]: startOfMonth,
                    [Op.lte]: endOfMonth
                }
            }
        }) || 0;

        // Sum of all Cost in this Month 
        const totalCost = await Invoices.sum('total_cost', {
            where: {
                createdAt: {
                    [Op.gte]: startOfMonth,
                    [Op.lte]: endOfMonth
                }
            }
        }) || 0;


        const totalProfit = totalSales - totalCost - totalExpenses

        months.push({
            month: startOfMonth.toLocaleString('default', { month: 'short' }),
            totalSales,
            totalDue,
            totalDebt,
            totalExpenses,
            totalProfit

        });
    }

    return months;
};


const getYearlyExpensesAndSalesSums = async () => {
    const years = [];
    const today = new Date();
    const currentYear = today.getFullYear();

    for (let i = 0; i < 5; i++) {
        const year = currentYear - i;
        const startOfYear = new Date(year, 0, 1);
        const endOfYear = new Date(year, 11, 31);
        endOfYear.setHours(23, 59, 59, 999);

        // Sum of all sales in this Year 
        const totalSales = await Invoices.sum('total_paid', {
            where: {
                createdAt: {
                    [Op.gte]: startOfYear,
                    [Op.lte]: endOfYear
                }
            }
        }) || 0;

        // Sum of all Due in this Year 
        const totalDue = await Invoices.sum('total_due', {
            where: {
                createdAt: {
                    [Op.gte]: startOfYear,
                    [Op.lte]: endOfYear
                }
            }
        }) || 0;

        // Sum of all Due in this Year 
        const totalDebt = await OuterInvoices.sum('total_due', {
            where: {
                createdAt: {
                    [Op.gte]: startOfYear,
                    [Op.lte]: endOfYear
                }
            }
        }) || 0;

        // Sum of all Expenses in this Year
        const totalExpenses = await Expenses.sum('amount', {
            where: {
                createdAt: {
                    [Op.gte]: startOfYear,
                    [Op.lte]: endOfYear
                }
            }
        }) || 0;

        // Sum of all Cost in this Year 
        const totalCost = await Invoices.sum('total_cost', {
            where: {
                createdAt: {
                    [Op.gte]: startOfYear,
                    [Op.lte]: endOfYear
                }
            }
        }) || 0;


        const totalProfit = totalSales - totalCost - totalExpenses

        years.push({
            year: year,
            totalSales,
            totalDue,
            totalDebt,
            totalExpenses,
            totalProfit

        });
    }

    return years;
};


const getDailyExpensesAndSalesSums = async () => {
    const days = [];
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);

        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        // Sum of all sales in this Day 
        const totalSales = await Invoices.sum('total_paid', {
            where: {
                createdAt: {
                    [Op.gte]: startOfDay,
                    [Op.lte]: endOfDay
                }
            }
        }) || 0;

        // Sum of all Due in this Day 
        const totalDue = await Invoices.sum('total_due', {
            where: {
                createdAt: {
                    [Op.gte]: startOfDay,
                    [Op.lte]: endOfDay
                }
            }
        }) || 0;

        // Sum of all Due in this Day 
        const totalDebt = await OuterInvoices.sum('total_due', {
            where: {
                createdAt: {
                    [Op.gte]: startOfDay,
                    [Op.lte]: endOfDay
                }
            }
        }) || 0;

        // Sum of all Expenses in this Day
        const totalExpenses = await Expenses.sum('amount', {
            where: {
                createdAt: {
                    [Op.gte]: startOfDay,
                    [Op.lte]: endOfDay
                }
            }
        }) || 0;

        // Sum of all Cost in this Day 
        const totalCost = await Invoices.sum('total_cost', {
            where: {
                createdAt: {
                    [Op.gte]: startOfDay,
                    [Op.lte]: endOfDay
                }
            }
        }) || 0;


        const totalProfit = totalSales - totalCost - totalExpenses

        days.push({
            day: date.toLocaleString('default', { weekday: 'short' }),
            totalSales,
            totalDue,
            totalDebt,
            totalExpenses,
            totalProfit
        });
    }

    return days;
};


//Suppliers Analytics
const getWeeklySuppliersSums = async () => {
    const today = new Date();
    const weeks = [];

    for (let i = 0; i < 5; i++) {
        const endOfWeek = new Date(today);
        endOfWeek.setDate(today.getDate() - (today.getDay() - 6) - (i * 7));
        endOfWeek.setHours(23, 59, 59, 999);

        const startOfWeek = new Date(endOfWeek);
        startOfWeek.setDate(startOfWeek.getDate() - 6);
        startOfWeek.setHours(0, 0, 0, 0);

        const year = startOfWeek.getFullYear();
        const weekNumber = Math.ceil(((startOfWeek - new Date(startOfWeek.getFullYear(), 0, 1)) / 86400000 + new Date(startOfWeek.getFullYear(), 0, 1).getDay() + 1) / 7);

        // Count Suppliers created within the week
        const totalSuppliers = await Suppliers.count({
            where: {
                createdAt: {
                    [Op.gte]: startOfWeek,
                    [Op.lte]: endOfWeek
                }
            }
        });

        weeks.unshift({ year, week: weekNumber, totalSuppliers });
    }

    return weeks;
};

const getMonthlySuppliersSums = async () => {
    const months = [];
    const today = new Date();
    const currentYear = today.getFullYear();

    for (let i = 0; i < 12; i++) {
        const startOfMonth = new Date(currentYear, i, 1);
        const endOfMonth = new Date(currentYear, i + 1, 0);
        endOfMonth.setHours(23, 59, 59, 999);

        // Count Suppliers created within the month
        const totalSuppliers = await Suppliers.count({
            where: {
                createdAt: {
                    [Op.gte]: startOfMonth,
                    [Op.lte]: endOfMonth
                }
            }
        });

        months.push({
            month: startOfMonth.toLocaleString('default', { month: 'short' }),
            totalSuppliers
        });
    }

    return months;
};


const getYearlySuppliersSums = async () => {
    const years = [];
    const today = new Date();
    const currentYear = today.getFullYear();

    for (let i = 0; i < 5; i++) {
        const year = currentYear - i;
        const startOfYear = new Date(year, 0, 1);
        const endOfYear = new Date(year, 11, 31);
        endOfYear.setHours(23, 59, 59, 999);

        // Count Suppliers  created within the year
        const totalSuppliers = await Suppliers.count({
            where: {
                createdAt: {
                    [Op.gte]: startOfYear,
                    [Op.lte]: endOfYear
                }
            }
        });

        years.push({
            year: year,
            totalSuppliers
        });
    }

    return years;
};


const getDailySuppliersSums = async () => {
    const days = [];
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);

        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        // Count Suppliers created within the day
        const totalSuppliers = await Suppliers.count({
            where: {
                createdAt: {
                    [Op.gte]: startOfDay,
                    [Op.lte]: endOfDay
                }
            }
        });

        days.push({
            day: date.toLocaleString('default', { weekday: 'short' }),
            totalSuppliers
        });
    }

    return days;
};

exports.fetchHomeAnalytics = async (req, res, next) => {
    try {

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.fetchEmployeesAnalytics = async (req, res, next) => {
    try {

        const storeId = req.authData.store_id

        // Total number of employees
        const totalEmployees = await Employees.count({
            where: { 
                store_id:storeId
            }
        });

        const statuses = ['paid', 'due', 'canceled', 'failed'];

        // Query to get payment sums
        const paymentSums = await Payment.findAll({
            attributes: [
                'status',
                [sequelize.fn('SUM', sequelize.col('amount')), 'totalAmount']
            ],
            group: ['status']
        });
        
        // Convert results to a map for easier lookup
        const paymentSumsMap = paymentSums.reduce((map, payment) => {
            map[payment.status] = payment.dataValues.totalAmount || 0;
            return map;
        }, {});
        
        // Ensure all statuses are included
        const paymentSumsResult = statuses.map(status => ({
            status,
            totalAmount: paymentSumsMap[status] || 0
        }));

        // Calculate total working hours from Log model
        const logs = await Log.findAll();
        let totalWorkingHours = 0;
        logs.forEach(log => {
            if (log.signInTime && log.signOutTime) {
                const hours = (new Date(log.signOutTime) - new Date(log.signInTime)) / (1000 * 60 * 60);
                totalWorkingHours += hours;
            }
        });

        // Latest 7 payments
        const latestPayments = await Payment.findAll({
            order: [['createdAt', 'DESC']],
            limit: 7
        });

        const topEmployees = await Employees.findAll({
            include:[
                {
                    model:Log,
                    attributes:{
                        exclude:'updatedAt createdAt'
                    }
                },
                {
                    model:SalaryTypes,
                    as:'salary_type',
                    attributes:{
                        exclude:'updatedAt createdAt'
                    }
                }
            ],
            attributes:{
                exclude:"password image image_id address store_id phone_number status paid_type createdAt updatedAt roleId "
            }
        });

        // Function to calculate working hours
        function calculateWorkingHours(employee) {
            let totalHours = 0;

            employee.logs.forEach(log => {
                if (log.signOutTime) {
                    const signInTime = new Date(log.signInTime);
                    const signOutTime = new Date(log.signOutTime);
                    const hoursWorked = (signOutTime - signInTime) / (1000 * 60 * 60);
                    totalHours += hoursWorked;
                }
            });

            return totalHours;
        }

        // Convert each employee to a plain object and add the workingHours property
        const employeesWithWorkingHours = topEmployees.map(employee => {
            const plainEmployee = employee.get({ plain: true });
            plainEmployee.workingHours = calculateWorkingHours(plainEmployee);
            return plainEmployee;
        });

        // Sort employees by working hours in descending order
        employeesWithWorkingHours.sort((a, b) => b.workingHours - a.workingHours);

        // Get the top employees based on working hours
        const topWorkingEmployees = employeesWithWorkingHours.filter(employee => employee.workingHours > 0);

        // Get weekly, monthly, yearly, and daily sums
        const [weeklySums, monthlySums, yearlySums, dailySums, workTypeCounts] = await Promise.all([
            getWeeklySums(),
            getMonthlySums(),
            getYearlySums(),
            getDailySums(),
            getWorkTypeCounts()
        ]);


        // Prepare the response data
        const analyticsData = {
            totalEmployees,
            workTypeCounts,
            paymentSumsResult,
            totalWorkingHours,
            latestPayments,
            topWorkingEmployees,
            weeklySums,
            monthlySums,
            yearlySums,
            dailySums
        };

        return res.status(200).json(analyticsData);
    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}


exports.fetchCustomersAnalytics = async (req, res, next) => {
    try {

        // Total number of customers 
        const totalCustomers = await Customers.count();

        // Total number of CustomersTypes
        const totalCustomersTypes = await CustomersTypes.count();

        // Sum of all transactions
        const totalTransactions = await Customers.sum('total_transactions');

        // Sum of all debts
        const totalDebt = await Customers.sum('total_debt');

        // Top 8 customers based on total transactions
        const topCustomers = await Customers.findAll({
            order: [['total_transactions', 'DESC']],
            limit: 8
        });

        // Get weekly, monthly, yearly, and daily sums
        const [weeks, months, years, days] = await Promise.all([
            getWeeklyCustomersSums(),
            getMonthlyCustomersSums(),
            getYearlyCustomersSums(),
            getDailyCustomersSums()
        ]);

        return res.status(200).json({
            totalCustomers,
            totalCustomersTypes,
            totalTransactions,
            totalDebt,
            topCustomers,
            weeks,
            months,
            years,
            days
        });

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}


exports.fetchSuppliersAnalytics = async (req, res, next) => {
    try {
        // Total number of Suppliers
        const totalSuppliers = await Suppliers.count();

        // Total number of SuppliersTypes
        const totalSuppliersTypes = await SuppliersTypes.count();

        // Sum of all transactions
        const totalTransactions = await Suppliers.sum('total_transactions');

        // Sum of all debts
        const totalDebt = await Suppliers.sum('total_debt_us');

        // Top 8 Suppliers based on total transactions
        const topSuppliers = await Suppliers.findAll({
            order: [['total_transactions', 'DESC']],
            limit: 8
        });

        // Get weekly, monthly, yearly, and daily sums
        const [weeks, months, years, days] = await Promise.all([
            getWeeklySuppliersSums(),
            getMonthlySuppliersSums(),
            getYearlySuppliersSums(),
            getDailySuppliersSums()
        ]);


        return res.status(200).json({
            totalSuppliers,
            totalSuppliersTypes,
            totalTransactions,
            totalDebt,
            topSuppliers,
            weeks,
            months,
            years,
            days
        });
    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.fetchExpensesAnalytics = async (req, res, next) => {
    try {
        // Total number of Expenses
        const totalExpenses = await Expenses.count();

        // Sum of all sales
        const totalSales = await Invoices.sum('total_paid');

        // Sum of all Dues
        const totalDue = await Invoices.sum('total_due')

        // Sum of all Debt 
        const totalDebt = await OuterInvoices.sum('total_due')

        const statuses = ['paid', 'partially', 'refunded', 'unknown'];

        // Query to get invoices sums
        const invoicesSums = await Invoices.findAll({
            attributes: [
                'status',
                [sequelize.fn('COUNT', sequelize.col('id')), 'total']
            ],
            group: ['status']
        });
        
        // Convert results to a map for easier lookup
        const invoicesSumsMap = invoicesSums.reduce((map, invoice) => {
            map[invoice.status] = invoice.dataValues.total || 0;
            return map;
        }, {});
        
        // Ensure all statuses are included
        const invoicesSumsResult = statuses.map(status => ({
            status,
            total: invoicesSumsMap[status] || 0
        }));


        // Get weekly, monthly, yearly, and daily sums
        const [weeks, months, yearly, days] = await Promise.all([
            getWeeklyExpensesAndSalesSums(),
            getMonthlyExpensesAndSalesSums(),
            getYearlyExpensesAndSalesSums(),
            getDailyExpensesAndSalesSums()

        ]);


        const lastThreeInnerInvoices = await Invoices.findAll({
            limit: 3, 
            order: [['createdAt', 'DESC']],
            attributes: [
                'id', 'total_amount', 'total_paid', 'status','total_due','createdAt','updatedAt'
            ],
            include: [
                {
                    model: InvoiceItems,
                    as: 'items',
                    attributes: [
                        'id', 'product_id', 'qty', 'price'
                    ],
                    include: [
                        {
                            model: Products,
                            attributes: [
                                'product_id', 'name', 'image', 'qty'
                            ],
                        }
                    ]
                },
                {
                    model:Employees,
                    attributes: ['id', 'full_name', 'image'],
                }
            ]
        });

        const lastThreeOuterInvoices = await OuterInvoices.findAll({
            limit: 3, 
            order: [['createdAt', 'DESC']],
            attributes: [
                'id', 'total_to_pay', 'total_paid', 'status','total_due','createdAt','updatedAt'
            ],
            include: [
                {
                    model: OuterInvoiceItems,
                    as: 'items',
                    attributes: [
                        'id', 'product_id', 'qty'
                    ],
                    include: [
                        {
                            model: Products,
                            attributes: [
                                'product_id', 'name', 'image', 'qty'
                            ]
                        }
                    ]
                },
                {
                    model:Employees,
                    attributes: ['id', 'full_name', 'image'],
                }
            ]
        });

        const lastExpenses = await Expenses.findAll({
            limit: 10, 
            order: [['createdAt', 'DESC']],
            attributes:[
                'id', 'store_id', 'expenses_title', 'amount', 'createdAt', 'updatedAt'
            ]

        })

        return res.status(200).json({
            totalExpenses,
            totalSales,
            totalDue,
            totalDebt,
            invoicesSumsResult,
            weeks,
            months,
            yearly,
            days,
            lastThreeInnerInvoices,
            lastThreeOuterInvoices,
            lastExpenses
        });
    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.fetchInventoryAnalytics = async (req, res, next) => {
    try {

        return res.status(200).json();
    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

const { Op, fn, col, literal } = require('sequelize');
const sequelize = require('../config/database');

//modles
const Employees = require("../models/employees/employees");
const Log = require("../models/employees/log");
const Payment = require("../models/employees/payments");
const SalaryTypes = require('../models/employees/salarytypes');


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


exports.fetchHomeAnalytics = async (req, res, next) => {
    try {

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.fetchEmployeesAnalytics = async (req, res, next) => {
    try {
        // Total number of employees
        const totalEmployees = await Employees.count();

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

        return res.status(200).json();
    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}


exports.fetchSuppliersAnalytics = async (req, res, next) => {
    try {

        return res.status(200).json();
    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.fetchExpensesAnalytics = async (req, res, next) => {
    try {

        return res.status(200).json();
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

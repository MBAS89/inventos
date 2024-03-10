const createPayment = require("../crons/createPayment");
const Employees = require("../models/employees/employees");
const Log = require("../models/employees/log");
const Payment = require("../models/employees/payments");
const SalaryTypes = require("../models/employees/salarytypes");

exports.test = async (req, res, next) => {
    try {

        createPayment()

        const payments = await Payment.findAll()

        res.send(payments)
    } catch (error) {
        console.log(error)
    }
}
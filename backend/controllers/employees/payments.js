const Payment = require("../../models/employees/payments")




exports.readEmployeePayments = async (req, res, next) => {
    try {
        const { employeeId } = req.query

        const payments = await Payment.findAll({
            where:{
                employeeId
            }
        })

        return res.status(200).json({ payments });
    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}
const Employees = require("../models/employees/employees");
const Log = require("../models/employees/log");
const Payment = require("../models/employees/payments");
const SalaryTypes = require("../models/employees/salarytypes");


const createPayment = async () => {
    const employees = await Employees.findAll({
        include: [
            {
                model: SalaryTypes,
                as: 'salary_type', 
                attributes: ['id', 'type'] 
            },
            {
                model:Log,
                where:{
                    accountedFor: false
                }
            }
        ]
    });

    // Loop through employees
    for (const employee of employees) {
        let paymentAmount = 0;
        let hoursWorked = 0;
        let paymentDate = new Date();
  
        // Determine the time period for which to create payment
        switch (employee.paid_type) {
          case 'weekly':
            paymentDate = new Date(paymentDate.getFullYear(), paymentDate.getMonth(), paymentDate.getDate() - paymentDate.getDay());
            break;
          case 'monthly':
            paymentDate = new Date(paymentDate.getFullYear(), paymentDate.getMonth(), 1);
            break;
          case 'yearly':
            paymentDate = new Date(paymentDate.getFullYear(), 0, 1);
            break;
          default:
            throw new Error('Invalid paid_type');
        }
  
        // Check if a payment already exists for the current time period
        const existingPayment = await Payment.findOne({
          where: {
            employeeId: employee.id,
            paymentDate: paymentDate,
          }
        });
  
        // If payment doesn't exist, calculate payment and hours worked and create payment entry
        if (!existingPayment) {
            // Calculate hours worked
            hoursWorked = employee.logs.reduce((totalHours, log) => {
                return totalHours + ((log.signOutTime - log.signInTime) / (1000 * 60 * 60));
            }, 0);
  
            // Calculate payment amount
            switch (employee.paid_type) {
                case 'weekly':
                    if(employee.salary_type.type === "hourly"){
                        paymentAmount = employee.hourly_rate * hoursWorked;
                    }else if(employee.salary_type.type === "monthly"){
                        paymentAmount = employee.monthly_salary / 4.33;
                    }else{
                        paymentAmount = employee.yearly_salary / 52.1429
                    }

                break;
                case 'monthly':
                    if(employee.salary_type.type === "hourly"){
                        paymentAmount = employee.hourly_rate * hoursWorked;
                    }else if(employee.salary_type.type === "monthly"){
                        paymentAmount = employee.monthly_salary;
                    }else{
                        paymentAmount = employee.yearly_salary / 12
                    }
                break;
                case 'yearly':
                    if(employee.salary_type.type === "hourly"){
                        paymentAmount = employee.hourly_rate * hoursWorked;
                    }else if(employee.salary_type.type === "monthly"){
                        paymentAmount = employee.monthly_salary * 12;
                    }else{
                        paymentAmount = employee.yearly_salary
                    }
                break;
                default:
                throw new Error('Invalid paid_type');
            }
  
            // Create payment entry
            await Payment.create({
                employeeId: employee.id,
                amount: paymentAmount,
                paymentDate: paymentDate,
                hoursWorked: hoursWorked,
            });

            // Mark logs as accounted for
            await Log.update({ accountedFor: true }, {
                where: {
                    id: employee.logs.map(log => log.id)
                }
            });
        }
    }
}

module.exports = createPayment;
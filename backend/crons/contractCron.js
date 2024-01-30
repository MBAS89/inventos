//error response middleware
const ErrorResponse = require('../utils/errorResponse');

//modles
const Contracts = require('../models/employees/contracts');
const Employees = require('../models/employees/employees');

async function contractCron() {
    try {
        // Find all contracts where end date is today
        const today = new Date().toISOString().split('T')[0]; // Get today's date
        const contracts = await Contracts.findAll({
            where: {
                end_date: today
            }
        });

        // Update the associated employees' status
        for (const contract of contracts) {
            const employee = await Employees.findByPk(contract.employeeId);
            if (employee) {
                await employee.update({
                    status: 'out-payroll',
                    end_date: contract.end_date,
                    work_type:'not-installed',
                    salary_type: null,
                    hourly_rate:0,
                    yearly_salary:0
                });
            }
        }

        console.log('Contract cron job executed successfully.');
    } catch (error) {
        return new ErrorResponse('Error occurred while updating employees status', 500)
    }
}

module.exports = contractCron;
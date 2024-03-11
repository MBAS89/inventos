const { Op } = require('sequelize');

//error response middleware
const ErrorResponse = require('../../utils/errorResponse')

//pcakgae to validate email
const validator = require('validator');

//bcrypt to hash the password before insert it into database
const bcrypt = require('bcrypt');

//cloudinaryUtils reusable functions
const { cloudinaryExtractPublicId, deleteImage } = require('../../utils/functions/cloudinary/cloudinaryUtils');
//reusable functions to check Required Fields
const { checkRequiredFields } = require('../../utils/functions/checkRequiredFileds');

//modles
const Contracts = require('../../models/employees/contracts')
const Employees = require('../../models/employees/employees');


exports.addContractAndNewEmployee = async (req, res, next) => {
    try {
        //retrive Customer values from req body 
        const store_id = req.authData.store_id

        //get all employee and contract values from req.body
        const { full_name, address, email, phone_number, password, status, employment_date, work_type, salary_type, confirmPassword, hourly_rate, yearly_salary, monthly_salary, roleId, start_date, end_date, details } = req.body 

        // Access Cloudinary image URL after uploading
        const imageUrl = req.file.path;
        // Extract the puplic id from the image URL using reusable function cloudinaryExtractPublicId
        const imageId = cloudinaryExtractPublicId(imageUrl)

        //check if there is an employment_date and if not set to the current date
        let employmentDate
        if(!employment_date){
            employmentDate = new Date();
        }else{
            employmentDate = employment_date
        }


        //Check if all Required Fileds are there
        const requiredFields = ['full_name', 'email', 'phone_number', 'address', 'password', 'salary_type', 'start_date', 'end_date', 'details'];
        const validationError = checkRequiredFields(next, req.body, requiredFields);

        //Check If salary have value 
        if(!hourly_rate && !yearly_salary && !monthly_salary){
            //this will send a request to cloudinary to delete the uploaded image becasue the request failed 
            await deleteImage(imageId)

             //this Will Tell the user That Contact should have Salary Value 
            return next(new ErrorResponse('You must choose between a yearly salary or a hourly salary or monthly salary', 406));
        }

        //if some required fields are missing 
        if(validationError){
            //this will send a request to cloudinary to delete the uploaded image becasue the request failed 
            await deleteImage(imageId)

            //this Will Tell the user which fields they need to fill
            return next(new ErrorResponse(validationError, 422));
        }

        // Check if the email is valid
        const isValidEmail = validator.isEmail(email)
        if (!isValidEmail) {
            //this will send a request to cloudinary to delete the uploaded image becasue the request failed 
            await deleteImage(imageId)

            //this will tell user email is not accepted 
            return next(new ErrorResponse('Invalid email address', 406));
        }

        //check if password dose match
        if(password !== confirmPassword){
            return next(new ErrorResponse('Password does not match. Try again', 406));
        }

        //hash password before insert into database
        const hashedPassword = await bcrypt.hash(password, 10);

        let hourly
        let monthly
        let yearly

        if(JSON.parse(yearly_salary)){
            yearly = JSON.parse(yearly_salary)
            monthly = JSON.parse(yearly_salary) / 12
            hourly = null
        }else if(JSON.parse(monthly_salary)){
            yearly = JSON.parse(monthly_salary) * 12
            monthly = JSON.parse(monthly_salary)
            hourly = null
        }else if(JSON.parse(hourly_rate)){
            yearly = null
            monthly = null
            hourly = JSON.parse(hourly_rate)
        }else{
            yearly = null
            monthly = null
            hourly = null
        }

        //INSERT this Employee to the data base
        const employee = await Employees.create({
            store_id,
            full_name,
            image: imageUrl,
            image_id: imageId,
            email,
            phone_number,
            address,
            password:hashedPassword,
            status,
            employment_date:employmentDate,
            end_of_service:new Date(end_date),
            work_type : work_type ? work_type : 'contract-based',
            salary_type_id:salary_type,
            hourly_rate:hourly,
            yearly_salary:yearly,
            monthly_salary:monthly,
            roleId: JSON.parse(roleId) ? JSON.parse(roleId) : null
        });

        //if creating an employee did not work 
        if(!employee){
            //this will send a request to cloudinary to delete the uploaded image becasue the request failed 
            await deleteImage(imageId)

            //this Will Tell the user which fields they need to fill
            return next(new ErrorResponse("Something went Wrong", 500));
        }

        await Contracts.update(
            { status: 'Canceled' },
            { where: { employeeId:employee.id, status: 'Active' } }
        );

        //create a contract 
        const contract = await Contracts.create({
            details,
            start_date,
            end_date,
            salary_type_id:salary_type,
            hourly_rate:hourly,
            yearly_salary:yearly,
            monthly_salary:monthly,
            employeeId:employee.id
        })

        //check if creating a contract did not wrok 
        if(!contract){
            //if it did not wrok send a response with this error message 
            return next(new ErrorResponse("Something went wrong!", 500))
        }

        //return success response with message
        res.status(201).json({
            status:"success",
            message:"Contract Created AND Employee Created",
            data: {
                employee,
                contract
            }
        })

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}


exports.addContractToEmployee = async (req, res, next) => {
    try {
        //get all contract values and employee id from req.body
        const { details, start_date, salary_type, hourly_rate, yearly_salary, monthly_salary, end_date, employeeId } = req.body;

        //Check if all Required Fileds are there
        const requiredFields = ['details', 'start_date', 'end_date', 'employeeId', 'salary_type'];
        const validationError = checkRequiredFields(next, req.body, requiredFields);

        let hourly
        let monthly
        let yearly

        if(JSON.parse(yearly_salary)){
            yearly = JSON.parse(yearly_salary)
            monthly = JSON.parse(yearly_salary) / 12
            hourly = null
        }else if(JSON.parse(monthly_salary)){
            yearly = JSON.parse(monthly_salary) * 12
            monthly = JSON.parse(monthly_salary)
            hourly = null
        }else if(JSON.parse(hourly_rate)){
            yearly = null
            monthly = null
            hourly = JSON.parse(hourly_rate)
        }else{
            yearly = null
            monthly = null
            hourly = null
        }

        //if some required fields are missing 
        if(validationError){
            //this Will Tell the user which fields they need to fill
            return next(new ErrorResponse(validationError, 422));
        }

        await Contracts.update(
            { status: 'Canceled' },
            { where: { employeeId, status: 'Active' } }
        );

        //create a contract 
        const contract = await Contracts.create({
            details,
            start_date,
            end_date,
            salary_type_id:salary_type,
            hourly_rate:hourly,
            yearly_salary:yearly,
            monthly_salary:monthly,
            employeeId
        })

        //check if creating a contract did not wrok 
        if(!contract){
            //if it did not wrok send a response with this error message 
            return next(new ErrorResponse("Something went wrong!", 500))
        }

        //Update Employee Based on Contact info
        const updatedEmployee = await Employees.update({
            status:'on-payroll',
            end_of_service:end_date,
            work_type:'contract-based',
            salary_type_id:salary_type,
            hourly_rate:hourly,
            yearly_salary:yearly,
            monthly_salary:monthly,
        },{
            where:{
                id:employeeId
            }
        })

        //CHECK IF WE DID NOT RECEIVE ANYTHING FROM DATABASE THAT MEAN SOMETHING WENT WRONG SO WE INFORM USER
        if(updatedEmployee[0] === 0){
            return next(new ErrorResponse("Something Went Wrong", 500));
        }


        //return success response with message
        res.status(201).json({
            status:"success",
            message:"Contract Created AND Employee Info Updated",
        })

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}



exports.editContract = async (req, res, next) => {
    try {
        //get contractId from req.params
        const { contractId } = req.params
        //get all contract values and employee id from req.body
        const { salary_type, hourly_rate, yearly_salary, monthly_salary, details, start_date, end_date, employeeId, status } = req.body

        //if contractId dose not have value
        if(!contractId){
            //send error message that saying contract id is required 
            return next(new ErrorResponse("Contract ID Required", 422));
        }

        //Check if all Required Fileds are there
        const requiredFields = ['salary_type', 'hourly_rate', 'yearly_salary', 'details', 'start_date', 'end_date'];
        const validationError = checkRequiredFields(next, req.body, requiredFields);

        //if some required fields are missing 
        if(validationError){
            //this Will Tell the user which fields they need to fill
            return next(new ErrorResponse(validationError, 422));
        }

        if(status === 'Active'){
            isThereAnActiveContract = await Contracts.findAll({
                where:{
                    status:'Active',
                    id:{[Op.not]: contractId},
                    employeeId 
                }
            })

            if(isThereAnActiveContract.length > 0){
                //send error message that saying You already have an Active Contract 
                return next(new ErrorResponse("Employee Has An Active Contract Deactivate Previous Contract First", 422));
            }
        }

        //declare a variable to hold the contract status 
        let contractStatus;

        //if we did not receive a status from body
        if(!status){
            //assume the status is Active
            contractStatus = 'Active'
        }else{
            //if we get status from body we assign it to the variable
            contractStatus = status
        }

        //update a contract
        const contract = await Contracts.update({
            salary_type_id:salary_type,
            hourly_rate,
            yearly_salary,
            monthly_salary,
            details,
            start_date,
            end_date,
            status:contractStatus
        },{
            where:{
                id:contractId
            }
        })


        //check if updating a contract did not wrok 
        if(contract[0] === 0){
            //if it did not wrok send a response with this error message 
            return next(new ErrorResponse("Something went wrong!", 500))
        }

        //we want to update employee info based on contract status
        if(contractStatus === 'Active'){
            /*  IF contract status ACtive we will make this employe status on
                payroll and assign the end_of_service of the employee to the end date
                of the contract and work type to contract-based and assign the value 
                of salary_type, hourly_rate and yearly_salary based on contract values
            */ 
            const updatedEmployee = await Employees.update({
                status:'on-payroll',
                end_of_service:end_date,
                work_type:'contract-based',
                salary_type_id:salary_type,
                hourly_rate,
                monthly_salary,
                yearly_salary
            },{
                where:{
                    id:employeeId
                }
            })

            //CHECK IF WE DID NOT RECEIVE ANYTHING FROM DATABASE THAT MEAN SOMETHING WENT WRONG SO WE INFORM USER
            if(updatedEmployee[0] === 0){
                return next(new ErrorResponse("Something Went Wrong", 500));
            }

        }else if(contractStatus === 'Finshed' || contractStatus === 'Canceled'){
            /*  IF contract status Finshed or Canceled we will make this employe status out
                payroll and assign the end_of_service of the employee to the current
                day time and work type to not-installed and assign the value 
                of salary_type, hourly_rate and yearly_salary to 0 this mean employee need new contract
                or another work type
            */ 
            const updatedEmployee = await Employees.update({
                status:'out-payroll',
                end_of_service:new Date(),
                work_type:'not-installed',
                salary_type_id: null,
                hourly_rate:0,
                yearly_salary:0,
                monthly_salary:0
            },{
                where:{
                    id:employeeId
                }
            })

            //CHECK IF WE DID NOT RECEIVE ANYTHING FROM DATABASE THAT MEAN SOMETHING WENT WRONG SO WE INFORM USER
            if(updatedEmployee[0] === 0){
                return next(new ErrorResponse("Something Went Wrong", 500));
            }
        }


        //return success response with message
        res.status(200).json({
            status:"success",
            message:"Contract Updated And Employee Info Updated",
        })

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.removeContract = async (req, res, next) => {
    try {
        //get contractId from req.params
        const { contractId } = req.params
        //get employeeId from req.query
        const { employeeId } = req.query

        //check if contractId And employeeId dose not have a value
        if(!contractId || !employeeId){
            //if not send an error with this response message 
            return next(new ErrorResponse("Contract ID AND Employee ID is required", 406))
        }

        const contractInfo = await Contracts.findOne({
            where:{
                id:contractId
            }
        })

        //Delete contract where Id Equal the contract ID
        const contract = await Contracts.destroy({
            where: {
                id: contractId
            }
        });

        //check if deleting a contract did not wrok 
        if(!contract){
            //if it did not wrok send a response with this error message 
            return next(new ErrorResponse("Something went wrong or TypeId is not found!", 500))
        }

        /*  When deleting contract for an employe work type is contract-based 
            we will make this employe status out payroll and assign the end_of_service
            of the employee to the current day time and work type to not-installed
            and assign the value of salary_type, hourly_rate and yearly_salary to 0 
            this mean employee need new contract or another work type
        */ 

        /*  
            check if the deleted contract is an active contract if it's then we 
            will update employee if not we will not 
        */

        if(contractInfo.status === "Active"){
            const updatedEmployee = await Employees.update({
                status:'out-payroll',
                end_of_service:new Date(),
                work_type:'not-installed',
                salary_type_id: null,
                hourly_rate:0,
                yearly_salary:0,
                monthly_salary:0
            },{
                where:{
                    id:employeeId
                }
            })
    
            //CHECK IF WE DID NOT RECEIVE ANYTHING FROM DATABASE THAT MEAN SOMETHING WENT WRONG SO WE INFORM USER
            if(updatedEmployee[0] === 0){
                return next(new ErrorResponse("Something Went Wrong", 500));
            }
        }

        //return success response with message
        res.status(200).json({
            status:"success",
            message:"Contract Deleted",
        })


    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}
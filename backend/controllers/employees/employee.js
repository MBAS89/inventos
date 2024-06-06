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

const { getOrderOptions } = require('../../utils/functions/orderOptions');

//modles
const Employees = require('../../models/employees/employees');
const SalaryTypes = require('../../models/employees/salarytypes');
const Roles = require('../../models/employees/roles');
const Contracts = require('../../models/employees/contracts');
const Log = require('../../models/employees/log');
const Payment = require('../../models/employees/payments');

exports.readEmployees = async (req, res, next) => {

    try {
        const storeId = req.authData.store_id

        const { page, limit = 10, searchQuery, sort, column } = req.query;

        if (!page || !storeId) {
            return next(new ErrorResponse('Page Number and Store ID are required', 400));
        }
        
        const totalCount = await Employees.count({ where: { store_id: storeId } });

        const totalPages = Math.ceil(totalCount / limit);
    
        const currentPage = parseInt(page);

        const whereClause = searchQuery ? {
            store_id: storeId,
            [Op.or]: [
                { full_name: { [Op.iLike]: `%${searchQuery}%` } },
                { email: { [Op.iLike]: `%${searchQuery}%` } },
                { phone_number: { [Op.iLike]: `%${searchQuery}%` } },
            ]
        } : { store_id: storeId };

        const employees = await Employees.findAll({
            where: whereClause,
            limit: searchQuery ? null : parseInt(limit),
            offset: searchQuery ? null : (currentPage - 1) * parseInt(limit),
            order:column && sort ? getOrderOptions(column, sort) : [['id', 'ASC']],
            include: [
                {
                    model: SalaryTypes,
                    as: 'salary_type', 
                    attributes: ['id', 'type'] 
                },
                {
                    model: Roles,
                    attributes: ['id', 'name'],
                }
            ]
        });

        return res.status(200).json({ totalCount, totalPages, currentPage, employees });

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.readSingleEmployee = async (req, res, next) => {

    try {
        const storeId = req.authData.store_id
        const { employeeId } = req.query;

        if (!employeeId || !storeId) {
            return next(new ErrorResponse('Employee ID and Store ID are required', 400));
        }
        
        const employee = await Employees.findOne({
            where: { 
                store_id: storeId,
                id: employeeId
            },
            include: [
                {
                    model: SalaryTypes,
                    as: 'salary_type', 
                    attributes: ['id', 'type'] 
                },
                {
                    model: Roles,
                    attributes: ['id', 'name'],
                },
                {
                    model:Log
                }
            ]
        })

        if(!employee){
            return  next(new ErrorResponse('No Employee Found!', 404))
        }

        const contracts = await Contracts.findAll({
            where:{
                employeeId:employee.id
            },
            include: [
                {
                    model: SalaryTypes,
                    as: 'salary_type', 
                    attributes: ['id', 'type'] 
                }
            ]
        })

        const payments = await Payment.findAll({
            where:{
                employeeId:employee.id
            }
        })

        return res.status(200).json({ employee, contracts, payments });

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}


exports.addEmployee = async (req, res, next) => {
    try {

        //retrive Customer values from req body 
        const store_id = req.authData.store_id

        const { full_name, address, email, phone_number, password, status, employment_date, end_of_service, work_type, salary_type, confirmPassword, hourly_rate, yearly_salary, monthly_salary, roleId } = req.body 

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
        const requiredFields = ['full_name', 'email', 'phone_number', 'address', 'password', 'status', 'work_type'];
        const validationError = checkRequiredFields(next, req.body, requiredFields);

        if(validationError){
            //this will send a request to cloudinary to delete the uploaded image becasue the request failed 
            await deleteImage(imageId)

            //this Will Tell the user which fields they need to fill
            return next(new ErrorResponse(validationError, 422));
        }

        const isValidEmail = validator.isEmail(email)

        // Check if the email is valid
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
            end_of_service,
            work_type,
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

        //return success response with message
        res.status(201).json({
            status:"success",
            message:"Employee Added",
            results:1,
            data: {
                employee
            }
        })

    } catch (error) {
        //console.log(error)
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.editEmployee = async (req, res, next) => {
    try {
        //retrive employeeId from req params 
        const { employeeId } =  req.params
        //retrive employee new values from req body 
        const { full_name, address, email, phone_number, status, employment_date, end_of_service, work_type, salary_type, hourly_rate, yearly_salary, monthly_salary, roleId, oldImage } = req.body
        
        let imageId
        let imageUrl
        // Access Cloudinary image URL after uploading
        if(req.file){
            imageUrl = req.file.path;

            // Extract the puplic id from the image URL using reusable function cloudinaryExtractPublicId
            imageId = cloudinaryExtractPublicId(imageUrl)
        }

        //check if employeeId Have a value 
        if(!employeeId){
            if(imageId){
                //this will send a request to cloudinary to delete the uploaded image becasue the request failed 
                await deleteImage(imageId)
            }
            //this Will Tell the user which fields they need to fill
            return next(new ErrorResponse("Employee ID Required", 422));
        }

        //fetch the old image id For Employee 
        const employee = await Employees.findOne({
            where: {
                id: employeeId
            },
            attributes: ['image_id']
        });

        // If the Employee exists, extract the image ID
        const oldEmployeeImageId = employee ? employee.image_id : null;

        //check if there is an employment_date and if not set to the current date
        let employmentDate
        if(!employment_date){
            employmentDate = new Date();
        }else{
            employmentDate = employment_date
        }

        //Check if all Required Fileds are there
        const requiredFields = ['full_name', 'email', 'phone_number', 'address', 'status', 'work_type'];
        const validationError = checkRequiredFields(next, req.body, requiredFields);

        if(validationError){
            if(imageId){
                //this will send a request to cloudinary to delete the uploaded image becasue the request failed 
                await deleteImage(imageId)
            }

            //this Will Tell the user which fields they need to fill
            return next(new ErrorResponse(validationError, 422));
        }

        const isValidEmail = validator.isEmail(email)

        // Check if the email is valid
        if (!isValidEmail) {
            if(imageId){
                //this will send a request to cloudinary to delete the uploaded image becasue the request failed 
                await deleteImage(imageId)
            }
            //this will tell user email is not accepted 
            return next(new ErrorResponse('Invalid email address', 406));
        }

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

        //Edit Employee in database with new values 
        const updatedEmployee = await Employees.update(
            {
                full_name,
                image: imageUrl ? imageUrl : oldImage,
                image_id: imageId,
                email,
                phone_number,
                address,
                status,
                employment_date:new Date(employmentDate),
                end_of_service:end_of_service ? new Date(end_of_service) : null,
                work_type,
                salary_type_id:salary_type,
                hourly_rate:hourly,
                yearly_salary:yearly,
                monthly_salary:monthly,
                roleId: JSON.parse(roleId) ? JSON.parse(roleId) : null
            },
            {
                returning: true,
                where: { id: employeeId }
            }
        );

        //CHECK IF WE DID NOT RECEIVE ANYTHING FROM DATABASE THAT MEAN SOMETHING WENT WRONG SO WE INFORM USER
        if(updatedEmployee[0] === 0){
            if(imageId){
                //this will send a request to cloudinary to delete the uploaded image becasue the request failed 
                await deleteImage(imageId)
            }
            return next(new ErrorResponse("Something Went Wrong", 500));
        }

        let result
        if(req.file){
            //this will send a request to cloudinary to delete the old image from there and return ok or fail 
            result = await deleteImage(oldEmployeeImageId)
        }

        //return success response with message
        res.status(201).json({
            status:"success",
            message:"Employee Edited",
            cloudinary:result,
            results:1,
            data: {
                employee:updatedEmployee
            }
        })
        


    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.removeEmployee = async (req, res, next) => {
    try {

        //retrive Customer values from req body 
        const store_id = req.authData.store_id

        //retrive employeeId from req params 
        const { employeeId } =  req.params

        /*
            retrive imageId from req query i stored this in query because
            the value of this may have / and this will make an issue if i did use params 
        */
        const { imageId } = req.query

        //check if supplierId have value if not throw an error
        if(!employeeId){
            return next(new ErrorResponse("Employee ID Is required", 422));
        }

        //this will send a request to cloudinary to delete the image from there and return ok or fail 
        const result = await deleteImage(imageId)


        //DELETE supplier FROM DATA BASE WITH THE DISRE ID VALUE
        const employee = await Employees.destroy({
            where: {
                id: employeeId,
                store_id
            }
        });

        if(!employee){
            return next(new ErrorResponse("Something Went Wrong", 500));
        }

        //return success response with message
        res.status(200).json({
            status:"success",
            cloudinary:result,
            message:"Employee Deleted",
        })

    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}


exports.editEmployeeRole = async (req, res, next) => {
    try {
        //retrive employeeId from req params 
        const { employeeId } =  req.query

        //retrive employee new Role value from req body 
        const { roleId } = req.body

        //Check if all Required Fileds are there
        const requiredFields = ['roleId'];
        const validationError = checkRequiredFields(next, req.body, requiredFields);

        if(validationError){
            //this Will Tell the user which fields they need to fill
            return next(new ErrorResponse(validationError, 422));
        }

        //Edit Employee in database with new values 
        const updatedEmployee = await Employees.update(
            {
                roleId: JSON.parse(roleId)
            },
            {
                returning: false,
                where: { id: employeeId }
            }
        );

        //CHECK IF WE DID NOT RECEIVE ANYTHING FROM DATABASE THAT MEAN SOMETHING WENT WRONG SO WE INFORM USER
        if(updatedEmployee[0] === 0){
            return next(new ErrorResponse("Something Went Wrong", 500));
        }

        //return success response with message
        res.status(201).json({
            status:"success",
            message:"Employee Role Edited",
            data: {
                employee:updatedEmployee
            }
        })


    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.editEmployeeJobDetails = async (req, res, next) => {
    try {
        const { employeeId } = req.query;
        const { action, employmentDate, expectedEndDate } = req.body;

        const actions = {
            "change-employment-date": {
                date: employmentDate,
                field: "employment_date",
                error: "Please select a valid employment date!"
            },
            "change-expected-end-date": {
                date: expectedEndDate,
                field: "end_of_service",
                error: "Please select a valid expected end date!"
            }
        };

        if (!actions[action]?.date) {
            return next(new ErrorResponse(actions[action]?.error || "Please specify an action", 406));
        }

        const updatedEmployee = await Employees.update(
            { [actions[action].field]: actions[action].date },
            { returning: false, where: { id: employeeId } }
        );

        if (updatedEmployee[0] === 0) {
            return next(new ErrorResponse("Something Went Wrong", 500));
        }

        res.status(201).json({
            status: "success",
            message: "Employee Job Details Edited",
            data: { employee: updatedEmployee }
        });
    } catch (error) {
        next(error);
    }
};

exports.editEmployeeSalary = async (req, res, next) => {
    try {
        const { employeeId } = req.query;

        //check if employeeId Have a value 
        if(!employeeId){
            //this Will Tell the user which fields they need to fill
            return next(new ErrorResponse("Employee ID Required", 422));
        }

        const { salary_type, hourly_rate, yearly_salary, monthly_salary } = req.body;

        //Check if all Required Fileds are there
        const requiredFields = ['salary_type'];
        const validationError = checkRequiredFields(next, req.body, requiredFields);

        if(validationError){
            //this Will Tell the user which fields they need to fill
            return next(new ErrorResponse(validationError, 422));
        }

        let hourly
        let monthly
        let yearly

        if(yearly_salary){
            yearly = yearly_salary
            monthly = yearly_salary / 12
            hourly = null
        }else if(monthly_salary){
            yearly = monthly_salary * 12
            monthly = monthly_salary
            hourly = null
        }else if(hourly_rate){
            yearly = null
            monthly = null
            hourly = hourly_rate
        }else{
            yearly = null
            monthly = null
            hourly = null
        }

        //Edit Employee in database with new values 
        const updatedEmployee = await Employees.update(
            {
                salary_type_id:salary_type,
                hourly_rate:hourly,
                yearly_salary:yearly,
                monthly_salary:monthly,
            },
            {
                returning: false,
                where: { id: employeeId }
            }
        );

        //CHECK IF WE DID NOT RECEIVE ANYTHING FROM DATABASE THAT MEAN SOMETHING WENT WRONG SO WE INFORM USER
        if(updatedEmployee[0] === 0){
            return next(new ErrorResponse("Something Went Wrong", 500));
        }

        //return success response with message
        res.status(201).json({
            status:"success",
            message:"Employee Salary Edited",
            data: {
                employee:updatedEmployee
            }
        })


    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.editEmployeeWorkingStatus = async (req, res, next) => {
    try {
        const { employeeId } = req.query;


        //check if employeeId Have a value 
        if(!employeeId){
            //this Will Tell the user which fields they need to fill
            return next(new ErrorResponse("Employee ID Required", 422));
        }

        const { status } = req.body;

        //Check if all Required Fileds are there
        const requiredFields = ['status'];
        const validationError = checkRequiredFields(next, req.body, requiredFields);

        if(validationError){
            //this Will Tell the user which fields they need to fill
            return next(new ErrorResponse(validationError, 422));
        }

        //Edit Employee in database with new values 
        const updatedEmployee = await Employees.update(
            {
                status
            },
            {
                returning: false,
                where: { id: employeeId }
            }
        );

        //CHECK IF WE DID NOT RECEIVE ANYTHING FROM DATABASE THAT MEAN SOMETHING WENT WRONG SO WE INFORM USER
        if(updatedEmployee[0] === 0){
            return next(new ErrorResponse("Something Went Wrong", 500));
        }

        //return success response with message
        res.status(201).json({
            status:"success",
            message:"Employee Working Status Edited",
            data: {
                employee:updatedEmployee
            }
        })


    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.editEmployeePaidType = async (req, res, next) => {
    try {
        const { employeeId } = req.query;


        //check if employeeId Have a value 
        if(!employeeId){
            //this Will Tell the user which fields they need to fill
            return next(new ErrorResponse("Employee ID Required", 422));
        }

        const { type } = req.body;

        //Check if all Required Fileds are there
        const requiredFields = ['type'];
        const validationError = checkRequiredFields(next, req.body, requiredFields);

        if(validationError){
            //this Will Tell the user which fields they need to fill
            return next(new ErrorResponse(validationError, 422));
        }

        //Edit Employee in database with new values 
        const updatedEmployee = await Employees.update(
            {
                paid_type:type
            },
            {
                returning: false,
                where: { id: employeeId }
            }
        );

        //CHECK IF WE DID NOT RECEIVE ANYTHING FROM DATABASE THAT MEAN SOMETHING WENT WRONG SO WE INFORM USER
        if(updatedEmployee[0] === 0){
            return next(new ErrorResponse("Something Went Wrong", 500));
        }

        //return success response with message
        res.status(201).json({
            status:"success",
            message:"Employee Paid Type Edited",
            data: {
                employee:updatedEmployee
            }
        })


    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}
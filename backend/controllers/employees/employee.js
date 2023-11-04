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
const Employees = require('../../models/employees/employees')


exports.addEmployee = async (req, res, next) => {
    try {
        const { store_id, full_name, address, email, phone_number, password, status, employment_date, end_of_service, work_type, salary_type, confirmPassword, hourly_rate, yearly_salary } = req.body 

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
        const requiredFields = ['store_id', 'full_name', 'email', 'phone_number', 'address', 'password', 'status', 'work_type'];
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
            salary_type,
            hourly_rate,
            yearly_salary
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
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

exports.editEmployee = async (req, res, next) => {
    try {
        //retrive employeeId from req params 
        const { employeeId } =  req.params
        //retrive employee new values from req body 
        const { full_name, address, email, phone_number, status, employment_date, end_of_service, work_type, salary_type, hourly_rate, yearly_salary } = req.body
        
        // Access Cloudinary image URL after uploading
        const imageUrl = req.file.path;
        // Extract the puplic id from the image URL using reusable function cloudinaryExtractPublicId
        const imageId = cloudinaryExtractPublicId(imageUrl)

        //check if employeeId Have a value 
        if(!employeeId){
            //this will send a request to cloudinary to delete the uploaded image becasue the request failed 
            await deleteImage(imageId)

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


        //Edit Employee in database with new values 
        const updatedEmployee = await Employees.update(
            {
                full_name,
                image: imageUrl,
                image_id: imageId,
                email,
                phone_number,
                address,
                status,
                employment_date:employmentDate,
                end_of_service,
                work_type,
                salary_type,
                hourly_rate,
                yearly_salary
            },
            {
                returning: true,
                where: { id: employeeId }
            }
        );

        //CHECK IF WE DID NOT RECEIVE ANYTHING FROM DATABASE THAT MEAN SOMETHING WENT WRONG SO WE INFORM USER
        if(updatedEmployee[0] === 0){
            //this will send a request to cloudinary to delete the uploaded image becasue the request failed 
            await deleteImage(imageId)
            return next(new ErrorResponse("Something Went Wrong", 500));
        }

        //this will send a request to cloudinary to delete the old image from there and return ok or fail 
        const result = await deleteImage(oldEmployeeImageId)


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
                id: employeeId
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
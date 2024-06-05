import React from 'react'

//react router
import { useNavigate } from "react-router-dom";

//icons
import { BiLoaderCircle } from 'react-icons/bi';

//redux
import { useEditEmployeeWorkingStatusMutation, useRemoveEmployeeMutation } from '../../features/api/employees/employeeApiSlice';

//toast for error handling 
import { toast } from 'react-toastify'

export const EmployeeWarningPopUp = ({ setOpenWarningPopUp, action, data }) => {
    const navigate = useNavigate();

    const handleTitleAndBio = () => {
        let title = '';
        let message = '';
    
        switch(action) {
            case "End Employee Service":
                title = 'End Employee Service?';
                message = "Please be aware that terminating an employee's service will impact their payments, and no further payments will be processed for this employee.";
                break;
            case "Delete An Employee":
                title = 'Delete Employee?';
                message = "Kindly be advised that removing an employee will invariably result in the loss of critical data and records.";
                break;
            case "Start Employee Service":
                title = 'Start Employee Service?';
                message = "Initiating an employee service will promptly restore their ability to receive payments in their designated position.";
                break;
            default:
                break;
        }
    
        return (
            <div>
                <h2 className='font-bold text-[1.5rem]'>{title}</h2>
                <p className='text-slate-500 italic text-[0.8rem] mt-2'>{message}</p>
            </div>
        );
    }

    const [editEmployeeWorkingStatus, { isLoading:isEndServiceLoading }] = useEditEmployeeWorkingStatusMutation()
    const [removeEmployee, {isLoading:isDeleteingServiceLoading}] = useRemoveEmployeeMutation() 

    const submitAction = async () => {
        const deletePayload = {
            employeeId:data.employee.id,
            email:data.employee.email,
            imageId:data.employee.image_id

        }

        const editStatusPayload = {
            employeeId:data.employee.id,
            status:action === "End Employee Service" ? 'out-payroll' : 'on-payroll'
        }

        try {
            const res = await (action === "End Employee Service" || action === "Start Employee Service" ?
            editEmployeeWorkingStatus(editStatusPayload) :
            removeEmployee(deletePayload)).unwrap();

            toast.success(res.message);

            if(action === "Delete An Employee"){
                navigate("/dashboard/employees");
            }
            setOpenWarningPopUp(false);
        } catch (error) {
            toast.error(error.data.error)
        }
    }

    return (
        <div tabIndex="0" className='w-full h-full fixed top-[0] left-0 flex justify-center items-center overflow-hidden bg-[#00000069]'>
            <div className="rounded-lg bg-white shadow-2xl border-gray-300 border-2 text-center">
                <div className='p-4 mt-7 w-[35rem]'>
                    {handleTitleAndBio()}
                    <div className='flex justify-center mt-5 mb-5 gap-5'>
                        <button onClick={submitAction}
                            type="button" 
                            className="rounded flex gap-2 hover:bg-red-400 hover:text-white active:bg-red-700 border-red-600 border-2 bg-red-50 px-4 py-2 text-sm font-medium text-red-600"
                        >{isDeleteingServiceLoading || isEndServiceLoading && <BiLoaderCircle className='text-[1.4rem] animate-spin'/>}Yes, I'm sure</button>
                        <button 
                            onClick={() => {setOpenWarningPopUp(false)}}
                            className="rounded border-gray-600 hover:bg-gray-400 active:bg-gray-700 hover:text-white border-2 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600"
                        >No, go back</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

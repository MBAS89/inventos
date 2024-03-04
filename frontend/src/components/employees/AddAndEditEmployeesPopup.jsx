import React, { useEffect, useState } from 'react'
import { AiOutlineCloseCircle } from "react-icons/ai"
import { BiLoaderCircle } from "react-icons/bi";
import { DropZone } from '../DropZone'
import { useReadSalaryTypesQuery } from '../../features/api/employees/salaryTypesApiSlice'
import { checkRequiredFields } from '../../functions/checkRequiredFileds'
import { toast } from 'react-toastify'
import { useAddEmployeeMutation, useAddEmployeeWithContractMutation, useEditEmployeeMutation, useReadEmployeeQuery } from '../../features/api/employees/employeeApiSlice'
import { useReadRolesQuery } from '../../features/api/permissions/rolesApiSlice'

export const AddAndEditEmpolyeesPopup = ({ setOpenPopup, editMode, selected, setEditMode }) => {
    const [withContract, setWithContract] = useState(false)

    const { data:salaryTypes } = useReadSalaryTypesQuery({}, 'readSalaryTypes')
    const { data:roles } = useReadRolesQuery({}, 'readRoles')

    const [file, setFile] = useState(null)

    const [employeeData, setEmployeeData] = useState({
        fullName:'',
        address:'',
        email:'',
        phone:'',
        password:'',
        confirmPassword:'',
        status:'on-payroll',
        workType:withContract ? 'contract-based' : 'Please select',
        salaryType:'Please select',
        salaryTypeValue:'',
        rate:'',
        role: 'Please select -optional-'
    })

    const { fullName, address, email, password, phone, confirmPassword, status, workType, salaryType, salaryTypeValue, rate, role } = employeeData

    const onChange = (e) => {
        const { name, value } = e.target;

        if (name === 'salaryType') {
            const selectedType = salaryTypes.salaryTypes.find(type => type.id === value);
            
            setEmployeeData(prevState => ({
                ...prevState,
                [name]: value, 
                salaryTypeValue: selectedType ? selectedType.type : '' 
            }));
        } else {
            setEmployeeData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    }

    const [addEmployee, {isLoading:isEmployeeLoading }] = useAddEmployeeMutation()

    const handleAddEmployee = async (e) => {
        e.preventDefault()

        const requiredFileds = ['fullName', 'email', 'phone', 'address', 'password', 'status', 'workType']
        const notEmpty = checkRequiredFields(employeeData, requiredFileds)

        if(notEmpty || !file){
            return toast.error(notEmpty || 'Missing Image Please Upload image!')
        }

        if(password !== confirmPassword){
            return toast.error('Password Dose not Match!')
        }

        const payload = {
            file,
            fullName,
            address,
            email,
            phone,
            password,
            confirmPassword,
            status,
            workType,
            salaryType,
            salaryTypeValue,
            rate,
            roleId: role == 'Please select -optional-' ? null : role
        }

        try {
            const res = await addEmployee(payload).unwrap()
            toast.success(res.message)
            setFile(null)
            setEmployeeData({
                fullName:'',
                address:'',
                email:'',
                phone:'',
                password:'',
                confirmPassword:'',
                status:'on-payroll',
                workType:'Please select',
                salaryType:'Please select',
                salaryTypeValue:'',
                rate:'',
                role:''
            })

            setOpenPopup(false); 
            
        } catch (error) {
            toast.error(error.data.error)
        }
    }

    const [employeeInfo, setEmployeeInfo] = useState({
        employmentDate:'',
        endOfService:'',
        oldImage:''
    })

    const { employmentDate, endOfService, oldImage} = employeeInfo

    const onInfoChange = (e) => {
        setEmployeeInfo((prevState) => ({
            ...prevState,
            [e.target.name]:e.target.value

        }))
    }


    const { data } = editMode 
    ? useReadEmployeeQuery({ employeeId: selected[Object.keys(selected)[0]] }, 'readEmployee')
    : { data: null, isLoading: false };

    useEffect(() => {
        if(data){
            const findRate = (typeValue, monthly, hourly, yearly) => {
                if(typeValue === 'monthly'){
                    return monthly
                }else if(typeValue === 'hourly'){
                    return hourly
                }else if(typeValue === 'yearly'){
                    return yearly
                }else{
                    return 0
                }
            }

            setEmployeeData({
                fullName: data.employee.full_name,
                address: data.employee.address,
                email: data.employee.email,
                phone: data.employee.phone_number,
                status: data.employee.status,
                workType: data.employee.work_type,
                salaryType: data.employee.salary_type_id ? data.employee.salary_type_id : 'Please select',
                rate: data.employee.salary_type_id ? findRate(data.employee.salary_type.type, data.employee.monthly_salary, data.employee.hourly_rate, data.employee.yearly_salary) : '',
                role: data.employee.roleId ? data.employee.roleId : 'Please select -optional-'
            })
    
            setFile(perviousState => ({
                ...perviousState,
                imageUrl:data.employee.image
            }))

            setEmployeeInfo({
                employmentDate: new Date(data.employee.employment_date).toISOString().substring(0, 10),
                endOfService: data.employee.end_of_service ? new Date(data.employee.end_of_service).toISOString().substring(0, 10) : '',
                oldImage: data.employee.image
            })

            if(data.employee.work_type === 'contract-based'){
                setContactData({

                })
            }
        }
    },[editMode, data])


    const [editEmployee, {isLoading:isEditLoading}] = useEditEmployeeMutation()

    const handleEditEmployee = async (e) => {
        e.preventDefault()

        const payload = {
            file,
            fullName,
            address,
            email,
            phone,
            password,
            confirmPassword,
            status,
            workType,
            salaryType,
            salaryTypeValue,
            rate,
            roleId: role == 'Please select -optional-' ? null : role,
            employmentDate,
            endOfService,
            oldImage,
            employeeId:data.employee.id
        }

        try {
            const res = await editEmployee(payload).unwrap()
            toast.success(res.message)
            setFile(null)
            setEmployeeData({
                fullName:'',
                address:'',
                email:'',
                phone:'',
                password:'',
                confirmPassword:'',
                status:'on-payroll',
                workType:'Please select',
                salaryType:'Please select',
                salaryTypeValue:'',
                rate:'',
                role:''
            })

            setEmployeeInfo({
                employmentDate:'',
                endOfService:'',
                oldImage:''
            })

            setEditMode(false)
            setOpenPopup(false); 
            
        } catch (error) {
            toast.error(error.data.error)
        }
    }

    const [contractData, setContactData] = useState({
        startDate:'',
        endDate:'',
        details:''
    })

    const { startDate, endDate, details } = contractData

    const onContractDataChange = (e) => {
        setContactData((prevState) => ({
            ...prevState,
            [e.target.name]:e.target.value

        }))
    }

    const [addEmployeeWithContract, {isLoading:isAddContractLoading}] = useAddEmployeeWithContractMutation()

    const handleAddEmployeeWithContract = async (e) => {
        e.preventDefault()

        const requiredFileds = ['fullName', 'email', 'phone', 'address', 'password', 'status', 'workType']
        const notEmpty = checkRequiredFields(employeeData, requiredFileds)

        if(notEmpty || !file){
            return toast.error(notEmpty || 'Missing Image Please Upload image!')
        }

        if(password !== confirmPassword){
            return toast.error('Password Dose not Match!')
        }

        if(!startDate || !endDate || !details){
            return toast.error('Add contract info are required!')
        }


        const payload = {
            file,
            fullName,
            address,
            email,
            phone,
            password,
            confirmPassword,
            status,
            workType,
            salaryType,
            salaryTypeValue,
            rate,
            roleId: role == 'Please select -optional-' ? null : role,
            startDate,
            endDate,
            details
        }

        try {
            const res = await addEmployeeWithContract(payload).unwrap()
            toast.success(res.message)
            setFile(null)
            setEmployeeData({
                fullName:'',
                address:'',
                email:'',
                phone:'',
                password:'',
                confirmPassword:'',
                status:'on-payroll',
                workType:'Please select',
                salaryType:'Please select',
                salaryTypeValue:'',
                rate:'',
                role:''
            })

            setContactData({
                startDate:'',
                endDate:'',
                details:''
            })

            setOpenPopup(false)
            
        } catch (error) {
            toast.error(error.data.error)
        }
    }

    return (
    <section className="overflow-auto bg-white left-[32%] top-[7%] h-[52rem] w-[45rem] border-gray-300 border-solid border-[1px] absolute rounded-lg shadow-2xl">
        <div className='relative w-full bg-black'>
            <AiOutlineCloseCircle onClick={() => { setOpenPopup(false); setEditMode(false);}} className='text-gray-600 rounded-full cursor-pointer bg-white text-[2rem]  hover:scale-105 absolute right-4 top-4'/>
        </div>
        <h2 className='text-[2.5rem] font-bold text-center text-gray-500 capitalize mt-12'>{editMode ? 'Edit Employee' : 'Add Employee'}</h2>
        {(editMode && data?.employee?.work_type === 'contract-based') && <p className='text-center mt-4 text-gray-500'>Edit contracts via employee info page</p>}
        {!editMode && (
            <div className='flex items-center w-[70%] mx-auto mt-3 gap-5'>
                <button type='button' onClick={() => setWithContract(false)} className={`inline-block ${!withContract ? 'text-white bg-[#50B426]' : 'text-[#50B426] bg-white' } rounded border w-full border-[#50B426] px-12 py-4 text-sm font-medium active:bg-green-500 text-[1.3rem]`}>Without Contract</button>
                <button type='button' onClick={() => {
                    setWithContract(true); 
                    setEmployeeData((prevState) => ({
                        ...prevState,
                        workType:'contract-based'
                    }));
                }} className={`inline-block ${withContract ? 'text-white bg-[#50B426]' : 'text-[#50B426] bg-white' } rounded border w-full border-[#50B426] px-12 py-4 text-sm font-medium active:bg-green-500 text-[1.3rem]`}>With Contract</button>
            </div>
        )}
        <form onSubmit={editMode ? handleEditEmployee : withContract ? handleAddEmployeeWithContract : handleAddEmployee} className='flex flex-col gap-8 w-[70%] mx-auto mt-5 mb-10'>
            <DropZone setFile={setFile} file={file} className="border-[2px] border-dashed py-8 border-[#50B426] cursor-pointer w-[60%] text-center px-2" />
            <label htmlFor="fullName" className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                <input value={fullName} onChange={onChange} type="text" name='fullName' id="fullName" placeholder="Full Name" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                    Full Name
                </span>
            </label>
            <div className='flex items-center w-full gap-4'>
                <label htmlFor="email" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                    <input value={email} onChange={onChange} type="text" name='email' id="email" placeholder="Email" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                    <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                        Email
                    </span>
                </label>
                <label htmlFor="phone" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                    <input value={phone} onChange={onChange} type="text" name='phone' id="phone" placeholder="Phone" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                    <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                        Phone
                    </span>
                </label>
            </div>
            {editMode ? (
                <div className='flex items-center w-full gap-4'>
                    <label htmlFor="employmentDate" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input value={employmentDate} onChange={onInfoChange} type="date" id="employmentDate" name='employmentDate' placeholder="employmentDate" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Employment Date
                        </span>
                    </label>
                    <label htmlFor="endOfService" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input value={endOfService} onChange={onInfoChange} type="date" id="endOfService" name='endOfService' placeholder="endOfService" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            End of Service Date
                        </span>
                    </label>
                </div>
            ) : (
                <div className='flex items-center w-full gap-4'>
                    <label htmlFor="password" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input value={password} onChange={onChange} type="text" id="password" name='password' placeholder="password" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Password
                        </span>
                    </label>
                    <label htmlFor="confirmPassword" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <input value={confirmPassword} onChange={onChange} type="text" id="confirmPassword" name='confirmPassword' placeholder="Confirm Password" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Confirm Password
                        </span>
                    </label>
                </div>
            )}
            <label htmlFor="address" className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                <input value={address} onChange={onChange} type="text" name='address' id="address" placeholder="address" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                    Address
                </span>
            </label>
            <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-900">
                    Employee Role
                </label>
                <select value={role} onChange={onChange} name="role" id="role" className="mt-1.5 p-4 w-full border border-gray-200 rounded-md text-gray-700 sm:text-sm">
                    <option disabled>Please select -optional-</option>
                    {roles && roles.roles.map((role) => (
                        <option key={role.id} value={role.id}>{role.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="workType" className="block text-sm font-medium text-gray-900">
                    Emplpoyee work type
                </label>
                <select value={workType} onChange={onChange} name="workType" id="workType" className="mt-1.5 p-4 w-full border border-gray-200 rounded-md text-gray-700 sm:text-sm">
                    <option disabled>Please select</option>
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                    <option value="remote">Remote</option>
                    <option value="temporary">Temporary</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="contract-based">Contract Based</option>
                    <option value="not-installed">Not Installed</option>
                </select>
            </div>
            <div>
                <label htmlFor="salaryType" className="block text-sm font-medium text-gray-900">
                    Salary Type
                </label>
                <select value={salaryType} onChange={onChange} name="salaryType" id="salaryType" className="mt-1.5 p-4 w-full border border-gray-200 rounded-md text-gray-700 sm:text-sm">
                    <option disabled>Please select</option>
                    {salaryTypes && salaryTypes.salaryTypes.map((type) => (
                        <option key={type.id} value={type.id}>{type.type}</option>
                    ))}
                </select>
            </div>
            <label htmlFor="rate" className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                <input disabled={salaryType === 'Please select' ? true : false} value={rate} onChange={onChange} name='rate' type="Number" id="rate" placeholder="Salary" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                    Salary  {salaryType !== 'Please select' ? salaryTypeValue : ''}
                </span>
            </label>
            {withContract && (
                <div className='flex flex-col gap-3'>
                    <hr className='w-full h-1 bg-[#50B426]'/>
                    <h4>Contract Info:</h4>
                    <div className='flex items-center w-full gap-4'>
                        <label htmlFor="startDate" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                            <input value={startDate} onChange={onContractDataChange} type="date" id="startDate" name='startDate' placeholder="startDate" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                            <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                                Start Date
                            </span>
                        </label>
                        <label htmlFor="endDate" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                            <input value={endDate} onChange={onContractDataChange} type="date" id="endDate" name='endDate' placeholder="endDate" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                            <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                                End Date
                            </span>
                        </label>
                    </div>
                    <label htmlFor="details" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <textarea  value={details} onChange={onContractDataChange} rows="4" id="details" name='details' placeholder="details" className="peer resize-none  w-full border-none bg-transparent pt-5 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"></textarea>
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Contract Detailes
                        </span>
                    </label>
                </div>
            )}
            <button type='submit' disabled={isEmployeeLoading} className="flex justify-center rounded border w-full border-[#50B426] px-12 py-4 text-sm font-medium text-[#50B426] active:bg-green-500 active:text-white text-[1.3rem]">
                {(isEmployeeLoading || isAddContractLoading || isEditLoading) && <BiLoaderCircle className='text-[1.4rem] animate-spin'/>} {editMode ? withContract ? 'Edit Employee With Contract' :'Edit Employee' : withContract ? 'Add Employee With Contract' :'Add Employee'}
            </button>
        </form>
    </section>
  )
}
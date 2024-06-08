import { useState } from 'react'

//react router dom
import { useParams } from 'react-router-dom'

//Components
import { EmployeeInfo } from '../../../components/employees/EmployeeInfo'
import { JobDetails } from '../../../components/employees/JobDetails'
import { DuePayments } from '../../../components/employees/DuePayments'
import { PaidPayments } from '../../../components/employees/PaidPayments'
import { EmployeeContractInfo } from '../../../components/employees/EmployeeContractInfo'

//reusable components
import { AddEditPaymentPopUp } from '../../../components/employees/AddEditPaymentPopUp'
import { Breadcrumb } from '../../../components/Breadcrumb'

//redux
import { useReadEmployeeQuery } from '../../../features/api/employees/employeeApiSlice'

export const EmployeeInformation = () => {

    const { employeeId } = useParams();

    const { data, isLoading } = useReadEmployeeQuery({ employeeId: employeeId }, 'readEmployee')

    const [openAddEditPaymentPopUp, setOpenAddEditPaymentPopUp] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [selectedPayment, setSelectedPayment] = useState('')

    return (
        <div className={`bg-gray-200 min-h-[calc(100vh-64px)] h-full pb-16`}>
            {data && <Breadcrumb from="Employees" current={data.employee.full_name}/>}
            <EmployeeInfo data={data} isLoading={isLoading} />
            <JobDetails  data={data} isLoading={isLoading}/>
            <EmployeeContractInfo data={data} isLoading={isLoading} />
            {data && 
                <DuePayments  
                    data={data} 
                    setOpenAddEditPaymentPopUp={setOpenAddEditPaymentPopUp} 
                    setEditMode={setEditMode}
                    setSelectedPayment={setSelectedPayment}
                />
            }
            {data && 
                <PaidPayments  
                    data={data}  
                    setOpenAddEditPaymentPopUp={setOpenAddEditPaymentPopUp} 
                    setEditMode={setEditMode}
                    setSelectedPayment={setSelectedPayment} 
                />
            }
            {openAddEditPaymentPopUp && 
                <AddEditPaymentPopUp 
                    setOpenAddEditPaymentPopUp={setOpenAddEditPaymentPopUp}
                    setEditMode={setEditMode}
                    editMode={editMode}
                    selectedPayment={selectedPayment}
                    setSelectedPayment={setSelectedPayment}
                    employeeData={data}
                />
            }
        </div>
    )
}

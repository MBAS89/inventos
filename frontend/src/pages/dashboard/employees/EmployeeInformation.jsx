import React from 'react'

import { Breadcrumb } from '../../../components/Breadcrumb'
import { EmployeeInfo } from '../../../components/employees/EmployeeInfo'
import { JobDetails } from '../../../components/employees/JobDetails'
import { DuePayments } from '../../../components/employees/DuePayments'
import { PaidPayments } from '../../../components/employees/PaidPayments'
import { EmployeeContractInfo } from '../../../components/employees/EmployeeContractInfo'

import { useParams } from 'react-router-dom'
import { useReadEmployeeQuery } from '../../../features/api/employees/employeeApiSlice'



export const EmployeeInformation = () => {

    const { employeeId } = useParams();

    const { data, isLoading } = useReadEmployeeQuery({ employeeId: employeeId }, 'readEmployee')

    return (
        <div className=' bg-gray-100 min-h-[calc(100vh-64px)] pb-16'>
            {data && <Breadcrumb from="Employees" current={data.employee.full_name}/>}
            <EmployeeInfo data={data} isLoading={isLoading} />
            <JobDetails  data={data} isLoading={isLoading}/>
            <EmployeeContractInfo data={data} isLoading={isLoading} />
            <DuePayments  data={data} isLoading={isLoading}/>
            <PaidPayments  data={data} isLoading={isLoading}/>
        </div>
    )
}

import React from 'react'
import { Breadcrumb } from '../../components/Breadcrumb'
import { EmployeeInfo } from '../../components/employees/EmployeeInfo'
import { JobDetails } from '../../components/employees/JobDetails'
import { DuePayments } from '../../components/employees/DuePayments'
import { PaidPayments } from '../../components/employees/PaidPayments'

export const EmployeeInformation = () => {
    return (
        <div className=' bg-gray-100 min-h-[calc(100vh-64px)] pb-16'>
            <Breadcrumb from="Employees" current="Employee 1"/>
            <EmployeeInfo />
            <JobDetails />
            <DuePayments />
            <PaidPayments />
        </div>
    )
}

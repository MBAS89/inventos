import React from 'react'
import { Breadcrumb } from '../../components/Breadcrumb'
import { EmployeeInfo } from '../../components/employees/EmployeeInfo'
import { JobDetails } from '../../components/employees/JobDetails'

export const EmployeeInformation = () => {
    return (
        <div className=' bg-gray-100 h-[calc(100vh-64px)]'>
            <Breadcrumb from="Employees" current="Employee 1"/>
            <EmployeeInfo />
            <JobDetails />
        </div>
    )
}

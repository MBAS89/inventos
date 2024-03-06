import { apiSlice } from "../apiSlice";

const CONTRACT_URL = '/api/v1/store/employees/contracts'


export const contractApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addContractToEmployee: builder.mutation({
            query: (data) => ({
                url: `${CONTRACT_URL}/add-to-employee`,
                method: 'POST',
                body:{
                    details: data.details,
                    start_date: data.startDate, 
                    salary_type: data.salaryType, 
                    hourly_rate: data.salaryTypeValue == 'hourly' ? data.rate : null, 
                    yearly_salary: data.salaryTypeValue == 'yearly' ? data.rate : null, 
                    monthly_salary: data.salaryTypeValue == 'monthly' ? data.rate : null, 
                    end_date: data.endDate, 
                    employeeId:data.employeeId
                }
            }),
            invalidatesTags: ['Employees']
        }),
        editContract:builder.mutation({
            query: (data) => ({
                url: `${CONTRACT_URL}/edit/${data.contractId}`,
                method: 'PUT',
                body:{
                    details: data.details,
                    start_date: data.startDate, 
                    salary_type: data.salaryType, 
                    hourly_rate: data.salaryTypeValue == 'hourly' ? data.rate : null, 
                    yearly_salary: data.salaryTypeValue == 'yearly' ? data.rate : null, 
                    monthly_salary: data.salaryTypeValue == 'monthly' ? data.rate : null, 
                    end_date: data.endDate, 
                    employeeId:data.employeeId,
                    status:data.status
                }
            }),
            invalidatesTags: ['Employees']
        }),
        removeContract: builder.mutation({
            query: (data) => ({
                url: `${CONTRACT_URL}/remove/${data.contractId}?employeeId=${data.employeeId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Employees']
        }),
    })
})

export const { useAddContractToEmployeeMutation, useRemoveContractMutation, useEditContractMutation } = contractApiSlice
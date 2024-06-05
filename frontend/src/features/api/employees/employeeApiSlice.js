import { apiSlice } from "../apiSlice";

const EMPLOYEE_URL = '/api/v1/store/employees'


export const employeeApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        readEmployees: builder.query({
            query: (data) => ({
                url: `${EMPLOYEE_URL}/read?page=${data.page}&sort=${data.sortBy.sort || ''}&column=${data.sortBy.column || ''}&searchQuery=${data.searchQuery}`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                response.employees.sort((a, b) => a.id - b.id)
                return response;
            },
            providesTags: ['Employees'],
            providesTags: (result) =>
            result? [
                  ...result.employees.map(({ id }) => ({ type: 'Employees', id })),
                  { type: 'Employees' },
                ]
              : [{ type: 'Employees', id }],

        }),

        readEmployee: builder.query({
            query: (data) => ({
                url: `${EMPLOYEE_URL}/read/single?employeeId=${data.employeeId}`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                return response;
            },
            providesTags: (result, error, arg) => [{ type: 'Employees', id: arg }]

        }),
        addEmployee: builder.mutation({
            query: (data) => {
                const formData = new FormData();
                formData.append('folderName', 'employees');
                formData.append('full_name', data.fullName);
                formData.append('address', data.address);
                formData.append('email', data.email);
                formData.append('phone_number', data.phone);
                formData.append('password', data.password);
                formData.append('confirmPassword', data.confirmPassword);
                formData.append('status', data.status);
                formData.append('work_type', data.workType);
                formData.append('salary_type', data.salaryType);
                formData.append('hourly_rate', data.salaryTypeValue == 'hourly' ? data.rate : null);
                formData.append('yearly_salary', data.salaryTypeValue == 'yearly' ? data.rate : null);
                formData.append('monthly_salary', data.salaryTypeValue == 'monthly' ? data.rate : null);
                formData.append('roleId', data.roleId);
                formData.append('image', data.file.file);

                return {
                    url: `${EMPLOYEE_URL}/add?employeeEmail=${data.email}`,
                    method: 'POST',
                    body: formData
                };
            },
            invalidatesTags: ['Employees']

        }),
        editEmployee: builder.mutation({
            query: (data) => {
                const formData = new FormData();
                formData.append('folderName', 'employees');
                formData.append('full_name', data.fullName);
                formData.append('address', data.address);
                formData.append('email', data.email);
                formData.append('phone_number', data.phone);
                formData.append('status', data.status);
                formData.append('work_type', data.workType);
                formData.append('salary_type', data.salaryType);
                formData.append('employment_date', data.employmentDate);
                formData.append('end_of_service', data.endOfService);
                formData.append('hourly_rate', data.salaryTypeValue == 'hourly' ? data.rate : null);
                formData.append('yearly_salary', data.salaryTypeValue == 'yearly' ? data.rate : null);
                formData.append('monthly_salary', data.salaryTypeValue == 'monthly' ? data.rate : null);
                formData.append('roleId', data.roleId);
                formData.append('oldImage', data.oldImage);
                formData.append('image', data.file.file);

                return {
                    url: `${EMPLOYEE_URL}/edit/${data.employeeId}?employeeEmail=${data.email}`,
                    method: 'PUT',
                    body: formData
                };
            },
            invalidatesTags: ['Employees']
        }),
        removeEmployee: builder.mutation({
            query: (data) => ({
                url: `${EMPLOYEE_URL}/remove/${data.employeeId}?employeeEmail=${data.email}&imageId=${data.imageId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Employees']
        }),
        addEmployeeWithContract: builder.mutation({
            query: (data) => {
                const formData = new FormData();
                formData.append('folderName', 'employees');
                formData.append('full_name', data.fullName);
                formData.append('address', data.address);
                formData.append('email', data.email);
                formData.append('phone_number', data.phone);
                formData.append('password', data.password);
                formData.append('confirmPassword', data.confirmPassword);
                formData.append('status', data.status);
                formData.append('work_type', data.workType);
                formData.append('salary_type', data.salaryType);
                formData.append('hourly_rate', data.salaryTypeValue == 'hourly' ? data.rate : null);
                formData.append('yearly_salary', data.salaryTypeValue == 'yearly' ? data.rate : null);
                formData.append('monthly_salary', data.salaryTypeValue == 'monthly' ? data.rate : null);
                formData.append('roleId', data.roleId);
                formData.append('image', data.file.file);

                //contract data
                formData.append('start_date', data.startDate);
                formData.append('end_date', data.endDate);
                formData.append('details', data.details);

                return {
                    url: `/api/v1/store/employees/contracts/add-employee-contract?employeeEmail=${data.email}`,
                    method: 'POST',
                    body: formData
                };
            },
            invalidatesTags: ['Employees']

        }),
        editEmployeeRole:builder.mutation({
            query: (data) => ({
                url: `${EMPLOYEE_URL}/edit-role?employeeId=${data.employeeId}`,
                method: 'PUT',
                body:{
                    roleId:data.roleId
                }
            }),
            invalidatesTags: ['Employees']
        }),
        editEmployeeJobDetails:builder.mutation({
            query: (data) => ({
                url: `${EMPLOYEE_URL}/edit-job-details?employeeId=${data.employeeId}`,
                method: 'PUT',
                body:{
                    action:data.action,
                    employmentDate:data.employmentDate,
                    expectedEndDate:data.expectedEndDate
                }
            }),
            invalidatesTags: ['Employees']
        }),
    })
})

export const { 
    useReadEmployeeQuery,
    useReadEmployeesQuery,
    useAddEmployeeMutation, 
    useRemoveEmployeeMutation, 
    useEditEmployeeMutation,
    useAddEmployeeWithContractMutation,
    useEditEmployeeRoleMutation,
    useEditEmployeeJobDetailsMutation
} = employeeApiSlice
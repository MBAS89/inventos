import { apiSlice } from "../apiSlice";

const ROLES_URL = '/api/v1/store/employees/roles'


export const rolesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        readRoles: builder.query({
            query: (data) => ({
                url: `${ROLES_URL}/read`,
                method: 'GET',
            }),
            transformResponse: (response) => {
                return response;
            },
            providesTags: ['Roles']
        }),
        addRole: builder.mutation({
            query: (data) => ({
                url: `${ROLES_URL}/add`,
                method: 'POST',
                body:{
                    roleName:data.roleName
                }
            }),
            invalidatesTags: ['Roles']
        }),
        removeRole: builder.mutation({
            query: (data) => ({
                url: `${ROLES_URL}/remove/${data.roleId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Roles']
        }),
        editRole: builder.mutation({
            query: (data) => ({
                url: `${ROLES_URL}/edit/${data.roleId}`,
                method: 'PUT',
                body:{
                    roleName:data.roleName
                }
            }),
            invalidatesTags: ['Roles']
        }),
        addRolePermission: builder.mutation({
            query: (data) => ({
                url: `/api/v1/store/employees/role-permissions/add`,
                method: 'POST',
                body:{
                    roleId:data.roleId,
                    permissionId:data.permissionId
                }
            }),
            invalidatesTags: ['Roles']
        }),
        removeRolePermission: builder.mutation({
            query: (data) => ({
                url: `/api/v1/store/employees/role-permissions/remove/${data.rolePermissionId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Roles']
        })
    })
})

export const { useReadRolesQuery, useAddRoleMutation, useRemoveRoleMutation, useEditRoleMutation, useAddRolePermissionMutation, useRemoveRolePermissionMutation } = rolesApiSlice
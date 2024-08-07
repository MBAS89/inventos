import React from 'react'
import { useRemoveCustomerMutation } from '../features/api/customers/customersApiSlice'
import { toast } from 'react-toastify'

//icons
import { BiLoaderCircle } from "react-icons/bi";
import { useRemoveCategoryMutation } from '../features/api/inventory/categoryApiSlice';
import { useRemoveBrandMutation } from '../features/api/inventory/brandApiSlice';
import { useRemoveProductMutation } from '../features/api/inventory/productApiSlice';
import { useRemoveEmployeeMutation } from '../features/api/employees/employeeApiSlice';
import { useRemoveInvoiceMutation } from '../features/api/sales/innerInvoicesApiSlice';
import { useRemoveSupplierMutation } from '../features/api/suppliers/suppliersApiSlice';
import { useRemoveOuterInvoiceMutation } from '../features/api/sales/outerInvoicesApiSlice';
import { useRemoveCouponMutation } from '../features/api/inventory/couponsApiSlice';
import { useRemoveExpenseMutation } from '../features/api/expenses/expensesApiSlice';
import { useRemoveStoreMutation } from '../features/api/stores/storeApiSlice';
import { useDeleteOwnerMutation } from '../features/api/owners/ownerApiSlice';
import { useDeleteAdminMutation } from '../features/api/admin/adminApiSlice';
import { useDeletePlanMutation } from '../features/api/plnas/plansApiSlice';

export const DeletePopup = ({ setOpenDeletePopup, selected, department, setReset }) => {

    const [removeCustomer, {isLoading, error}] = useRemoveCustomerMutation()
    const [removeCategory, {isLoading:isCategoryLoading}] = useRemoveCategoryMutation() 
    const [removeBrand, {isLoading:isBrandLoading}] = useRemoveBrandMutation() 
    const [removeProduct, {isLoading:isProductLoading}] = useRemoveProductMutation() 
    const [removeEmployee, {isLoading:isEmployeeLoading}] = useRemoveEmployeeMutation() 
    const [removeInvoice, {isLoading:isInvoiceLoading}] = useRemoveInvoiceMutation() 
    const [removeSupplier, {isLoading:isSupplierLoading}] = useRemoveSupplierMutation()
    const [removeOuterInvoice, {isLoading:isOuterInvoiceLoading}] = useRemoveOuterInvoiceMutation()
    const [removeCoupon, {isLoading:isCouponLoading}] = useRemoveCouponMutation()
    const [removeExpense, {isLoading:isExpenseLoading}] = useRemoveExpenseMutation()
    const [removeStore, {isLoading:isStoreLoading}] = useRemoveStoreMutation()
    const [deleteOwner, {isLoading:isOwnerLoading}] = useDeleteOwnerMutation()
    const [deleteAdmin, {isLoading:isAdminLoading}] = useDeleteAdminMutation()
    const [deletePlan, {isLoading:isPlanLoading}] = useDeletePlanMutation()

    const handleDelete = async () => {
        if(department === 'Customers'){
            try {
                
                const res = await removeCustomer(selected).unwrap()
                setReset('')
                setOpenDeletePopup(false)
                toast.success(res.message)    
            } catch (error) {
                toast.error(error.data.error)
            }
        }else if (department === "Categoires"){
            try {
                
                const res = await removeCategory(selected).unwrap()
                setReset('')
                setOpenDeletePopup(false)
                toast.success(res.message)    
            } catch (error) {
                toast.error(error.data.error)
            }
        }else if (department === "Brands"){
            try {
                
                const res = await removeBrand(selected).unwrap()
                setReset('')
                setOpenDeletePopup(false)
                toast.success(res.message)    
            } catch (error) {
                toast.error(error.data.error)
            }
        }else if (department === "Prodcuts"){
            try {
                
                const res = await removeProduct(selected).unwrap()
                setReset('')
                setOpenDeletePopup(false)
                toast.success(res.message)    
            } catch (error) {
                toast.error(error.data.error)
            }
        }else if (department === "Employees"){
            try {
                
                const res = await removeEmployee(selected).unwrap()
                setReset('')
                setOpenDeletePopup(false)
                toast.success(res.message)    
            } catch (error) {
                toast.error(error.data.error)
            }
        }else if(department === "invoices"){
            try {
                
                const res = await removeInvoice(selected).unwrap()
                setReset('')
                setOpenDeletePopup(false)
                toast.success(res.message)    
            } catch (error) {
                toast.error(error.data.error)
            }
        }else if(department === "Suppliers"){
            try {
                
                const res = await removeSupplier(selected).unwrap()
                setReset('')
                setOpenDeletePopup(false)
                toast.success(res.message)    
            } catch (error) {
                toast.error(error.data.error)
            }
        }else if(department === "outer-invoices"){
            try {
                
                const res = await removeOuterInvoice(selected).unwrap()
                setReset('')
                setOpenDeletePopup(false)
                toast.success(res.message)    
            } catch (error) {
                toast.error(error.data.error)
            }
        }else if(department === "Coupons"){
            try {
                
                const res = await removeCoupon(selected).unwrap()
                setReset('')
                setOpenDeletePopup(false)
                toast.success(res.message)    
            } catch (error) {
                toast.error(error.data.error)
            }
        }else if(department === "Expenses"){
            try {
                
                const res = await removeExpense(selected).unwrap()
                setReset('')
                setOpenDeletePopup(false)
                toast.success(res.message)    
            } catch (error) {
                toast.error(error.data.error)
            }
        }else if(department === "Stores"){
            try {
                
                const res = await removeStore(selected).unwrap()
                setReset('')
                setOpenDeletePopup(false)
                toast.success(res.message)    
            } catch (error) {
                toast.error(error.data.error)
            }
        }else if(department === "Owners"){
            try {
                
                const res = await deleteOwner(selected).unwrap()
                setReset('')
                setOpenDeletePopup(false)
                toast.success(res.message)    
            } catch (error) {
                toast.error(error.data.error)
            }
        }else if(department === "Admins"){
            try {
                
                const res = await deleteAdmin(selected).unwrap()
                setReset('')
                setOpenDeletePopup(false)
                toast.success(res.message)    
            } catch (error) {
                toast.error(error.data.error)
            }
        }else if(department === "Plans"){
            try {
                
                const res = await deletePlan(selected).unwrap()
                setReset('')
                setOpenDeletePopup(false)
                toast.success(res.message)    
            } catch (error) {
                toast.error(error.data.error)
            }
        }
    }

    return (
        <div tabindex="0" className='w-full h-full bg-gray-800/75 absolute top-[0] left-0 flex justify-center items-center overflow-hidden'>
            <div className="rounded-lg bg-white p-8 shadow-2xl border-gray-300 border-2 text-center">
                <h2 className="text-lg font-bold">Are you sure you want to do delete it?</h2>
                <p className="mt-2 text-sm text-gray-500">Deleting anything may affect in losing important data</p>
                <div className="mt-4 flex gap-2 justify-center">
                    <button 
                        disabled={isOwnerLoading || isPlanLoading || isAdminLoading || isLoading || isCategoryLoading || isBrandLoading || isProductLoading || isOuterInvoiceLoading || isEmployeeLoading || isInvoiceLoading || isSupplierLoading || isCouponLoading || isExpenseLoading}
                        onClick={handleDelete} 
                        type="button" 
                        className="rounded flex gap-2 hover:bg-red-400 hover:text-white active:bg-red-700 border-red-600 border-2 bg-red-50 px-4 py-2 text-sm font-medium text-red-600"
                    >
                        {isLoading || isPlanLoading || isAdminLoading || isCategoryLoading || isStoreLoading || isBrandLoading || isProductLoading || isOuterInvoiceLoading || isEmployeeLoading || isInvoiceLoading || isSupplierLoading || isCouponLoading || isExpenseLoading || isOwnerLoading && <BiLoaderCircle className='text-[1.4rem] animate-spin'/>} Yes, I'm sure
                    </button>
                    <button onClick={() => setOpenDeletePopup(false)} type="button" className="rounded border-gray-600 hover:bg-gray-400 active:bg-gray-700 hover:text-white border-2 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600">
                        No, go back
                    </button>
                </div>
            </div>
        </div>

    )
}

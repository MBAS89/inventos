import React from 'react'

//icons
import { MdKeyboardArrowRight } from "react-icons/md"
import { useNavigate } from 'react-router-dom'


export const Breadcrumb = ({ from, current, isLoading, width }) => {
    const navigate = useNavigate()

    const handleBack = () => {
        if(from === 'Employees'){
            navigate('/dashboard/employees')
        }else if( from === 'Inner Invoices'){
            navigate('/dashboard/invoices')
        }else if(from === 'Outer Invoices'){
            navigate('/dashboard/invoices/outer-invoices')
        }else if( from === 'Suppliers'){
            navigate('/dashboard/suppliers')
        }else if(from === 'Expenses'){
            navigate('/dashboard/expenses')
        }else if(from === 'Products'){
            navigate('/dashboard/inventory/products')
        }else if(from === 'Owners'){
            navigate('/admin/owners')
        }else if(from === 'Plans'){
            navigate('/admin/plans')
        }
    }

    return (
        <div className={` ${width ? width : 'w-[60%]'} mx-auto pt-20`}>
            <nav aria-label="Breadcrumb" >
                <ol className="flex items-center gap-1 text-sm text-gray-600">
                    <li>
                        <button onClick={handleBack} className="block transition text-2xl font-bold text-[#50B426] hover:text-green-700"> {from} </button>
                    </li>

                    <li>
                        <MdKeyboardArrowRight className='text-[2rem]'/>
                    </li>

                    <li>
                        <div className="block transition text-2xl"> {current} </div>
                    </li>
                </ol>
            </nav>
        </div>
    )
}

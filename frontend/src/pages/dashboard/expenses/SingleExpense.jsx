import React from 'react'
import { useParams } from 'react-router-dom'
import { useReadExpenseQuery } from '../../../features/api/expenses/expensesApiSlice'
import { DashHeader } from '../../../components/DashHeader'
import { Breadcrumb } from '../../../components/Breadcrumb'
import { ExpenseProfileStatus } from '../../../components/expenses/ExpenseProfileStatus'
import { ExpenseDescription } from '../../../components/expenses/ExpenseDescription'

export const SingleExpense = () => {
    const { expenseId } = useParams()
    
    const { data, isLoading } = useReadExpenseQuery({expenseId}, 'readExpense')

    return (
        <div className='bg-slate-200 min-h-[100vh] pb-10'>
            <DashHeader/>
            <div>
                {data ? 
                    <div>
                        <Breadcrumb from="Expenses" current={data.expense.expenses_title} width="w-[80%]"/>
                    </div>
                :
                    <div className='w-[80%] mx-auto pt-20'>
                        <div className='bg-slate-500 animate-pulse h-[32px] w-[400px] rounded-lg'></div>
                    </div> 
                }
                <ExpenseProfileStatus data={data} isLoading={isLoading}/>
                <ExpenseDescription data={data} isLoading={isLoading} />
            </div>
        </div>
    )
}

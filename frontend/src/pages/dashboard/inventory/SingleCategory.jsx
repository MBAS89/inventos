import React from 'react'
import { DashHeader } from '../../../components/DashHeader'
import { CategoryProfile } from '../../../components/inventory/CategoryProfile'

export const SingleCategory = () => {
    return (
        <div className='bg-slate-200 min-h-[calc(100vh-64px)] pb-10'>
        <DashHeader/>
        <div>
            <CategoryProfile/>
        </div>
        </div>
  )
}

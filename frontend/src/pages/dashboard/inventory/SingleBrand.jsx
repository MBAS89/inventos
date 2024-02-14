import React from 'react'
import { DashHeader } from '../../../components/DashHeader'
import { BrandProfile } from '../../../components/inventory/BrandProfile'

export const SingleBrand = () => {
    return (
        <div className='bg-slate-200 min-h-[calc(100vh-64px)] pb-10'>
            <DashHeader/>
            <div>
                <BrandProfile/>
            </div>
        </div>
  )
}

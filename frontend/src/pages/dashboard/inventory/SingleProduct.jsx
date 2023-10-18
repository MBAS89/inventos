import React from 'react'
import { DashHeader } from '../../../components/DashHeader'
import { ProductsProfile } from '../../../components/inventory/ProductsProfile'
import { ProductPriceAndType } from '../../../components/inventory/ProductPriceAndType'
import { ProductSpecificationAndQty } from '../../../components/inventory/ProductSpecificationAndQty'

export const SingleProduct = () => {
    return (
        <div className='bg-slate-200 min-h-[calc(100vh-64px)] pb-10'>
            <DashHeader/>
            <div>
                <ProductsProfile/>
                <ProductPriceAndType/>
                <ProductSpecificationAndQty/>
            </div>
        </div>
  )
}

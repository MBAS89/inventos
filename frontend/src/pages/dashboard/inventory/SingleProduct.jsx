import React from 'react'
import { DashHeader } from '../../../components/DashHeader'
import { ProductsProfile } from '../../../components/inventory/ProductsProfile'
import { ProductPriceAndType } from '../../../components/inventory/ProductPriceAndType'
import { ProductSpecificationAndQty } from '../../../components/inventory/ProductSpecificationAndQty'
import { Breadcrumb } from '../../../components/Breadcrumb'
import { useParams } from 'react-router-dom'
import { useReadProductQuery } from '../../../features/api/inventory/productApiSlice'
import { ProductOldInventories } from '../../../components/inventory/ProductOldInventories'

export const SingleProduct = () => {
    const { productId } = useParams()

    const { data, isLoading } = useReadProductQuery({productId}, 'readProduct')

    return (
        <div className='bg-slate-200 min-h-[calc(100vh-64px)] pb-10'>
            <DashHeader/>
            <div>
                {data ? 
                    <div>
                        <Breadcrumb from="Products" current={data.product.sku} width="w-[80%]"/>
                    </div>
                :
                    <div className='w-[80%] mx-auto pt-20'>
                        <div className='bg-slate-500 animate-pulse h-[32px] w-[400px] rounded-lg'></div>
                    </div> 
                }
                <ProductsProfile data={data} isLoading={isLoading} />
                <ProductPriceAndType data={data} isLoading={isLoading} />
                <ProductSpecificationAndQty data={data} isLoading={isLoading} />
                <ProductOldInventories data={data} isLoading={isLoading} />
            </div>
        </div>
  )
}

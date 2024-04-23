import React, { useState } from 'react'
import { AdminHeader } from '../../../components/admin/AdminHeader';
import { Breadcrumb } from '../../../components/Breadcrumb';
import { OwnerProfile } from '../../../components/admin/owners/OwnerProfile';
import { useParams } from 'react-router-dom'
import { useReadOwnerQuery } from '../../../features/api/owners/ownerApiSlice';
import { OwnerStores } from '../../../components/admin/owners/OwnerStores';

export const OwnerView = () => {
    const { ownerId } = useParams();

    const [currentPage, setCurrentPage] = useState(1)

    const {data, isLoading, isFetching, isError, error } = useReadOwnerQuery({ownerId:ownerId},'readOwner')

    console.log(data)

    return (
        <div className='bg-slate-200 min-h-screen pb-10'>
            <AdminHeader/>
            <div>
                {data ? 
                    <div>
                        <Breadcrumb from="Owners" current={data.owner.first_name} width="w-[80%]"/>
                    </div>
                :
                    <div className='w-[80%] mx-auto pt-20'>
                        <div className='bg-slate-500 animate-pulse h-[32px] w-[400px] rounded-lg'></div>
                    </div> 
                }
                <OwnerProfile data={data} isLoading={isLoading} />
                <OwnerStores data={data?.owner?.stores} isLoading={isLoading}/>
            </div>
        </div>
    )
}

import React from 'react'
import { ProgressBar } from './ProgressBar'

export const ShipmentsStatus = () => {

    let inDeliveryShipments = 45
    let deliveredShipments = 140
    let processingShipments = 35
    let canceledShipments = 30
    let totalShipments = 250


    function calculatePercentage(part, total) {
        if (total === 0) {
            return 0; 
        }
        
        let res = (part / total) * 100
        return res.toString();
    }


    return (
        <div className='bg-white h-[35rem] w-[35%] rounded-2xl drop-shadow-sm p-8 mb-10'>
            <h2 className='font-bold text-[1.6rem]'>Shipments Status</h2>
            <ProgressBar 
                inDeliveryShipments={calculatePercentage(inDeliveryShipments, totalShipments)}
                deliveredShipments={calculatePercentage(deliveredShipments, totalShipments)}
                processingShipments={calculatePercentage(processingShipments, totalShipments)}
                canceledShipments={calculatePercentage(canceledShipments, totalShipments)}
            />
            <div className='mt-10 w-[95%] mx-auto flex-col flex gap-7'>
                <div className='flex items-center justify-between border-b-2 pb-5'>
                    <div className='flex items-center gap-2'>
                        <div className='h-[2.5rem] w-[10px] bg-blue-300 rounded-2xl'></div>
                        <h4 className='font-bold text-[1.2rem]'>In Delivery </h4>
                    </div>
                    <div className='flex gap-36'>
                        <div className='font-bold'>{inDeliveryShipments}</div>
                        <div className='font-bold'>{Math.round(calculatePercentage(inDeliveryShipments, totalShipments))}%</div>
                    </div>
                </div>
                <div className='flex items-center justify-between border-b-2 pb-5'>
                    <div className='flex items-center gap-2'>
                        <div className='h-[2.5rem] w-[10px] bg-green-300 rounded-2xl'></div>
                        <h4 className='font-bold text-[1.2rem]'>Delivered</h4>
                    </div>
                    <div className='flex gap-36'>
                        <div className='font-bold'>{deliveredShipments}</div>
                        <div className='font-bold'>{Math.round(calculatePercentage(deliveredShipments, totalShipments))}%</div>
                    </div>
                </div>
                <div className='flex items-center justify-between border-b-2 pb-5'>
                    <div className='flex items-center gap-2'>
                        <div className='h-[2.5rem] w-[10px] bg-yellow-300 rounded-2xl'></div>
                        <h4 className='font-bold text-[1.2rem]'>Processing </h4>
                    </div>
                    <div className='flex gap-36'>
                        <div className='font-bold'>{processingShipments}</div>
                        <div className='font-bold'>{Math.round(calculatePercentage(processingShipments, totalShipments))}%</div>
                    </div>
                </div>
                <div className='flex items-center justify-between border-b-2 pb-5'>
                    <div className='flex items-center gap-2'>
                        <div className='h-[2.5rem] w-[10px] bg-red-300 rounded-2xl'></div>
                        <h4 className='font-bold text-[1.2rem]'>Canceled </h4>
                    </div>
                    <div className='flex gap-36'>
                        <div className='font-bold'>{canceledShipments}</div>
                        <div className='font-bold'>{Math.round(calculatePercentage(canceledShipments, totalShipments))}%</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

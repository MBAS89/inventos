import React from 'react'

export const ProgressBar = ({ inDeliveryShipments, deliveredShipments, processingShipments, canceledShipments }) => {
    
    return (
        <div className='h-[4rem] bg-slate-200 mt-8 rounded-2xl overflow-hidden flex'>
            <div className={`h-[4rem] bg-blue-300`} style={{ width: `${inDeliveryShipments}%` }}></div>
            <div className={`h-[4rem] bg-green-300`} style={{ width: `${deliveredShipments}%` }}></div>
            <div className={`h-[4rem] bg-yellow-300`} style={{ width: `${processingShipments}%` }}></div>
            <div className={`h-[4rem] bg-red-300`} style={{ width: `${canceledShipments}%` }}></div>
        </div>
    )
}

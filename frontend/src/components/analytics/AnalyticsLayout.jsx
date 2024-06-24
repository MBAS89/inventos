import React from 'react'

//components
import { AnalyticsSideBar } from './AnalyticsSideBar'

export const AnalyticsLayout = ({ children }) => {
    return (
        <div className='flex bg-[#50B426]'>
            <div className='w-[5%]'>
              <AnalyticsSideBar />
            </div>
            <div className='w-[95%] bg-slate-100 min-h-screen'>
                {children}
            </div>
        </div>
    )
}

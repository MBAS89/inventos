import React from 'react'
import { SideBar } from './SideBar'

export const SettingsLayout = ({ children }) => {
  return (
    <div className='flex'>
        <div className='w-[15%]'>
          <SideBar />
        </div>
        <div className='w-[85%] bg-slate-200 min-h-screen'>
            {children}
        </div>
    </div>
  )
}

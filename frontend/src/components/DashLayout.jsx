import React from 'react'
import { DashHeader } from './DashHeader'

export const DashLayout = ({ children }) => {
    return (
        <>
            <DashHeader />
            {children}
        </>
    )
}

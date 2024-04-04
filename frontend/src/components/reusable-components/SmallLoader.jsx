import React from 'react'

export const SmallLoader = ({w, h, color}) => {
    return (
        <div className="flex flex-row gap-2">
            <div className={`w-${w} h-${h} rounded-full bg-${color} animate-bounce [animation-delay:.7s]`}></div>
            <div className={`w-${w} h-${h} rounded-full bg-${color} animate-bounce [animation-delay:.3s]`}></div>
            <div className={`w-${w} h-${h} rounded-full bg-${color} animate-bounce [animation-delay:.7s]`}></div>
        </div>
    )
}

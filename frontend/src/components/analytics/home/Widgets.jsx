import React from 'react'

export const Widgets = ({color, icon, vlaue, change, title}) => {
    return (
        <div className={`w-full rounded-2xl ${color} h-[8rem] p-6 flex gap-10 border-white border-2 border-solid drop-shadow-sm`}>
            <div className='bg-white h-[3rem] w-[3rem] rounded-full flex justify-center items-center mt-4'>
                {icon}
            </div>
            <div className='flex flex-col gap-3'>
                <div>
                    <h2 className='font-bold text-[2rem] flex items-center'>{vlaue} <span className={`bg-white ml-12 w-[4.5rem] h-[1.5rem] flex justify-center items-center text-center rounded-xl text-sm ${change > 0 ? 'text-green-500' : 'text-red-500'}`}>{change > 0 ? '+' : ''}{change}%</span></h2>
                </div>
                <span className='capitalize '>{title}</span>
            </div>
        </div>
    )
}

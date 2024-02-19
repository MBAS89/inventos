import React, { useState } from 'react'
import { AiOutlineCloseCircle } from "react-icons/ai"
import { DropZone } from '../DropZone'

export const AddAndEditEmpolyeesPopup = ({ setOpenPopup }) => {
    const [withContract, setWithContract] = useState(false)

    return (
    <section className="overflow-auto bg-white left-[32%] top-[7%] h-[52rem] w-[45rem] border-gray-300 border-solid border-[1px] absolute rounded-lg shadow-2xl">
        <div className='relative w-full bg-black'>
            <AiOutlineCloseCircle onClick={() => setOpenPopup(false)} className='text-gray-600 rounded-full cursor-pointer bg-white text-[2rem]  hover:scale-105 absolute right-4 top-4'/>
        </div>
        <h2 className='text-[2.5rem] font-bold text-center text-gray-500 capitalize mt-12'>Add Employee</h2>
        <div className='flex items-center w-[70%] mx-auto mt-3 gap-5'>
            <button onClick={() => setWithContract(false)} className={`inline-block ${!withContract ? 'text-white bg-[#50B426]' : 'text-[#50B426] bg-white' } rounded border w-full border-[#50B426] px-12 py-4 text-sm font-medium active:bg-green-500 text-[1.3rem]`}>Without Contract</button>
            <button onClick={() => setWithContract(true)} className={`inline-block ${withContract ? 'text-white bg-[#50B426]' : 'text-[#50B426] bg-white' } rounded border w-full border-[#50B426] px-12 py-4 text-sm font-medium active:bg-green-500 text-[1.3rem]`}>With Contract</button>
        </div>
        <form className='flex flex-col gap-8 w-[70%] mx-auto mt-5 mb-10'>
            <DropZone className="border-[2px] border-dashed py-8 border-[#50B426] cursor-pointer w-[60%] text-center px-2" />
            <label htmlFor="FullName" className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                <input type="text" id="FullName" placeholder="Full Name" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                    Full Name
                </span>
            </label>
            <div className='flex items-center w-full gap-4'>
                <label htmlFor="Email" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                    <input type="text" id="Email" placeholder="Email" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                    <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                        Email
                    </span>
                </label>
                <label htmlFor="Phone" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                    <input type="text" id="Phone" placeholder="Phone" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                    <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                        Phone
                    </span>
                </label>
            </div>
            <div className='flex items-center w-full gap-4'>
                <label htmlFor="password" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                    <input type="text" id="password" name='password' placeholder="password" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                    <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                        Password
                    </span>
                </label>
                <label htmlFor="confirmPassword" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                    <input type="text" id="confirmPassword" name='confirmPassword' placeholder="confirmPassword" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                    <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                        Confirm Password
                    </span>
                </label>
            </div>
            <label htmlFor="Address" className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                <input type="text" id="Address" placeholder="Address" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                    Address
                </span>
            </label>
            <div>
                <label htmlFor="HeadlineAct" className="block text-sm font-medium text-gray-900">
                    Emplpoyee department
                </label>
                <select name="HeadlineAct" id="HeadlineAct" className="mt-1.5 p-4 w-full border border-gray-200 rounded-md text-gray-700 sm:text-sm">
                    <option value="">Please select</option>
                    <option value="JM">John Mayer</option>
                    <option value="SRV">Stevie Ray Vaughn</option>
                    <option value="JH">Jimi Hendrix</option>
                    <option value="BBK">B.B King</option>
                    <option value="AK">Albert King</option>
                    <option value="BG">Buddy Guy</option>
                    <option value="EC">Eric Clapton</option>
                </select>
            </div>
            <div>
                <label htmlFor="HeadlineAct" className="block text-sm font-medium text-gray-900">
                    Emplpoyee work type
                </label>
                <select name="HeadlineAct" id="HeadlineAct" className="mt-1.5 p-4 w-full border border-gray-200 rounded-md text-gray-700 sm:text-sm">
                    <option value="">Please select</option>
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                    <option value="remote">Remote</option>
                    <option value="temporary">Temporary</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="contract-based">Contract Based</option>
                    <option value="not-installed">Not Installed</option>
                </select>
            </div>
            <div>
                <label htmlFor="HeadlineAct" className="block text-sm font-medium text-gray-900">
                    Salary Type
                </label>
                <select name="HeadlineAct" id="HeadlineAct" className="mt-1.5 p-4 w-full border border-gray-200 rounded-md text-gray-700 sm:text-sm">
                    <option value="">Hourly</option>
                    <option value="JM">Monthly</option>
                    <option value="SRV">Yearly</option>
                </select>
            </div>
            <label htmlFor="Salary" className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                <input type="Number" id="Salary" placeholder="Salary" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                    Salary
                </span>
            </label>
            {withContract && (
                <div className='flex flex-col gap-3'>
                    <hr className='w-full h-1 bg-[#50B426]'/>
                    <h4>Contract Info:</h4>
                    <div className='flex items-center w-full gap-4'>
                        <label htmlFor="startDate" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                            <input type="date" id="startDate" name='startDate' placeholder="startDate" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                            <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                                Start Date
                            </span>
                        </label>
                        <label htmlFor="endDate" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                            <input type="date" id="endDate" name='endDate' placeholder="endDate" className="peer h-12 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
                            <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                                End Date
                            </span>
                        </label>
                    </div>
                    <label htmlFor="detailes" className="relative block overflow-hidden w-full rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-[#50B426] focus-within:ring-1 focus-within:ring-[#50B426]">
                        <textarea rows="4" id="detailes" name='detailes' placeholder="detailes" className="peer resize-none  w-full border-none bg-transparent pt-5 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"></textarea>
                        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
                            Contract Detailes
                        </span>
                    </label>
                </div>
            )}
            <button className="inline-block rounded border w-full border-[#50B426] px-12 py-4 text-sm font-medium text-[#50B426] active:bg-green-500 active:text-white text-[1.3rem]">
                {withContract ? 'Add Employee With Contract' : 'Add Employee'}
            </button>
        </form>
    </section>
  )
}
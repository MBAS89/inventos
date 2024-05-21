import React, { useState } from 'react'
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { MdAlternateEmail } from "react-icons/md";

export const AdminLogin = () => {

    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className='flex justify-center items-center bg-slate-200 h-[calc(100vh-64px)]'>
            <div class="md:w-[60%] lg:w-[30%] sm:w-[80%] w-[80%] h-[60%] justify-center relative flex flex-col p-4 rounded-md text-black bg-white">
                <div class="text-2xl font-bold mb-2 text-[#1e0e4b] text-center capitalize">
                    <span class="text-[#54AD31] ml-1 mr-1 uppercase">Inventos</span>
                    Admin Dashboard 
                </div>
                <div class="text-sm font-normal mb-4 text-center text-[#1e0e4b]">
                    Log in to your account
                </div>
                <form class="flex flex-col gap-3 w-[95%] mx-auto">
                    <div class="block relative"> 
                        <label for="email" class="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Email</label>
                        <input type="text" id="email" class="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] block h-11 m-0 p-[11px]" />
                        <MdAlternateEmail className='text-[1.4rem] text-[#54AD31] absolute bottom-3 right-3'/>
                    </div>
                    <div class="block relative"> 
                        <label for="password" class="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Password</label>
                        <input type={showPassword ? 'text' : 'password'} id="password" class="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black block h-11 m-0 p-[11px]" />
                        {!showPassword ? (
                            <IoEyeOutline onClick={() => setShowPassword(true)} className='text-[1.4rem] text-[#54AD31] absolute bottom-3 right-3 cursor-pointer hover:scale-110'/>
                        ) : (
                            <IoEyeOffOutline onClick={() => setShowPassword(false)} className='text-[1.4rem] text-[#54AD31] absolute bottom-3 right-3 cursor-pointer hover:scale-110'/>
                        )}
                    </div>
                    <div>
                        <a class="text-sm text-[#54AD31]" href="#">
                            Forgot your password?
                        </a>
                    </div>
                    <button type="submit" class="bg-[#54AD31] hover:bg-[#54ad31d1] w-full mt-4 m-auto px-6 py-3 rounded text-white text-sm font-normal">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

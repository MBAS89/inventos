import React, { useState, useEffect } from 'react'

//componets
import { LeftSection } from '../../components/auth/LeftSection'
import { ResponsiveSection } from '../../components/auth/ResponsiveSection'
import Input from '../../components/reusable-components/Input'

import { Link, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../../features/api/auth/authApiSlice'
import { authInfoState, setCredentials } from '../../features/slices/authSlice'
import { toast } from 'react-toastify';

export const StoreLogin = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [storeName, setStoreName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [login, {isLoading, error}] = useLoginMutation()

    const { authInfo } = useSelector(authInfoState)

    useEffect(() => {
        if(authInfo){
            navigate('/dashboard')
        }
    },[authInfo, navigate])

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const res = await login({storeName, email, password}).unwrap()
            dispatch(setCredentials({...res}))
            toast.success(res.message)
            navigate('/dashboard')
        } catch (error) {
            toast.error(error.data.error)
        }

    }



    return (
        <section className="bg-white">
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                <LeftSection />
                <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
                    <div className="max-w-xl lg:max-w-3xl">
                        <ResponsiveSection />

                        <form onSubmit={handleLogin} className="mt-8 grid grid-cols-6 gap-6">
                            <Input value={storeName} onChange={(e) => { setStoreName(e.target.value)}} lable="Store Name" id="StoreName" name="store_name" type="text" placeholder="store name" full={true}/>
                            <Input value={email} onChange={(e) => { setEmail(e.target.value)}}  lable="Email" id="Email" name="email" type="email" placeholder="email" full={true} />
                            <Input value={password} onChange={(e) => { setPassword(e.target.value)}}  lable="Password" id="Password" name="password" type="password" placeholder="password" full={true}/>

                            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                <button
                                type='submit'
                                className="inline-block shrink-0 rounded-md border border-[#50B426] bg-[#50B426] px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-[#50B426] focus:outline-none active:bg-[#2db426] active:text-white"
                                >
                                Access Store
                                </button>

                                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                                Don't have an account?
                                <Link to="/auth/register" className="text-[#50B426] underline">Register</Link>.
                                </p>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </section>
  )
}

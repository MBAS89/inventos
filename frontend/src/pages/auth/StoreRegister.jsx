import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

//components
import { LeftSection } from '../../components/auth/LeftSection'
import { ResponsiveSection } from '../../components/auth/ResponsiveSection'

//Reusable Components
import { ReusablePhoneInput } from '../../components/reusable-components/ReusablePhoneInput'
import Input from '../../components/reusable-components/Input'


//redux
import { useCreateMutation } from '../../features/api/stores/storeApiSlice'
import { toast } from 'react-toastify'

export const StoreRegister = () => {
    const navigate = useNavigate()

    const [create, {isLoading, error}] = useCreateMutation()


    const [phoneNumber, setPhoneNumber] = useState('');
    const [storeData, setStoreData] = useState({
        firstName:'',
        lastName:'',
        storeName:'',
        email:'',
        password:'',
        confirmPassword:'',
        phoneNumber:''
    })

    const { firstName, lastName, storeName, email, password, confirmPassword } = storeData

    const onChange = (e) => {
        setStoreData((prevState) => ({
            ...prevState,
            [e.target.name]:e.target.value

        }))

        setStoreData((prevState) => ({
            ...prevState,
            phoneNumber: phoneNumber
        }));

    }


    const handleCreateStore = async (e) => {
        e.preventDefault()

        if(!phoneNumber || !firstName || !lastName || !email || !password || !confirmPassword || !storeName ){
            return toast.error('All fields are required')
        }
    
        if (storeData.password.trim() !== storeData.confirmPassword.trim()) {
            return toast.error('Passwords do not match');
        }

        try {
            const res = await create(storeData).unwrap()
            toast.success(res.message)
            navigate('/auth/login')
            setStoreData({
                firstName:'',
                lastName:'',
                storeName:'',
                email:'',
                password:'',
                confirmPassword:'',
                phoneNumber:''
            })
            setPhoneNumber('')
        } catch (error) {
            toast.error(error.data.error)
        }
    }




    return (
    <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
            <LeftSection />
            <main   className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
                <div className="max-w-xl lg:max-w-3xl">
                    <ResponsiveSection/>
                    <form onSubmit={handleCreateStore} className="mt-8 grid grid-cols-6 gap-6">
                        <Input value={firstName} onChange={onChange} lable="First Name" id="FirstName" name="firstName" type="text" placeholder="your first name" />
                        <Input value={lastName} onChange={onChange} lable="Last Name" id="LastName" name="lastName" type="text" placeholder="your last name" />
                        <Input value={storeName} onChange={onChange} lable="Store Name" id="StoreName" name="storeName" type="text" placeholder="desire store name" />
                        <ReusablePhoneInput phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />
                        <Input value={email} onChange={onChange} lable="Email" id="Email" name="email" type="email" placeholder="your email" full={true} />
                        <Input value={password} onChange={onChange} lable="Password" id="Password" name="password" type="password" placeholder="your password" />
                        <Input value={confirmPassword} onChange={onChange} lable="Confirm Password" id="confirmPassword" name="confirmPassword" type="password" placeholder="confirm password" />

                        <div className="col-span-6">
                            <label htmlFor="MarketingAccept" className="flex gap-4">
                            <input
                                type="checkbox"
                                id="MarketingAccept"
                                name="marketing_accept"
                                className="h-5 w-5 rounded-md border-gray-200 bg-white shadow-sm text-[#50B426] focus:border-1 focus:border-[#50B426] focus:outline-none focus:ring-0"
                            />

                            <span className="text-sm text-gray-700">
                                I want to receive emails about events, product updates and company announcements.
                            </span>
                            </label>
                        </div>


                        <div className="col-span-6">
                            <p className="text-sm text-gray-500">
                            By creating an account, you agree to our
                            <a href="#" className="text-[#50B426] underline"> terms and conditions </a>
                            and
                            <a href="#" className="text-[#50B426] underline">privacy policy</a>.
                            </p>
                        </div>

                        <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                            <button
                                type='submit'
                                className="inline-block shrink-0 rounded-md border border-[#50B426] bg-[#50B426] px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-[#50B426] focus:outline-none focus:ring active:text-[#50B426]"
                            >
                            Create an account
                            </button>

                            <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                            Already have an account?
                            <Link to="/auth/login" className="text-[#50B426] underline font-bold">Log in</Link>.
                            </p>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    </section>
  )
}

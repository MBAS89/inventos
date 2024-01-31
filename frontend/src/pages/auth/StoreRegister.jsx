import React from 'react'
import { LeftSection } from '../../components/auth/LeftSection'
import { ResponsiveSection } from '../../components/auth/ResponsiveSection'
import Input from '../../components/reusable-components/Input'

export const StoreRegister = () => {
    return (
    <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
            <LeftSection />
            <main
            className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
            >
            <div className="max-w-xl lg:max-w-3xl">
                <ResponsiveSection/>
                <form action="#" className="mt-8 grid grid-cols-6 gap-6">
                    <Input lable="First Name" id="FirstName" name="first_name" type="text" placeholder="first name" />
                    <Input lable="Last Name" id="LastName" name="last_name" type="text" placeholder="last name" />
                    <Input lable="Email" id="Email" name="email" type="email" placeholder="email" full={true} />
                    <Input lable="Password" id="Password" name="password" type="password" placeholder="email" />
                    <Input lable="Confirm Password" id="confirmPassword" name="confirm_password" type="password" placeholder="confirm password" />

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
                    <a href="#" className="text-gray-700 underline"> terms and conditions </a>
                    and
                    <a href="#" className="text-gray-700 underline">privacy policy</a>.
                    </p>
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                    <button
                    className="inline-block shrink-0 rounded-md border border-[#50B426] bg-[#50B426] px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-[#50B426] focus:outline-none focus:ring active:text-[#50B426]"
                    >
                    Create an account
                    </button>

                    <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    Already have an account?
                    <a href="#" className="text-gray-700 underline">Log in</a>.
                    </p>
                </div>
                </form>
            </div>
            </main>
        </div>
    </section>
  )
}

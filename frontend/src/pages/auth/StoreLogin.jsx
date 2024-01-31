import React from 'react'
import { LeftSection } from '../../components/auth/LeftSection'
import { ResponsiveSection } from '../../components/auth/ResponsiveSection'
import Input from '../../components/reusable-components/Input'

export const StoreLogin = () => {
    return (
        <section className="bg-white">
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                <LeftSection />
                <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
                    <div className="max-w-xl lg:max-w-3xl">
                        <ResponsiveSection />

                        <form action="#" className="mt-8 grid grid-cols-6 gap-6">
                            <Input lable="Store Name" id="StoreName" name="store_name" type="text" placeholder="store name" full={true}/>
                            <Input lable="Email" id="Email" name="email" type="email" placeholder="email" full={true} />
                            <Input lable="Password" id="Password" name="password" type="password" placeholder="password" full={true}/>

                            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                <button
                                className="inline-block shrink-0 rounded-md border border-[#50B426] bg-[#50B426] px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-[#50B426] focus:outline-none active:bg-[#2db426] active:text-white"
                                >
                                Access Store
                                </button>

                                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                                Don't have an account?
                                <a href="#" className="text-[#50B426] underline">Register</a>.
                                </p>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </section>
  )
}

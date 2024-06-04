import React from 'react'

//SVG
import { cEmailSVG } from '../../SVG/cEmailSVG'
import { confirmEmailSVG } from '../../SVG/confirmemailSVG'
import { nodataSVG } from '../../SVG/nodataSVG'

//icons
import {GiConfirmed} from 'react-icons/gi'
import { BiLoaderCircle } from "react-icons/bi";

export const StoreConfirmedEmail = () => {
    return (
        <div className='h-[50rem] md:h-screen lg:h-[50rem]'>
            {false ? 
                <div className='text-center '>
                <section className="text-center w-3/4 mx-auto h-[250px] md:h-[500px] pt-5 md:pt-20 lg:mt-0">
                    {nodataSVG("fill-[#50B426]")}
                </section>
                <p className='text-lg tracking-wide w-4/5 mx-auto mb-5 font-bold'>We apologize for the inconvenience, but it appears that the link you tried to access has expired. However, we&rsquo;d be happy to send you a new link so you can proceed with your request. Please let us know and we&rsquo;ll promptly send you a fresh link.</p>
                    <button className=" border-2 border-solid border-[#50B426] rounded-xl text-white bg-[#50B426] py-4  w-60 mx-auto capitalize hover:bg-[#7cd656]">Send New Link</button> 
                </div>
            :
            <div>
            {true ?
                <div className='h-screen pt-28 lg:pt-0 xl:pt-10'>
                <section className="text-center w-3/4 mx-auto sm:h-[500px]">
                {confirmEmailSVG("fill-[#50B426]")}
                </section> 
                <div className='text-center flex items-center gap-2 justify-center'>
                    <BiLoaderCircle className='text-[2rem] text-[#50B426] animate-spin'/>
                    <span className='capitalize font-bold'>confirming your store</span>
                </div>
                </div>
            : 
                <div className='h-screen pt-28 lg:pt-5 xl:pt-10'>
                <section className="text-center w-3/4 mx-auto sm:h-[500px]">
                    {cEmailSVG("fill-[#50B426]")}
                </section>
                <p className="text-center flex justify-center items-center align-middle gap-3 sm:mt-2"><span className='text-2xl capitalize tracking-wide'>Store Confirmed</span><GiConfirmed className='text-2xl text-[#50B426]'/></p>
                </div>
            }
            </div>
            }
        </div>
    )
}

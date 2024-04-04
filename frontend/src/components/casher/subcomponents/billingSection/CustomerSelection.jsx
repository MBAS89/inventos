import React, { useState } from 'react'

//Icons
import { BsPeopleFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai"

//Components
import { CustomersPopup } from './CustomersPopup';

export const CustomerSelection = ({pickedCustomer, setPickedCustomer}) => {
    const [showCustomersList, setShowCustomersList] = useState(false)
    
    return (
        <div className='flex justify-between p-5 relative'>
            <h1 className='capitalize font-bold text-lg'>biling section</h1>
            {!pickedCustomer ? (
                <button onClick={()=> setShowCustomersList(true)} className='flex items-center gap-2 text-[#50B426] border-[#50B426] border-solid border-[1px] py-[0.6rem] px-3 text-sm font-medium rounded capitalize hover:bg-[#50B426] hover:text-white'>
                    <BsPeopleFill/>
                    <p>customer</p>
                </button>
            ) : (
                <div className='text-[#50B426] border-[#50B426] py-2 px-3 border-solid border-[1px] flex items-center gap-2'>
                    <div className='flex items-center gap-1'>
                        <div className=' bg-gray-100 rounded-md flex items-center justify-center'>
                            <img width="20" height="20" src={pickedCustomer.image} alt={pickedCustomer.image_id}/>
                        </div>
                        <div>
                            <span className='capitalize'>{pickedCustomer.full_name}</span>
                        </div>
                    </div>
                    <button onClick={() => setPickedCustomer('')} className=' bg-red-500 h-[80%] w-6 flex justify-center items-center text-white'>
                        <AiOutlineClose className='text-[1rem]'/>
                    </button>
                </div>
            )}
            {showCustomersList && 
                <CustomersPopup setShowCustomersList={setShowCustomersList} setPickedCustomer={setPickedCustomer} />
            }
        </div>
    )
}

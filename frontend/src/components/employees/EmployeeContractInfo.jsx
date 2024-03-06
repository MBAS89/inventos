import React, { useState } from 'react'
import { handleSalary } from '../../functions/handleSalary'
import { format, parseISO } from 'date-fns'
import { AiOutlineMail, AiOutlinePhone, AiOutlineCloseCircle } from "react-icons/ai"
import { IoEyeOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import { handleContract } from '../../functions/handleContract';
import { ContractPopUp } from './ContractPopUp';
import { IoIosAddCircleOutline } from "react-icons/io";




export const EmployeeContractInfo = ({ data, isLoading }) => {

    const [openPopUp, setOpenPopUp] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [addMode, setAddMode] = useState(false)
    const [deleteMode, setDeleteMode] = useState(false)
    const [selectedContract, setSelectedContract] = useState('')

    const sortedContracts = data && data.contracts.slice().sort((a, b) => {
        if (a.status === 'Active' && b.status !== 'Active') {
            return -1;
        } else if (a.status !== 'Active' && b.status === 'Active') {
            return 1; 
        } else {
            return 0;
        }
    });

    return (
        <div className={`w-[60%] mx-auto flex gap-5 ${openPopUp ? 'overflow-hidden' : ''}`}>
            <div className='rounded-md border-2 border-gray-200 p-4 bg-white mt-4 w-[59%]'>
                <h2 className='font-bold text-[1.3rem] pl-4 mb-2'>Contracts</h2>
                
                <div className='flex w-[95%] mx-auto flex-col gap-4'>
                    {isLoading ? (
                        <div className='bg-slate-500 animate-pulse h-[75px] w-[100%] rounded-md'></div>
                    ) : (
                        data.contracts.length > 0 ? sortedContracts.map((contract) => (
                            <div className='flex w-full justify-between text-center bg-slate-200 p-4 rounded-md'>
                                <div className='flex flex-col gap-2'>
                                    <h4 className='font-bold'>Start Date</h4>
                                    <span>{format(parseISO(contract.start_date), "dd/MM/yyyy h:mmaaa")}</span>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <h4 className='font-bold'>End Date</h4>
                                    <span>{format(parseISO(contract.end_date), "dd/MM/yyyy h:mmaaa")}</span>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <h4 className='font-bold'>Status</h4>
                                    <span>{handleContract(contract.status)}</span>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <h4 >Actions</h4>
                                    <span className='flex gap-4 items-center'>
                                        <IoEyeOutline onClick={() => {setOpenPopUp(true); setSelectedContract(contract)}} className='text-[1.2rem] cursor-pointer hover:scale-110 text-[#50B426]'/>
                                        <MdDeleteOutline onClick={() => {setOpenPopUp(true); setDeleteMode(true); setSelectedContract(contract)}} className='text-[1.2rem] cursor-pointer hover:scale-110 text-[#ff4343]'/>
                                        <FiEdit2 onClick={() => {setOpenPopUp(true); setEditMode(true); setSelectedContract(contract)}} className='text-[1.2rem] cursor-pointer hover:scale-110 text-[#4736ff]'/>
                                    </span>
                                </div>
                            </div>
                        )): (
                            <div className='text-gray-400 italic text-center mt-5'>No Contracts Found For This Employee</div>
                        )

                    )}
                </div>
                {openPopUp && 
                    <ContractPopUp 
                        employee={data.employee}
                        contract={selectedContract} 
                        editMode={editMode} 
                        setEditMode={setEditMode} 
                        setOpenPopUp={setOpenPopUp} 
                        addMode={addMode} 
                        setAddMode={setAddMode}
                        deleteMode={deleteMode} 
                        setDeleteMode={setDeleteMode}
                    />
                }
            </div>
            <div className='bg-white rounded-md border-2 border-gray-200 p-4 mt-4 w-[39%]'>
                <h2 className='font-bold text-[1.3rem] pl-4 mb-2'>Contract Actions</h2>
                <div className='pl-4'>
                    <button onClick={() => {setAddMode(true); setOpenPopUp(true)}} className='flex items-center gap-2 py-1'>
                        <IoIosAddCircleOutline className="text-[#50B426] text-[1.3rem]" /> <span className='capitalize text-[#50B426]'>Add New Contract</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

import React from 'react'

export const DeletePopup = ({ setOpenDeletePopup }) => {
    return (
        <div className='w-full min-h-screen h-full bg-gray-800/75	 absolute top-[0] left-0 flex justify-center items-center'>
            <div className="rounded-lg bg-white p-8 shadow-2xl border-gray-300 border-2 text-center">
                <h2 className="text-lg font-bold">Are you sure you want to do delete it?</h2>
                <p className="mt-2 text-sm text-gray-500">Deleting anything may affect in losing important data</p>
                <div className="mt-4 flex gap-2 justify-center">
                    <button type="button" className="rounded hover:bg-red-400 hover:text-white active:bg-red-700 border-red-600 border-2 bg-red-50 px-4 py-2 text-sm font-medium text-red-600">
                        Yes, I'm sure
                    </button>
                    <button onClick={() => setOpenDeletePopup(false)} type="button" className="rounded border-gray-600 hover:bg-gray-400 active:bg-gray-700 hover:text-white border-2 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600">
                        No, go back
                    </button>
                </div>
            </div>
        </div>

    )
}

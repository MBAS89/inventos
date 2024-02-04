import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

//icons
import { AiOutlineCloudUpload } from "react-icons/ai"
import { LuView } from "react-icons/lu"
import { MdDeleteForever } from "react-icons/md"

export const DropZone = ({ className, file, setFile }) => {
    const [error, setError] = useState("")
    const [hover, setHovor] = useState(false)


    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        const pickedFile = acceptedFiles[0]

        if(pickedFile) {
            const reader = new FileReader()
            reader.onload = (event) => {
                const imageUrl = event.target.result
                setFile({
                    file:pickedFile,
                    imageUrl: imageUrl
                })
            }
            reader.readAsDataURL(pickedFile)
        }

        if(rejectedFiles?.length){
            console.log(rejectedFiles[0].errors[0].message)
        }

    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept:{
        'image/jpeg': [],
        'image/png': []
        },
        maxSize:1024 * 1000
    })

    return (
        <div className='flex max-h-[12rem]'>
            <div {...getRootProps({
                className: className
            })}>
                <input {...getInputProps()} />
                {
                isDragActive ?
                    <div className='flex justify-center items-center flex-col'>
                        <AiOutlineCloudUpload className='text-[4rem] text-[#50B426]'/>
                        <p className='text-[0.8rem]'>Drag and drop an image file here or click</p>
                        <em className='text-[0.6rem]'>Only png & jpg images supported Max size:1Mb</em>
                    </div>  
                :
                    <div className='flex justify-center items-center flex-col'>
                        <AiOutlineCloudUpload className='text-[4rem] text-[#50B426]'/>
                        <p className='text-[0.8rem]'>Drag and drop an image file here or click</p>
                        <em className='text-[0.6rem]'>Only png & jpg images supported Max size:1Mb</em>
                    </div>

                }
            </div>
            {file ? 
                <div onMouseEnter={() => setHovor(true)} onMouseLeave={() => {setHovor(false)}} className='w-[40%] relative'>
                    <img className='w-full h-full object-cover' src={file.imageUrl} alt='uploaded image'/>
                    {hover && 
                        <div className='w-full h-full bg-black absolute top-0 left-0 opacity-80 cursor-pointer justify-center items-center flex'>
                            <MdDeleteForever onClick={() => {
                                setFile(null)
                                setHovor(false)
                            }} className="text-red-600 text-[4rem] cursor-pointer hover:scale-110" />
                        </div>
                    }
                </div>
                :
                <div className='w-[40%] flex items-center justify-center border-t-[2px] border-r-[2px] border-b-[2px] border-dashed bg-gray-200 py-8 border-[#50B426]'>
                    <LuView className='text-[4rem] opacity-50 text-[#50B426]'/>
                </div>
            }
        </div>

    )
}

import React, { useState } from 'react'

//icons
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"

export const CatergoryAndBrandsSelector = () => {

    const items = [
        {
            link:"https://img.icons8.com/dusk/64/bt21-cooky.png",
            title:"vegetables1",
            qty:14
        },
        {
            link:"https://img.icons8.com/dusk/64/bt21-cooky.png",
            title:"vegetables2",
            qty:14
        },
        {
            link:"https://img.icons8.com/dusk/64/bt21-cooky.png",
            title:"vegetables3",
            qty:14
        },
        {
            link:"https://img.icons8.com/dusk/64/bt21-cooky.png",
            title:"vegetables4",
            qty:14
        },
        {
            link:"https://img.icons8.com/dusk/64/bt21-cooky.png",
            title:"vegetables5",
            qty:14
        },
        {
            link:"https://img.icons8.com/dusk/64/bt21-cooky.png",
            title:"vegetables6",
            qty:14
        },
        {
            link:"https://img.icons8.com/dusk/64/bt21-cooky.png",
            title:"vegetables7",
            qty:14
        },
        {
            link:"https://img.icons8.com/dusk/64/bt21-cooky.png",
            title:"vegetables8",
            qty:14
        },
        {
            link:"https://img.icons8.com/dusk/64/bt21-cooky.png",
            title:"vegetables9",
            qty:14
        },
        {
            link:"https://img.icons8.com/dusk/64/bt21-cooky.png",
            title:"vegetables10",
            qty:14
        },
        {
            link:"https://img.icons8.com/dusk/64/bt21-cooky.png",
            title:"vegetables11",
            qty:14
        },
        {
            link:"https://img.icons8.com/dusk/64/bt21-cooky.png",
            title:"vegetables12",
            qty:14
        },
        {
            link:"https://img.icons8.com/dusk/64/bt21-cooky.png",
            title:"vegetables13",
            qty:14
        },
        {
            link:"https://img.icons8.com/dusk/64/bt21-cooky.png",
            title:"vegetables14",
            qty:14
        },
        {
            link:"https://img.icons8.com/dusk/64/bt21-cooky.png",
            title:"vegetables15",
            qty:14
        },
        {
            link:"https://img.icons8.com/dusk/64/bt21-cooky.png",
            title:"vegetables16",
            qty:14
        },
        {
            link:"https://img.icons8.com/dusk/64/bt21-cooky.png",
            title:"vegetables17",
            qty:14
        },
        {
            link:"https://img.icons8.com/dusk/64/bt21-cooky.png",
            title:"vegetables18",
            qty:14
        },
        {
            link:"https://img.icons8.com/dusk/64/bt21-cooky.png",
            title:"vegetables19",
            qty:14
        },
        {
            link:"https://img.icons8.com/dusk/64/bt21-cooky.png",
            title:"vegetables20",
            qty:14
        },
        {
            link:"https://img.icons8.com/dusk/64/bt21-cooky.png",
            title:"vegetables21",
            qty:14
        },
        {
            link:"https://img.icons8.com/dusk/64/bt21-cooky.png",
            title:"vegetables22",
            qty:14
        },
        {
            link:"https://img.icons8.com/dusk/64/bt21-cooky.png",
            title:"vegetables23",
            qty:14
        },
        {
            link:"https://img.icons8.com/dusk/64/bt21-cooky.png",
            title:"vegetables24",
            qty:14
        },
        {
            link:"https://img.icons8.com/dusk/64/bt21-cooky.png",
            title:"vegetables25",
            qty:14
        },
        {
            link:"https://img.icons8.com/dusk/64/bt21-cooky.png",
            title:"vegetables26",
            qty:14
        }
    ]

    const [translateX, setTranslateX] = useState(0);
    const maxTranslateX = -((items.length / 8) * 78);

    const handlePrevClick = () => {
      if (translateX < 0) {
        setTranslateX(translateX + 90); 
      }
    };
  
    const handleNextClick = () => {
      
        if (translateX > maxTranslateX) {
          setTranslateX(translateX - 90); 
        }
    };


  
    return (
      <div className="p-4">
        <div className='flex items-center justify-between '>
            <nav className="flex gap-4" aria-label="Tabs">
                <button className="shrink-0 rounded-lg bg-[#50B426] p-2 text-sm font-medium text-white" aria-current="page">
                    Categories
                </button>
                <button className="shrink-0 rounded-lg p-2 text-sm font-medium border-[#50B426] border-solid border-[1px] hover:bg-gray-50 text-[#50B426]">
                    Brands
                </button>
            </nav>
            <div className='flex gap-2'>
                <button  onClick={handlePrevClick}  className={`inline-block rounded-full border border-[#50B426] p-1 ${translateX === 0 ? 'text-[#50B426] bg-transparent opacity-50' : 'text-white bg-[#50B426]'}`}>
                    <MdKeyboardArrowLeft className='text-[1.5rem]'/>
                </button>
                <button onClick={handleNextClick}  className={`inline-block rounded-full border border-[#50B426] p-1 bg-[#50B426] ${translateX <= maxTranslateX ? 'bg-transparent opacity-50 text-[#50B426]' : 'text-white bg-[#50B426]'}`}>                
                    <MdKeyboardArrowRight className='text-[1.5rem]'/>
                </button>
            </div>
        </div>
        <div className="overflow-hidden mt-4">
          <div className="flex gap-4 transition-transform ease-in-out duration-300" style={{ transform: `translateX(${translateX}%)` }}>
            {items.map((item, index) => (
                <div key={index} className='bg-white flex items-center justify-center flex-col rounded-lg p-4'>
                    <div className=' bg-gray-100 rounded-full p-2'>
                        <img width="40" height="40" src={item.link} alt="bt21-cooky"/>
                    </div>
                    <h3 className='font-bold capitalize'>{item.title}</h3>
                    <span className='flex justify-center items-center gap-px'>
                        <div className='w-[6px] h-[6px] rounded-full bg-[#50B426]'></div>
                        <p className='text-[11px]'>{item.qty} items</p>
                    </span>
                </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
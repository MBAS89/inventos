import React, { useState } from 'react'

//icons
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"
import { useReadBrandAndCategoryQuery } from '../../../features/api/casher/casherApiSlice';


//swiper
import { useSwiper } from 'swiper/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

export const CatergoryAndBrandsSelector = ({category, setCategory, data, isLoading, setSelectedType, setSelectedId, selectedId, selectedType}) => {


    const SwiperButtons = () => {
        const swiper = useSwiper();

        return (
            <div className='flex gap-2 absolute top-0 right-0 z-50'>
                <button onClick={() => swiper.slidePrev()} className={`inline-block rounded-full text-white p-1 bg-[#50B426] `}>
                    <MdKeyboardArrowLeft className='text-[1.5rem]'/>
                </button>
                <button onClick={() => swiper.slideNext()} className={`inline-block rounded-full text-white p-1 bg-[#50B426]`}>                
                    <MdKeyboardArrowRight className='text-[1.5rem]'/>
                </button>
            </div>
        )

    };
  
    return (
        <div className="p-4">
            <div className="relative">
                <Swiper
                    modules={[Navigation, Pagination, A11y]}
                    spaceBetween={30}
                    slidesPerView="auto"
                    className={`z-10 flex ${isLoading ? 'flex-col' : 'flex-col-reverse'}`}
                >
                <div className='flex items-center justify-between -z-10 mb-4'>
                    <nav className="flex gap-4" aria-label="Tabs">
                        <button onClick={() => {setCategory(true); setSelectedType('category')}} className={`${category ? 'bg-[#50B426] text-white hover:bg-[#83dd5d]' : 'text-[#50B426] hover:bg-slate-200'} shrink-0 rounded-lg p-2 text-sm font-medium border-[#50B426] border-solid border-[1px]`}>
                            Categories
                        </button>
                        <button onClick={() => {setCategory(false); setSelectedType('brand')}} className={`${!category ? 'bg-[#50B426] text-white hover:bg-[#83dd5d]' : 'text-[#50B426] hover:bg-slate-200'} shrink-0 rounded-lg p-2 text-sm font-medium border-[#50B426] border-solid border-[1px]`}>
                            Brands
                        </button>
                    </nav>
                </div>
                <SwiperButtons />
                {!isLoading ? (
                    !category ? data.brands.map((item) => (
                        <SwiperSlide key={item.brand_id} onClick={() => setSelectedId(item.brand_id)} className={`${selectedId === item.brand_id && selectedType === 'brand' ? 'bg-green-200' : 'bg-white'} cursor-pointer w-[12rem] hover:bg-green-200 flex items-center justify-center flex-col rounded-lg p-4`}>
                            <div className=' bg-gray-100 rounded-full p-2'>
                                <img width="40" height="40" src={item.image} alt={item.name}/>
                            </div>
                            <h3 className='font-bold capitalize'>{item.name}</h3>
                            <span className='flex justify-center items-center gap-px'>
                                <div className='w-[6px] h-[6px] rounded-full bg-[#50B426]'></div>
                                <p className='text-[11px]'>{item.totalProducts} items</p>
                            </span>
                        </SwiperSlide>
                    )):data.categories.map((item) => (
                        <SwiperSlide key={item.category_id} onClick={() => setSelectedId(item.category_id)} className={`${selectedId === item.category_id && selectedType === 'category' ? 'bg-green-200' : 'bg-white'} cursor-pointer  w-[12rem] hover:bg-green-200 flex items-center justify-center flex-col rounded-lg p-4`}>
                            <div className=' bg-gray-100 rounded-full p-2'>
                                <img width="40" height="40" src={item.image} alt={item.name}/>
                            </div>
                            <h3 className='font-bold capitalize'>{item.name}</h3>
                            <span className='flex justify-center items-center gap-px'>
                                <div className='w-[6px] h-[6px] rounded-full bg-[#50B426]'></div>
                                <p className='text-[11px]'>{item.totalProducts} items</p>
                            </span>
                        </SwiperSlide>
                    ))
                ):(
                    <div className='flex gap-4'>
                        <div className='bg-slate-500 animate-pulse w-[14rem] h-[8rem] rounded-lg'>
                        </div>
                        <div className='bg-slate-500 animate-pulse w-[14rem] h-[8rem] rounded-lg'>
                        </div>
                        <div className='bg-slate-500 animate-pulse w-[14rem] h-[8rem] rounded-lg'>
                        </div>
                        <div className='bg-slate-500 animate-pulse w-[14rem] h-[8rem] rounded-lg'>
                        </div>
                        <div className='bg-slate-500 animate-pulse w-[14rem] h-[8rem] rounded-lg'>
                        </div>
                        <div className='bg-slate-500 animate-pulse w-[14rem] h-[8rem] rounded-lg'>
                        </div>
                    </div>
                )}
                </Swiper>
            </div>
      </div>
    );
  };
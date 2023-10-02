import React from 'react'
import {BiSearch} from "react-icons/bi";
import {MdKeyboardArrowLeft} from "react-icons/md";
import {MdKeyboardArrowRight} from "react-icons/md";

export const FilteredItems = () => {
  const items = [
    {
      link:"https://img.icons8.com/dusk/64/apple.png",
      title:"popped rice special chocolate...",
      prevPrice:'$123.45',
      price:'$123.45'
    },
    {
      link:"https://img.icons8.com/dusk/64/apple.png",
      title:"popped rice special chocolate...",
      prevPrice:'$123.45',
      price:'$123.45'
    },
    {
      link:"https://img.icons8.com/dusk/64/apple.png",
      title:"popped rice special chocolate...",
      prevPrice:'$123.45',
      price:'$123.45'
    },
    {
      link:"https://img.icons8.com/dusk/64/apple.png",
      title:"popped rice special chocolate...",
      prevPrice:'$123.45',
      price:'$123.45'
    },
    {
      link:"https://img.icons8.com/dusk/64/apple.png",
      title:"popped rice special chocolate...",
      prevPrice:'$123.45',
      price:'$123.45'
    },
    {
      link:"https://img.icons8.com/dusk/64/apple.png",
      title:"popped rice special chocolate...",
      prevPrice:'$123.45',
      price:'$123.45'
    },
    {
      link:"https://img.icons8.com/dusk/64/apple.png",
      title:"popped rice special chocolate...",
      prevPrice:'$123.45',
      price:'$123.45'
    },
    {
      link:"https://img.icons8.com/dusk/64/apple.png",
      title:"popped rice special chocolate...",
      prevPrice:'$123.45',
      price:'$123.45'
    },
    {
      link:"https://img.icons8.com/dusk/64/apple.png",
      title:"popped rice special chocolate...",
      prevPrice:'$123.45',
      price:'$123.45'
    },
    {
      link:"https://img.icons8.com/dusk/64/apple.png",
      title:"popped rice special chocolate...",
      prevPrice:'$123.45',
      price:'$123.45'
    },
    {
      link:"https://img.icons8.com/dusk/64/apple.png",
      title:"popped rice special chocolate...",
      prevPrice:'$123.45',
      price:'$123.45'
    },
    {
      link:"https://img.icons8.com/dusk/64/apple.png",
      title:"popped rice special chocolate...",
      prevPrice:'$123.45',
      price:'$123.45'
    },
    {
      link:"https://img.icons8.com/dusk/64/apple.png",
      title:"popped rice special chocolate...",
      prevPrice:'$123.45',
      price:'$123.45'
    },
    {
      link:"https://img.icons8.com/dusk/64/apple.png",
      title:"popped rice special chocolate...",
      prevPrice:'$123.45',
      price:'$123.45'
    },
    {
      link:"https://img.icons8.com/dusk/64/apple.png",
      title:"popped rice special chocolate...",
      prevPrice:'$123.45',
      price:'$123.45'
    },
    {
      link:"https://img.icons8.com/dusk/64/apple.png",
      title:"popped rice special chocolate...",
      prevPrice:'$123.45',
      price:'$123.45'
   }]
  return (
    <div>
      <div className='flex justify-between p-4'>
        <h1 className='font-bold capitalize text-lg'>new grocery products</h1>
          <div className="relative">
            <input type="text" id="Search" placeholder="Search" className="w-[300px] rounded-md border-gray-200 py-2.5 ps-3 pe-5 shadow-sm sm:text-sm"/>
              <button type="button" className="text-gray-600 hover:text-gray-700 absolute right-1 top-2">
                <BiSearch className='text-[1.5rem]'/>
              </button>
          </div>
      </div>
      <div className='grid grid-cols-4 gap-4 p-4 pt-2'>
      {items.map((item, index) => (
        <div key={index} className='bg-white flex items-center justify-center gap-6 rounded-lg p-5'>
          <img width="54" height="54" src={item.link} alt="apple"/>
          <div>
            <h3 className='font-bold capitalize text-sm'>{item.title}</h3>
            <span className='flex justify-left items-center gap-2'>
              <p className='text-[14px] font-bold line-through text-gray-400'>{item.prevPrice}</p>
              <p className='text-[14px] font-bold text-orange-500'>{item.price}</p>
            </span>
          </div>
        </div>
        ))}
      </div>
      <ol className="flex justify-center gap-1 text-xs font-medium">
        <li>
          <a href="#" className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180">
            <MdKeyboardArrowLeft className=''/>
          </a>
        </li>
        <li>
          <a href="#" className="block h-8 w-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900">1</a>
        </li>
        <li className="block h-8 w-8 rounded border-orange-500 bg-orange-500 text-center leading-8 text-white">2</li>
        <li>
          <a href="#" className="block h-8 w-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900">3</a>
        </li>
        <li>
          <a href="#" className="block h-8 w-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900">4</a>
        </li>
        <li>
          <a href="#" className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180">
            <MdKeyboardArrowRight className=''/>
          </a>
        </li>
      </ol>
    </div>
  )
}

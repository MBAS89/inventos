import React, { useEffect, useState } from 'react'
import {BiSearch} from "react-icons/bi";
import {MdKeyboardArrowLeft} from "react-icons/md";
import {MdKeyboardArrowRight} from "react-icons/md";
import { useReadSingleBrandOrCategoryQuery } from '../../../features/api/casher/casherApiSlice';
import { TablePagination } from '../../TablePagination';

export const FilteredItems = ({ data, selectedId, selectedType, setSelectedId, handleAddItemToItems }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  // Ensure you're using optional chaining to avoid errors when accessing nested properties
  // console.log(data?.brands[0]?.brand_id);

  // Ensure consistent order of Hooks

  const payload = {
    page:currentPage,
    brandId:data ? selectedType === 'brand' ? selectedId ? selectedId : data.brands[0].brand_id  : '': '',
    categoryId:data ? selectedType === 'category' ? selectedId ? selectedId : data.categories[0].category_id  : '': '',
    searchQuery
  }

  const { data:products, isLoading, refetch  } = useReadSingleBrandOrCategoryQuery(payload,{ refetchOnMountOrArgChange: true })

  useEffect(() => {
    if(data){
      if(!selectedId){
        setSelectedId(data.categories[0].category_id)
      }
      refetch();
    }

  }, [data, refetch, selectedType, selectedId]);


  return (
    <div className='w-[100%] min-h-[34.5rem] -mt-5 relative'>
      <div className='flex justify-between p-4'>
        <h1 className='font-bold capitalize text-lg'>new grocery products</h1>
          <div className="relative">
            <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} type="text" id="Search" placeholder="Search" className="w-[300px] rounded-md border-gray-200 py-2.5 ps-3 pe-5 shadow-sm sm:text-sm"/>
              <button type="button" className="text-gray-600 hover:text-gray-700 absolute right-1 top-2">
                <BiSearch className='text-[1.5rem]'/>
              </button>
          </div>
      </div>
      <div className='grid grid-cols-4 gap-4 p-4 pt-2 w-full'>
        {!isLoading ? products && products.products.length > 0 ? products?.products.map((item) => (
          <div key={item.product_id} onClick={() => handleAddItemToItems(item)} className='flex h-[8rem] items-center justify-center gap-6 rounded-lg p-5 bg-white hover:bg-green-200 cursor-pointer'>
            <img width="54" height="54" src={item.image} alt={item.image_id}/>
            <div>
              <h3 className='font-bold capitalize text-sm'>{item.name.length > 40 ? `${item.name.substring(0, 40)}...` : item.name}</h3>
              <div className='mt-3'>
                <div className='flex gap-3'>
                  <span className='font-bold text-gray-400 text-[0.8rem] w-10'>unit:</span>
                  <span className='flex justify-left items-center gap-2'>
                    {item.on_sale && <p className='text-[14px] font-bold line-through text-gray-400'>${item.sale_price_unit}</p>}
                    <p className='text-[14px] font-bold text-[#50B426]'>${item.retail_price_unit}</p>
                  </span>
                </div>

                {item.pieces_per_unit > 1 && 
                  <div className='flex gap-3'>
                    <span className='font-bold text-gray-400 text-[0.8rem] w-10'>piece:</span>
                    <span className='flex justify-left items-center gap-2'>
                      {item.on_sale && <p className='text-[14px] font-bold line-through text-gray-400'>${item.sale_price_piece}</p>}
                      <p className='text-[14px] font-bold text-[#50B426]'>${item.retail_price_piece}</p>
                    </span>
                  </div>
                }
              </div>
            </div>
          </div>
        )):(
          <div className='text-[4rem] w-[73.2rem] text-center italic text-gray-300 mt-36'>No Products Found!</div>
        ):(
          <div className='grid grid-cols-4 gap-4 w-[73.2rem]'>
            <div className='bg-slate-500 animate-pulse rounded-lg h-[8rem]'></div>  
            <div className='bg-slate-500 animate-pulse rounded-lg h-[8rem]'></div>  
            <div className='bg-slate-500 animate-pulse rounded-lg h-[8rem]'></div>  
            <div className='bg-slate-500 animate-pulse rounded-lg h-[8rem]'></div>  
            <div className='bg-slate-500 animate-pulse rounded-lg h-[8rem]'></div>  
            <div className='bg-slate-500 animate-pulse rounded-lg h-[8rem]'></div>  
            <div className='bg-slate-500 animate-pulse rounded-lg h-[8rem]'></div>  
            <div className='bg-slate-500 animate-pulse rounded-lg h-[8rem]'></div>   
            <div className='bg-slate-500 animate-pulse rounded-lg h-[8rem]'></div>  
            <div className='bg-slate-500 animate-pulse rounded-lg h-[8rem]'></div>  
            <div className='bg-slate-500 animate-pulse rounded-lg h-[8rem]'></div>  
            <div className='bg-slate-500 animate-pulse rounded-lg h-[8rem]'></div>              
          </div>
        )}
      </div>
      <div className='absolute bottom-0 w-full'>
        {products && 
          <TablePagination casher={true} currentPage={currentPage} totalPages={products.totalPages} setCurrentPage={setCurrentPage} totalCount={products.totalCount}  count={products.products.length}/>
        }
      </div>
    </div>
  )
}

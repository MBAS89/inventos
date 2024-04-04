import React, { useState } from 'react'
import { CatergoryAndBrandsSelector } from './subcomponents/CatergoryAndBrandsSelector'
import { FilteredItems } from './subcomponents/FilteredItems'
import { useReadBrandAndCategoryQuery } from '../../features/api/casher/casherApiSlice'

export const CategoryAndBrands = ({handleAddItemToItems}) => {

  const {data, isLoading, isSuccess} = useReadBrandAndCategoryQuery()

  const [category, setCategory] = useState(true)
  const [selectedId, setSelectedId] = useState('')
  const [selectedType, setSelectedType] = useState('category')

  return (
    <div className='relative'>
      <CatergoryAndBrandsSelector data={data} isLoading={isLoading} category={category} setCategory={setCategory} setSelectedType={setSelectedType} setSelectedId={setSelectedId} selectedId={selectedId} selectedType={selectedType} />
      <FilteredItems handleAddItemToItems={handleAddItemToItems} category={category} data={data} isLoading={isLoading} selectedType={selectedType} selectedId={selectedId} setSelectedId={setSelectedId} />
    </div>
  )
}

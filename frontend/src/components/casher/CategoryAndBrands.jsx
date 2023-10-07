import React from 'react'
import { CatergoryAndBrandsSelector } from './subcomponents/CatergoryAndBrandsSelector'
import { FilteredItems } from './subcomponents/FilteredItems'

export const CategoryAndBrands = () => {
  return (
    <div>
        <CatergoryAndBrandsSelector/>
        <FilteredItems/>
    </div>
  )
}

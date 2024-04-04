import React, { useState } from 'react'
import { CategoryAndBrands } from '../../components/casher/CategoryAndBrands'
import { BilingSection } from '../../components/casher/subcomponents/billingSection/BilingSection'
import { toast } from 'react-toastify'


export const Casher = () => {

  const [items, setItems] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  const handleAddItemToItems = (product) => {
    if(product.old_inventories.length > 0){
        const oldestInventory = product.old_inventories[0]
        const inventoryExists = items.some(item => item.inventoryId === oldestInventory.id)
        if(!inventoryExists){
            setItems(previousState => [...previousState, {
                product_id:product.product_id,
                qty:product.pieces_per_unit > 1 ? product.qty > product.pieces_per_unit ? product.pieces_per_unit : product.qty : 1,
                image:product.image,
                name:product.name,
                unit:product.unit,
                sku:product.sku,
                cost:product.pieces_per_unit > 1 ? oldestInventory.cost_piece : oldestInventory.cost_unit,
                price:oldestInventory.retail_price_piece ? oldestInventory.retail_price_piece : oldestInventory.retail_price_unit,
                defaultProductQty:oldestInventory.qty,
                unitValue:product.pieces_per_unit > 1 ? product.qty < product.pieces_per_unit ? (product.qty / product.pieces_per_unit) : product.unit_value : product.unit_value,
                piecesPerUnit:product.pieces_per_unit,
                salePriceUnit:oldestInventory.sale_price_unit ? oldestInventory.sale_price_unit : 0,
                salePricePeice:oldestInventory.sale_price_piece ? oldestInventory.sale_price_piece : 0,
                wholeSalePrice: oldestInventory.wholesale_price_piece ? oldestInventory.wholesale_price_piece : oldestInventory.wholesale_price_unit ? oldestInventory.wholesale_price_unit : 0,
                unitOfMeasurement:product.unit_of_measurement,
                unitCategory:product.unit_catergory,
                inventoryId:oldestInventory.id
            }]);
        }
    }else{
        const productExists = items.some(item => item.product_id === product.product_id);
        if (!productExists) {
            if(product.qty > 0){
                setItems(previousState => [...previousState, {
                    product_id:product.product_id,
                    qty:product.pieces_per_unit > 1 ? product.qty > product.pieces_per_unit ? product.pieces_per_unit : product.qty : 1,
                    image:product.image,
                    name:product.name,
                    unit:product.unit,
                    sku:product.sku,
                    cost:product.pieces_per_unit > 1 ? product.cost_piece : product.cost_unit,
                    price:product.retail_price_piece ? product.retail_price_piece : product.retail_price_unit,
                    defaultProductQty:product.qty,
                    unitValue:product.pieces_per_unit > 1 ? product.qty < product.pieces_per_unit ? (product.qty / product.pieces_per_unit) : product.unit_value : product.unit_value,
                    piecesPerUnit:product.pieces_per_unit,
                    salePriceUnit:product.sale_price_unit ? product.sale_price_unit : 0,
                    salePricePeice:product.sale_price_piece ? product.sale_price_piece : 0,
                    wholeSalePrice: product.wholesale_price_piece ? product.wholesale_price_piece : product.wholesale_price_unit ? product.wholesale_price_unit : 0,
                    unitOfMeasurement:product.unit_of_measurement,
                    unitCategory:product.unit_catergory,
                    inventoryId:null
                }]);
            }else{
                return toast.warning('Inventory Depleted')
            }

        }
    }
    setSearchQuery('')
}


  return (
    <div className=' bg-gray-100 h-[calc(100vh-64px)] flex p-8'>
        <div className='w-[65%]'>
            <CategoryAndBrands handleAddItemToItems={handleAddItemToItems}/>
        </div>
        <div className='w-[35%] bg-white'>
          <BilingSection setItems={setItems} searchQuery={searchQuery} setSearchQuery={setSearchQuery} items={items} handleAddItemToItems={handleAddItemToItems}/>
        </div>
    </div>
  )
}

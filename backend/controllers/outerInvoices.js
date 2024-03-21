const sequelize = require('../config/database');
const { Op } = require('sequelize');

//error response middleware
const ErrorResponse = require('../utils/errorResponse')

//reusable funtions 
const {getOrderOptions} = require('../utils/functions/orderOptions')

//modles
const { Invoices, InvoiceItems } = require('../models/sales/invoices');
const Products = require('../models/inventory/products');
const Employees = require('../models/employees/employees');
const Customers = require('../models/cutomers/cutomers');
const CustomerTypes = require('../models/cutomers/customersTypes');
const { OuterInvoices, OuterInvoiceItems } = require('../models/sales/outerInvoices');
const OldInventory = require('../models/inventory/oldInventory');

exports.createOuterInvoice = async (req, res, next) => {

    try {

        const store_id = req.authData.store_id

        //retrieve values from req.body  
        const { total_amount, extra_discount, total_to_pay, total_due, total_paid, 
            status, employeeId, suppliersId, items, inventoryStatus
        } = req.body

        //create invoice
        const invoice = await OuterInvoices.create({
            total_amount,
            extra_discount: extra_discount || 0,
            total_discount,
            total_to_pay,
            total_due,
            total_paid,
            status,
            employeeId:employeeId || null,
            suppliersId:suppliersId || null,
            store_id
        });


        // Add items to the invoice one by one
        for (const item of items) {
            await OuterInvoiceItems.create({
                product_id:item.product_id,
                qty: item.qty,
                invoiceId:invoice.id
            });

            // Check If Price Changes 
            const product = await Products.findOne({
                where: { product_id: item.product_id }
            })

            if (product) {
                if(product.cost_unit !== item.costUnit || product.cost_piece !== item.costPiece){
                    //price change we will create an old inventory with all the old
                    if(inventoryStatus === 'sell-on-old-price'){ //just sell old inventoy on old price 
                        const OldInventory = await OldInventory.create({
                            status:inventoryStatus,
                            cost_unit:product.cost_unit,
                            retail_price_unit:product.retail_price_unit,
                            wholesale_price_unit:product.wholesale_price_unit,
                            cost_piece:product.cost_piece,
                            retail_price_piece:product.retail_price_piece,
                            wholesale_price_piece:product.wholesale_price_piece,
                            qty:product.qty,
                            sale_price_unit:product.sale_price_unit,
                            sale_price_piece:product.sale_price_piece,
                            on_sale:product.on_sale,
                            store_id,
                        })


                        await Products.update(
                            { 
                                qty: item.qty,
                            },
                            { where: { product_id: item.product_id }}
                        );
                    }else{
                        const OldInventory = await OldInventory.create({
                            status:inventoryStatus,
                            cost_unit: inventoryStatus === 'sell-this-on-old-price' ? product.cost_unit : item.costUnit,
                            retail_price_unit: inventoryStatus === 'sell-this-on-old-price' ? product.retail_price_unit : item.retailPriceUnit,
                            wholesale_price_unit:inventoryStatus === 'sell-this-on-old-price' ? product.wholesale_price_unit : item.wholeSalePriceUnit,
                            cost_piece:inventoryStatus === 'sell-this-on-old-price' ? product.cost_piece : item.costPiece,
                            retail_price_piece: inventoryStatus === 'sell-this-on-old-price' ? product.retail_price_piece : item.retailPricePiece,
                            wholesale_price_piece: inventoryStatus === 'sell-this-on-old-price' ? product.wholesale_price_piece : item.wholeSalePricePiece,
                            qty:product.qty,
                            sale_price_unit:inventoryStatus === 'sell-this-on-old-price' ? product.sale_price_unit:item.salePriceUnit,
                            sale_price_piece:inventoryStatus === 'sell-this-on-old-price' ? product.sale_price_piece:item.salePriceUnit,
                            on_sale:inventoryStatus === 'sell-this-on-old-price' ? product.on_sale:item.salePriceUnit ? true : false,
                            store_id,
                        })


                        await Products.update(
                            { 
                                qty: item.qty,
                                cost_unit:item.costUnit,
                                retail_price_unit:item.retailPriceUnit,
                                wholesale_price_unit:item.wholeSalePriceUnit,
                                cost_piece:item.costPiece,
                                retail_price_piece:item.retailPricePiece,
                                wholesale_price_piece:item.wholeSalePricePiece,
                                sale_price_unit:item.salePriceUnit,
                                sale_price_piece:item.salePricePeice
                            },
                            { where: { product_id: item.product_id }}
                        );
                    }

                }else{
                    //price did not change add new qty to inventory
                    if(product.qty > item.qty){
                        const updatedQty = product.qty + item.qty;
                        await Products.update(
                            { qty: updatedQty },
                            { where: { product_id: item.product_id }}
                        );
                    }else{
                        return next(new ErrorResponse(`Not enough qty in the inventory.`, 406));
                    }
                }

            } else {
                return next(new ErrorResponse(`Product with ID ${item.product_id} not found.`, 404));
            }
        }

        //return response of the req
        res.status(201).json({
            status:"success",
            message:"Invoice Created",
            results:1,
            data: {
                invoice
            }
        })


    } catch (error) {
        //if there is an error send it to the error middleware to be output in a good way 
        next(error)
    }
}

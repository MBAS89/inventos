const Products = require("../../models/inventory/products");

// Function to generate a unique SKU
const generateUniqueSKU = async (storeId) => {
    let isUnique = false;
    let newSKU;
  
    while (!isUnique) {
      // Generate a random SKU (You can adjust the length and format as needed)
      newSKU = generateRandomSKU();
  
      // Check if the generated SKU already exists in the database
      const existingProduct = await Products.findOne({ where: { sku: newSKU, store_id:storeId } });
  
      // If no product with the generated SKU exists, mark it as unique
      if (!existingProduct) {
        isUnique = true;
      }
    }
  
    return newSKU;
  };
  
  // Function to generate a random SKU (example implementation)
  const generateRandomSKU = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const length = 8;
    let sku = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      sku += characters[randomIndex];
    }
  
    return sku;
  };
  
  module.exports = {
    generateUniqueSKU
  };
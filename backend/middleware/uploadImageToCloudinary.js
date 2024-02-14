const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

//Cloudinary Credentials retrieved from environment variables file
cloudinary.config({
    cloud_name: process.env.CLOULDNAME,
    api_key: process.env.APIKEY,
    api_secret: process.env.APISECRET
});



// Set up Cloudinary storage using package "multer-storage-cloudinary"
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: (req, file) => {
            //pick where you want the image to be stored in cloudinary site 
            return `stores/${req.authData.store_name ? req.authData.store_name : req.body.storeName}/${req.body.folderName}`;
        },
        format: async (req, file) => {
            //pick the supported file format 
            const allowedFormats = ['png', 'jpeg'];
    
            // Ensure the file format is allowed; if not, use 'png' as the default
            const selectedFormat = allowedFormats.includes(file.format) ? file.format : 'png';
    
            return selectedFormat;
        },
    },
});

//contectd the storage to multer package 
const uploadMiddleware = multer({ storage: storage }).single('image');

//export the middleware 
module.exports = uploadMiddleware;
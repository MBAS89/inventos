//cloudinary package
const cloudinary = require('cloudinary').v2;

//a package used for extract the puplic id from cloudinary url 
const { extractPublicId } = require('cloudinary-build-url')


//Cloudinary Credentials retrieved from environment variables file
cloudinary.config({
    cloud_name: process.env.CLOULDNAME,
    api_key: process.env.APIKEY,
    api_secret: process.env.APISECRET
});
  

// Function to delete an image from Cloudinary
const deleteImage = async (publicId) => {
    try {
        //this end a request to Cloudinary with the puplic id of the image and delete it 
        const result = await cloudinary.uploader.destroy(publicId);

        //return the result of it is success or failed
        return result;
    } catch (error) {
        throw error;
    }
};

// Function to extract Public Id for an image from Cloudinary
function cloudinaryExtractPublicId(cloudinaryURL) {
    try {
        /*
            this take the url and extract the public id using the extractPublicId function from cloudinary-build-url package

            example: 

            const publicId = extractPublicId(https://res.cloudinary.com/dagzd3ntq/image/upload/e6rq9bdbbsio9e8xgvon.png)

            return publicId; this will return e6rq9bdbbsio9e8xgvon
            
        */
        const publicId = extractPublicId(cloudinaryURL)
        return publicId;
    } catch (error) {
        throw error;
    }
}
  
//export the modules to be used anywhere
module.exports = { cloudinaryExtractPublicId, deleteImage };
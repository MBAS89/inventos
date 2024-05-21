//error response middleware
const ErrorResponse = require("../../utils/errorResponse");

//jwt 
const jwt = require('jsonwebtoken');

//models
const Admins = require("../../models/sotres/admins");

//node cache package
const NodeCache = require('node-cache');

const cache = new NodeCache()

const AuthAdmin = async (req, res, next) => {
    try {
        //check if this token has been here before by checking the cache
        const cachedToken = req.cookies.admin ? cache.get(req.cookies.admin) : false

        if(cachedToken){
            req.authData =  cachedToken.payload
            return next()
        }

        //if no cached Token we will verify the token and see if it has everything and cached it
        const token = req.cookies.admin

        if(!token){
            return next(new ErrorResponse("Unauthorized Access: Invalid Token", 401)); 
        }

        // The time of living of this cahe in memory 
        const TTL_SECONDS = 3600; //1hour in seconds

        //verify token and set all token value in decoded variable this will hold the key jwt the payload the data and the expiration
        const decoded = jwt.verify(token, process.env.JWT_ADMIN_SECRT)

        req.authData =  decoded.payload

        //im doing a double check here for safty this i can 
        //just say if decoded.payload.role === 'admin' and let in but im adding extra layer of scurity
        //just to make sure info is right. You can just say if decoded.payload.role === 'admin' and it will work fine

        const admin = await Admins.findOne({
            where:{
                id:decoded.payload.id
            }
        })

        //if admin info is there let him pass
        if(admin){
            // Set data in cache with TTL and department information and pass value
            cache.set(req.cookies.admin, { payload:decoded.payload }, TTL_SECONDS);
            next()
        }else{
            return next(new ErrorResponse("Unauthorized Access", 401));  
        }

    } catch (error) {
        return next(new ErrorResponse("Unauthorized Access", 401));  
    }
}

module.exports = AuthAdmin;
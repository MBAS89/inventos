//reusable funtion for action types
const { actionType } = require("../../utils/functions/actionType");

//error response middleware
const ErrorResponse = require("../../utils/errorResponse");

//jwt 
const jwt = require('jsonwebtoken');

//modles
const Employees = require("../../models/employees/employees");
const Roles = require("../../models/employees/roles");
const Permissions = require("../../models/employees/permission");
const Departments = require("../../models/employees/department");
const RolePermissions = require("../../models/employees/rolePermission");
const Owners = require("../../models/sotres/owners");

//node cache package
const NodeCache = require('node-cache')
const cache = new NodeCache()

/* 
    Auth Middlewawre This middleware will protect the routes of all the app and also based on the
    employee role and permissons that he have in this role. When employe or owner login the system
    will set JWT token in the req.cookie this cookie will be sent with each request when a route is
    requested the route will go through this AUTH middleware this AUTH middleware will extract the 
    token from the cookies with the help of cookieParser() middleware based on it's name in my case
    the name is jwt after this will verify it with the built in funtion in jwt package then decoded it
    after this we will check if this request made by the owner of this store by fetching him by the id
    that have been decoded in the token if he is an owner will we cache this token in node cahe this 
    will make our system faster becasue we won't have to quey to db everytime and the cahe live for
    1 hour we can change this by anything we want if the request is not made by an owner then we will
    check if he is an employee by the id that have been decoded into token and if we find an employee
    with this id no we will check the required department permissions all department have add and edit 
    and remove and read permissions now we will check what this permissions employee have by his role 
    permissions and if his role permission has the same required department permission we will make 
    him pass the AUTH of course this needs querying to db every time that why i set a cache system on 
    that will cache his token after passing and next time we won't have to query from db everytime
    this will make the sytem faster the cached token also have the department name so it won't let him
    pass all the department  
*/ 

/** SYSTEM TEST 
 * FIRST REQUEST TIME : 78 - 50 ms
 * AFTER CACHED TOKEN
 * SECOND REQUEST TIME : 18 - 5 ms
**/
const Auth = async (req, res, next) => {
    try {
        //which departemnt is this 
        const department = 'casher'

        //check if this token has been here before by checking the cache
        const cachedToken = cache.get(req.cookies.jwt)
        if(cachedToken){
            //If this token has been here before i want to check if it pass or failed in verfiy before
            if(cachedToken.pass && cachedToken.department === department){
                //access accepted
                return next()
            }else{
                return next(new ErrorResponse("You are not authorized to perform this action", 401)); 
            }
        }

        //if no cached Token we will verify the token and see if it has everything and cached it

        // Determine the action type dynamically based on the request method.
        const action = actionType(req.method);

        const token = req.cookies.jwt

        // The time of living of this cahe in memory 
        const TTL_SECONDS = 3600; //1hour in seconds

        if(token){
            try {
                //verify token and set all token value in decoded variable this will hold the key jwt the payload the data and the expiration
                const decoded = jwt.verify(token, process.env.JWT_SECRT)

                //im doing a double check here for safty this i can 
                //just say if decoded.payload.role === 'owner' and let in but im adding extra layer of scurity
                //just to make sure info is right you can just say if decoded.payload.role === 'owner' and it will work fine

                const owner = await Owners.findOne({
                    where: {
                        id: decoded.payload.id,
                        store_id:decoded.payload.store_id
                    }
                })

                //if he is an owner that mean he have all the permissions
                if(owner){
                    // Set data in cache with TTL and department information and pass value
                    cache.set(req.cookies.jwt, { pass: true, department: department }, TTL_SECONDS);
                    next()
                }else{
                    //if he is not an owner we will check if he is an employee
                    const employees = await Employees.findOne({
                        where: { id: decoded.payload.id },
                        attributes: ['id'],
                        include: [{
                            model: Roles,
                            attributes: ['id', 'name', 'store_id'],
                        }]
                    })
            
                     
                    // Fetch required permissions for this department
                    const requiredPermissions = await Permissions.findAll({
                        attributes: ['id', 'name'],
                        where: {name: action},
                        include: [{
                          model: Departments,
                          attributes: ['id', 'name'],
                          where: { name: department }
                        }]
                    })
            
                    //get all the Permissions that this employee role has
                    const employeePermissions = await RolePermissions.findOne({
                        where: { roleId: employees.role.id, permissionId: requiredPermissions.map(p => p.id) },
                    })
            
                    //if we did not find the required Permission in his role Permissions we will throw error 
                    if(!employeePermissions){
                        // Set data in cache with TTL and department information and pass value
                        cache.set(req.cookies.jwt, { pass: false, department: department }, TTL_SECONDS);
                        return next(new ErrorResponse("You are not authorized to perform this action", 401)); 
                    }

                    //if he has the required Permissions in his role we will cache the token to not keep checking every time 
                    // Set data in cache with TTL and department information and pass value
                    cache.set(req.cookies.jwt, { pass: true, department: department }, TTL_SECONDS);
                    
                    //pass
                    next()
                }

            } catch (error) {
                return next(new ErrorResponse("Unauthorized Access: Invalid Token", 401)); 
            }
        }else{
            return next(new ErrorResponse("Unauthorized Access: No Token", 401)); 
        }
    } catch (error) {
        console.log(error)
        return next(new ErrorResponse("Unauthorized Access", 401)); 
    }

};

module.exports = Auth;


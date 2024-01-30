/** 
    THIS IS A FUNTION THAT TAKES REQUEST METHOD AS A PARAMETER AND RETURN THE ACTION TYPE
    FOREXAMPLE IF REQUEST METHOD IS GET THIS MEAN THE ACTION TYPE IS READ AND EDIT FOR PUT
    AND REMOVE FOR DELETE AND ADD FOR POST 
**/
function actionType( reqMethod ) {
    const actions = {
        'GET': 'read',
        'POST': 'add',
        'PUT': 'edit',
        'PATCH': 'edit',
        'DELETE': 'remove'
    };
    
    return actions[reqMethod] || null;
}

//export the modules to be used anywhere
module.exports = { actionType };
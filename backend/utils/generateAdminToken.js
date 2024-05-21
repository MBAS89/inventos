const jwt = require('jsonwebtoken')

const generateAdminToken = ( res, payload ) => {
    const token = jwt.sign({ payload }, process.env.JWT_ADMIN_SECRT,{
        expiresIn:'1d'
    })

    res.cookie('admin', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 1 * 24 * 60 * 60 * 1000
    })
}

module.exports = { generateAdminToken };
const jwt = require('jsonwebtoken')

const generateToken = ( res, payload ) => {
    const token = jwt.sign({ payload }, process.env.JWT_SECRT,{
        expiresIn:'1d'
    })

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 1 * 24 * 60 * 60 * 1000
    })
}

module.exports = { generateToken };
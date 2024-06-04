const crypto = require('crypto')
const jwt = require("jsonwebtoken");
const Stores = require('../models/sotres/stores');


async function generateVerificationToken() {
    let token;

    // set the token to expire in 24 hours
    const expiresIn = "24h";

    // keep generating tokens until we find a unique one
    do {
        token = crypto.randomBytes(32).toString("hex");
    } while (await Stores.findOne({ where: { verification_token: token } }))
    // generate a JWT token with the verification token as payload and expiration time
    const jwtToken = jwt.sign({ verificationToken: token }, process.env.JWT_SECRT, { expiresIn });

    return jwtToken;
}

//export the modules to be used anywhere
module.exports = { generateVerificationToken };

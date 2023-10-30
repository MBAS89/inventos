const { Pool } = require("pg");

//retrive my credentials from my environment variables file
//and create a new pool to connect my app to postgres database
const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};
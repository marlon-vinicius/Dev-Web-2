const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool ({
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE
})

module.exports = {
    pool
}

// CREATE TABLE users (
// 	    id SERIAL PRIMARY KEY,
//   	nome VARCHAR(100),
//   	email VARCHAR(50),
// 	    senha VARCHAR(20)
// );
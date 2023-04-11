require('dotenv').config()

const { Pool } = require('pg')

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}

const pool = new Pool(dbConfig)

async function deleteUser(email) {
    await pool.query('DELETE FROM users WHERE email = $1', [email])
}

async function insertUser(user) {
    const sql = 'INSERT INTO users (name, email, password, is_shaver) VALUES ($1, $2, $3, $4) returning id'
    const data = [user.name, user.email, user.password, user.is_shaver]

    const result = await pool.query(sql, data)
    const { id } = result.rows[0]

    return id
}

async function findToken(email) {
    const sql = 'select B.token from ' + 
        'users A INNER JOIN user_tokens B ' +
        'ON A.id = B.user_id where ' + 
        'A.email = $1 ' +
        'ORDER BY B.created_at DESC LIMIT 1'
    
    const result = await pool.query(sql, [email])

    console.log(result.rows[0])

    return result.rows[0]
}

module.exports = {
    deleteUser,
    insertUser,
    findToken
}
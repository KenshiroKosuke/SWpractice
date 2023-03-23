import mysql from "mysql";

export var connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1119902012636',
    database: 'vacCenter'
})

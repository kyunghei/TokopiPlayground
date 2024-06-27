// ./database/db-connector.js

// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'root',
    password: 'HoneyDew1!',
    database: 'tokopiplayground'
})

pool.getConnection(function (err, connection) {
    if (err) {
        console.error("Error connecting to the database:", err);
    } else {
        console.log("Connected to the database");
        connection.release();
    }
});

// Export it for use in our applicaiton
module.exports.pool = pool;
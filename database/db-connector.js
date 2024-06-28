// ./database/db-connector.js

// Get an instance of mysql we can use in the app
var mysql = require('mysql');
var pool;

if (process.env.JAWSDB_URL) {
    pool = mysql.createPool(process.env.JAWSDB_URL);
} else {
    pool = mysql.createPool({
        connectionLimit: 10,
        host: 'o3iyl77734b9n3tg.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'wcwstp88a9o42t5d',
        password: 'uxinnhyzo38cfw4k',
        database: 'hpsojqb7a6ul0h32'
    });
}


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
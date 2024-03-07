// App.js

/*
    SETUP
*/

// handlebars


//express
var express = require('express');   // We are using the express library for the web server
var app = express();            // We need to instantiate an express object to interact with the server in our code
PORT = 6224;                 // Set a port number at the top so it's easy to change in the future

// configure express to handle JSON and Form Data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'));

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({ extname: ".hbs" }));  // Create an instance of the handlebars to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.
// Database
var db = require('./database/db-connector')



/*
    ROUTES
*/

// app.js

app.get('/', function (req, res) {
    let query1 = "SELECT * FROM Pets;";               // Define our query
    let query2 = "SELECT * FROM Parents;";
    db.pool.query(query1, function (error, rows, fields) {    // Execute the query
        let pets = rows;

        db.pool.query(query2, function (error, rows, fields) {    // Execute the query
            let parents = rows;
            return res.render('index', { data: pets, parents_data: parents });                  // Render the index.hbs file, and also send the renderer
        });
    });                                                      // an object where 'data' is equal to the 'rows' we  
}
);                                                         // received back from the query

app.get('/parents', function (req, res) {
    let query2 = "SELECT * FROM Parents;";               // Define our query

    db.pool.query(query2, function (error, rows, fields) {    // Execute the query
        let parents_rows = rows;
        res.render('parents', { parents_data: parents_rows });                  // Render the index.hbs file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' we
}
);                                                         // received back from the query

app.post('/add-pet-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    // let parent_id = parseInt(data.parent_id);
    // if (isNaN(parent_id))
    // {
    //     parent_id = 'NULL'
    // }

    // Create the query and run it on the database
    query1 = `INSERT INTO Pets (pet_name, parent_id, breed) VALUES ('${data.pet_name}', '${data.parent_id}', '${data.breed}')`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Pets;`;
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});

app.post('/add-parent-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let parents_data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Parents (parent_name, parent_number, parent_email) VALUES ('${parents_data.parent_name}', '${parents_data.parent_number}', '${parents_data.parent_email}')`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Parents;`;
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    parents_rows = rows;
                    res.send(parents_rows);
                }
            })
        }
    })
});


app.delete('/delete-pet-ajax', function (req, res, next) {
    let data = req.body;
    let petID = parseInt(data.pet_id);
    let deletePet = `DELETE FROM Pets WHERE pet_id = ?`;

    // Run the 1st query
    db.pool.query(deletePet, [petID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
        else {
            res.sendStatus(204);
        }

    })
});

app.delete('/delete-parent-ajax', function (req, res, next) {
    let data = req.body;
    let parentID = parseInt(data.parent_id);
    let deleteParent = `DELETE FROM Parents WHERE parent_id = ?`;

    // Run the 1st query
    db.pool.query(deleteParent, [parentID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
        else {
            res.sendStatus(204);
        }

    })
});


app.put('/put-pet-ajax', function (req, res, next) {
    let data = req.body;

    let pet_id = parseInt(data.pet_id);
    let parent_id = parseInt(data.parent_id);
    let breed = data.breed;

    let queryUpdateParentId = `UPDATE Pets SET parent_id = ? WHERE Pets.pet_id = ?`;
    let queryUpdateBreed = `UPDATE Pets SET breed = ? WHERE Pets.pet_id = ?`;
    let selectPet = `SELECT * FROM Pets WHERE pet_id = ?`

    // Run the 1st query
    db.pool.query(queryUpdateParentId, [parent_id, pet_id], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        // If there was no error, we run our second query and return that data so we can use it to update the people's
        // table on the front-end
        else {
            // Run the second query
            db.pool.query(queryUpdateBreed, [breed, pet_id], function (error, rows, fields) {
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }

                // If there was no error, we run our second query and return that data so we can use it to update the people's
                // table on the front-end
                else {
                    // Run the second query
                    db.pool.query(selectPet, [pet_id], function (error, rows, fields) {

                        if (error) {
                            console.log(error);
                            res.sendStatus(400);
                        } else {
                            res.send(rows);
                        }
                    })
                }
            })
        }
    })
});


app.put('/put-parent-ajax', function (req, res, next) {
    let data = req.body;

    let parent_id = parseInt(data.parent_id);
    let parent_number = parseInt(data.parent_number);
    let parent_email = data.parent_email;

    let queryUpdateParentNumber = `UPDATE Parents SET parent_number = ? WHERE Parents.parent_id = ?`;
    let queryUpdateParentEmail = `UPDATE Parents SET parent_email = ? WHERE Parents.parent_id = ?`;
    let selectParent = `SELECT * FROM Parents WHERE parent_id = ?`

    // Run the 1st query
    db.pool.query(queryUpdateParentNumber, [parent_number, parent_id], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        // If there was no error, we run our second query and return that data so we can use it to update the people's
        // table on the front-end
        else {
            // Run the second query
            db.pool.query(queryUpdateParentEmail, [parent_email, parent_id], function (error, rows, fields) {
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }

                // If there was no error, we run our second query and return that data so we can use it to update the people's
                // table on the front-end
                else {
                    // Run the second query
                    db.pool.query(selectParent, [parent_id], function (error, rows, fields) {

                        if (error) {
                            console.log(error);
                            res.sendStatus(400);
                        } else {
                            res.send(rows);
                        }
                    })
                }
            })
        }
    })
});

//with handlebar
app.get('/', function (req, res) {
    res.render('index');                    // Note the call to render() and not send(). Using render() ensures the templating engine
});                                         // will process this file, before sending the finished HTML to the client.


/*
    LISTENER
*/
app.listen(PORT, function () {            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
// App.js

/*
    SETUP
*/

// handlebars


//express
var express = require('express');   // We are using the express library for the web server
var app = express();            // We need to instantiate an express object to interact with the server in our code
PORT = 6225;                 // Set a port number at the top so it's easy to change in the future

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

app.get('/invoices', function (req, res) {
    let query1 = "SELECT * FROM Invoices;";               // Define our query
    let query2 = "SELECT * FROM Parents;";
    db.pool.query(query1, function (error, rows, fields) {    // Execute the query
        let invoices = rows;

        db.pool.query(query2, function (error, rows, fields) {    // Execute the query
            let parents = rows;
            return res.render('invoices', { invoices_data: invoices, parents_data: parents });                  // Render the index.hbs file, and also send the renderer
        });
    });                                                      // an object where 'data' is equal to the 'rows' we  
}
);

app.get('/pet_invoices', function (req, res) {
    let query1 = "SELECT * FROM Pet_Invoices;";               // Define our query
    let query2 = "SELECT * FROM Pets;";
    let query3 = "SELECT * FROM Invoices";
    db.pool.query(query1, function (error, rows, fields) {    // Execute the query
        let pet_invoices = rows;

        db.pool.query(query2, function (error, rows, fields) {    // Execute the query
            let pets = rows;

            db.pool.query(query3, function (error, rows, fields) {
                let invoices = rows;
                return res.render('pet_invoices', { pet_invoices_data: pet_invoices, pets_data: pets, invoices_data: invoices });                  // Render the index.hbs file, and also send the renderer

            })
        });
    });                                                      // an object where 'data' is equal to the 'rows' we  
}
);

app.get('/visits', function (req, res) {
    let query1 = "SELECT * FROM Visits;";               // Define our query
    let query2 = "SELECT * FROM Pets;";
    db.pool.query(query1, function (error, rows, fields) {    // Execute the query
        let visits = rows;

        db.pool.query(query2, function (error, rows, fields) {    // Execute the query
            let pets = rows;
            return res.render('visits', {visits_data: visits, pets_data: pets });                  // Render the index.hbs file, and also send the renderer
        });
    });                                                      // an object where 'data' is equal to the 'rows' we  
}
);   

app.get('/services', function (req, res) {
    let query1 = "SELECT * FROM Services;";               // Define our query

    db.pool.query(query1, function (error, rows, fields) {    // Execute the query
        let services_rows = rows;
        res.render('services', { services_data: services_rows });                  // Render the index.hbs file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' we
}
); 

app.get('/services_during_visit', function (req, res) {
    let query1 = "SELECT * FROM Services_During_Visit;";               // Define our query
    let query2 = "SELECT * FROM Visits";
    let query3 = "SELECT * FROM Services;";

    db.pool.query(query1, function (error, rows, fields) {    // Execute the query
        let services_during_visit = rows;

        db.pool.query(query2, function (error, rows, fields) {    // Execute the query
            let visits = rows;

            db.pool.query(query3, function (error, rows, fields) {
                let services = rows;
                return res.render('services_during_visit', { services_during_visit_data: services_during_visit, services_data: services, visits_data: visits });                  // Render the index.hbs file, and also send the renderer

            })
        });
    });                                                      // an object where 'data' is equal to the 'rows' we  
}
);

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

app.post('/add-invoice-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let invoices_data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Invoices (parent_id, invoice_date, invoice_total) VALUES ('${invoices_data.parent_id}', '${invoices_data.invoice_date}', '${invoices_data.invoice_total}')`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Invoices;`;
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    invoices_rows = rows;
                    res.send(invoices_rows);
                }
            })
        }
    })
});

app.post('/add-pet-invoice-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let pet_invoices_data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Pet_Invoices (pet_id, invoice_id) VALUES ('${pet_invoices_data.pet_id}', '${pet_invoices_data.invoice_id}')`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Pet_Invoices;`;
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    pet_invoices_rows = rows;
                    res.send(pet_invoices_rows);
                }
            })
        }
    })
});

app.post('/add-visit-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let visits_data = req.body;


    // Create the query and run it on the database
    query1 = `INSERT INTO Visits (pet_id, visit_date, visit_cost) VALUES ('${visits_data.pet_id}', '${visits_data.visit_date}', '${visits_data.visit_cost}')`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Visits;`;
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

app.post('/add-service-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let services_data = req.body;


    // Create the query and run it on the database
    query1 = `INSERT INTO Services (service_name, service_cost, service_description) VALUES ('${services_data.service_name}', '${services_data.service_cost}', '${services_data.service_description}')`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Services;`;
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

app.post('/add-services-during-visit-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let services_during_visit_data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Services_During_Visit (visit_id, service_id) VALUES ('${services_during_visit_data.visit_id}', '${services_during_visit_data.service_id}')`;
    db.pool.query(query1, function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Services_During_Visit;`;
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

app.delete('/delete-pet-invoice-ajax', function (req, res, next) {
    let data = req.body;
    let petInvoiceID = parseInt(data.pet_invoice_id);
    let deletePetInvoice = `DELETE FROM Pet_Invoices WHERE pet_invoice_id = ?`;

    // Run the 1st query
    db.pool.query(deletePetInvoice, [petInvoiceID], function (error, rows, fields) {
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

app.delete('/delete-visit-ajax', function (req, res, next) {
    let data = req.body;
    let visitID = parseInt(data.visit_id);
    let deleteVisit = `DELETE FROM Visits WHERE visit_id = ?`;

    // Run the 1st query
    db.pool.query(deleteVisit, [visitID], function (error, rows, fields) {
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

app.delete('/delete-service-ajax', function (req, res, next) {
    let data = req.body;
    let serviceID = parseInt(data.service_id);
    let deleteService = `DELETE FROM Services WHERE service_id = ?`;

    // Run the 1st query
    db.pool.query(deleteService, [serviceID], function (error, rows, fields) {
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

app.delete('/delete-service-during-visit-ajax', function (req, res, next) {
    let data = req.body;
    let serviceDuringVisitID = parseInt(data.service_during_visit_id);
    let deleteServiceDuringVisit = `DELETE FROM Services_During_Visit WHERE service_during_visit_id = ?`;

    // Run the 1st query
    db.pool.query(deleteServiceDuringVisit, [serviceDuringVisitID], function (error, rows, fields) {
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
    let pet_name = data.pet_name;
    let parent_id = parseInt(data.parent_id);
    let breed = data.breed;

    let queryUpdatePetName = `UPDATE Pets SET pet_name = ? WHERE Pets.pet_id = ?`;
    let queryUpdateParentId = `UPDATE Pets SET parent_id = ? WHERE Pets.pet_id = ?`;
    let queryUpdateBreed = `UPDATE Pets SET breed = ? WHERE Pets.pet_id = ?`;
    let selectPet = `SELECT * FROM Pets WHERE pet_id = ?`

    // Run the 1st query
    db.pool.query(queryUpdatePetName, [pet_name, pet_id], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
        else {
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
        }
    })


});


app.put('/put-parent-ajax', function (req, res, next) {
    let data = req.body;

    let parent_id = parseInt(data.parent_id);
    let parent_name = data.parent_name;
    let parent_number = data.parent_number;
    let parent_email = data.parent_email;

    let queryUpdateParentName = `UPDATE Parents SET parent_name = ? WHERE Parents.parent_id = ?`;
    let queryUpdateParentNumber = `UPDATE Parents SET parent_number = ? WHERE Parents.parent_id = ?`;
    let queryUpdateParentEmail = `UPDATE Parents SET parent_email = ? WHERE Parents.parent_id = ?`;
    let selectParent = `SELECT * FROM Parents WHERE parent_id = ?`

    // Run the 1st query
    db.pool.query(queryUpdateParentName, [parent_name, parent_id], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStauts(400);
        }
        else {
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
        }
    })

});

app.put('/put-invoice-ajax', function (req, res, next) {
    let data = req.body;

    let invoice_id = parseInt(data.invoice_id);
    let parent_id = parseInt(data.parent_id);
    let invoice_date = data.invoice_date;
    let invoice_total = parseInt(data.invoice_total);

    let queryUpdateParentId = `UPDATE Invoices SET parent_id = ? WHERE Invoices.invoice_id = ?`;
    let queryUpdateInvoiceDate = `UPDATE Invoices SET invoice_date = ? WHERE Invoices.invoice_id = ?`;
    let queryUpdateInvoiceTotal = `UPDATE Invoices SET invoice_total = ? WHERE Invoices.invoice_id = ?`;
    let selectInvoice = `SELECT * FROM Invoices WHERE invoice_id = ?`

    // Run the 1st query
    db.pool.query(queryUpdateParentId, [parent_id, invoice_id], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        // If there was no error, we run our second query and return that data so we can use it to update the people's
        // table on the front-end
        else {
            // Run the second query
            db.pool.query(queryUpdateInvoiceDate, [invoice_date, invoice_id], function (error, rows, fields) {
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }

                // If there was no error, we run our second query and return that data so we can use it to update the people's
                // table on the front-end
                else {
                    // Run the second query
                    db.pool.query(queryUpdateInvoiceTotal, [invoice_total, invoice_id], function (error, rows, fields) {

                        if (error) {
                            console.log(error);
                            res.sendStatus(400);
                        } else {
                            db.pool.query(selectInvoice, [invoice_id], function (error, rows, fields) {

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
        }
    })
});

app.put('/put-pet-invoice-form-ajax', function (req, res, next) {
    let data = req.body;

    let pet_invoice_id = parseInt(data.pet_invoice_id);
    let pet_id = parseInt(data.pet_id);
    let invoice_id = parseInt(data.invoice_id);

    let queryUpdatePetId = `UPDATE Pet_Invoices SET pet_id = ? WHERE Pet_Invoices.pet_invoice_id= ?`;
    let queryUpdateInvoiceId = `UPDATE Pet_Invoices SET invoice_id = ? WHERE Pet_Invoices.pet_invoice_id = ?`;
    let selectPetInvoices = `SELECT * FROM Pet_Invoices WHERE pet_invoice_id = ?`

    // Run the 1st query
    db.pool.query(queryUpdatePetId, [pet_id, pet_invoice_id], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
        else {
            db.pool.query(queryUpdateInvoiceId, [invoice_id, pet_invoice_id], function (error, rows, fields) {
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }

                // If there was no error, we run our second query and return that data so we can use it to update the people's
                // table on the front-end
                else {
                    db.pool.query(selectPetInvoices, [pet_invoice_id], function (error, rows, fields) {

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

app.put('/put-visit-ajax', function (req, res, next) {
    let data = req.body;

    let visit_id = parseInt(data.visit_id);
    let pet_id = parseInt(data.pet_id);
    let visit_date = data.visit_date;
    let visit_cost = parseInt(data.visit_cost);


    let queryUpdatePetId = `UPDATE Visits SET pet_id = ? WHERE Visits.visit_id = ?`;
    let queryUpdateVisitDate = `UPDATE Visits SET visit_date = ? WHERE Visits.visit_id = ?`;
    let queryUpdateVisitCost = `UPDATE Visits SET visit_cost = ? WHERE Visits.visit_id = ?`;
    let selectVisit = `SELECT * FROM Visits WHERE visit_id = ?`

    // Run the 1st query
    db.pool.query(queryUpdatePetId, [pet_id, visit_id], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
        else {
            db.pool.query(queryUpdateVisitDate, [visit_date, visit_id], function (error, rows, fields) {
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }

                // If there was no error, we run our second query and return that data so we can use it to update the people's
                // table on the front-end
                else {
                    // Run the second query
                    db.pool.query(queryUpdateVisitCost, [visit_cost, visit_id], function (error, rows, fields) {
                        if (error) {

                            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                            console.log(error);
                            res.sendStatus(400);
                        }

                        // If there was no error, we run our second query and return that data so we can use it to update the people's
                        // table on the front-end
                        else {
                            // Run the second query
                            db.pool.query(selectVisit, [visit_id], function (error, rows, fields) {

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
        }
    })


});

app.put('/put-service-ajax', function (req, res, next) {
    let data = req.body;

    let service_id = parseInt(data.service_id);
    let service_name = data.service_name;
    let service_cost = parseInt(data.service_cost);
    let service_description = data.service_description;


    let queryUpdateServiceName = `UPDATE Services SET service_name = ? WHERE Services.service_id = ?`;
    let queryUpdateServiceCost = `UPDATE Services SET service_cost = ? WHERE Services.service_id = ?`;
    let queryUpdateServiceDescription = `UPDATE Services SET service_description = ? WHERE Services.service_id = ?`;
    let selectService = `SELECT * FROM Services WHERE service_id = ?`

    // Run the 1st query
    db.pool.query(queryUpdateServiceName, [service_name, service_id], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
        else {
            db.pool.query(queryUpdateServiceCost, [service_cost, service_id], function (error, rows, fields) {
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }

                // If there was no error, we run our second query and return that data so we can use it to update the people's
                // table on the front-end
                else {
                    // Run the second query
                    db.pool.query(queryUpdateServiceDescription, [service_description, service_id], function (error, rows, fields) {
                        if (error) {

                            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                            console.log(error);
                            res.sendStatus(400);
                        }

                        // If there was no error, we run our second query and return that data so we can use it to update the people's
                        // table on the front-end
                        else {
                            // Run the second query
                            db.pool.query(selectService, [service_id], function (error, rows, fields) {

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
        }
    })

});

app.put('/put-service-during-visit-form-ajax', function (req, res, next) {
    let data = req.body;

    let service_during_visit_id = parseInt(data.service_during_visit_id);
    let visit_id = parseInt(data.visit_id);
    let service_id = parseInt(data.service_id);




    let queryUpdateVisitId = `UPDATE Services_During_Visit SET visit_id = ? WHERE Services_During_Visit.service_during_visit_id= ?`;
    let queryUpdateServiceId = `UPDATE Services_During_Visit SET service_id = ? WHERE Services_During_Visit.service_during_visit_id = ?`;
    let selectServiceDuringVisit = `SELECT * FROM Services_During_Visit WHERE service_during_visit_id = ?`

    // Run the 1st query
    db.pool.query(queryUpdateVisitId, [visit_id, service_during_visit_id], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
        else {
            db.pool.query(queryUpdateServiceId, [service_id, service_during_visit_id], function (error, rows, fields) {
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }

                // If there was no error, we run our second query and return that data so we can use it to update the people's
                // table on the front-end
                else {
                    db.pool.query(selectServiceDuringVisit, [service_during_visit_id], function (error, rows, fields) {

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
// Citation for the following function:
// Date: 02/29/2024
// Based on: CS 340 starter code
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app


/*
    SET UP
*/

//initialize express using PORT 6225
var express = require('express');
var app = express();
PORT = 6227;

// configure express to handle JSON and Form Data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'));

//initialize express-handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');
app.engine('.hbs', engine({ extname: ".hbs" }));
app.set('view engine', '.hbs');

//initialize database
var db = require('./database/db-connector')


//formats mySQL date to YYYY-MM-DD format
const Handlebars = require('handlebars');
Handlebars.registerHelper('formatDate', function (currentDate) {
    return currentDate.toISOString().slice(0, 10);
})

/*
    ROUTES
*/

// using express, create 7 different routes that represent our 7 tables: pets, parents, invoices, pet_invoices, services_during_visit, services, and visits.

//creates route to execute queries to receive all data from Pets and Parents and send data received from queries to index hbs
app.get('/', function (req, res) {
    // Get all Pets and respective parent name by using inner join
    let query1 = "SELECT Pets.pet_id, Pets.pet_name, Pets.parent_id, Parents.parent_name, Pets.breed FROM Pets INNER JOIN Parents ON Pets.parent_id = Parents.parent_id;";
    let query2 = "SELECT * FROM Parents;";
    db.pool.query(query1, function (error, rows, fields) {
        let pets = rows;

        db.pool.query(query2, function (error, rows, fields) {
            let parents = rows;
            return res.render('index', { data: pets, parents_data: parents });
        });
    });
}
);

//creates route to execute queries to receive all data from Parents and send data received from queries to parents hbs
app.get('/parents', function (req, res) {
    let query2 = "SELECT * FROM Parents;";

    db.pool.query(query2, function (error, rows, fields) {
        let parents_rows = rows;
        res.render('parents', { parents_data: parents_rows });
    })
}
);

//creates route to execute queries to receive all data from Invoices and Parents and send data received from queries to invoices hbs
app.get('/invoices', function (req, res) {
    // Get all invoices and respective parent name by using inner join
    let query1 = "SELECT Invoices.invoice_id, Invoices.parent_id, Parents.parent_name, Invoices.invoice_date, Invoices.invoice_total FROM Invoices INNER JOIN Parents ON Parents.parent_id = Invoices.parent_id;";
    let query2 = "SELECT * FROM Parents;";
    db.pool.query(query1, function (error, rows, fields) {
        let invoices = rows;

        db.pool.query(query2, function (error, rows, fields) {
            let parents = rows;
            return res.render('invoices', { invoices_data: invoices, parents_data: parents });
        });
    });
}
);

//creates route to execute queries to receive all data from Pets, Pet_Invoices, Invoices and send data received from queries to pet_invoices hbs
app.get('/pet_invoices', function (req, res) {
    // Get all Pet invoices and respective pet name & parent name by using inner join
    let query1 = `SELECT Pet_Invoices.pet_invoice_id, Pet_Invoices.pet_id, Pet_Invoices.invoice_id, Pets.pet_name, Invoices.invoice_date, Invoices.invoice_total, Parents.parent_name
    FROM Pet_Invoices
    INNER JOIN Pets ON Pets.pet_id = Pet_Invoices.pet_id
    INNER JOIN Invoices ON Invoices.invoice_id = Pet_Invoices.invoice_id
    INNER JOIN Parents ON Parents.parent_id = Invoices.parent_id;`;
    let query2 = "SELECT * FROM Pets;";
    let query3 = "SELECT Invoices.invoice_id, Parents.parent_name, Invoices.invoice_date, Invoices.invoice_total FROM Invoices INNER JOIN Parents ON Parents.parent_id = Invoices.parent_id;";
    db.pool.query(query1, function (error, rows, fields) {
        let pet_invoices = rows;

        db.pool.query(query2, function (error, rows, fields) {
            let pets = rows;

            db.pool.query(query3, function (error, rows, fields) {
                let invoices = rows;
                return res.render('pet_invoices', { pet_invoices_data: pet_invoices, pets_data: pets, invoices_data: invoices });

            })
        });
    });
}
);

//creates route to execute queries to receive all data from Pets and Visits and send data received from queries to visits hbs
app.get('/visits', function (req, res) {
    // Get all visits and respective pet name by using inner join
    let query1 = "SELECT Visits.visit_id, Visits.pet_id, Pets.pet_name, Visits.visit_date, Visits.visit_cost FROM Visits INNER JOIN Pets ON Visits.pet_id = Pets.pet_id;";
    let query2 = "SELECT * FROM Pets;";
    db.pool.query(query1, function (error, rows, fields) {
        let visits = rows;

        db.pool.query(query2, function (error, rows, fields) {
            let pets = rows;
            return res.render('visits', { visits_data: visits, pets_data: pets });

        });
    });
}
);

//creates route to execute queries to receive all data from Services and send data received from queries to services hbs
app.get('/services', function (req, res) {
    // Get all services
    let query1 = "SELECT * FROM Services;";

    db.pool.query(query1, function (error, rows, fields) {
        let services_rows = rows;
        res.render('services', { services_data: services_rows });
    })
}
);

//creates route to execute queries to receive all data from Visits, Services, Services_During_Visit and send data received from queries to services_during_visit hbs
app.get('/services_during_visit', function (req, res) {
    // Get all services during visits as well as respective service name, visit date, and pet name by using inner join
    let query1 = `SELECT Services_During_Visit.service_during_visit_id, Services_During_Visit.visit_id, Services_During_Visit.service_id, Services.service_name, Visits.visit_date, Pets.pet_name
    FROM Services_During_Visit 
    INNER JOIN Services ON Services.service_id = Services_During_Visit.service_id 
    INNER JOIN Visits ON Visits.visit_id = Services_During_Visit.visit_id
    INNER JOIN Pets ON Pets.pet_id = Visits.pet_id;`;
    let query2 = "SELECT Visits.visit_id, Pets.pet_name, Visits.visit_date, Visits.visit_cost FROM Visits INNER JOIN Pets ON Visits.pet_id = Pets.pet_id;";
    let query3 = "SELECT * FROM Services;";

    db.pool.query(query1, function (error, rows, fields) {
        let services_during_visit = rows;

        db.pool.query(query2, function (error, rows, fields) {
            let visits = rows;

            db.pool.query(query3, function (error, rows, fields) {
                let services = rows;
                return res.render('services_during_visit', { services_during_visit_data: services_during_visit, services_data: services, visits_data: visits });

            })
        });
    });
}
);


/*
    ROUTES TO ADD ROW
*/

// Creates route to create and run INSERT INTO Pets query on the database
// If there is no error, then create and run SELECT query to send back updated data
//If there is an error, send error status with error message
app.post('/add-pet-ajax', function (req, res) {
    // save and parse data 
    let data = req.body;

    query1 = `INSERT INTO Pets (pet_name, parent_id, breed) VALUES ('${data.pet_name}', '${data.parent_id}', '${data.breed}')`;
    db.pool.query(query1, function (error, rows, fields) {

        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else {
            query2 = `SELECT Pets.pet_id, Pets.pet_name, Pets.pet_id, Parents.parent_name, Pets.breed
            FROM Pets INNER JOIN Parents ON Pets.parent_id = Parents.parent_id;`;
            db.pool.query(query2, function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    res.send(rows);
                }
            })
        }
    })
});

// Creates route to create and run INSERT INTO Parents query on the database
// If there is no error, then create and run SELECT ALL query to send back updated data
//If there is an error, send error status with error message
app.post('/add-parent-ajax', function (req, res) {
    // save and parse data 
    let parents_data = req.body;

    query1 = `INSERT INTO Parents (parent_name, parent_number, parent_email) VALUES ('${parents_data.parent_name}', '${parents_data.parent_number}', '${parents_data.parent_email}')`;
    db.pool.query(query1, function (error, rows, fields) {

        if (error) {

            console.log(error)
            res.sendStatus(400);
        }
        else {

            query2 = `SELECT * FROM Parents;`;
            db.pool.query(query2, function (error, rows, fields) {

                if (error) {

                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    parents_rows = rows;
                    res.send(parents_rows);
                }
            })
        }
    })
});

// Creates route to create and run INSERT INTO Invoices query on the database
// If there is no error, then create and run SELECT query to send back updated data
//If there is an error, send error status with error message
app.post('/add-invoice-ajax', function (req, res) {
    // save and parse data 
    let invoices_data = req.body;

    query1 = `INSERT INTO Invoices (parent_id, invoice_date, invoice_total) VALUES ('${invoices_data.parent_id}', '${invoices_data.invoice_date}', '${invoices_data.invoice_total}')`;
    db.pool.query(query1, function (error, rows, fields) {

        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else {

            query2 = `SELECT Invoices.invoice_id, Invoices.parent_id, Parents.parent_name, Invoices.invoice_date, Invoices.invoice_total FROM Invoices INNER JOIN Parents ON Parents.parent_id = Invoices.parent_id;`;
            db.pool.query(query2, function (error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    invoices_rows = rows;
                    res.send(invoices_rows);
                }
            })
        }
    })
});

// Creates route to create and run INSERT INTO Pet_Invoices query on the database
// If there is no error, then create and run SELECT ALL query to send back updated data
//If there is an error, send error status with error message
app.post('/add-pet-invoice-ajax', function (req, res) {
    // save and parse data 
    let pet_invoices_data = req.body;

    query1 = `INSERT INTO Pet_Invoices (pet_id, invoice_id) VALUES ('${pet_invoices_data.pet_id}', '${pet_invoices_data.invoice_id}')`;
    db.pool.query(query1, function (error, rows, fields) {

        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else {

            query2 = `SELECT Pet_Invoices.pet_invoice_id, Pet_Invoices.pet_id, Pet_Invoices.invoice_id, Pets.pet_name, Invoices.invoice_date, Invoices.invoice_total, Parents.parent_name
            FROM Pet_Invoices
            INNER JOIN Pets ON Pets.pet_id = Pet_Invoices.pet_id
            INNER JOIN Invoices ON Invoices.invoice_id = Pet_Invoices.invoice_id
            INNER JOIN Parents ON Parents.parent_id = Invoices.parent_id;`;
            db.pool.query(query2, function (error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    pet_invoices_rows = rows;
                    res.send(pet_invoices_rows);
                }
            })
        }
    })
});

// Creates route to create and run INSERT INTO Visits query on the database
// If there is no error, then create and run SELECT ALL query to send back updated data
//If there is an error, send error status with error message
app.post('/add-visit-ajax', function (req, res) {
    // save and parse data 
    let visits_data = req.body;

    query1 = `INSERT INTO Visits (pet_id, visit_date, visit_cost) VALUES ('${visits_data.pet_id}', '${visits_data.visit_date}', '${visits_data.visit_cost}')`;
    db.pool.query(query1, function (error, rows, fields) {

        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else {
            query2 = `SELECT Visits.visit_id, Visits.pet_id, Pets.pet_name, Visits.visit_date, Visits.visit_cost
            FROM Visits INNER JOIN Pets ON Visits.pet_id = Pets.pet_id`;
            db.pool.query(query2, function (error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    res.send(rows);
                }
            })
        }
    })
});

// Creates route to create and run INSERT INTO Services query on the database
// If there is no error, then create and run SELECT ALL query to send back updated data
//If there is an error, send error status with error message
app.post('/add-service-ajax', function (req, res) {
    // save and parse data 
    let services_data = req.body;

    query1 = `INSERT INTO Services (service_name, service_cost, service_description) VALUES ('${services_data.service_name}', '${services_data.service_cost}', '${services_data.service_description}')`;
    db.pool.query(query1, function (error, rows, fields) {

        if (error) {

            console.log(error)
            res.sendStatus(400);
        }
        else {
            query2 = `SELECT * FROM Services;`;
            db.pool.query(query2, function (error, rows, fields) {

                if (error) {

                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    res.send(rows);
                }
            })
        }
    })
});

// Creates route to create and run INSERT INTO Services_During_Visit query on the database
// If there is no error, then create and run SELECT ALL query to send back updated data
//If there is an error, send error status with error message
app.post('/add-services-during-visit-ajax', function (req, res) {
    // save and parse data 
    let services_during_visit_data = req.body;

    query1 = `INSERT INTO Services_During_Visit (visit_id, service_id) VALUES ('${services_during_visit_data.visit_id}', '${services_during_visit_data.service_id}')`;
    db.pool.query(query1, function (error, rows, fields) {

        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else {
            query2 = `SELECT Services_During_Visit.service_during_visit_id, Services_During_Visit.visit_id, Services_During_Visit.service_id, Services.service_name, Visits.visit_date, Pets.pet_name
            FROM Services_During_Visit 
            INNER JOIN Services ON Services.service_id = Services_During_Visit.service_id 
            INNER JOIN Visits ON Visits.visit_id = Services_During_Visit.visit_id
            INNER JOIN Pets ON Pets.pet_id = Visits.pet_id;`;
            db.pool.query(query2, function (error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    res.send(rows);
                }
            })
        }
    })
});

/*
    ROUTES TO DELETE ROW
*/

// Creates route to create and run DELETE FROM Pets query on the database given petID
//If there is an error, send error status with error message
app.delete('/delete-pet-ajax', function (req, res, next) {
    // save and parse data 
    let data = req.body;
    let petID = parseInt(data.pet_id);
    let deletePet = `DELETE FROM Pets WHERE pet_id = ?`;

    db.pool.query(deletePet, [petID], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            res.sendStatus(204);
        }

    })
});

// Creates route to create and run DELETE FROM Parents query on the database given parentID
//If there is an error, send error status with error message
app.delete('/delete-parent-ajax', function (req, res, next) {
    let data = req.body;
    let parentID = parseInt(data.parent_id);
    let deleteParent = `DELETE FROM Parents WHERE parent_id = ?`;

    db.pool.query(deleteParent, [parentID], function (error, rows, fields) {
        if (error) {

            console.log(error);
            res.sendStatus(400);
        }
        else {
            res.sendStatus(204);
        }

    })
});

// Creates route to create and run DELETE FROM Pet_Invoices query on the database given petInvoiceID
//If there is an error, send error status with error message
app.delete('/delete-pet-invoice-ajax', function (req, res, next) {
    // save and parse data 
    let data = req.body;
    let petInvoiceID = parseInt(data.pet_invoice_id);
    let deletePetInvoice = `DELETE FROM Pet_Invoices WHERE pet_invoice_id = ?`;

    db.pool.query(deletePetInvoice, [petInvoiceID], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            res.sendStatus(204);
        }

    })
});

// Creates route to create and run DELETE FROM Visits query on the database given visitID
//If there is an error, send error status with error message
app.delete('/delete-visit-ajax', function (req, res, next) {
    // save and parse data 
    let data = req.body;
    let visitID = parseInt(data.visit_id);
    let deleteVisit = `DELETE FROM Visits WHERE visit_id = ?`;

    db.pool.query(deleteVisit, [visitID], function (error, rows, fields) {
        if (error) {

            console.log(error);
            res.sendStatus(400);
        }
        else {
            res.sendStatus(204);
        }

    })
});

// Creates route to create and run DELETE FROM Services query on the database given serviceID
//If there is an error, send error status with error message
app.delete('/delete-service-ajax', function (req, res, next) {
    // save and parse data 
    let data = req.body;
    let serviceID = parseInt(data.service_id);
    let deleteService = `DELETE FROM Services WHERE service_id = ?`;

    db.pool.query(deleteService, [serviceID], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            res.sendStatus(204);
        }

    })
});

// Creates route to create and run DELETE FROM Services_During_Visit query on the database given serviceDuringVisitID
//If there is an error, send error status with error message
app.delete('/delete-service-during-visit-ajax', function (req, res, next) {
    // save and parse data 
    let data = req.body;
    let serviceDuringVisitID = parseInt(data.service_during_visit_id);
    let deleteServiceDuringVisit = `DELETE FROM Services_During_Visit WHERE service_during_visit_id = ?`;

    db.pool.query(deleteServiceDuringVisit, [serviceDuringVisitID], function (error, rows, fields) {
        if (error) {

            console.log(error);
            res.sendStatus(400);
        }
        else {
            res.sendStatus(204);
        }

    })
});


/*
    ROUTES TO UPDATE ROW
*/

// Creates route to create and run UPDATE queries for pet_name, parent_id, and breed  
// and SELECT ALL query for Pets with given pet_id on the database
// If there is no error, then create and run next query
// Once all queries are executed with no errors, send back updated data
//If there is an error, send error status with error message
app.put('/put-pet-ajax', function (req, res, next) {
    // save and parse data 
    let data = req.body;
    let pet_id = parseInt(data.pet_id);
    let pet_name = data.pet_name;
    let parent_id = parseInt(data.parent_id);
    let breed = data.breed;

    let queryUpdatePetName = `UPDATE Pets SET pet_name = ? WHERE Pets.pet_id = ?`;
    let queryUpdateParentId = `UPDATE Pets SET parent_id = ? WHERE Pets.pet_id = ?`;
    let queryUpdateBreed = `UPDATE Pets SET breed = ? WHERE Pets.pet_id = ?`;
    let selectPet = `SELECT Pets.pet_id, Pets.pet_name, Pets.pet_id, Parents.parent_name, Pets.breed
    FROM Pets INNER JOIN Parents ON Pets.parent_id = Parents.parent_id WHERE pet_id = ?`

    // Run the 1st UPDATE query
    db.pool.query(queryUpdatePetName, [pet_name, pet_id], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            // Run the 2nd UPDATE query
            db.pool.query(queryUpdateParentId, [parent_id, pet_id], function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    // Run the 3rd UPDATE query
                    db.pool.query(queryUpdateBreed, [breed, pet_id], function (error, rows, fields) {
                        if (error) {
                            console.log(error);
                            res.sendStatus(400);
                        }
                        else {
                            // Run SELECT query
                            db.pool.query(selectPet, [pet_id], function (error, rows, fields) {
                                if (error) {
                                    console.log(error);
                                    res.sendStatus(400);
                                } else {
                                    //send updated data after all queries are successfully executed
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

// Creates route to create and run UPDATE queries for parent_name, parent_number, parent_email 
// and SELECT ALL query for Parents with given parent_id on the database
// If there is no error, then create and run next query
// Once all queries are executed with no errors, send back updated data
//If there is an error, send error status with error message
app.put('/put-parent-ajax', function (req, res, next) {
    // save and parse data 
    let data = req.body;

    let parent_id = parseInt(data.parent_id);
    let parent_name = data.parent_name;
    let parent_number = data.parent_number;
    let parent_email = data.parent_email;

    let queryUpdateParentName = `UPDATE Parents SET parent_name = ? WHERE Parents.parent_id = ?`;
    let queryUpdateParentNumber = `UPDATE Parents SET parent_number = ? WHERE Parents.parent_id = ?`;
    let queryUpdateParentEmail = `UPDATE Parents SET parent_email = ? WHERE Parents.parent_id = ?`;
    let selectParent = `SELECT * FROM Parents WHERE parent_id = ?`

    // Run the 1st UPDATE query
    db.pool.query(queryUpdateParentName, [parent_name, parent_id], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            // Run the 2nd UPDATE query
            db.pool.query(queryUpdateParentNumber, [parent_number, parent_id], function (error, rows, fields) {
                if (error) {

                    console.log(error);
                    res.sendStatus(400);
                }

                else {
                    // Run the 3rd UPDATE query
                    db.pool.query(queryUpdateParentEmail, [parent_email, parent_id], function (error, rows, fields) {
                        if (error) {

                            console.log(error);
                            res.sendStatus(400);
                        }

                        else {
                            // Run SELECT query
                            db.pool.query(selectParent, [parent_id], function (error, rows, fields) {

                                if (error) {
                                    console.log(error);
                                    res.sendStatus(400);
                                } else {
                                    //send updated data after all queries are successfully executed
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

// Creates route to create and run UPDATE queries for parent_id, invoice_date, invoice_total 
// and SELECT ALL query for Invoices given invoice_id on the database
// If there is no error, then create and run next query
// Once all queries are executed with no errors, send back updated data
//If there is an error, send error status with error message
app.put('/put-invoice-ajax', function (req, res, next) {
    // save and parse data 
    let data = req.body;

    let invoice_id = parseInt(data.invoice_id);
    let parent_id = parseInt(data.parent_id);
    let invoice_date = data.invoice_date;
    let invoice_total = parseInt(data.invoice_total);

    let queryUpdateParentId = `UPDATE Invoices SET parent_id = ? WHERE Invoices.invoice_id = ?`;
    let queryUpdateInvoiceDate = `UPDATE Invoices SET invoice_date = ? WHERE Invoices.invoice_id = ?`;
    let queryUpdateInvoiceTotal = `UPDATE Invoices SET invoice_total = ? WHERE Invoices.invoice_id = ?`;
    let selectInvoice = `SELECT Invoices.invoice_id, Invoices.parent_id, Parents.parent_name, Invoices.invoice_date, Invoices.invoice_total FROM Invoices INNER JOIN Parents ON Parents.parent_id = Invoices.parent_id WHERE invoice_id = ?`

    // Run the 1st UPDATE query
    db.pool.query(queryUpdateParentId, [parent_id, invoice_id], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            // Run the 2nd UPDATE query
            db.pool.query(queryUpdateInvoiceDate, [invoice_date, invoice_id], function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }

                else {
                    // Run the 3rd UPDATE query
                    db.pool.query(queryUpdateInvoiceTotal, [invoice_total, invoice_id], function (error, rows, fields) {

                        if (error) {
                            console.log(error);
                            res.sendStatus(400);
                        }
                        else {
                            // Run SELECT query
                            db.pool.query(selectInvoice, [invoice_id], function (error, rows, fields) {

                                if (error) {
                                    console.log(error);
                                    res.sendStatus(400);
                                } else {
                                    //send updated data after all queries are successfully executed
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

// Creates route to create and run UPDATE queries for pet_id and invoice_id 
// and SELECT ALL query for Pet_Invoices given pet_invoice_id on the database
// If there is no error, then create and run next query
// Once all queries are executed with no errors, send back updated data
//If there is an error, send error status with error message
app.put('/put-pet-invoice-form-ajax', function (req, res, next) {
    // save and parse data 
    let data = req.body;

    let pet_invoice_id = parseInt(data.pet_invoice_id);
    let pet_id = parseInt(data.pet_id);
    let invoice_id = parseInt(data.invoice_id);

    let queryUpdatePetId = `UPDATE Pet_Invoices SET pet_id = ? WHERE Pet_Invoices.pet_invoice_id= ?`;
    let queryUpdateInvoiceId = `UPDATE Pet_Invoices SET invoice_id = ? WHERE Pet_Invoices.pet_invoice_id = ?`;
    let selectPetInvoices = `SELECT Pet_Invoices.pet_invoice_id, Pet_Invoices.pet_id, Pet_Invoices.invoice_id, Pets.pet_name, Invoices.invoice_date, Invoices.invoice_total, Parents.parent_name
    FROM Pet_Invoices
    INNER JOIN Pets ON Pets.pet_id = Pet_Invoices.pet_id
    INNER JOIN Invoices ON Invoices.invoice_id = Pet_Invoices.invoice_id
    INNER JOIN Parents ON Parents.parent_id = Invoices.parent_id WHERE pet_invoice_id = ?`

    // Run the 1st UPDATE query
    db.pool.query(queryUpdatePetId, [pet_id, pet_invoice_id], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            // Run the 2nd UPDATE query
            db.pool.query(queryUpdateInvoiceId, [invoice_id, pet_invoice_id], function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    db.pool.query(selectPetInvoices, [pet_invoice_id], function (error, rows, fields) {
                        if (error) {
                            console.log(error);
                            res.sendStatus(400);
                        } else {
                            //send updated data after all queries are successfully executed
                            res.send(rows);
                        }
                    })
                }
            })
        }
    })

});

// Creates route to create and run UPDATE queries for pet_id, visit_date, visit_cost
// and SELECT ALL query for Visits given visit_id on the database
// If there is no error, then create and run next query
// Once all queries are executed with no errors, send back updated data
//If there is an error, send error status with error message
app.put('/put-visit-ajax', function (req, res, next) {
    // save and parse data 
    let data = req.body;

    let visit_id = parseInt(data.visit_id);
    let pet_id = parseInt(data.pet_id);
    let visit_date = data.visit_date;
    let visit_cost = parseInt(data.visit_cost);


    let queryUpdatePetId = `UPDATE Visits SET pet_id = ? WHERE Visits.visit_id = ?`;
    let queryUpdateVisitDate = `UPDATE Visits SET visit_date = ? WHERE Visits.visit_id = ?`;
    let queryUpdateVisitCost = `UPDATE Visits SET visit_cost = ? WHERE Visits.visit_id = ?`;
    let selectVisit = `SELECT Visits.visit_id, Visits.pet_id, Pets.pet_name, Visits.visit_date, Visits.visit_cost
    FROM Visits INNER JOIN Pets ON Visits.pet_id = Pets.pet_id WHERE visit_id = ?`

    // Run the 1st UPDATE query
    db.pool.query(queryUpdatePetId, [pet_id, visit_id], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            // Run the 2nd UPDATE query
            db.pool.query(queryUpdateVisitDate, [visit_date, visit_id], function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    // Run the 3rd UPDATE query
                    db.pool.query(queryUpdateVisitCost, [visit_cost, visit_id], function (error, rows, fields) {
                        if (error) {
                            console.log(error);
                            res.sendStatus(400);
                        }
                        else {
                            // Run SELECT query
                            db.pool.query(selectVisit, [visit_id], function (error, rows, fields) {

                                if (error) {
                                    console.log(error);
                                    res.sendStatus(400);
                                } else {
                                    //send updated data after all queries are successfully executed
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

// Creates route to create and run UPDATE queries for service_name, service_cost, service_description
// and SELECT ALL query for Services given service_id on the database
// If there is no error, then create and run next query
// Once all queries are executed with no errors, send back updated data
//If there is an error, send error status with error message
app.put('/put-service-ajax', function (req, res, next) {
    // save and parse data 
    let data = req.body;

    let service_id = parseInt(data.service_id);
    let service_name = data.service_name;
    let service_cost = parseInt(data.service_cost);
    let service_description = data.service_description;


    let queryUpdateServiceName = `UPDATE Services SET service_name = ? WHERE Services.service_id = ?`;
    let queryUpdateServiceCost = `UPDATE Services SET service_cost = ? WHERE Services.service_id = ?`;
    let queryUpdateServiceDescription = `UPDATE Services SET service_description = ? WHERE Services.service_id = ?`;
    let selectService = `SELECT * FROM Services WHERE service_id = ?`

    // Run the 1st UPDATE query
    db.pool.query(queryUpdateServiceName, [service_name, service_id], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            // Run the 2nd UPDATE query
            db.pool.query(queryUpdateServiceCost, [service_cost, service_id], function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    // Run the 3rd UPDATE query
                    db.pool.query(queryUpdateServiceDescription, [service_description, service_id], function (error, rows, fields) {
                        if (error) {
                            console.log(error);
                            res.sendStatus(400);
                        }

                        else {
                            // Run SELECT query
                            db.pool.query(selectService, [service_id], function (error, rows, fields) {

                                if (error) {
                                    console.log(error);
                                    res.sendStatus(400);
                                } else {
                                    //send updated data after all queries are successfully executed
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

// Creates route to create and run UPDATE queries for visit_id, service_id
// and SELECT ALL query for Services_During_Visit given services_during_visit_id on the database
// If there is no error, then create and run next query
// Once all queries are executed with no errors, send back updated data
//If there is an error, send error status with error message
app.put('/put-service-during-visit-form-ajax', function (req, res, next) {
    // save and parse data 
    let data = req.body;

    let service_during_visit_id = parseInt(data.service_during_visit_id);
    let visit_id = parseInt(data.visit_id);
    let service_id = parseInt(data.service_id);

    let queryUpdateVisitId = `UPDATE Services_During_Visit SET visit_id = ? WHERE Services_During_Visit.service_during_visit_id= ?`;
    let queryUpdateServiceId = `UPDATE Services_During_Visit SET service_id = ? WHERE Services_During_Visit.service_during_visit_id = ?`;
    let selectServiceDuringVisit = `SELECT Services_During_Visit.service_during_visit_id, Services_During_Visit.visit_id, Services_During_Visit.service_id, Services.service_name, Visits.visit_date, Pets.pet_name
    FROM Services_During_Visit 
    INNER JOIN Services ON Services.service_id = Services_During_Visit.service_id 
    INNER JOIN Visits ON Visits.visit_id = Services_During_Visit.visit_id
    INNER JOIN Pets ON Pets.pet_id = Visits.pet_id WHERE service_during_visit_id = ?`

    // Run the 1st UPDATE query
    db.pool.query(queryUpdateVisitId, [visit_id, service_during_visit_id], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            // Run the 2nd UPDATE query
            db.pool.query(queryUpdateServiceId, [service_id, service_during_visit_id], function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    // Run SELECT query
                    db.pool.query(selectServiceDuringVisit, [service_during_visit_id], function (error, rows, fields) {
                        if (error) {
                            console.log(error);
                            res.sendStatus(400);
                        } else {
                            //send updated data after all queries are successfully executed
                            res.send(rows);
                        }
                    })
                }
            })
        }
    })

});

//render index page as home page
app.get('/', function (req, res) {
    res.render('index');
});


/*
    LISTENER
*/
//express listening on provided PORT
app.listen(PORT, function () {
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
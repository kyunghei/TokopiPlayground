--  Citation for the following function:
-- Date: 02/15/2024
-- Adapted from bsg_sample_data_manipulation_queries.sql
-- Source URL: https://canvas.oregonstate.edu/courses/1946034/files/102219622?wrap=1


/* QUERIES FOR PARENT HTML */
-- Get all parents
SELECT * FROM Parents;

-- Add a new parent with colon : character used to denote the variables that will have data from the backend programming language
INSERT INTO Parents (parent_name, parent_number, parent_email)
VALUES (:parentnameInput, :parentnumberInput, :parentemailInput);

-- Get a single parent's data for the update Parent form
SELECT parent_id, parent_name, parent_number, parent_email
FROM Parents
WHERE parent_id = :parent_id_selected_from_browse_parent_page;

-- Update a parent's data based on input submitted from the Update Parent form
UPDATE Parents
SET parent_name = :parentnameInput, parent_number = :parentnumberInput, parent_email = :parentemailInput
WHERE parent_id = :parent_id_selected_from_browse_parent_page;

-- Delete a parent
DELETE FROM Parents
WHERE parent_id = :parent_id_selected_from_browse_parent_page;


/* QUERIES FOR PET HTML */
-- Get all parent IDs and parent names to populate the Parents dropdown
SELECT parent_id, parent_name FROM Parents;

-- Get all pets and their parent's name 
SELECT Pets.pet_id, Pets.pet_name, Parents.parent_name AS pet_parent_name, Pets.breed
FROM Pets INNER JOIN Parents ON Pets.parent_id = Parents.parent_id;

-- Add a new pet with colon : character used to denote the variables that will have data from the backend programming language
INSERT INTO Pets (pet_name, parent_id, breed) 
VALUES (:petnameInput, :parent_id_from_dropdown_Input, :breedInput);

-- Get a single pet's data for the update Pet form
SELECT pet_id, pet_name, pet_parent_name, breed 
FROM Pets 
WHERE pet_id = :pet_id_selected_from_browse_pet_page;

-- Update a pet's data based on input submitted from the Update Pet form
UPDATE Pets
SET pet_name = :petnameInput, pet_parent_name = :parent_id_from_dropdown_Input, breed = :breedInput
WHERE pet_id = :pet_id_selected_from_browse_pet_page;

-- Delete a pet
DELETE FROM Pets 
WHERE pet_id = :pet_id_selected_from_browse_pet_page;

/* QUERIES FOR VISITS */
-- Get all pet IDs and pet names to populate the Pet dropdown
SELECT pet_id, pet_name FROM Pets;

-- Get all visits and respective pet name 
SELECT Visits.visit_id, Pets.pet_name as pet_visited, Visits.visit_date, Visits.visit_cost
FROM Visits INNER JOIN Pets ON Visits.pet_id = Pets.pet_id;

-- Add a new visit with colon : character used to denote the variables that will have data from the backend programming language
INSERT INTO Visits (pet_id, visit_date, visit_cost) 
VALUES (:pet_id_from_dropdown_Input, :visitdateInput, :visitcostInput);

/* QUERIES FOR SERVICES */
-- Get all services
SELECT * FROM Services;

-- Add a new service with colon : character used to denote the variables that will have data from the backend programming language
INSERT INTO Services (service_name, service_cost, service_description) 
VALUES (:servicenameInput, :servicecostInput, :servicedescriptionInput);

/* QUERIES FOR SERVICES_DURING_VISIT INTERSECTION TABLE */
-- Get all visit data to populate a dropdown for associating with a service
SELECT visit_id FROM Visits;

-- Get all service data to populate a dropdown for associating with visit
SELECT service_id FROM Services;

-- Get all visits with their associated services to be listed
SELECT Services_During_Visit.visit_id, Services_During_Visit.service_id
FROM Services_During_Visit;

-- Associate a visit with a service (M-to-M relationship addition)
INSERT INTO Services_During_Visit (visit_id, service_id)
VALUES (:visit_id_from_dropdown_Input, :service_id_from_dropdown_Input);

-- Dis-associate a service from a visit (M-to-M relationship deletion)
DELETE FROM Services_During_Visit
WHERE visit_id = :visit_id_selected_from_services_and_visit_list AND service_id = :service_id_selected_from_services_and_visit_list;

/* QUERIES FOR INVOICES */
-- Get all parent IDs and parent names to populate the Parents dropdown
SELECT parent_id, parent_name FROM Parents;

-- Get all invoices and their parent's name 
SELECT Invoices.invoice_id, Parents.parent_name AS pet_parent_name, Invoices.invoice_date, Invoices.invoice_total
FROM Invoices INNER JOIN Parents ON Parents.parent_id = Invoices.parent_id;

-- Add a new invoice with colon : character used to denote the variables that will have data from the backend programming language
INSERT INTO Invoices (parent_id, invoice_date, invoice_total) 
VALUES (:parent_id_from_dropdown_Input, :invoicedateInput, :invoicetotalInput);

/* QUERIES FOR PET_INVOICES */
-- Get all pet data to populate a dropdown for associating with a invoice
SELECT pet_id FROM Pets;

-- Get all invoice data to populate a dropdown for associating with a pet
SELECT invoice_id FROM Invoices;

-- Get all pets with their associated invoices to be listed
SELECT Pet_Invoices.pet_id, Pet_Invoices.invoice_id
FROM Pet_Invoices;

-- Associate a pet with an invoice (M-to-M relationship addition)
INSERT INTO Pet_Invoices (pet_id, invoice_id)
VALUES (:pet_id_from_dropdown_Input, :invoice_id_from_dropdown_Input);

-- Dis-associate a pet from an invoice (M-to-M relationship deletion)
DELETE FROM Pet_Invoices
WHERE pet_id = :pet_id_selected_from_pet_and_invoice_list AND invoice_id = :invoice_id_selected_from_pet_and_invoice_list;
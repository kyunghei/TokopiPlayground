-- Disable commits and foreign key checks
SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;

-- Drop tables if they exist
DROP TABLE IF EXISTS Services_During_Visit;
DROP TABLE IF EXISTS Visits;
DROP TABLE IF EXISTS Services;
DROP TABLE IF EXISTS Customers;
DROP TABLE IF EXISTS Parents;
DROP TABLE IF EXISTS Pets;
DROP TABLE IF EXISTS Invoices;
DROP TABLE IF EXISTS Pet_Invoices;

-- Create table for Parents entitiy
CREATE TABLE Parents (
    parent_id int AUTO_INCREMENT UNIQUE NOT NULL,
    parent_name varchar(255) NOT NULL,
    parent_number varchar(255) NOT NULL,
    parent_email varchar(255),
    PRIMARY KEY (parent_id)
);

-- Create table for Pets entitiy
CREATE TABLE Pets (
    pet_id int AUTO_INCREMENT UNIQUE NOT NULL,
    pet_name varchar(45) NOT NULL,
    parent_id int NOT NULL,
    breed varchar(45),
    PRIMARY KEY (pet_id),
    FOREIGN KEY (parent_id) REFERENCES Parents(parent_id) ON DELETE CASCADE
);

-- Create table for Invoices entity
CREATE TABLE Invoices (
    invoice_id int AUTO_INCREMENT UNIQUE NOT NULL,
    parent_id int NOT NULL,
    invoice_date date NOT NULL,
    invoice_total decimal(19,2) NOT NULL,
    PRIMARY KEY (invoice_id),
    FOREIGN KEY (parent_id) REFERENCES Parents(parent_id) ON DELETE CASCADE
);

-- Create table for Visits entity
CREATE TABLE Visits (
    visit_id int AUTO_INCREMENT UNIQUE,
    pet_id int NOT NULL,
    visit_date date NOT NULL,
    visit_cost decimal(19,2) NOT NULL,
    PRIMARY KEY (visit_id),
    FOREIGN KEY (pet_id) REFERENCES Pets(pet_id) ON DELETE CASCADE
);

-- Create table for Services entity
CREATE TABLE Services (
    service_id int AUTO_INCREMENT UNIQUE,
    service_name varchar(45) NOT NULL,
    service_cost decimal(19,2) NOT NULL,
    service_description text,
    PRIMARY KEY (service_id)
);

-- Create intersection table for Pet_Invoices connecting the Pets and Invoices entities
CREATE TABLE Pet_Invoices(
    pet_invoice_id int AUTO_INCREMENT NOT NULL UNIQUE,
    pet_id int NOT NULL,
    invoice_id int NOT NULL,
    PRIMARY KEY (pet_invoice_id),
    FOREIGN KEY (pet_id) REFERENCES Pets(pet_id) ON DELETE CASCADE,
    FOREIGN KEY (invoice_id) REFERENCES Invoices(invoice_id) ON DELETE CASCADE
);

-- Create intersection table for Services_During_Visit connecting the Visits and Services entities
CREATE TABLE Services_During_Visit(
    service_during_visit_id int AUTO_INCREMENT NOT NULL UNIQUE,
    visit_id int NOT NULL,
    service_id int,
    PRIMARY KEY (service_during_visit_id),
    FOREIGN KEY (visit_id) REFERENCES Visits(visit_id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES Services(service_id) ON DELETE SET NULL
);

 -- Insert sample data into Parents entity
INSERT INTO Parents(parent_name, parent_number, parent_email)
VALUES 
  ('Bengie Seo', '818-249-7954', 'honeymelon@gmail.com'),
  ('Vivi Kim', '213-112-3222', 'hiprincess@yahoo.com'),
  ('Patrick Scovis', '243-866-4367', 'carnage19@hotmail.com'),
  ('Kevin Lee', '101-473-5742', NULL);
  
-- Insert sample data into Pets entity
INSERT INTO Pets(pet_name, parent_id, breed)
VALUES 
  ('Togepi', (SELECT parent_id from Parents where parent_name = 'Bengie Seo'), 
 'Chihuahua Mix'),
 ('Evee', (SELECT parent_id from Parents where parent_name = 'Vivi Kim'), 
 'Maltese Poodle'),
 ('Ollie', (SELECT parent_id from Parents where parent_name = 'Bengie Seo'), 
 'Bulldog'),
 ('Luna', (SELECT parent_id from Parents where parent_name = 'Kevin Lee'), 
 'Golden Retriever'),
 ('Dobey', (SELECT parent_id from Parents where parent_name = 'Patrick Scovis'), 
 'Chihuahua');
 
 -- Insert sample data into Invoices entity
INSERT INTO Invoices(parent_id, invoice_date, invoice_total)
VALUES 
  ((SELECT parent_id from Parents where parent_name = 'Bengie Seo'), '2022-02-01'
 , 75),
 ((SELECT parent_id from Parents where parent_name = 'Vivi Kim'), '2023-02-02'
 , 100),
 ((SELECT parent_id from Parents where parent_name = 'Bengie Seo'), '2024-02-03'
 , 150),
 ((SELECT parent_id from Parents where parent_name = 'Patrick Scovis'), '2024-02-04'
 , 50) ;
 
  -- Insert sample data into Pet_Invoices entity
INSERT INTO Pet_Invoices(pet_id, invoice_id)
VALUES 
  ((SELECT pet_id from Pets where pet_name = 'Togepi'), 
  (SELECT invoice_id 
  from Invoices 
  where invoice_date = '2022-02-01' and parent_id = 
  (SELECT parent_id
  FROM Pets
  where pet_name = 'Togepi'))),
  ((SELECT pet_id from Pets where pet_name = 'Evee'), 
  (SELECT invoice_id 
  from Invoices 
  where invoice_date = '2023-02-02' and parent_id = 
  (SELECT parent_id
  FROM Pets
  where pet_name = 'Evee'))),
  ((SELECT pet_id from Pets where pet_name = 'Togepi'), 
  (SELECT invoice_id 
  from Invoices 
  where invoice_date = '2024-02-03' and parent_id = 
  (SELECT parent_id
  FROM Pets
  where pet_name = 'Togepi'))),
  ((SELECT pet_id from Pets where pet_name = 'Ollie'), 
  (SELECT invoice_id 
  from Invoices 
  where invoice_date = '2024-02-03' and parent_id = 
  (SELECT parent_id
  FROM Pets
  where pet_name = 'Ollie'))),
  ((SELECT pet_id from Pets where pet_name = 'Dobey'), 
  (SELECT invoice_id 
  from Invoices 
  where invoice_date = '2024-02-04' and parent_id = 
  (SELECT parent_id
  FROM Pets
  where pet_name = 'Dobey')))
  ;
  
 -- Insert sample data into Services entity
INSERT INTO Services(service_name, service_cost, service_description)
VALUES 
  ('15-minute walk', 5.00, 'An employee will walk the pet around the block for approximately 15 minutes.'),
  ('Bath', 50.00, 'An employee will shampoo and dry your pet.'),
  ('Clip nails', 25.00, 'An employee will trim your pet`s nails.')
  ;
  
 -- Insert sample data into Visits entity
INSERT INTO Visits(pet_id, visit_date, visit_cost)
VALUES 
  ((Select pet_id FROM Pets Where pet_name = 'Togepi'), '2022-01-31', 75.00),
  ((Select pet_id FROM Pets Where pet_name = 'Evee'), '2023-01-30', 25.00),
  ((Select pet_id FROM Pets Where pet_name = 'Togepi'), '2024-01-25', 25.00),
  ((Select pet_id FROM Pets Where pet_name = 'Dobey'), '2024-01-28', 50.00)
  ;
  
 -- Insert sample data into Services_During_Visits entity
INSERT INTO Services_During_Visit(visit_id, service_id)
VALUES 
  ((SELECT visit_id 
	FROM Visits
    Where visit_date = '2022-01-31' and
    pet_id = 
    (Select pet_id FROM Pets Where pet_name = 'Togepi')),
    (Select service_id FROM Services where service_name = 'Bath')),
    ((SELECT visit_id 
	FROM Visits
    Where visit_date = '2024-01-25' and
    pet_id = 
    (Select pet_id FROM Pets Where pet_name = 'Togepi')),
    (Select service_id FROM Services where service_name = 'Clip nails')),
    ((SELECT visit_id 
	FROM Visits
    Where visit_date = '2023-01-30' and
    pet_id = 
    (Select pet_id FROM Pets Where pet_name = 'Evee')),
    (Select service_id FROM Services where service_name = 'Clip nails')),
    ((SELECT visit_id 
	FROM Visits
    Where visit_date = '2024-01-28' and
    pet_id = 
    (Select pet_id FROM Pets Where pet_name = 'Dobey')),
    (Select service_id FROM Services where service_name = 'Bath'))
  ;
  
   -- Turn on commits and foreign key checks
  SET FOREIGN_KEY_CHECKS = 1;
  COMMIT;
  


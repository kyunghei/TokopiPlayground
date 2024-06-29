
# TokopiPlayground Database Project

## Overview
TokopiPlayground is a comprehensive database-driven web application designed to manage customer information, visit details, and invoices for a fictional doggy daycare business. The project showcases skills in both data analysis and software engineering, utilizing MySQL for the database, Node.js and Express for the backend, and Handlebars for the templating engine.


## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Live Demo](#live-demo)
- [Setup and Installation](#setup-and-installation)
- [Database Setup](#database-setup)
- [Running Locally](#running-locally)
- [Full Report](#full-report)

## Features
- Manage customer information
- Track visit details
- Generate and manage invoices
- User-friendly interface with CRUD functionalities
  
## Technologies Used
- Node.js
- Express
- MySQL
- SQL
- JavaScript
- EJS
- CSS

## Live Demo
This project is hosted on Heroku. You can access the live demo without any setup required:
[TokopiPlayground Live](https://young-oasis-98041-180088b20db6.herokuapp.com/)

## Setup and Installation

### Prerequisites
- Node.js
- MySQL

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/tokopiplayground.git
   cd tokopiplayground
2. **Install dependencies:**
   ```sh
   npm install
3. **Create a `.env` file in the root of the project:
   ```sh
   touch .env
4. **Add your MySQL database credentials to the `.env` file:
   ```sh
   DB_HOST=
   DB_USER=
   DB_PASSWORD=
   DB_NAME=
5. **Set up the database:**
   Follow the instructions in the [Database Setup](#database-setup) section to set up your local database.

## Database Setup
1. **Create the database and  tables:**
   - Open MySQL Workbench or your preferred MySQL client.
   - Run the following commands to create the database:
     ```sh
     CREATE DATABASE yourdatabasename;
     USE yourdatabasename;
2. **Import the DDL file:**
   - Use the following command to import the schema:
     ```sh
     mysql -u root -p mydatabasename < database/DDL_updated.sql

## Running Locally
1. **Start the server:**
   ```sh
   npm start
2. **Open your browser and navigate to:**
   ```sh
   http://localhost:3000
   
## Full Report
[Portfolio.pdf](https://github.com/user-attachments/files/15982707/Portfolio.pdf)


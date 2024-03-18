// Citation for the following function:
// Date: 03/07/2024
// Based on: CS 340 starter code 'Step 7 Dynamically Deleting Data' with the exception of displaying an alert message that allows users to finalizing deletion.
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Sends an alert to confirm deletion of data values with the argument, id. 
// Initialize AJAX request to receive data
// Upon receiving data, we execute deleteRow function 
// Handles errors if AJAX not set up correctly or invalid inputs
function deletePetInvoice(petInvoiceID) {
    // Create a delete confirmation dialog. If confirmed, execute deletion. If canceled, do nothing.
    if (confirm(`Delete pet invoice with ID ${petInvoiceID}?`)) {
        // save the id we wish to delete in an object
        let data = {
            pet_invoice_id: petInvoiceID
        };

        var xhttp = new XMLHttpRequest();
        xhttp.open("DELETE", "/delete-pet-invoice-ajax", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 204) {
                // Delete data from the table
                deleteRow(petInvoiceID);

            }
            else if (xhttp.readyState == 4 && xhttp.status != 204) {
                console.log("There was an error with the input.")
            }
        }
        xhttp.send(JSON.stringify(data));
    }
    else {
        return;
    }

}

//Finds table and iterates through the rows until the row's unique value is equivalent to the provided row id
function deleteRow(petInvoiceID) {
    let table = document.getElementById("pet-invoices-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == petInvoiceID) {
            table.deleteRow(i);
            break;
        }
    }
}
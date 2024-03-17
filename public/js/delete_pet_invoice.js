function deletePetInvoice(petInvoiceID) {
    // Create a delete confirmation dialog
    if (confirm(`Delete Pet Invoice ID ${petInvoiceID}?`)) {
        // Put our data we want to send in a javascript object
        let data = {
            pet_invoice_id: petInvoiceID
        };

        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("DELETE", "/delete-pet-invoice-ajax", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 204) {
                // Add the new data to the table
                deleteRow(petInvoiceID);

            }
            else if (xhttp.readyState == 4 && xhttp.status != 204) {
                console.log("There was an error with the input.")
            }
        }
        // Send the request and wait for the response
        xhttp.send(JSON.stringify(data));
    }
    else {
        return;
    }

}


function deleteRow(petInvoiceID) {

    let table = document.getElementById("pet-invoices-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        //console.log(table.rows[i].getAttribute("data-value"));
        if (table.rows[i].getAttribute("data-value") == petInvoiceID) {
            table.deleteRow(i);
            break;
        }
    }
}
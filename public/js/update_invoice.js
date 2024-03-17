// Citation for the following function:
// Date: 03/07/2024
// Based on:
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let updateInvoiceForm = document.getElementById('update-invoice-form-ajax');

// Modify the objects we need
updateInvoiceForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();
    // Get form fields we need to get data from
    let inputInvoiceId = document.getElementById("select-invoice-id");
    let inputParentId = document.getElementById("update-parent-id");
    let inputInvoiceDate = document.getElementById("update-invoice-date");
    let inputInvoiceTotal = document.getElementById("update-invoice-total");

    // Get the values from the form fields
    let invoiceIdValue = inputInvoiceId.value;
    let parentIdValue = inputParentId.value;
    let invoiceDateValue = inputInvoiceDate.value;
    let invoiceTotalValue = inputInvoiceTotal.value;

    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld

    if (isNaN(parentIdValue)) {
        return;
    }


    // Put our data we want to send in a javascript object
    let data = {
        invoice_id: invoiceIdValue,
        parent_id: parentIdValue,
        invoice_date: invoiceDateValue,
        invoice_total: invoiceTotalValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-invoice-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, invoiceIdValue);

            // Clear the input fields for another transaction
            inputInvoiceId.value = 'Invoice ID';
            inputParentId.value = 'Parent ID';
            inputInvoiceDate.value = '';
            inputInvoiceTotal.value = '';

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, invoiceID) {
    let parsedData = JSON.parse(data);

    let table = document.getElementById("invoices-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == invoiceID) {

            // Get the location of the row where we found the matching invoice ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of parent_id value
            let parent_id_td = updateRowIndex.getElementsByTagName("td")[1];

            // Get td of date value
            let invoice_date_td = updateRowIndex.getElementsByTagName("td")[2];

            // Get td of total value
            let invoice_total_td = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign homeworld to our value we updated to
            parent_id_td.innerHTML = parsedData[0].parent_id;
            invoice_date_td.innerHTML = parsedData[0].invoice_date;
            invoice_total_td.innerHTML = parsedData[0].invoice_total;
        }
    }
}

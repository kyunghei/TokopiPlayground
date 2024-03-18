// Citation for the following function:
// Date: 03/07/2024
// Based on:
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let addInvoiceForm = document.getElementById('add-invoice-form-ajax');

// Modify the objects we need
addInvoiceForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputParentId = document.getElementById("input-parent-id");
    let inputInvoiceDate = document.getElementById("input-invoice-date");
    let inputInvoiceTotal = document.getElementById("input-invoice-total");

    // Get the values from the form fields
    let ParentNameValue = inputParentId.value;
    let InvoiceDateValue = inputInvoiceDate.value;
    let InvoiceTotalValue = inputInvoiceTotal.value;

    // Put our data we want to send in a javascript object
    let data = {
        parent_id: ParentNameValue,
        invoice_date: InvoiceDateValue,
        invoice_total: InvoiceTotalValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-invoice-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputParentId.value = '';
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


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("invoices-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let invoiceIdCell = document.createElement("TD");
    let parentIdCell = document.createElement("TD");
    let invoiceDateCell = document.createElement("TD");
    let invoiceTotalCell = document.createElement("TD");

    // let deleteCell = document.createElement("TD");


    // Fill the cells with correct data
    invoiceIdCell.innerText = newRow.invoice_id;
    parentIdCell.innerText = newRow.parent_id;
    invoiceDateCell.innerText = newRow.invoice_date;
    invoiceTotalCell.innerText = newRow.invoice_total;

    // deleteBtn = document.createElement("button");
    // deleteBtn.innerHTML = '<i class="fa fa-trash"></i>';
    // deleteBtn.onclick = function () {
    //     deletePet(newRow.pet_id);
    // };
    // deleteCell.appendChild(deleteBtn);

    // Add the cells to the row 
    row.appendChild(invoiceIdCell);
    row.appendChild(parentIdCell);
    row.appendChild(invoiceDateCell);
    row.appendChild(invoiceTotalCell);
    // row.appendChild(deleteCell);

    // Add a custom row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.invoice_id);

    let currentTableBody = document.getElementById("invoices-table-body");
    // Add the row to the table
    currentTableBody.appendChild(row);

    // Find drop down menu, create a new option, fill data in the option (full name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    // let selectMenu = document.getElementById("select-pet-id");
    // let option = document.createElement("option");
    // option.text = newRow.pet_id + ' ' + newRow.pet_name;
    // option.value = newRow.pet_id;
    // selectMenu.add(option);
}

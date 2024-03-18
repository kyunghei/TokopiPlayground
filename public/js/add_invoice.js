// Citation for the following function:
// Date: 02/29/2024
// Based on: CS 340 starter code 'Step 5 Adding New Data'
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app


let addInvoiceForm = document.getElementById('add-invoice-form-ajax');

// Execute this when we submit the current form
addInvoiceForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting automatically
    e.preventDefault();

    //Get the values from form fields and save it into an object
    let inputParentId = document.getElementById("input-parent-id");
    let inputInvoiceDate = document.getElementById("input-invoice-date");
    let inputInvoiceTotal = document.getElementById("input-invoice-total");

    let ParentNameValue = inputParentId.value;
    let InvoiceDateValue = inputInvoiceDate.value;
    let InvoiceTotalValue = inputInvoiceTotal.value;

    let data = {
        parent_id: ParentNameValue,
        invoice_date: InvoiceDateValue,
        invoice_total: InvoiceTotalValue
    }

    //Initialize AJAX request to receive data
    // Upon receiving data, we add row to table, clear input fields, and send data
    // Handles errors if AJAX not set up correctly or invalid inputs
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-invoice-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            addRowToTable(xhttp.response);

            inputParentId.value = '';
            inputInvoiceDate.value = '';
            inputInvoiceTotal.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    xhttp.send(JSON.stringify(data));

})


//Receives an object of data as an argument and creates a new row of values with the corresponding data
addRowToTable = (data) => {

    // Find new data from query
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create containers for new row, cells, and delete button, then fill them with new data values
    let row = document.createElement("TR");
    let invoiceIdCell = document.createElement("TD");
    let parentIdCell = document.createElement("TD");
    let invoiceDateCell = document.createElement("TD");
    let invoiceTotalCell = document.createElement("TD");

    invoiceIdCell.innerText = newRow.invoice_id;
    parentIdCell.innerText = newRow.parent_id;
    invoiceDateCell.innerText = newRow.invoice_date;
    invoiceTotalCell.innerText = newRow.invoice_total;

    // Add the cells to the row 
    row.appendChild(invoiceIdCell);
    row.appendChild(parentIdCell);
    row.appendChild(invoiceDateCell);
    row.appendChild(invoiceTotalCell);

    // initialize unique row attribute to easily identify row
    row.setAttribute('data-value', newRow.invoice_id);

    // Add the row to the end of the table
    let currentTableBody = document.getElementById("invoices-table-body");
    currentTableBody.appendChild(row);

}

function formatDate(currentDate){
    return currentDate.toISOString().slice(0,10);
}


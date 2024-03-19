// Citation for the following function:
// Date: 03/07/2024
// Based on: CS 340 starter code 'Step 8 Dynamically Updating Data'
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app


let updateInvoiceForm = document.getElementById('update-invoice-form-ajax');

// Execute when form is submitted 
updateInvoiceForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting automatically
    e.preventDefault();
    //Get the id that represents the data we wish to update and values that are to be updated from form fields and save it into an object
    let inputInvoiceId = document.getElementById("select-invoice-id");
    let inputParentId = document.getElementById("update-parent-id");
    let inputInvoiceDate = document.getElementById("update-invoice-date");
    let inputInvoiceTotal = document.getElementById("update-invoice-total");

    let invoiceIdValue = inputInvoiceId.value;
    let parentIdValue = inputParentId.value;
    let invoiceDateValue = inputInvoiceDate.value;
    let invoiceTotalValue = inputInvoiceTotal.value;

    let data = {
        invoice_id: invoiceIdValue,
        parent_id: parentIdValue,
        invoice_date: invoiceDateValue,
        invoice_total: invoiceTotalValue
    }


    //Initialize AJAX request to receive data
    // Upon receiving data, we update row to table, clear input fields, and send data
    // Handles errors if AJAX not set up correctly or invalid inputs
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-invoice-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // update new data to the table
            updateRow(xhttp.response, invoiceIdValue);

            inputInvoiceId.value = '';
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

//Finds table and iterates through the rows until the row's unique value is equivalent to the provided row id
//Once row is found, iterate through cells and update with new data
function updateRow(data, invoiceID) {
    let parsedData = JSON.parse(data);

    let table = document.getElementById("invoices-table");

    for (let i = 0, row; row = table.rows[i]; i++) {

        if (table.rows[i].getAttribute("data-value") == invoiceID) {

            let updateRowIndex = table.getElementsByTagName("tr")[i];
            let parent_id_td = updateRowIndex.getElementsByTagName("td")[1];
            let invoice_date_td = updateRowIndex.getElementsByTagName("td")[2];
            let invoice_total_td = updateRowIndex.getElementsByTagName("td")[3];

            //update cells with new data values
            parent_id_td.innerHTML = parsedData[0].parent_name;
            invoice_date_td.innerHTML = parsedData[0].invoice_date;
            invoice_total_td.innerHTML = parsedData[0].invoice_total;
        }
    }
}

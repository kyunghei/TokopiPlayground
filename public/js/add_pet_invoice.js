// Citation for the following function:
// Date: 02/29/2024
// Based on: CS 340 starter code 'Step 5 Adding New Data'
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app


let addPetInvoiceForm = document.getElementById('add-pet-invoice-form-ajax');

// Execute this when we submit the current form
addPetInvoiceForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting automatically
    e.preventDefault();

    //Get the values from form fields and save it into an object
    let inputPetId = document.getElementById("input-pet-id");
    let inputInvoiceId = document.getElementById("input-invoice-id");

    let PetIdValue = inputPetId.value;
    let InvoiceIdValue = inputInvoiceId.value;

    let data = {
        pet_id: PetIdValue,
        invoice_id: InvoiceIdValue
    }

    //Initialize AJAX request to receive data
    // Upon receiving data, we add row to table, clear input fields, and send data
    // Handles errors if AJAX not set up correctly or invalid inputs
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-pet-invoice-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            addRowToTable(xhttp.response);

            inputPetId.value = '';
            inputInvoiceId.value = '';
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
    let petInvoiceIdCell = document.createElement("TD");
    let petIdCell = document.createElement("TD");
    let invoiceIdCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    petInvoiceIdCell.innerText = newRow.pet_invoice_id;
    petIdCell.innerText = newRow.pet_id;
    invoiceIdCell.innerText = newRow.invoice_id;

    //include on click delete functionality for corresponding row of data
    deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fa fa-trash"></i>';
    deleteBtn.onclick = function () {
        deletePet(newRow.service_id);
    };
    deleteCell.appendChild(deleteBtn);

    // Add the cells to the row 
    row.appendChild(petInvoiceIdCell);
    row.appendChild(petIdCell);
    row.appendChild(invoiceIdCell);
    row.appendChild(deleteCell);

    // initialize unique row attribute to easily identify row
    row.setAttribute('data-value', newRow.pet_invoice_id);

    // Add the row to the end of the table
    let currentTableBody = document.getElementById("pet-invoices-table-body");
    currentTableBody.appendChild(row);

}


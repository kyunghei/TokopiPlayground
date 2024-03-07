// Get the objects we need to modify
let addPetInvoiceForm = document.getElementById('add-pet-invoice-form-ajax');

// Modify the objects we need
addPetInvoiceForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputPetId = document.getElementById("input-pet-id");
    let inputInvoiceId = document.getElementById("input-invoice-id");

    // Get the values from the form fields
    let PetIdValue = inputPetId.value;
    let InvoiceIdValue = inputInvoiceId.value;

    // Put our data we want to send in a javascript object
    let data = {
        pet_id: PetIdValue,
        invoice_id: InvoiceIdValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-pet-invoice-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputPetId.value = 'Pet ID';
            inputInvoiceId.value = 'Invoice ID';
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
    let currentTable = document.getElementById("pet-invoices-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let petInvoiceIdCell = document.createElement("TD");
    let petIdCell = document.createElement("TD");
    let invoiceIdCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");


    // Fill the cells with correct data
    petInvoiceIdCell.innerText = newRow.pet_invoice_id;
    petIdCell.innerText = newRow.pet_id;
    invoiceIdCell.innerText = newRow.invoice_id;

    // deleteBtn = document.createElement("button");
    // deleteBtn.innerHTML = '<i class="fa fa-trash"></i>';
    // deleteBtn.onclick = function () {
    //     deletePet(newRow.pet_id);
    // };
    // deleteCell.appendChild(deleteBtn);

    // Add the cells to the row 
    row.appendChild(petInvoiceIdCell);
    row.appendChild(petIdCell);
    row.appendChild(invoiceIdCell);
    // row.appendChild(deleteCell);

    // Add a custom row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.pet_invoice_id);

    let currentTableBody = document.getElementById("pet-invoices-table-body");
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


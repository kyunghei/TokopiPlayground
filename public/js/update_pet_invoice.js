// Citation for the following function:
// Date: 03/07/2024
// Based on:
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let updatePetInvoiceForm = document.getElementById('update-pet-invoice-form-ajax');

// Modify the objects we need
updatePetInvoiceForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();
    // Get form fields we need to get data from
    let selectPetInvoiceId = document.getElementById("select-pet-invoice-id");
    let updatePetId = document.getElementById("update-pet-id");
    let updateInvoiceId = document.getElementById("update-invoice-id");

    // Get the values from the form fields
    let petInvoiceIdValue = selectPetInvoiceId.value;
    let petIdValue = updatePetId.value;
    let invoiceIdValue = updateInvoiceId.value;

    
    // Put our data we want to send in a javascript object
    let data = {
        pet_invoice_id: petInvoiceIdValue,
        pet_id: petIdValue,
        invoice_id: invoiceIdValue,
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-pet-invoice-form-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, petInvoiceIdValue);

            // Clear the input fields for another transaction
            selectPetInvoiceId.value = 'Pet Invoice ID';
            updatePetId.value = 'Pet ID';
            updateInvoiceId.value = 'Invoice ID';


        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, petInvoiceID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("pet-invoices-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == petInvoiceID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of parent_id value
            let pet_id_td = updateRowIndex.getElementsByTagName("td")[1];

            let invoice_id_td = updateRowIndex.getElementsByTagName("td")[2];


            // Reassign homeworld to our value we updated to
            pet_id_td.innerHTML = parsedData[0].pet_id; 
            invoice_id_td.innerHTML = parsedData[0].invoice_id; 
       }
    }
}
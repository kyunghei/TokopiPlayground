// Citation for the following function:
// Date: 03/07/2024
// Based on: CS 340 starter code 'Step 8 Dynamically Updating Data'
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app


let updatePetInvoiceForm = document.getElementById('update-pet-invoice-form-ajax');

// Execute when form is submitted 
updatePetInvoiceForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting automatically
    e.preventDefault();

    //Get the id that represents the data we wish to update and values that are to be updated from form fields 
    //and save it into an object
    let selectPetInvoiceId = document.getElementById("select-pet-invoice-id");
    let updatePetId = document.getElementById("update-pet-id");
    let updateInvoiceId = document.getElementById("update-invoice-id");

    let petInvoiceIdValue = selectPetInvoiceId.value;
    let petIdValue = updatePetId.value;
    let invoiceIdValue = updateInvoiceId.value;

    let data = {
        pet_invoice_id: petInvoiceIdValue,
        pet_id: petIdValue,
        invoice_id: invoiceIdValue,
    }

    //Initialize AJAX request to receive data
    // Upon receiving data, we update row to table, clear input fields, and send data
    // Handles errors if AJAX not set up correctly or invalid inputs
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-pet-invoice-form-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // update new data to the table
            updateRow(xhttp.response, petInvoiceIdValue);

            selectPetInvoiceId.value = 'Pet Invoice ID';
            updatePetId.value = 'Pet ID';
            updateInvoiceId.value = 'Invoice ID';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    xhttp.send(JSON.stringify(data));

})

//Finds table and iterates through the rows until the row's unique value is equivalent to the provided row id
//Once row is found, iterate through cells and update with new data
function updateRow(data, petInvoiceID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("pet-invoices-table");

    for (let i = 0, row; row = table.rows[i]; i++) {

       if (table.rows[i].getAttribute("data-value") == petInvoiceID) {

            let updateRowIndex = table.getElementsByTagName("tr")[i];
            let pet_id_td = updateRowIndex.getElementsByTagName("td")[1];
            let invoice_id_td = updateRowIndex.getElementsByTagName("td")[2];
            
            //update cells with new data values
            pet_id_td.innerHTML = parsedData[0].pet_id; 
            invoice_id_td.innerHTML = parsedData[0].invoice_id; 
       }
    }
}
// Get the objects we need to modify
let addServiceDuringVisitForm = document.getElementById('add-services-during-visit-form-ajax');

// Modify the objects we need
addServiceDuringVisitForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputVisitId = document.getElementById("input-visit-id");
    let inputServiceId = document.getElementById("input-service-id");

    // Get the values from the form fields
    let VisitIdValue = inputVisitId.value;
    let ServiceIdValue = inputServiceId.value;


    // Put our data we want to send in a javascript object
    let data = {
        visit_id: VisitIdValue,
        service_id: ServiceIdValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-services-during-visit-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputVisitId.value = '';
            inputServiceId.value = '';
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
    let currentTable = document.getElementById("services-during-visit-table");

    // Get the location where we should insert the new row (end of table)
    //let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let serviceDuringVisitIdCell = document.createElement("TD");
    let visitIdCell = document.createElement("TD");
    let serviceIdCell = document.createElement("TD");

    // Fill the cells with correct data
    serviceDuringVisitIdCell.innerText = newRow.service_during_visit_id;
    visitIdCell.innerText = newRow.visit_id;
    serviceIdCell.innerText = newRow.service_id;

    // Add the cells to the row 
    row.appendChild(serviceDuringVisitIdCell);
    row.appendChild(visitIdCell);
    row.appendChild(serviceIdCell);

    row.setAttribute('data-value', newRow.service_id);

    let currentTableBody = document.getElementById("services-during-visit-table-body");
    
    // Add the row to the table
    currentTableBody.appendChild(row);
}
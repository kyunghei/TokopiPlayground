// Citation for the following function:
// Date: 03/07/2024
// Based on:
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let addServiceForm = document.getElementById('add-service-form-ajax');

// Modify the objects we need
addServiceForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputServiceName = document.getElementById("input-service-name");
    let inputServiceCost = document.getElementById("input-service-cost");
    let inputServiceDescription = document.getElementById("input-service-description");

    // Get the values from the form fields
    let ServiceNameValue = inputServiceName.value;
    let ServiceCostValue = inputServiceCost.value;
    let ServiceDescriptionValue = inputServiceDescription.value;


    // Put our data we want to send in a javascript object
    let data = {
        service_name: ServiceNameValue,
        service_cost: ServiceCostValue,
        service_description: ServiceDescriptionValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-service-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputServiceName.value = '';
            inputServiceCost.value = '';
            inputServiceDescription.value = '';
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
    let currentTable = document.getElementById("services-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let serviceIdCell = document.createElement("TD");
    let serviceNameCell = document.createElement("TD");
    let serviceCostCell = document.createElement("TD");
    let serviceDescriptionCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");


    // Fill the cells with correct data
    serviceIdCell.innerText = newRow.service_id;
    serviceNameCell.innerText = newRow.service_name;
    serviceCostCell.innerText = newRow.service_cost;
    serviceDescriptionCell.innerText = newRow.service_description;

    deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fa fa-trash"></i>';
    deleteBtn.onclick = function () {
        deletePet(newRow.service_id);
    };
    deleteCell.appendChild(deleteBtn);

    // Add the cells to the row 
    row.appendChild(serviceIdCell);
    row.appendChild(serviceNameCell);
    row.appendChild(serviceCostCell);
    row.appendChild(serviceDescriptionCell);
    row.appendChild(deleteCell);

    // Add a custom row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.service_id);

    let currentTableBody = document.getElementById("services-table-body");
    // Add the row to the table
    currentTableBody.appendChild(row);

    // Find drop down menu, create a new option, fill data in the option (full name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh

    // let selectMenu = document.getElementById("select-visit-id");
    // let option = document.createElement("option");
    // option.text = newRow.pet_id + ' ' + newRow.pet_name;
    // option.value = newRow.pet_id;
    // selectMenu.add(option);
}


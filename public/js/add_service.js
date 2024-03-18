// Citation for the following function:
// Date: 02/29/2024
// Based on: CS 340 starter code 'Step 5 Adding New Data'
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app


let addServiceForm = document.getElementById('add-service-form-ajax');

// Execute this when we submit the current form
addServiceForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting automatically
    e.preventDefault();

    //Get the values from form fields and save it into an object
    let inputServiceName = document.getElementById("input-service-name");
    let inputServiceCost = document.getElementById("input-service-cost");
    let inputServiceDescription = document.getElementById("input-service-description");

    let ServiceNameValue = inputServiceName.value;
    let ServiceCostValue = inputServiceCost.value;
    let ServiceDescriptionValue = inputServiceDescription.value;

    let data = {
        service_name: ServiceNameValue,
        service_cost: ServiceCostValue,
        service_description: ServiceDescriptionValue
    }

    //Initialize AJAX request to receive data
    // Upon receiving data, we add row to table, clear input fields, and send data
    // Handles errors if AJAX not set up correctly or invalid inputs
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-service-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            addRowToTable(xhttp.response);

            inputServiceName.value = '';
            inputServiceCost.value = '';
            inputServiceDescription.value = '';
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

    //include on click delete functionality for corresponding row of data
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

    // initialize unique row attribute to easily identify row
    row.setAttribute('data-value', newRow.service_id);

    // Add the row to the end of the table
    let currentTableBody = document.getElementById("services-table-body");
    currentTableBody.appendChild(row);

}


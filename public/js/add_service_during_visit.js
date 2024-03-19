// Citation for the following function:
// Date: 03/07/2024
// Based on: CS 340 starter code 'Step 5 Adding New Data'
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app


let addServiceDuringVisitForm = document.getElementById('add-services-during-visit-form-ajax');

// Execute this when we submit the current form
addServiceDuringVisitForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting automatically
    e.preventDefault();

    //Get the values from form fields and save it into an object
    let inputVisitId = document.getElementById("input-visit-id");
    let inputServiceId = document.getElementById("input-service-id");


    let VisitIdValue = inputVisitId.value;
    let ServiceIdValue = inputServiceId.value;

    let data = {
        visit_id: VisitIdValue,
        service_id: ServiceIdValue
    }

    //Initialize AJAX request to receive data
    // Upon receiving data, we add row to table, clear input fields, and send data
    // Handles errors if AJAX not set up correctly or invalid inputs
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-services-during-visit-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            addRowToTable(xhttp.response);

            inputVisitId.value = '';
            inputServiceId.value = '';
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
    let serviceDuringVisitIdCell = document.createElement("TD");
    let visitIdCell = document.createElement("TD");
    let serviceIdCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    serviceDuringVisitIdCell.innerText = newRow.service_during_visit_id;
    visitIdCell.innerText = newRow.visit_date + ' ' + newRow.pet_name;
    serviceIdCell.innerText = newRow.service_name;

    //include on click delete functionality for corresponding row of data
    deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fa fa-trash"></i>';
    deleteBtn.onclick = function () {
        deleteServiceDuringVisit(newRow.service_id);
    };
    deleteCell.appendChild(deleteBtn);

    // Add the cells to the row 
    row.appendChild(serviceDuringVisitIdCell);
    row.appendChild(visitIdCell);
    row.appendChild(serviceIdCell);
    row.appendChild(deleteCell);

    // initialize unique row attribute to easily identify row
    row.setAttribute('data-value', newRow.service_id);

    // Add the row to the end of the table
    let currentTableBody = document.getElementById("services-during-visit-table-body");
    currentTableBody.appendChild(row);
}
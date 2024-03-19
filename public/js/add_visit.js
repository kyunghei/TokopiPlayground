// Citation for the following function:
// Date: 02/29/2024
// Based on: CS 340 starter code 'Step 5 Adding New Data'
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app


let addVisitForm = document.getElementById('add-visit-form-ajax');

// Execute this when we submit the current form
addVisitForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting automatically
    e.preventDefault();

    //Get the values from form fields and save it into an object
    let inputPetId = document.getElementById("input-pet-id");
    let inputVisitDate = document.getElementById("input-visit-date");
    let inputVisitCost = document.getElementById("input-visit-cost");

    let PetIdValue = inputPetId.value;
    let VisitDateValue = inputVisitDate.value;
    let VisitCostValue = inputVisitCost.value;

    let data = {
        pet_id: PetIdValue,
        visit_date: VisitDateValue,
        visit_cost: VisitCostValue
    }

    //Initialize AJAX request to receive data
    // Upon receiving data, we add row to table, clear input fields, and send data
    // Handles errors if AJAX not set up correctly or invalid inputs
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-visit-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            addRowToTable(xhttp.response);

            inputPetId.value = '';
            inputVisitDate.value = '';
            inputVisitCost.value = '';
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
    let visitIdCell = document.createElement("TD");
    let petIdCell = document.createElement("TD");
    let visitDateCell = document.createElement("TD");
    let visitCostCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    date_with_time = newRow.visit_date;

    // Fill the cells with correct data
    petIdCell.innerText = newRow.pet_name;
    visitIdCell.innerText = newRow.visit_id;
    visitDateCell.innerText = newRow.visit_date;
    visitCostCell.innerText = newRow.visit_cost;

    //include on click delete functionality for corresponding row of data
    deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fa fa-trash"></i>';
    deleteBtn.onclick = function () {
        deletePet(newRow.visit_id);
    };
    deleteCell.appendChild(deleteBtn);

    // Add the cells to the row 
    row.appendChild(visitIdCell);
    row.appendChild(petIdCell);
    row.appendChild(visitDateCell);
    row.appendChild(visitCostCell);
    row.appendChild(deleteCell);

    // initialize unique row attribute to easily identify row
    row.setAttribute('data-value', newRow.visit_id);

    // Add the row to the end of the table
    let currentTableBody = document.getElementById("visits-table-body");
    currentTableBody.appendChild(row);

}


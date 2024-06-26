// Citation for the following function:
// Date: 02/29/2024
// Based on: CS 340 starter code 'Step 5 Adding New Data'
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app


let addParentForm = document.getElementById('add-parent-form-ajax');

// Execute this when we submit the current form
addParentForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting automatically
    e.preventDefault();

    //Get the values from form fields and save it into an object
    let inputParentName = document.getElementById("input-parent-name");
    let inputParentNumber = document.getElementById("input-parent-number");
    let inputParentEmail = document.getElementById("input-parent-email");

    let ParentNameValue = inputParentName.value;
    let ParentNumberValue = inputParentNumber.value;
    let ParentEmailValue = inputParentEmail.value;

    let data = {
        parent_name: ParentNameValue,
        parent_number: ParentNumberValue,
        parent_email: ParentEmailValue
    }

    //Initialize AJAX request to receive data
    // Upon receiving data, we add row to table, clear input fields, and send data
    // Handles errors if AJAX not set up correctly or invalid inputs
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-parent-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            addRowToTable(xhttp.response);

            inputParentName.value = '';
            inputParentNumber.value = '';
            inputParentEmail.value = '';
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
    let parentIdCell = document.createElement("TD");
    let parentNameCell = document.createElement("TD");
    let parentNumberCell = document.createElement("TD");
    let parentEmailCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    parentIdCell.innerText = newRow.parent_id;
    parentNameCell.innerText = newRow.parent_name;
    parentNumberCell.innerText = newRow.parent_number;
    parentEmailCell.innerText = newRow.parent_email;

    //include on click delete functionality for corresponding row of data
    deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fa fa-trash"></i>';
    deleteBtn.onclick = function () {
        deleteParent(newRow.parent_id);
    };
    deleteCell.appendChild(deleteBtn);

    // Add the cells to the row 
    row.appendChild(parentIdCell);
    row.appendChild(parentNameCell);
    row.appendChild(parentNumberCell);
    row.appendChild(parentEmailCell);
    row.appendChild(deleteCell);

    // initialize unique row attribute to easily identify row
    row.setAttribute('data-value', newRow.parent_id);

    // Add the row to the end of the table
    let currentTableBody = document.getElementById("parents-table-body");
    currentTableBody.appendChild(row);
}


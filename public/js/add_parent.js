// Get the objects we need to modify
let addParentForm = document.getElementById('add-parent-form-ajax');

// Modify the objects we need
addParentForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputParentName = document.getElementById("input-parent-name");
    let inputParentNumber = document.getElementById("input-parent-number");
    let inputParentEmail = document.getElementById("input-parent-email");

    // Get the values from the form fields
    let ParentNameValue = inputParentName.value;
    let ParentNumberValue = inputParentNumber.value;
    let ParentEmailValue = inputParentEmail.value;

    //console.log(`data obtained: ${PetNameValue} ${ParentNameValue} ${BreedValue}`)

    // Put our data we want to send in a javascript object
    let data = {
        parent_name: ParentNameValue,
        parent_number: ParentNumberValue,
        parent_email: ParentEmailValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-parent-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputParentName.value = '';
            inputParentNumber.value = '';
            inputParentEmail.value = '';
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
    let currentTable = document.getElementById("parents-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
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

    deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete";
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

    // Add a custom row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.parent_id);

    let currentTableBody = document.getElementById("parents-table-body");
    // Add the row to the table
    currentTableBody.appendChild(row);
}


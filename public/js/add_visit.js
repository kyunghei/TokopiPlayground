// Get the objects we need to modify
let addVisitForm = document.getElementById('add-visit-form-ajax');

// Modify the objects we need
addVisitForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputPetId = document.getElementById("input-pet-id");
    let inputVisitDate = document.getElementById("input-visit-date");
    let inputVisitCost = document.getElementById("input-visit-cost");

    // Get the values from the form fields
    let PetIdValue = inputPetId.value;
    let VisitDateValue = inputVisitDate.value;
    let VisitCostValue = inputVisitCost.value;

    console.log(`data obtained: ${PetIdValue} ${VisitDateValue} ${VisitCostValue}`)

    // Put our data we want to send in a javascript object
    let data = {
        pet_id: PetIdValue,
        visit_date: VisitDateValue,
        visit_cost: VisitCostValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-visit-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputPetId.value = '';
            inputVisitDate.value = '';
            inputVisitCost.value = '';
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
    let currentTable = document.getElementById("visits-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    console.log(parsedData);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let visitIdCell = document.createElement("TD");
    let petIdCell = document.createElement("TD");
    let visitDateCell = document.createElement("TD");
    let visitCostCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    console.log(newRow.visit_date);
    date_with_time = newRow.visit_date;
    console.log(date_with_time)

    // Fill the cells with correct data
    petIdCell.innerText = newRow.pet_id;
    visitIdCell.innerText = newRow.visit_id;
    visitDateCell.innerText = newRow.visit_date;
    visitCostCell.innerText = newRow.visit_cost;

    deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete";
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

    // Add a custom row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.visit_id);

    let currentTableBody = document.getElementById("visits-table-body");
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


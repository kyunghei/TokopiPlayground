// Get the objects we need to modify
let addPetForm = document.getElementById('add-pet-form-ajax');

// Modify the objects we need
addPetForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputPetName = document.getElementById("input-pet-name");
    let inputParentId = document.getElementById("input-parent-id");
    let inputBreed = document.getElementById("input-breed");

    // Get the values from the form fields
    let PetNameValue = inputPetName.value;
    let ParentNameValue = inputParentId.value;
    let BreedValue = inputBreed.value;

    //console.log(`data obtained: ${PetNameValue} ${ParentNameValue} ${BreedValue}`)

    // Put our data we want to send in a javascript object
    let data = {
        pet_name: PetNameValue,
        parent_id: ParentNameValue,
        breed: BreedValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-pet-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputPetName.value = '';
            inputParentId.value = '';
            inputBreed.value = '';
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
    let currentTable = document.getElementById("pets-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let petIdCell = document.createElement("TD");
    let petNameCell = document.createElement("TD");
    let parentIdCell = document.createElement("TD");
    let breedCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");
    

    // Fill the cells with correct data
    petIdCell.innerText = newRow.pet_id;
    petNameCell.innerText = newRow.pet_name;
    parentIdCell.innerText = newRow.parent_id;
    breedCell.innerText = newRow.breed;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deletePet(newRow.pet_id);
    };

    // Add the cells to the row 
    row.appendChild(petIdCell);
    row.appendChild(petNameCell);
    row.appendChild(parentIdCell);
    row.appendChild(breedCell);
    row.appendChild(deleteCell);

    // Add a custom row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.id);
    
    // Add the row to the table
    currentTable.appendChild(row);

    // Find drop down menu, create a new option, fill data in the option (full name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("select-pet-id");
    let option = document.createElement("option");
    option.text = newRow.pet_id + ' ' +  newRow.pet_name;
    option.value = newRow.pet_id;
    selectMenu.add(option);
}


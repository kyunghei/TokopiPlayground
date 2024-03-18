// Citation for the following function:
// Date: 02/29/2024
// Based on: CS 340 starter code 'Step 5 Adding New Data'
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app


let addPetForm = document.getElementById('add-pet-form-ajax');

// Execute this when we submit the current form
addPetForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting automatically
    e.preventDefault();

    //Get the values from form fields and save it into an object
    let inputPetName = document.getElementById("input-pet-name");
    let inputParentId = document.getElementById("input-parent-id");
    let inputBreed = document.getElementById("input-breed");

    let PetNameValue = inputPetName.value;
    let ParentNameValue = inputParentId.value;
    let BreedValue = inputBreed.value;

    let data = {
        pet_name: PetNameValue,
        parent_id: ParentNameValue,
        breed: BreedValue
    }

    //Initialize AJAX request to receive data
    // Upon receiving data, we add row to table, clear input fields, and send data
    // Handles errors if AJAX not set up correctly or invalid inputs
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-pet-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            addRowToTable(xhttp.response);

            inputPetName.value = '';
            inputParentId.value = '';
            inputBreed.value = '';
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
    let petIdCell = document.createElement("TD");
    let petNameCell = document.createElement("TD");
    let parentIdCell = document.createElement("TD");
    let breedCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    petIdCell.innerText = newRow.pet_id;
    petNameCell.innerText = newRow.pet_name;
    parentIdCell.innerText = newRow.parent_id;
    breedCell.innerText = newRow.breed;

    //include on click delete functionality for corresponding row of data
    deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fa fa-trash"></i>';
    deleteBtn.onclick = function () {
        deletePet(newRow.pet_id);
    };
    deleteCell.appendChild(deleteBtn);

    // Add the cells to the row
    row.appendChild(petIdCell);
    row.appendChild(petNameCell);
    row.appendChild(parentIdCell);
    row.appendChild(breedCell);
    row.appendChild(deleteCell);

    // initialize unique row attribute to easily identify row
    row.setAttribute('data-value', newRow.pet_id);

    // Add the row to the end of the table
    let currentTableBody = document.getElementById("pets-table-body");
    currentTableBody.appendChild(row);
}


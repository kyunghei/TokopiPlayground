// Citation for the following function:
// Date: 03/07/2024
// Based on: CS 340 starter code 'Step 8 Dynamically Updating Data'
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app


let updatePetForm = document.getElementById('update-pet-form-ajax');

// Execute when form is submitted 
updatePetForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting automatically
    e.preventDefault();

    //Get the id that represents the data we wish to update and values that are to be updated from form fields 
    //and save it into an object
    let inputPetId = document.getElementById("select-pet-id");
    let inputPetName = document.getElementById("update-pet-name");
    let inputParentId = document.getElementById("update-parent-id");
    let inputBreed = document.getElementById("update-breed");

    let petIdValue = inputPetId.value;
    let petNameValue = inputPetName.value;
    let parentIdValue = inputParentId.value;
    let breedValue = inputBreed.value;

    let data = {
        pet_id: petIdValue,
        pet_name: petNameValue,
        parent_id: parentIdValue,
        breed: breedValue
    }


    //Initialize AJAX request to receive data
    // Upon receiving data, we update row to table, clear input fields, and send data
    // Handles errors if AJAX not set up correctly or invalid inputs
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-pet-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // update new data to the table
            updateRow(xhttp.response, petIdValue);

            inputPetId.value = 'Pet ID [Pet Name]';
            inputPetName.value = "";
            inputParentId.value = 'Parent ID';
            inputBreed.value = '';

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    xhttp.send(JSON.stringify(data));

})

//Finds table and iterates through the rows until the row's unique value is equivalent to the provided row id
//Once row is found, iterate through cells and update with new data
function updateRow(data, petID) {
    let parsedData = JSON.parse(data);

    let table = document.getElementById("pets-table");

    for (let i = 0, row; row = table.rows[i]; i++) {

        if (table.rows[i].getAttribute("data-value") == petID) {

            let updateRowIndex = table.getElementsByTagName("tr")[i];

            let pet_name_td = updateRowIndex.getElementsByTagName("td")[1];
            let parent_id_td = updateRowIndex.getElementsByTagName("td")[2];
            let breed_td = updateRowIndex.getElementsByTagName("td")[3];

            //update cells with new data values
            pet_name_td.innerHTML = parsedData[0].pet_name;
            parent_id_td.innerHTML = parsedData[0].parent_id;
            breed_td.innerHTML = parsedData[0].breed;
        }
    }
}

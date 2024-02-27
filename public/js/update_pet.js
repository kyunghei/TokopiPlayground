
// Get the objects we need to modify
let updatePetForm = document.getElementById('update-pet-form-ajax');

// Modify the objects we need
updatePetForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();
    console.log("submit update")
    // Get form fields we need to get data from
    let inputPetId = document.getElementById("select-pet-id");
    let inputParentId = document.getElementById("update-parent-id");
    let inputBreed = document.getElementById("update-breed");

    // Get the values from the form fields
    let petIdValue = inputPetId.value;
    let parentIdValue = inputParentId.value;
    let breedValue = inputBreed.value;
    
    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld

    if (isNaN(parentIdValue)) 
    {
        return;
    }


    // Put our data we want to send in a javascript object
    let data = {
        pet_id: petIdValue,
        parent_id: parentIdValue,
        breed:breedValue
    }
    console.log(`PET:${data.pet_id} PARENT:${data.parent_id} BREED: ${data.breed}`);

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-pet-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, petIdValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, petID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("pets-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == petID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of parent_id value
            let parent_id_td = updateRowIndex.getElementsByTagName("td")[2];

            // Get td of breed value
            let breed_td = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign homeworld to our value we updated to
            parent_id_td.innerHTML = parsedData[0].parent_id; 
            breed_td.innerHTML = parsedData[0].breed; 
       }
    }
}

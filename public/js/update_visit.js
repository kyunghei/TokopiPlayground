// Citation for the following function:
// Date: 03/07/2024
// Based on: CS 340 starter code 'Step 8 Dynamically Updating Data'
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let updateVisitForm = document.getElementById('update-visit-form-ajax');

// Modify the objects we need
updateVisitForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();
    // Get form fields we need to get data from
    let selectVisitId = document.getElementById("select-visit-id");
    let updatePetId = document.getElementById("update-pet-id");
    let updateVisitDate = document.getElementById("update-visit-date");
    let updateVisitCost = document.getElementById("update-visit-cost");

    // Get the values from the form fields
    let visitIdValue = selectVisitId.value;
    let petIdValue = updatePetId.value;
    let visitDateValue = updateVisitDate.value;
    let visitCostValue = updateVisitCost.value;
    
    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld

    // if (isNaN(parentIdValue)) 
    // {
    //     return;
    // }


    // Put our data we want to send in a javascript object
    let data = {
        visit_id: visitIdValue,
        pet_id: petIdValue,
        visit_date: visitDateValue,
        visit_cost:visitCostValue,
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-visit-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, visitIdValue);

            // Clear the input fields for another transaction
            selectVisitId.value = 'Select';
            updatePetId.value = 'Select';
            updateVisitDate = '';
            updateVisitCost = '';

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, visitID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("visits-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == visitID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of parent_id value
            let pet_id_td = updateRowIndex.getElementsByTagName("td")[1];

            let visit_date_td = updateRowIndex.getElementsByTagName("td")[2];

            // Get td of breed value
            let visit_cost_td = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign homeworld to our value we updated to
            pet_id_td.innerHTML = parsedData[0].pet_id; 
            visit_date_td.innerHTML = parsedData[0].visit_date; 
            visit_cost_td.innerHTML = parsedData[0].visit_cost; 
       }
    }
}
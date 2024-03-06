
// Get the objects we need to modify
let updateParentForm = document.getElementById('update-parent-form-ajax');

// Modify the objects we need
updateParentForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();
    // Get form fields we need to get data from
    let inputParentId = document.getElementById("select-parent-id");
    let inputParentNumber = document.getElementById("update-parent-number");
    let inputParentEmail = document.getElementById("update-parent-email");

    // Get the values from the form fields
    let parentIdValue = inputParentId.value;
    let parentNumberValue = inputParentNumber.value;
    let parentEmailValue = inputParentEmail.value;

    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld

    // if (isNaN(parentIdValue)) 
    // {
    //     return;
    // }


    // Put our data we want to send in a javascript object
    let data = {
        parent_id: parentIdValue,
        parent_number: parentNumberValue,
        parent_email: parentEmailValue
    }
    //console.log(`PET:${data.pet_id} PARENT:${data.parent_id} BREED: ${data.breed}`);

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-parent-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, parentIdValue);

            // Clear the input fields for another transaction
            inputParentId.value = 'Select';
            inputParentNumber.value = 'Select';
            inputParentEmail.value = '';

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, parentID) {
    let parsedData = JSON.parse(data);

    let table = document.getElementById("parents-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == parentID) {

            // Get the location of the row where we found the matching parent ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of parent number value
            let parent_number_td = updateRowIndex.getElementsByTagName("td")[2];

            // Get td of parent email value
            let parent_email_td = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign parent to our value we updated to
            parent_number_td.innerHTML = parsedData[0].parent_number;
            parent_email_td.innerHTML = parsedData[0].parent_email;
        }
    }
}

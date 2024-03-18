// Citation for the following function:
// Date: 03/07/2024
// Based on: CS 340 starter code 'Step 8 Dynamically Updating Data'
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app


let updateParentForm = document.getElementById('update-parent-form-ajax');

// Execute when form is submitted 
updateParentForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting automatically
    e.preventDefault();

    //Get the id that represents the data we wish to update and values that are to be updated from form fields 
    //and save it into an object
    let inputParentId = document.getElementById("select-parent-id");
    let inputParentName = document.getElementById("update-parent-name");
    let inputParentNumber = document.getElementById("update-parent-number");
    let inputParentEmail = document.getElementById("update-parent-email");

    let parentIdValue = inputParentId.value;
    let parentNameValue = inputParentName.value;
    let parentNumberValue = inputParentNumber.value;
    let parentEmailValue = inputParentEmail.value;

    let data = {
        parent_id: parentIdValue,
        parent_name: parentNameValue,
        parent_number: parentNumberValue,
        parent_email: parentEmailValue
    }


    //Initialize AJAX request to receive data
    // Upon receiving data, we update row to table, clear input fields, and send data
    // Handles errors if AJAX not set up correctly or invalid inputs
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-parent-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // update new data to the table
            updateRow(xhttp.response, parentIdValue);

            inputParentId.value = '';
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

//Finds table and iterates through the rows until the row's unique value is equivalent to the provided row id
//Once row is found, iterate through cells and update with new data
function updateRow(data, parentID) {
    let parsedData = JSON.parse(data);

    let table = document.getElementById("parents-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == parentID) {

            // Get the location of the row where we found the matching parent ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            let parent_name_td = updateRowIndex.getElementsByTagName("td")[1];

            // Get td of parent number value
            let parent_number_td = updateRowIndex.getElementsByTagName("td")[2];

            // Get td of parent email value
            let parent_email_td = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign parent to our value we updated to
            parent_name_td.innerHTML = parsedData[0].parent_name;
            parent_number_td.innerHTML = parsedData[0].parent_number;
            parent_email_td.innerHTML = parsedData[0].parent_email;
        }
    }
}

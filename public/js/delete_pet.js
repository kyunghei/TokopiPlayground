function deletePet(petID) {
    if (confirm(`Delete pet with ID ${petID}?`)) {
        // Put our data we want to send in a javascript object
        let data = {
            pet_id: petID
        };

        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("DELETE", "/delete-pet-ajax", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 204) {
                // Delete the data from the table
                deleteRow(petID);

            }
            else if (xhttp.readyState == 4 && xhttp.status != 204) {
                console.log("There was an error with the input.")
            }
        }
        // Send the request and wait for the response
        xhttp.send(JSON.stringify(data));
    }
    else {
        return;
    }

}


function deleteRow(petID) {

    let table = document.getElementById("pets-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == petID) {
            table.deleteRow(i);
            break;
        }
    }
}
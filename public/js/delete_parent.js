// Citation for the following function:
// Date: 03/07/2024
// Based on:
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

function deleteParent(parentID) {
    // Create delete confirmation dialog
    if (confirm(`Delete parent with ID ${parentID}?`)) {
        // Put our data we want to send in a javascript object
        let data = {
            parent_id: parentID
        };

        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("DELETE", "/delete-parent-ajax", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 204) {
                // delete data from the table
                deleteRow(parentID);

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


function deleteRow(parentID) {

    let table = document.getElementById("parents-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == parentID) {
            table.deleteRow(i);
            break;
        }
    }
}
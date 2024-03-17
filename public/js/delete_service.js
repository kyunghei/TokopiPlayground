function deleteService(serviceID) {
    // Create a delete confirmation dialog
    if (confirm(`Delete service with ID ${serviceID}?`)) {
        // Put our data we want to send in a javascript object
        let data = {
            service_id: serviceID
        };

        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("DELETE", "/delete-service-ajax", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 204) {
                // Delete the data from the table
                deleteRow(serviceID);

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


function deleteRow(serviceID) {

    let table = document.getElementById("services-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == serviceID) {
            table.deleteRow(i);
            break;
        }
    }
}
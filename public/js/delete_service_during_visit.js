function deleteServiceDuringVisit(serviceDuringVisitID) {
    // Create a delete confirmation dialog
    if (confirm(`Delete service during visit with ID ${serviceDuringVisitID}?`)) {
        // Put our data we want to send in a javascript object
        let data = {
            service_during_visit_id: serviceDuringVisitID
        };

        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("DELETE", "/delete-service-during-visit-ajax", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 204) {
                // Delete the data from the table
                deleteRow(serviceDuringVisitID);

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


function deleteRow(serviceDuringVisitID) {

    let table = document.getElementById("services-during-visit-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == serviceDuringVisitID) {
            table.deleteRow(i);
            break;
        }
    }
}
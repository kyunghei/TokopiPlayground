// Citation for the following function:
// Date: 03/07/2024
// Based on:
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let updateServiceDuringVisitForm = document.getElementById('update-service-during-visit-form-ajax');

// Modify the objects we need
updateServiceDuringVisitForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();
    // Get form fields we need to get data from
    let selectServiceDuringVisitId = document.getElementById("select-service-during-visit-id");
    let updateVisitId = document.getElementById("update-visit-id");
    let updateServiceId = document.getElementById("update-service-id");

    // Get the values from the form fields
    let serviceDuringVisitIdValue = selectServiceDuringVisitId.value;
    let visitIdValue = updateVisitId.value;
    let serviceIdValue = updateServiceId.value;

    
    // Put our data we want to send in a javascript object
    let data = {
        service_during_visit_id: serviceDuringVisitIdValue,
        visit_id: visitIdValue,
        service_id: serviceIdValue,
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-service-during-visit-form-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, serviceDuringVisitIdValue);

            // Clear the input fields for another transaction
            selectServiceDuringVisitId.value = 'Select';
            updateVisitId.value = 'Select';
            updateServiceId.value = 'Select';


        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, serviceDuringVisitID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("services-during-visit-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == serviceDuringVisitID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of parent_id value
            let visit_id_td = updateRowIndex.getElementsByTagName("td")[1];

            let service_id_td = updateRowIndex.getElementsByTagName("td")[2];


            // Reassign homeworld to our value we updated to
            visit_id_td.innerHTML = parsedData[0].visit_id; 
            service_id_td.innerHTML = parsedData[0].service_id; 
       }
    }
}